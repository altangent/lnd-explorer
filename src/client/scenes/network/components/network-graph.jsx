import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';

export class NetworkGraph extends React.Component {
  static propTypes = {
    onNodeSelected: PropTypes.func,
  };

  componentDidMount() {
    this.renderNetworkGraph(this.svg);
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return <svg ref={elem => (this.svg = elem)} />;
  }

  mapLndGraph(json) {
    let nodes = json.nodes;
    let links = json.edges.map(p => ({
      source: p.node1_pub,
      target: p.node2_pub,
      edge: p,
    }));
    return { nodes, links };
  }

  renderNetworkGraph = svg => {
    let { onNodeSelected } = this.props;
    svg = d3.select(svg);
    svg.attr('width', svg.node().parentNode.clientWidth).attr('height', 600);

    let width = svg.attr('width');
    let height = svg.attr('height');
    let maxNodes = 100;

    fetch('/api/home')
      .then(res => res.json())
      .then(home =>
        fetch('/api/graph?nodes=' + maxNodes)
          .then(res => res.json())
          .then(graphJson => this.mapLndGraph(graphJson))
          .then(graph => render(graph, home.info))
      );

    function render(graph, info) {
      let { nodes, links } = graph;
      let selectedPubKey = info.identity_pubkey;
      onNodeSelected(selectedPubKey);

      var g = svg.append('g');

      let simulation = d3
        .forceSimulation()
        .force('links', d3.forceLink().id(d => d.pub_key))
        .force(
          'charge',
          d3
            .forceCollide()
            .radius(30)
            .strength(0.1)
        )
        .force('charge', d3.forceManyBody().strength(-(width / 2.5)))
        .force('center', d3.forceCenter(width / 2, height / 2));

      let link = g
        .append('g')
        .attr('class', 'links')
        .selectAll('line')
        .data(links)
        .enter()
        .append('line')
        .attr(
          'class',
          d => (d.source === selectedPubKey || d.target === selectedPubKey ? 'selected' : '')
        );

      let node = g
        .append('g')
        .attr('class', 'nodes')
        .selectAll('circle')
        .data(nodes)
        .enter()
        .append('circle')
        .attr('class', d => (d.pub_key === selectedPubKey ? 'selected' : ''))
        .attr('r', d => (d.pub_key === selectedPubKey ? 9 : 6))
        .on('click', nodeClicked);

      simulation.nodes(nodes).on('tick', ticked);
      simulation.force('links').links(links);

      function ticked() {
        link
          .attr('x1', d => d.source.x)
          .attr('y1', d => d.source.y)
          .attr('x2', d => d.target.x)
          .attr('y2', d => d.target.y);

        node.attr('cx', d => d.x).attr('cy', d => d.y);
      }

      function nodeClicked(d) {
        selectedPubKey = d.pub_key;
        onNodeSelected(d.pub_key);

        d3
          .select('.nodes circle.selected')
          .attr('r', 6)
          .attr('class', null);
        d3
          .select(this)
          .attr('r', 9)
          .attr('class', 'selected');

        // remove selected line
        d3.selectAll('.links .selected').attr('class', null);

        // add selected lines
        d3
          .selectAll('.links line')
          .attr(
            'class',
            d =>
              d.edge.node1_pub === selectedPubKey || d.edge.node2_pub === selectedPubKey
                ? 'selected'
                : ''
          );
      }

      svg.call(
        d3
          .zoom()
          .scaleExtent([1 / 2, 8])
          .on('zoom', zoomed)
      );

      function zoomed() {
        g.attr('transform', d3.event.transform);
      }
    }
  };
}

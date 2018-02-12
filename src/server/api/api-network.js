const express = require('express');
const winston = require('winston');
const lnd = require('../lnd');
const Cache = require('node-cache');
const app = express();
const cache = new Cache({ stdTTL: 60 });

app.get('/api/network', (req, res, next) => getNetwork(req, res).catch(next));
app.get('/api/network/:pub_key', (req, res, next) => getNode(req, res).catch(next));
app.get('/api/graph', (req, res, next) => getGraph(req, res).catch(next));

module.exports = app;

async function getNetwork(req, res) {
  let networkInfo = cache.get('networkInfo') || (await loadNetworkInfo());
  res.send({ networkInfo });
}

async function getNode(req, res) {
  let { pub_key } = req.params;
  let node = await lnd.client.getNodeInfo({ pub_key });
  res.send(node);
}

async function getGraph(req, res) {
  let nodeCount = parseInt(req.query.nodes) || 50;
  let info = await lnd.client.getInfo({});
  let pubkey = info.identity_pubkey;

  let data = cache.get('networkGraph') || (await loadGraph());

  let nodeMap = constructNodeMap(data);
  let edgeMap = constructEdgeMap(data);
  let prunedNodeMap = bfs(nodeMap, edgeMap, pubkey, nodeCount);
  let prunedData = destructNodeMap(prunedNodeMap, edgeMap);
  res.send(prunedData);
}

function constructNodeMap(data) {
  winston.profile('constructing node map');
  let nodeMap = new Map(data.nodes.map(node => [node.pub_key, node]));
  winston.profile('constructing node map');
  return nodeMap;
}

function constructEdgeMap({ edges }) {
  winston.profile('constructing edge map');
  let edgeMap = new Map();
  for (let edge of edges) {
    if (!edgeMap.has(edge.node1_pub)) edgeMap.set(edge.node1_pub, new Set());
    edgeMap.get(edge.node1_pub).add(edge);

    if (!edgeMap.has(edge.node2_pub)) edgeMap.set(edge.node2_pub, new Set());
    edgeMap.get(edge.node2_pub).add(edge);
  }
  winston.profile('constructing edge map');
  return edgeMap;
}

function destructNodeMap(nodeMap, edgeMap) {
  let nodes = Array.from(nodeMap.values());
  let edges = [];
  for (let node of nodes) {
    if (!edgeMap.has(node.pub_key)) continue;
    let nodeEdges = edgeMap.get(node.pub_key).values();
    for (let edge of nodeEdges) {
      if (nodeMap.has(edge.node1_pub) && nodeMap.has(edge.node2_pub)) edges.push(edge);
    }
  }
  return { nodes, edges };
}

function bfs(nodeMap, edgeMap, pubkey, max) {
  winston.profile('breadth first search');
  let visited = new Map();
  let start = nodeMap.get(pubkey);

  function processStep(nodeQueue, filter) {
    winston.info('processing round with', nodeQueue.length);
    let resultNodes = [];

    // ensure our node queue is sorted so that our
    // node distribution isn't stale nodes or nodes
    // that we cannot connect with
    if (filter) nodeQueue = sortNodes(filterNodes(nodeQueue));
    else nodeQueue = sortNodes(nodeQueue);

    while (visited.size < max) {
      let node = nodeQueue.shift();
      if (!node) break;

      visited.set(node.pub_key, node);

      if (!edgeMap.has(node.pub_key)) continue;

      let edges = edgeMap.get(node.pub_key).values();

      for (let edge of edges) {
        let sourceNode = nodeMap.get(edge.node1_pub);
        if (!visited.has(sourceNode.pub_key)) resultNodes.push(sourceNode);

        let targetNode = nodeMap.get(edge.node2_pub);
        if (!visited.has(targetNode.pub_key)) resultNodes.push(targetNode);
      }
    }

    return resultNodes;
  }

  let resultNodes = processStep([start], false);
  while (visited.size < max && resultNodes.length) {
    resultNodes = processStep(resultNodes, true);
  }

  winston.profile('breadth first search');
  return visited;
}

function filterNodes(nodes) {
  return nodes.filter(n => n.addresses.length);
}

function sortNodes(nodes) {
  let result = nodes.slice();
  result.sort((a, b) => {
    if (a.last_update < b.last_update) return 1;
    else if (a.last_update > b.last_update) return -1;
    else return 0;
  });
  return result;
}

///////////////////////////

async function loadGraph() {
  winston.profile('loading graph');
  let data = await lnd.client.describeGraph({});
  cache.set('networkGraph', data);
  winston.profile('loading graph');
  return data;
}

async function loadNetworkInfo() {
  winston.profile('loading network info');
  let data = await lnd.client.getNetworkInfo({});
  cache.set('networkInfo', data);
  winston.profile('loading network info');
  return data;
}

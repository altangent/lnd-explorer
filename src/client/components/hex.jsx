import React from 'react';
import { Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import copy from 'copy-to-clipboard';
import uuid4 from 'uuid/v4';

export class Hex extends React.PureComponent {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.mouseEntered = this.mouseEntered.bind(this);
    this.mouseExited = this.mouseExited.bind(this);
    this.copyClicked = this.copyClicked.bind(this);
    this.state = {
      id: uuid4(),
      popoverOpen: false,
    };
  }

  componentWillMount() {
    if (this.props.id) this.setState({ id: this.props.id });
  }

  toggle() {
    this.setState({ popoverOpen: !this.state.popoverOpen });
  }

  mouseEntered() {
    this.setState({ popoverOpen: true });
  }

  mouseExited() {
    this.setState({ popoverOpen: false });
  }

  copyClicked(e) {
    e.preventDefault();
    copy(this.props.value);
  }

  _truncateValue(value, showStart, substrLength) {
    if (showStart) return value.substr(0, substrLength);
    else return value.substr(Math.max(0, value.length - substrLength - 1), substrLength);
  }
  _renderValue(originalValue, truncatedValue, showStart) {
    if (truncatedValue.length === originalValue.length) return <span>{truncatedValue}</span>;
    else {
      if (showStart) return <span>{truncatedValue}...</span>;
      else return <span>...{truncatedValue}</span>;
    }
  }

  render() {
    let { value, showStart = true, substrLength = 12 } = this.props;
    let { popoverOpen, id } = this.state;
    let truncatedValue = this._truncateValue(value, showStart, substrLength);
    return (
      <span
        className="hex-value"
        onClick={this.toggle}
        onTouchStart={this.toggle}
        onMouseEnter={this.mouseEntered}
        onMouseLeave={this.mouseExited}
        id={'hex-' + id}
      >
        {this._renderValue(value, truncatedValue, showStart)}
        &nbsp;
        <a href="#" onClick={this.copyClicked}>
          copy
        </a>
        <Popover
          placement="bottom-start"
          isOpen={popoverOpen}
          target={'hex-' + id}
          toggle={this.toggle}
        >
          <PopoverBody>{value}</PopoverBody>
        </Popover>
      </span>
    );
  }
}

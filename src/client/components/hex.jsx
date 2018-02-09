import React from 'react';
import PropTypes from 'prop-types';
import { Popover, PopoverBody } from 'reactstrap';
import { EntypoCopy } from 'react-entypo';
import copy from 'copy-to-clipboard';
import uuid4 from 'uuid/v4';

export class Hex extends React.PureComponent {
  static propTypes = {
    id: PropTypes.string,
    value: PropTypes.string,
    showStart: PropTypes.bool,
    substrLength: PropTypes.number,
    full: PropTypes.bool,
  };

  state = {
    id: uuid4(),
    popoverOpen: false,
  };

  componentWillMount() {
    if (this.props.id) this.setState({ id: this.props.id });
  }

  toggle = () => {
    this.setState({ popoverOpen: !this.state.popoverOpen });
  };

  mouseEntered = () => {
    this.setState({ popoverOpen: true });
  };

  mouseExited = () => {
    this.setState({ popoverOpen: false });
  };

  copyClicked = e => {
    e.preventDefault();
    copy(this.props.value);
  };

  _truncateValue(value, showStart, substrLength) {
    if (showStart) return value.substr(0, substrLength);
    else return value.substr(Math.max(0, value.length - substrLength - 1), substrLength);
  }
  _renderValue(originalValue, truncatedValue, showStart) {
    if (truncatedValue.length === originalValue.length)
      return <span className="full">{truncatedValue}</span>;
    else {
      if (showStart) return <span className="partial">{truncatedValue}...</span>;
      else return <span className="partial">...{truncatedValue}</span>;
    }
  }

  render() {
    let { value, showStart = true, substrLength = 8, full } = this.props;
    let { popoverOpen, id } = this.state;
    let truncatedValue = full ? value : this._truncateValue(value, showStart, substrLength);
    let showPopover = !full;
    return (
      <div
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
          <EntypoCopy />
        </a>
        {showPopover && (
          <Popover
            placement="bottom-start"
            isOpen={popoverOpen}
            target={'hex-' + id}
            toggle={this.toggle}
          >
            <PopoverBody>{value}</PopoverBody>
          </Popover>
        )}
      </div>
    );
  }
}

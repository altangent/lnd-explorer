import React from 'React';
import PropTypes from 'prop-types';
import { Alert } from 'reactstrap';

export class Toast extends React.Component {
  static propTypes = {
    toast: PropTypes.object.isRequired,
    toastClosed: PropTypes.func,
  };

  state = {
    show: true,
  };

  close = () => {
    this.setState({ show: false });
    this.props.toastClosed(this.props.toast);
  };

  componentDidMount() {
    setTimeout(this.close, 10000);
  }

  render() {
    let { toast } = this.props;
    let { show } = this.state;
    return (
      <div className="toast">
        <Alert color={toast.type} isOpen={show} toggle={this.close}>
          {toast.message}
        </Alert>
      </div>
    );
  }
}

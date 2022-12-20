import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import "./ThanksModal.scss";
import { toast } from "react-toastify";
import CommonUtils from "../../../utils/CommonUtils";
class ThanksModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
    };
  }
  async componentDidMount() {
    if (this.props.dataModal) {
      this.setState({
        email: this.props.dataModal.email,
      });
    }
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.dataModal !== prevProps.dataModal) {
      this.setState({
        email: this.props.dataModal.email,
      });
    }
  }
  handleOnChangeEmail = (e) => {
    this.setState({
      email: e.target.value,
    });
  };

  handleSendThanks = () => {
    this.props.sendThanksData(this.state);
  };
  render() {
    let { isOpenModal, dataModal, isCloseModal, sendThanksData } = this.props;
    return (
      <Modal
        isOpen={isOpenModal}
        modalTransition={{ timeout: 700 }}
        backdropTransition={{ timeout: 1300 }}
        centered
        size="lg"
      >
        <ModalHeader toggle={this.toggle}>
          <p>Gửi lời cảm ơn đến khách hàng</p>
        </ModalHeader>
        <ModalBody>
          <div className="row">
            <div className="col-6 form-group">
              <label>Email khách hàng</label>
              <div>
                <input
                  className="form-control"
                  type="text"
                  value={this.state.email}
                  onChange={(e) => this.handleOnChangeEmail(e)}
                />
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => this.handleSendThanks()}>
            <FormattedMessage id="customer.booking-modal.submit" />
          </Button>
          <Button color="secondary" onClick={isCloseModal}>
            <FormattedMessage id="customer.booking-modal.cancel" />
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ThanksModal);

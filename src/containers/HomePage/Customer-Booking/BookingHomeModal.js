import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import DatePicker from "../../../components/Input/DatePicker";
import * as actions from "../../../store/actions";
import "./BookingHomeModal.scss";
class BookingHomeModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: "",
      phoneNumber: "",
      email: "",
      address: "",
      note: "",
      birthday: "",
      selectedGender: "",
      barberId: "",
      genders: "",
      timeType: "",
      rangeTime: [],
    };
  }
  componentDidMount() {
    this.props.fetchAllScheduleTime();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    // if (prevProps.allBarbers !== this.props.allBarbers) {
    //   let dataSelect = this.buildDataInputSelect(this.props.allBarbers);
    //   this.setState({
    //     listBarbers: dataSelect,
    //   });
    // }
    if (prevProps.allScheduleTime !== this.props.allScheduleTime) {
      let data = this.props.allScheduleTime;
      if (data && data.length > 0) {
        data = data.map((item) => ({ ...item, isSelected: false }));
      }
      this.setState({
        rangeTime: data,
      });
    }
  }
  render() {
    let { isOpenModal, closeBookingModal } = this.props;
    let { rangeTime } = this.state;
    console.log(rangeTime);
    return (
      <>
        <Modal
          isOpen={isOpenModal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>
            <FormattedMessage id="customer.booking-modal.title" />
          </ModalHeader>
          <ModalBody>
            <div className="row">
              <div className="col-6 form-group">
                <label>
                  <FormattedMessage id="customer.booking-modal.fullName" />
                </label>
                <input type="text" className="form-control" />
              </div>
              <div className="col-6 form-group">
                <label>
                  <FormattedMessage id="customer.booking-modal.phoneNumber" />
                </label>
                <input type="text" className="form-control" />
              </div>
              <div className="col-6 form-group">
                <label>Email</label>
                <input type="text" className="form-control" />
              </div>
              <div className="col-6 form-group">
                <label>
                  <FormattedMessage id="customer.booking-modal.address" />
                </label>
                <input type="text" className="form-control" />
              </div>
              <div className="col-6 form-group">
                <label>
                  <FormattedMessage id="customer.booking-modal.birthday" />
                </label>
                <DatePicker className="form-control" />
              </div>

              <div className="col-6 form-group">
                <label>Chọn chi nhánh</label>
                <input type="text" className="form-control" />
              </div>
              <div className="col-12 form-group">
                <label>Chọn dịch vụ</label>
                <input type="text" className="form-control" />
              </div>

              <div className="col-12 form-group">
                <label>Ghi chú</label>
                <input type="text" className="form-control" />
              </div>
              <div className="col-12 form-group">
                <div className="col-12 pick-hour-container">
                  <div>
                    <label>Chọn thời gian</label>
                  </div>

                  {rangeTime &&
                    rangeTime.length > 0 &&
                    rangeTime.map((item, index) => {
                      return <button key={index}>{item.valueVi}</button>;
                    })}
                </div>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>
              <FormattedMessage id="customer.booking-modal.submit" />
            </Button>{" "}
            <Button color="secondary" onClick={closeBookingModal}>
              <FormattedMessage id="customer.booking-modal.cancel" />
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    allScheduleTime: state.admin.allScheduleTime,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllScheduleTime: () => dispatch(actions.fetchAllScheduleTime()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingHomeModal);

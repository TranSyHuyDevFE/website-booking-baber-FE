import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import "./BookingModal.scss";
import ProfileBarber from "../ProfileBarber";
import DatePicker from "../../../../components/Input/DatePicker";
import _ from "lodash";
import * as actions from "../../../../store/actions";
import { LANGUAGES } from "../../../../utils";
import Select from "react-select";
import { postCustomerBookAppointment } from "../../../../services/userService";
import { toast } from "react-toastify";
import moment from "moment";
class BookingModal extends Component {
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
      language: "",
      timeString: "",
      price: "",
      isLoading: false,
    };
  }
  async componentDidMount() {
    this.props.getGenders();
  }
  buildDataGender = (data) => {
    let result = [];
    let language = this.props.language;
    if (data && data.length > 0) {
      data.map((item) => {
        let object = {};
        object.label = language === LANGUAGES.VI ? item.valueVi : item.valueEn;
        object.value = item.keyMap;
        result.push(object);
      });
    }
    return result;
  };
  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
      this.setState({
        genders: this.buildDataGender(this.props.genders),
      });
    }
    if (this.props.genders !== prevProps.genders) {
      this.setState({
        genders: this.buildDataGender(this.props.genders),
      });
    }
    if (this.props.dataScheduleTimeModal !== prevProps.dataScheduleTimeModal) {
      if (
        this.props.dataScheduleTimeModal &&
        !_.isEmpty(this.props.dataScheduleTimeModal)
      ) {
        let barberId = this.props.dataScheduleTimeModal.barberId;
        let timeType = this.props.dataScheduleTimeModal.timeType;
        this.setState({
          barberId: barberId,
          timeType: timeType,
        });
      }
    }
  }
  handleOnchangeInput = (e, id) => {
    let valueInput = e.target.value;
    let stateCopy = { ...this.state };
    stateCopy[id] = valueInput;
    this.setState({
      ...stateCopy,
    });
  };
  handleOnchangeDatePicker = (date) => {
    this.setState({
      birthday: date[0],
    });
  };
  handleChangeSelect = (selectedOption) => {
    this.setState({
      selectedGender: selectedOption,
    });
  };
  buildTimeBooking = (dataScheduleTimeModal) => {
    let { language } = this.props;
    if (dataScheduleTimeModal && !_.isEmpty(dataScheduleTimeModal)) {
      let time =
        language === LANGUAGES.VI
          ? dataScheduleTimeModal.timeTypeData.valueVi
          : dataScheduleTimeModal.timeTypeData.valueEn;
      let date =
        language === LANGUAGES.VI
          ? moment
              .unix(+dataScheduleTimeModal.date / 1000)
              .format("dddd - DD/MM/YYYY")
          : moment
              .unix(+dataScheduleTimeModal.date / 1000)
              .locale("en")
              .format("ddd - MM/DD/YYYY");
      return `${time} - ${date}`;
    }
    return "";
  };
  buildBarberName = (dataScheduleTimeModal) => {
    let { language } = this.props;
    if (dataScheduleTimeModal && !_.isEmpty(dataScheduleTimeModal)) {
      let name =
        language === LANGUAGES.VI
          ? `${dataScheduleTimeModal.barberData.lastName} ${dataScheduleTimeModal.barberData.firstName}`
          : `${dataScheduleTimeModal.barberData.firstName} ${dataScheduleTimeModal.barberData.lastName}`;
      return name;
    }
    return "";
  };
  buildPrice = (extraInfor) => {
    let { language } = this.props;
    if (extraInfor && !_.isEmpty(extraInfor)) {
      let price =
        language === LANGUAGES.VI
          ? `${extraInfor.priceTypeData.valueVi} `
          : `${extraInfor.priceTypeData.valueEn}`;
      return price;
    }
    return "";
  };
  handleConfirmBooking = async () => {
    //validate input
    await setTimeout(() => this.setState({ isLoading: true }), 1000);
    let date = new Date(this.state.birthday).getTime();
    let timeString = this.buildTimeBooking(this.props.dataScheduleTimeModal);
    let barberName = this.buildBarberName(this.props.dataScheduleTimeModal);
    let price = this.buildPrice(this.props.extraInfor);

    let res = await postCustomerBookAppointment({
      fullName: this.state.fullName,
      phoneNumber: this.state.phoneNumber,
      email: this.state.email,
      address: this.state.address,
      note: this.state.note,
      birthday: date,
      date: this.props.dataScheduleTimeModal.date,
      selectedGender: this.state.selectedGender.value,
      barberId: this.state.barberId,
      timeType: this.state.timeType,
      language: this.props.language,
      timeString: timeString,
      barberName: barberName,
      price: price,
    });
    if (res && res.errCode === 0) {
      toast.success("?????t l???ch th??nh c??ng!");
      this.props.closeBookingModal();
    } else {
      setTimeout(() => this.setState({ isLoading: false }), 3000);
      toast.error("L???i ?????t l???ch!");
    }
  };
  render() {
    let { isOpenModal, closeBookingModal, dataScheduleTimeModal, dataProfile } =
      this.props;
    console.log(dataProfile);
    let { isLoading } = this.state;
    let barberId = "";
    if (dataScheduleTimeModal && !_.isEmpty(dataScheduleTimeModal)) {
      barberId = dataScheduleTimeModal.barberId;
    }

    return (
      <Modal
        isOpen={isOpenModal}
        modalTransition={{ timeout: 700 }}
        backdropTransition={{ timeout: 1300 }}
        centered
        size="lg"
      >
        <ModalHeader toggle={this.toggle}>
          <FormattedMessage id="customer.booking-modal.title" />
        </ModalHeader>
        <ModalBody>
          <div className="barber-info">
            <ProfileBarber
              barberId={barberId}
              isShowDescriptionBarber={false}
              dataScheduleTimeModal={dataScheduleTimeModal}
              isShowLinkDetail={false}
              isShowPrice={true}
            />
          </div>

          <div className="row">
            <div className="col-6 form-group">
              <label>
                <FormattedMessage id="customer.booking-modal.fullName" />
              </label>
              <input
                type="text"
                className="form-control"
                value={this.state.fullName}
                onChange={(e) => this.handleOnchangeInput(e, "fullName")}
              />
            </div>
            <div className="col-6 form-group">
              <label>
                <FormattedMessage id="customer.booking-modal.phoneNumber" />
              </label>
              <input
                type="text"
                className="form-control"
                value={this.state.phoneNumber}
                onChange={(e) => this.handleOnchangeInput(e, "phoneNumber")}
              />
            </div>
            <div className="col-6 form-group">
              <label>Email</label>
              <input
                type="text"
                className="form-control"
                value={this.state.email}
                onChange={(e) => this.handleOnchangeInput(e, "email")}
              />
            </div>
            <div className="col-6 form-group">
              <label>
                <FormattedMessage id="customer.booking-modal.address" />
              </label>
              <input
                type="text"
                className="form-control"
                value={this.state.address}
                onChange={(e) => this.handleOnchangeInput(e, "address")}
              />
            </div>
            <div className="col-12 form-group">
              <label>
                <FormattedMessage id="customer.booking-modal.note" />
              </label>
              <input
                type="text"
                className="form-control"
                value={this.state.note}
                onChange={(e) => this.handleOnchangeInput(e, "note")}
              />
            </div>
            <div className="col-6 form-group">
              <label>
                <FormattedMessage id="customer.booking-modal.birthday" />
              </label>
              <DatePicker
                onChange={this.handleOnchangeDatePicker}
                className="form-control"
                value={this.state.birthday}
              />
            </div>
            <div className="col-6 form-group">
              <label>
                <FormattedMessage id="customer.booking-modal.gender" />
              </label>
              <Select
                value={this.state.selectedGender}
                onChange={this.handleChangeSelect}
                options={this.state.genders}
              />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          {isLoading === true ? (
            <div className="spinner-border text-success" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
            " "
          )}

          <Button color="primary" onClick={() => this.handleConfirmBooking()}>
            <FormattedMessage id="customer.booking-modal.submit" />
          </Button>
          <Button onClick={closeBookingModal} color="secondary">
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
    genders: state.admin.genders,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenders: () => dispatch(actions.fetchGenderStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);

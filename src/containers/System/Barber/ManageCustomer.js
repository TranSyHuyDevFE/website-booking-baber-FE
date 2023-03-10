import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import DatePicker from "../../../components/Input/DatePicker";
import "./ManageCustomer.scss";
import {
  getAllCustomerForBarber,
  postSendThankEmail,
} from "../../../services/userService";
import moment from "moment";
import { LANGUAGES } from "../../../utils";
import ThanksModal from "./ThanksModal";
import { toast } from "react-toastify";
import LoadingOverlay from "react-loading-overlay";
class ManageCustomer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: moment(new Date()).startOf("day").valueOf(),
      dataCustomer: [],
      isOpenRemedyModal: false,
      dataModal: {},
      isShowLoading: false,
    };
  }
  async componentDidMount() {
    await this.getDataCustomer();
  }
  async componentDidUpdate(prevProps, prevState, snapshot) {}
  getDataCustomer = async () => {
    let { user } = this.props;
    let { currentDate } = this.state;
    let formattedDate = new Date(currentDate).getTime();
    let res = await getAllCustomerForBarber({
      barberId: user.id,
      date: formattedDate,
    });
    if (res && res.errCode === 0) {
      this.setState({
        dataCustomer: res.data,
      });
    }
  };
  handleOnchangeDatePicker = (date) => {
    this.setState(
      {
        currentDate: date[0],
      },
      async () => {
        await this.getDataCustomer();
      }
    );
  };
  handleBtnConfirm = (item) => {
    let data = {
      barberId: item.barberId,
      customerId: item.customerId,
      email: item.customerData.email,
      timeType: item.timeType,
      customerName: item.customerData.firstName,
    };
    this.setState({
      isOpenModal: true,
      dataModal: data,
    });
  };
  isCloseModal = () => {
    this.setState({
      isOpenModal: false,
      dataModal: {},
    });
  };
  sendThanksData = async (dataFromModal) => {
    let { dataModal } = this.state;
    this.setState({
      isShowLoading: true,
    });
    let res = await postSendThankEmail({
      email: dataFromModal.email,
      imgBase64: dataFromModal.imgBase64,
      barberId: dataModal.barberId,
      customerId: dataModal.customerId,
      timeType: dataModal.timeType,
      language: this.props.language,
      customerName: dataModal.customerName,
    });
    if (res && res.errCode === 0) {
      toast.success("G???i th??nh c??ng !");
      this.isCloseModal();
      this.setState({
        isShowLoading: false,
      });
      await this.getDataCustomer();
    } else {
      this.setState({
        isShowLoading: false,
      });
      toast.error("L???i, xin th??? l???i");
    }
  };
  render() {
    let { dataCustomer, isOpenModal, dataModal } = this.state;
    let { language } = this.props;
    return (
      <>
        <LoadingOverlay active={this.state.isShowLoading} spinner text="">
          <div className="manage-customer-container">
            <div className="m-p-title">
              Danh s??ch kh??ch h??ng ?????t l???ch c???a b???n
            </div>
            <div className="manage-customer-body row">
              <div className="col-4 form-group">
                <label> Ch???n ng??y </label>
                <DatePicker
                  onChange={this.handleOnchangeDatePicker}
                  className="form-control"
                  value={this.state.currentDate}
                  // minDate={yesterday}
                />
              </div>
              <div className="col-12">
                <table className="table table-bordered mt-3">
                  <thead className="thead-color">
                    <tr>
                      <th>STT</th>
                      <th>Th???i gian</th>
                      <th>H??? v?? T??n</th>
                      <th>Email</th>
                      <th>Gi???i t??nh</th>
                      <th>S??? ??i???n tho???i</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody className="table-info">
                    {dataCustomer && dataCustomer.length > 0 ? (
                      dataCustomer.map((item, index) => {
                        let time =
                          language === LANGUAGES.VI
                            ? item.timeTypeDataCustomer.valueVi
                            : item.timeTypeDataCustomer.valueEn;
                        let gender =
                          language === LANGUAGES.VI
                            ? item.customerData.genderData.valueVi
                            : item.customerData.genderData.valueEn;
                        return (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{time}</td>
                            <td>{item.customerData.firstName}</td>
                            <td>{item.customerData.email}</td>
                            <td>{gender}</td>
                            <td>{item.customerData.phonenumber}</td>
                            <td>
                              <button
                                className="btn btn-warning"
                                onClick={() => this.handleBtnConfirm(item)}
                              >
                                Nh???n khi ho??n t???t
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan="7">Kh??ng c?? d??? li???u n??o</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <ThanksModal
            isOpenModal={isOpenModal}
            dataModal={dataModal}
            isCloseModal={this.isCloseModal}
            sendThanksData={this.sendThanksData}
          />
        </LoadingOverlay>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    user: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageCustomer);

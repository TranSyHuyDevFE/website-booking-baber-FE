import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import DatePicker from "../../../components/Input/DatePicker";
import "./ManageCustomer.scss";
import { getAllCustomerHistoryForBarber } from "../../../services/userService";
import moment from "moment";
import { LANGUAGES } from "../../../utils";

class ManageHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: moment(new Date()).startOf("day").valueOf(),
      dataCustomer: [],
      dataModal: {},
    };
  }
  async componentDidMount() {
    let { user } = this.props;
    let { currentDate } = this.state;
    let formattedDate = new Date(currentDate).getTime();
    this.getDataCustomer(user, formattedDate);
  }
  getDataCustomer = async (user, formattedDate) => {
    let res = await getAllCustomerHistoryForBarber({
      barberId: user.id,
      date: formattedDate,
    });
    if (res && res.errCode === 0) {
      this.setState({
        dataCustomer: res.data,
      });
    }
  };
  async componentDidUpdate(prevProps, prevState, snapshot) {}
  handleOnchangeDatePicker = (date) => {
    this.setState(
      {
        currentDate: date[0],
      },
      () => {
        let { user } = this.props;
        let { currentDate } = this.state;
        let formattedDate = new Date(currentDate).getTime();
        this.getDataCustomer(user, formattedDate);
      }
    );
  };
  handleBtnConfirm = (item) => {
    let data = {
      barberId: item.barberId,
      customerId: item.customerId,
      email: item.customerData.email,
    };
  };
  render() {
    let { dataCustomer } = this.state;
    let { language } = this.props;
    return (
      <>
        <div className="manage-customer-container">
          <div className="m-p-title">Lịch sử khách hàng của bạn</div>
          <div className="manage-customer-body row">
            <div className="col-4 form-group">
              <label> Chọn ngày</label>
              <DatePicker
                onChange={this.handleOnchangeDatePicker}
                className="form-control"
                value={this.state.currentDate}
              />
            </div>
            <div className="col-12">
              <table className="table table-bordered mt-3">
                <thead className="thead-color">
                  <tr>
                    <th>STT</th>
                    <th>Thời gian</th>
                    <th>Họ và Tên</th>
                    <th>Email</th>
                    <th>Giới tính</th>
                    <th>Số điện thoại</th>
                  </tr>
                </thead>
                <tbody className="table-warning">
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
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="7">Không có dữ liệu nào</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageHistory);

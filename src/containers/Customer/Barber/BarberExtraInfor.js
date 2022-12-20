import React, { Component } from "react";
import { connect } from "react-redux";
import { getExtraInforBarberById } from "../../../services/userService";
import { LANGUAGES } from "../../../utils";
import { FormattedMessage } from "react-intl";
import NumberFormat from "react-number-format";
import "./BarberExtraInfor.scss";
class BarberExtraInfor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowDetailInfor: false,
      extraInfor: {},
    };
  }
  async componentDidMount() {
    if (this.props.barberIdFromParent) {
      let res = await getExtraInforBarberById(this.props.barberIdFromParent);
      if (res && res.errCode === 0) {
        this.setState({
          extraInfor: res.data,
        });
      }
    }
  }
  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.barberIdFromParent !== prevProps.barberIdFromParent) {
      let res = await getExtraInforBarberById(this.props.barberIdFromParent);
      if (res && res.errCode === 0) {
        this.setState({
          extraInfor: res.data,
        });
      }
    }
  }
  showHideDetailInforBarber = (status) => {
    this.setState({
      isShowDetailInfor: status,
    });
  };
  render() {
    let { isShowDetailInfor, extraInfor } = this.state;
    let { language } = this.props;

    return (
      <div className="barber-extra-infor-container">
        <div className="content-up">
          <div className="text-address">
            <FormattedMessage id="customer.detail-barber.text-address" />
          </div>
          <div className="name-branch">
            {extraInfor && extraInfor.nameBranch ? extraInfor.nameBranch : ""}
          </div>
          <div className="detail-address">
            {extraInfor && extraInfor.addressBranch
              ? extraInfor.addressBranch
              : ""}
          </div>
        </div>
        <div className="content-down">
          {isShowDetailInfor === false ? (
            <div>
              <FormattedMessage id="customer.detail-barber.text-price" />
              {extraInfor &&
                extraInfor.priceTypeData &&
                language === LANGUAGES.VI && (
                  <NumberFormat
                    value={extraInfor.priceTypeData.valueVi}
                    suffix={`VND`}
                    thousandSeparator={true}
                    displayType={"text"}
                  />
                )}
              {extraInfor &&
                extraInfor.priceTypeData &&
                language === LANGUAGES.EN && (
                  <NumberFormat
                    value={extraInfor.priceTypeData.valueEn}
                    suffix={`$`}
                    thousandSeparator={true}
                    displayType={"text"}
                  />
                )}
              <div className="hide-price">
                <span onClick={() => this.showHideDetailInforBarber(true)}>
                  <FormattedMessage id="customer.detail-barber.show" />
                </span>
              </div>
            </div>
          ) : (
            <>
              <div className="title-price">
                <FormattedMessage id="customer.detail-barber.text-price" />
              </div>
              <div className="detail-infor">
                <div className="price">
                  <span className="left">
                    <FormattedMessage id="customer.detail-barber.text-price" />
                  </span>
                  <span className="right">
                    {extraInfor &&
                      extraInfor.priceTypeData &&
                      language === LANGUAGES.VI && (
                        <NumberFormat
                          value={extraInfor.priceTypeData.valueVi}
                          suffix={`VND`}
                          thousandSeparator={true}
                          displayType={"text"}
                        />
                      )}
                    {extraInfor &&
                      extraInfor.priceTypeData &&
                      language === LANGUAGES.EN && (
                        <NumberFormat
                          value={extraInfor.priceTypeData.valueEn}
                          suffix={`$`}
                          thousandSeparator={true}
                          displayType={"text"}
                        />
                      )}
                  </span>
                </div>
                <div className="note">
                  {extraInfor && extraInfor.note && language
                    ? extraInfor.note
                    : ""}
                </div>
              </div>
              <div className="payment">
                <FormattedMessage id="customer.detail-barber.payment" />
                {extraInfor &&
                extraInfor.paymentTypeData &&
                language === LANGUAGES.VI
                  ? extraInfor.paymentTypeData.valueVi
                  : extraInfor.paymentTypeData.valueEn}
              </div>
              <div className="hide-price">
                <span onClick={() => this.showHideDetailInforBarber(false)}>
                  <FormattedMessage id="customer.detail-barber.hide" />
                </span>
              </div>
            </>
          )}
        </div>
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(BarberExtraInfor);

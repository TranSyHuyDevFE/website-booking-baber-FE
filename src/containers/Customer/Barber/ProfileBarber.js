import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../../utils";
import "./ProfileBarber.scss";
import { getProfileBarberById } from "../../../services/userService";
import NumberFormat from "react-number-format";
import _ from "lodash";
import localization from "moment/locale/vi";
import moment from "moment";
class ProfileBarber extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataProfile: {},
    };
  }

  async componentDidMount() {
    let data = await this.getInforBarber(this.props.barberId);
    this.setState({
      dataProfile: data,
    });
  }
  getInforBarber = async (id) => {
    let result = {};
    if (id) {
      let res = await getProfileBarberById(id);
      if (res && res.errCode === 0) {
        result = res.data;
      }
      return result;
    }
  };
  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.barberId !== prevProps.barberId) {
      //   this.getInforBarber(this.props.barberId);
    }
  }
  renderTimeBooking = (dataScheduleTimeModal) => {
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

      return (
        <>
          <div>
            {time} - {date}
          </div>
          <div>
            <FormattedMessage id="customer.booking-modal.free-booking" />
          </div>
        </>
      );
    }
    return <></>;
  };
  render() {
    let { dataProfile } = this.state;
    let { language, isShowDescriptionBarber, dataScheduleTimeModal } =
      this.props;
    let nameVi = "";
    let nameEn = "";
    if (dataProfile && dataProfile.positionData) {
      nameVi = `${dataProfile.positionData.valueVi} - ${dataProfile.lastName} ${dataProfile.firstName}`;
      nameEn = `${dataProfile.positionData.valueEn} - ${dataProfile.firstName} ${dataProfile.lastName}`;
    }

    return (
      <div className="profile-barber-container">
        <div className="intro-barber">
          <div
            className="content-left"
            style={{
              backgroundImage: `url(${
                dataProfile && dataProfile.image ? dataProfile.image : ""
              })`,
              backgroundSize: "cover",
            }}
          ></div>
          <div className="content-right">
            <div className="up">
              {language === LANGUAGES.VI ? nameVi : nameEn}
            </div>
            <div className="down">
              {isShowDescriptionBarber === true ? (
                <>
                  {dataProfile &&
                    dataProfile.Markdown &&
                    dataProfile.Markdown.description && (
                      <span>{dataProfile.Markdown.description}</span>
                    )}
                </>
              ) : (
                <>{this.renderTimeBooking(dataScheduleTimeModal)}</>
              )}
            </div>
          </div>
        </div>
        <div className="price">
          <FormattedMessage id="customer.booking-modal.price" />:
          {dataProfile.Barber_Infor && language === LANGUAGES.VI ? (
            <NumberFormat
              value={dataProfile.Barber_Infor.priceTypeData.valueVi}
              suffix={`VND`}
              thousandSeparator={true}
              displayType={"text"}
            />
          ) : (
            ""
          )}
          {dataProfile.Barber_Infor && language === LANGUAGES.EN ? (
            <NumberFormat
              value={dataProfile.Barber_Infor.priceTypeData.valueEn}
              suffix={`$`}
              thousandSeparator={true}
              displayType={"text"}
            />
          ) : (
            ""
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileBarber);

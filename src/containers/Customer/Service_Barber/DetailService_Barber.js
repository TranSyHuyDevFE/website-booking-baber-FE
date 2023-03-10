import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./Detail.scss";
import HomeHeader from "../../HomePage/HomeHeader";
import BarberSchedule from "../Barber/BarberSchedule";
import BarberExtraInfor from "../Barber/BarberExtraInfor";
import ProfileBarber from "../Barber/ProfileBarber";
import Footer from "../../HomePage/Section/Footer";
import {
  getAllDetailServiceById,
  getAllCodeService,
} from "../../../services/userService";
import _ from "lodash";
import { LANGUAGES } from "../../../utils";
class DetailService_Barber extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrBarberId: [],
      dataDetailService: {},
      listProvince: [],
    };
  }
  async componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let id = this.props.match.params.id;
      let res = await getAllDetailServiceById({
        id: id,
        location: "ALL",
      });
      let resProvince = await getAllCodeService("PROVINCE");
      if (
        res &&
        res.errCode === 0 &&
        resProvince &&
        resProvince.errCode === 0
      ) {
        let data = res.data;
        let arrBarberId = [];
        if (data && !_.isEmpty(res.data)) {
          let arrListBarber = data.barberService;
          if (arrListBarber && arrListBarber.length > 0) {
            arrListBarber.map((item) => {
              arrBarberId.push(item.barberId);
            });
          }
        }
        let dataProvince = resProvince.data;

        if (dataProvince && dataProvince.length > 0) {
          dataProvince.unshift({
            createdAt: null,
            keyMap: "ALL",
            type: "PROVINCE",
            valueEn: "ALL",
            valueVi: "Toàn tỉnh",
          });
        }
        this.setState({
          dataDetailService: res.data,
          arrBarberId: arrBarberId,
          listProvince: dataProvince ? dataProvince : [],
        });
      }
    }
  }
  handleOnChangeSelect = async (event) => {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let id = this.props.match.params.id;
      let location = event.target.value;

      let res = await getAllDetailServiceById({
        id: id,
        location: location,
      });
      if (res && res.errCode === 0) {
        let data = res.data;
        let arrBarberId = [];
        if (data && !_.isEmpty(res.data)) {
          let arrListBarber = data.barberService;
          if (arrListBarber && arrListBarber.length > 0) {
            arrListBarber.map((item) => {
              arrBarberId.push(item.barberId);
            });
          }
        }
        this.setState({
          dataDetailService: res.data,
          arrBarberId: arrBarberId,
        });
      }
    }
  };
  async componentDidUpdate(prevProps, prevState, snapshot) {}

  render() {
    let { arrBarberId, dataDetailService, listProvince } = this.state;
    let { language } = this.props;
    console.log(listProvince);
    return (
      <>
        <HomeHeader />
        <div className="detail-service-container">
          <div className="detail-service-body">
            <div className="description-service ">
              {dataDetailService && !_.isEmpty(dataDetailService) && (
                <div
                  dangerouslySetInnerHTML={{
                    __html: dataDetailService.descriptionHTML,
                  }}
                ></div>
              )}
            </div>
            <div className="search-barber-province">
              <select onChange={(event) => this.handleOnChangeSelect(event)}>
                {listProvince &&
                  listProvince.length > 0 &&
                  listProvince.map((item, index) => {
                    return (
                      <option key={index} value={item.keyMap}>
                        {language === LANGUAGES.VI
                          ? item.valueVi
                          : item.valueEn}
                      </option>
                    );
                  })}
              </select>
            </div>
            {arrBarberId &&
              arrBarberId.length > 0 &&
              arrBarberId.map((item, index) => {
                return (
                  <div className="each-barber" key={index}>
                    <div className="mix-content-left">
                      <div className="profile-barber">
                        <ProfileBarber
                          barberId={item}
                          isShowDescriptionBarber={true}
                          isShowLinkDetail={true}
                          isShowPrice={false}
                        />
                      </div>
                    </div>
                    <div className="mix-content-right">
                      <div className="barber-schedule">
                        <BarberSchedule barberIdFromParent={item} />
                      </div>
                      <div className="barber-extra-infor">
                        <div className="barber-extra-infor-container">
                          <BarberExtraInfor barberIdFromParent={item} />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailService_Barber);

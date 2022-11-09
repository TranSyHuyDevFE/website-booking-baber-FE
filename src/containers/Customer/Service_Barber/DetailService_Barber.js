import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./Detail.scss";
import HomeHeader from "../../HomePage/HomeHeader";
import BarberSchedule from "../Barber/BarberSchedule";
import BarberExtraInfor from "../Barber/BarberExtraInfor";
import ProfileBarber from "../Barber/ProfileBarber";
import Footer from "../../HomePage/Section/Footer";
class DetailService_Barber extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrBarberId: [63, 64],
    };
  }
  async componentDidMount() {}
  async componentDidUpdate(prevProps, prevState, snapshot) {}

  render() {
    let { arrBarberId } = this.state;
    return (
      <div className="detail-service-container">
        <HomeHeader />
        <div className="detail-service-body">
          <div className="description-service">Hello world from detail</div>
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
                        // dataScheduleTimeModal={dataScheduleTimeModal}
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

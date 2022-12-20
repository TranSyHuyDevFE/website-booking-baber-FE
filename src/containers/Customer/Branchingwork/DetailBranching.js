import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./DetailBranching.scss";
import HomeHeader from "../../HomePage/HomeHeader";
import BarberSchedule from "../Barber/BarberSchedule";
import BarberExtraInfor from "../Barber/BarberExtraInfor";
import ProfileBarber from "../Barber/ProfileBarber";
import Footer from "../../HomePage/Section/Footer";
import {
  getAllBranchingById,
  getAllCodeService,
} from "../../../services/userService";
import _ from "lodash";
import { LANGUAGES } from "../../../utils";
class DetailBranching extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrBarberId: [],
      dataBranching: {},
    };
  }
  async componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let id = this.props.match.params.id;
      let res = await getAllBranchingById({
        id: id,
      });
      if (res && res.errCode === 0) {
        let data = res.data;
        let arrBarberId = [];
        if (data && !_.isEmpty(res.data)) {
          let arrListBarber = data.barberBranching;
          if (arrListBarber && arrListBarber.length > 0) {
            arrListBarber.map((item) => {
              arrBarberId.push(item.barberId);
            });
          }
        }
        this.setState({
          dataBranching: res.data,
          arrBarberId: arrBarberId,
        });
      }
    }
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {}

  render() {
    let { arrBarberId, dataBranching } = this.state;
    let { language } = this.props;
    return (
      <>
        <HomeHeader />
        <div className="detail-service-container">
          <div className="detail-service-body">
            <div className="description-service ">
              {dataBranching && !_.isEmpty(dataBranching) && (
                <div
                  dangerouslySetInnerHTML={{
                    __html: dataBranching.descriptionHTML,
                  }}
                ></div>
              )}
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailBranching);

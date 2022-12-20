import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../../HomePage/HomeHeader";
import "./DetailBarber.scss";
import { getDetailInforBarber } from "../../../services/userService";
import { LANGUAGES } from "../../../utils";
import BarberSchedule from "./BarberSchedule";
import BarberExtraInfor from "./BarberExtraInfor";
import Footer from "../../HomePage/Section/Footer";
class DetailBarber extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailBarber: {},
      currentBarberId: -1,
    };
  }
  async componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let id = this.props.match.params.id;
      let res = await getDetailInforBarber(id);
      this.setState({
        currentBarberId: id,
      });
      if (res && res.errCode === 0) {
        this.setState({
          detailBarber: res.data,
        });
      }
    }
  }
  componentDidUpdate(prevProps, prevState, snapshot) {}
  render() {
    // console.log("Sy Huy check state", this.state);
    let { detailBarber } = this.state;
    let { language } = this.props;
    let nameVi = "";
    let nameEn = "";
    if (detailBarber && detailBarber.positionData) {
      nameVi = `${detailBarber.positionData.valueVi} - ${detailBarber.lastName} ${detailBarber.firstName}`;
      nameEn = `${detailBarber.positionData.valueEn} - ${detailBarber.firstName} ${detailBarber.lastName}`;
    }
    return (
      <div className="container-barber">
        <HomeHeader isShowBanner={false} />
        <div className="container">
          <div className="barber-container-detail">
            <div className="content-barber-left">
              <h1>{language === LANGUAGES.VI ? nameVi : nameEn}</h1>
              <span>
                {" "}
                {detailBarber &&
                  detailBarber.Markdown &&
                  detailBarber.Markdown.description && (
                    <span>{detailBarber.Markdown.description}</span>
                  )}
              </span>
              <div className="btn-booking">
                <button>
                  Đặt lịch ngay dưới đây
                  <i className="fa-regular fa-hand-point-down"></i>
                </button>
              </div>
            </div>
            <div className="barber-image">
              <img src={detailBarber.image} alt="error" />
            </div>
          </div>
          <div className="schedule-barber">
            <div className="content-left">
              <BarberSchedule barberIdFromParent={this.state.currentBarberId} />
            </div>
            <div className="content-right">
              <BarberExtraInfor
                barberIdFromParent={this.state.currentBarberId}
              />
            </div>
          </div>
          <div className="detail-infor-barber">
            {detailBarber &&
              detailBarber.Markdown &&
              detailBarber.Markdown.contentMarkdown &&
              detailBarber.Markdown.contentHTML && (
                <div
                  dangerouslySetInnerHTML={{
                    __html: detailBarber.Markdown.contentHTML,
                  }}
                ></div>
              )}
          </div>
          <Footer />
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailBarber);

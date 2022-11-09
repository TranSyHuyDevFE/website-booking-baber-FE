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
      <>
        <HomeHeader isShowBanner={false} />
        <div className="container barber-detail-container">
          <div className="intro-barber">
            <div
              className="content-left"
              style={{
                backgroundImage: `url(${
                  detailBarber && detailBarber.image ? detailBarber.image : ""
                })`,
                backgroundSize: "cover",
              }}
            ></div>
            <div className="content-right">
              <div className="up">
                {language === LANGUAGES.VI ? nameVi : nameEn}
              </div>
              <div className="down">
                {detailBarber &&
                  detailBarber.Markdown &&
                  detailBarber.Markdown.description && (
                    <span>{detailBarber.Markdown.description}</span>
                  )}
              </div>
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
          <div className="comment-barber"></div>
          <Footer />
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailBarber);

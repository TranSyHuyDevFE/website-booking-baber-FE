import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { postVerifyBookAppointment } from "../../services/userService";
import HomeHeader from "../HomePage/HomeHeader";
import "./VerifyEmail.scss";
import Typical from "react-typical";
class VerifyEmail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statusVerify: false,
      errCode: 0,
    };
  }
  async componentDidMount() {
    if (this.props.location && this.props.location.search) {
      let urlParams = new URLSearchParams(this.props.location.search);
      let token = urlParams.get("token");
      let barberId = urlParams.get("barberId");
      let res = await postVerifyBookAppointment({
        token: token,
        barberId: barberId,
      });
      if (res && res.errCode === 0) {
        this.setState({
          statusVerify: true,
          errCode: res.errCode,
        });
      } else {
        this.setState({
          statusVerify: true,
          errCode: res && res.errCode ? res.errCode : -1,
        });
      }
    }

    if (this.props.match && this.props.match.params) {
    }
  }
  async componentDidUpdate(prevProps, prevState, snapshot) {}

  render() {
    let { statusVerify, errCode } = this.state;
    return (
      <>
        <HomeHeader isShowBanner={false} />
        {statusVerify === false ? (
          <h1>Loading...</h1>
        ) : (
          <h1 className="title-verify-email">
            {+errCode === 0 ? (
              <Typical
                steps={[
                  "Xác nhận đặt lịch thành công !",
                  4000,
                  "Chúc bạn có 1 trải nghiệm thú vị !!!",
                  5000,
                ]}
                loop={Infinity}
                wrapper="p"
              />
            ) : (
              "Đã xảy ra lỗi hoặc lịch của bạn đã được xác nhận trước đó!"
            )}
          </h1>
        )}
        <div className="picture-intro-verify"></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);

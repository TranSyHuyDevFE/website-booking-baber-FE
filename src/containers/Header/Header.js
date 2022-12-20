import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import * as actions from "../../store/actions";
import Navigator from "../../components/Navigator";
import { adminMenu, barberMenu } from "./menuApp";
import "./Header.scss";
import { LANGUAGES, USER_ROLES } from "../../utils";
import _ from "lodash";
import img1 from "../../assets/images/vietnamicon.png";
import img2 from "../../assets/images/englishicon.png";
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuApp: [],
    };
  }
  handleChangeLanguages = (language) => {
    this.props.changLanguageAppRedux(language);
  };
  componentDidMount() {
    let { userInfo } = this.props;
    let menu = [];
    if (userInfo && !_.isEmpty(userInfo)) {
      let role = userInfo.roleId;
      // console.log(role);
      if (role === USER_ROLES.ADMIN) {
        menu = adminMenu;
      }
      if (role === USER_ROLES.BARBER) {
        menu = barberMenu;
      }
    }
    this.setState({
      menuApp: menu,
    });
  }
  render() {
    const { processLogout, language, userInfo } = this.props;
    return (
      <div id="home" className="header-container">
        <div className="languages">
          <span className="welcome">
            <FormattedMessage id="home-header.welcome" />,{" "}
            {userInfo && userInfo.firstName ? userInfo.firstName : ""}
          </span>
          <span
            className={
              language === LANGUAGES.VI ? "languages-vi active" : "languages-vi"
            }
            onClick={() => this.handleChangeLanguages(LANGUAGES.VI)}
          >
            <img className="icon-img" src={img1} alt="vn" />
          </span>
          <span
            className={
              language === LANGUAGES.EN ? "languages-en active" : "languages-en"
            }
            onClick={() => this.handleChangeLanguages(LANGUAGES.EN)}
          >
            <img className="icon-img" src={img2} alt="en" />
          </span>
          <div
            className="btn btn-logout"
            onClick={processLogout}
            title="Log out"
          >
            <i className="fas fa-sign-out-alt"></i>
          </div>
        </div>
        {/* thanh navigator */}
        <div className="header-tabs-container">
          <Navigator menus={this.state.menuApp} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    userInfo: state.user.userInfo,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    processLogout: () => dispatch(actions.processLogout()),
    changLanguageAppRedux: (language) =>
      dispatch(actions.changeLanguageApp(language)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);

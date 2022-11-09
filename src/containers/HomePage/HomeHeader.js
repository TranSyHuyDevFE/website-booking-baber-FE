import React, { Component } from "react";
import { LANGUAGES } from "../../utils";
import { connect } from "react-redux";
import "../HomePage/HomeHeader.scss";
import { FormattedMessage } from "react-intl";
import Typical from "react-typical";
import BookingHomeModal from "./Customer-Booking/BookingHomeModal";

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { withRouter } from "react-router";
import { changeLanguageApp } from "../../store/actions";
class HomeHeader extends Component {
  changLanguage = (language) => {
    this.props.changLanguageAppRedux(language);
  };
  returnToHome = () => {
    if (this.props.history) {
      this.props.history.push(`/home`);
    }
  };
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  render() {
    let language = this.props.language;

    return (
      <>
        <div className="container-fluid home-header-container">
          <Navbar light expand="md">
            <NavbarBrand
              className="header-logo"
              onClick={() => this.returnToHome()}
            >
              <h3>
                <i className="fa-solid fa-phone"></i>+(84)079123211
                <i className="fa-brands fa-square-facebook"></i>
                <i className="fa-brands fa-square-instagram"></i>
                <i className="fa-brands fa-square-twitter"></i>
              </h3>
            </NavbarBrand>

            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink>
                    <FormattedMessage id="home-header.title1" />
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="#section-specialty">
                    <FormattedMessage id="home-header.title2" />
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="#section-branching">
                    <FormattedMessage id="home-header.title3" />
                  </NavLink>
                </NavItem>
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    <FormattedMessage id="home-header.language" />
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem
                      className={
                        language === LANGUAGES.VI
                          ? "language-vi active"
                          : "language-vi"
                      }
                      onClick={() => this.changLanguage(LANGUAGES.VI)}
                    >
                      Vietnam
                    </DropdownItem>
                    <DropdownItem
                      className={
                        language === LANGUAGES.EN
                          ? "language-en active"
                          : "language-en"
                      }
                      onClick={() => this.changLanguage(LANGUAGES.EN)}
                    >
                      English
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </Nav>
            </Collapse>
          </Navbar>
        </div>

        {this.props.isShowBanner === true && (
          <div className="home-header-banner">
            <div className="content-up">
              <div className="title2">
                <Typical
                  steps={["Barber 2Style Shop", 2000, "Viet Nam", 1000]}
                  loop={Infinity}
                  wrapper="p"
                />
              </div>
              <div className="title1">
                <FormattedMessage id="banner.title2" />
              </div>
              <div className="container review-page">
                <div className="row">
                  <div className="col-3 review-item">
                    <div className="review-item-child">
                      <i className="fa-solid fa-spa"></i>
                      <span>
                        <FormattedMessage id="home-header.pr1" />
                      </span>
                    </div>
                  </div>
                  <div className="col-3 review-item">
                    <div className="review-item-child">
                      <i className="fa-solid fa-scissors"></i>
                      <span>
                        <FormattedMessage id="home-header.pr2" />
                      </span>
                    </div>
                  </div>
                  <div className="col-3 review-item">
                    <div className="review-item-child">
                      <i className="fa-solid fa-mobile-screen-button"></i>
                      <span>
                        {" "}
                        <FormattedMessage id="home-header.pr3" />{" "}
                      </span>
                    </div>
                  </div>
                  <div className="col-3 review-item">
                    <div className="review-item-child">
                      <i className="fa-solid fa-heart"></i>
                      <span>
                        <FormattedMessage id="home-header.pr4" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,

    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HomeHeader)
);

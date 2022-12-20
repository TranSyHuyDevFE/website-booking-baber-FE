import React, { Component } from "react";

import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";

import Slider from "react-slick";
import * as actions from "../../../store/actions";

import { LANGUAGES } from "../../../utils";
import { withRouter } from "react-router";
class OutStandingBarber extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrBarber: [],
    };
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.topBarberRedux !== this.props.topBarberRedux) {
      this.setState({
        arrBarber: this.props.topBarberRedux,
      });
    }
  }
  componentDidMount() {
    this.props.loadTopBarber();
  }
  handleViewDetailBarber = (barber) => {
    // console.log(barber);
    if (this.props.history) {
      this.props.history.push(`/detail-barber/${barber.id}`);
    }
  };
  render() {
    let { language } = this.props;
    let arrBarber = this.state.arrBarber;
    return (
      <>
        <div id="section-specialty" className="section-share section-specialty">
          <div className="section-container">
            <div className="section-header">
              <span className="title-section">
                <FormattedMessage id="homepage.outstanding-barber" />
              </span>
              <hr />
            </div>
            <div className="section-body">
              <Slider {...this.props.settings}>
                {arrBarber &&
                  arrBarber.length > 0 &&
                  arrBarber.map((item, index) => {
                    let imageBase64 = "";
                    if (item.image) {
                      imageBase64 = Buffer.from(item.image, "base64").toString(
                        "binary"
                      );
                    }
                    return (
                      <div
                        key={index}
                        className="card"
                        onClick={() => this.handleViewDetailBarber(item)}
                      >
                        <div className="card-top">
                          <img src={imageBase64} alt="err" />
                          <h1>
                            {language === LANGUAGES.VI
                              ? item.positionData.valueVi
                              : item.positionData.valueEn}
                          </h1>
                        </div>
                        <div className="card-bottom">
                          <h3>
                            {item.lastName} {item.firstName}
                          </h3>
                        </div>
                      </div>
                    );
                  })}
              </Slider>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
    topBarberRedux: state.admin.topBarber,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadTopBarber: () => dispatch(actions.fetchTopBarber()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(OutStandingBarber)
);

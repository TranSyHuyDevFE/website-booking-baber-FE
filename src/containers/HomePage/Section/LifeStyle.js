import React, { Component } from "react";

import { connect } from "react-redux";

import specialtyImg from "../../../assets/branching/mautoc1.jpeg";
import specialtyImg2 from "../../../assets/branching/mautoc2.jpeg";
import specialtyImg3 from "../../../assets/branching/mautoc3.jpeg";
import specialtyImg4 from "../../../assets/branching/mautoc4.jpeg";
import Slider from "react-slick";
class LifeStyle extends Component {
  render() {
    return (
      <div className="section-share section-lifestyle">
        <div className="section-container">
          <div className="section-header">
            <span className="title-section">Các mẫu tóc xu huớng</span>
            <hr />
          </div>
          <div className="section-body">
            <Slider {...this.props.settings}>
              <div className="card">
                <div className="card-top">
                  <img src={specialtyImg} alt="err" />
                </div>
              </div>
              <div className="card">
                <div className="card-top">
                  <img src={specialtyImg2} alt="err" />
                </div>
              </div>
              <div className="card">
                <div className="card-top">
                  <img src={specialtyImg3} alt="err" />
                </div>
              </div>
              <div className="card">
                <div className="card-top">
                  <img src={specialtyImg4} alt="err" />
                </div>
              </div>
            </Slider>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(LifeStyle);

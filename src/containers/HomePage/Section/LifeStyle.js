import React, { Component } from "react";

import { connect } from "react-redux";

import Slider from "react-slick";
import specialtyImg from "../../../assets/branching/shop_baber.jpeg";

class LifeStyle extends Component {
  render() {
    return (
      <div className="section-share section-branching">
        <div className="section-container">
          <div className="section-header">
            <span className="title-section">Đời sống phong cách</span>
            <button className="btn-section">Xem thêm</button>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings}>
              <div className="img-customize section-lifestyle">
                <img src={specialtyImg} alt="error" />
                <div>Tạo kiểu chuyên nghiệp 1</div>
              </div>
              <div className="img-customize section-lifestyle">
                <img src={specialtyImg} alt="error" />
                <div>Tạo kiểu chuyên nghiệp 2</div>
              </div>
              <div className="img-customize section-lifestyle">
                <img src={specialtyImg} alt="error" />
                <div>Tạo kiểu chuyên nghiệp 3</div>
              </div>
              <div className="img-customize section-lifestyle">
                <img src={specialtyImg} alt="error" />
                <div>Tạo kiểu chuyên nghiệp 4</div>
              </div>
              <div className="img-customize section-lifestyle">
                <img src={specialtyImg} alt="error" />
                <div>Tạo kiểu chuyên nghiệp 5</div>
              </div>
              <div className="img-customize section-lifestyle">
                <img src={specialtyImg} alt="error" />
                <div>Tạo kiểu chuyên nghiệp 6</div>
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

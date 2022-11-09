import React, { Component } from "react";

import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";
import specialtyImg2 from "../../../assets/branching/shop_baber.jpeg";
import { getAllServiceBarber } from "../../../services/userService";
import { withRouter } from "react-router";
class Specialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataServiceBarber: [],
    };
  }
  async componentDidMount() {
    let res = await getAllServiceBarber();
    console.log(res);
    if (res && res.errCode === 0) {
      this.setState({
        dataServiceBarber: res.data ? res.data : [],
      });
    }
  }
  handleViewDetailServiceBarber = (item) => {
    if (this.props.history) {
      this.props.history.push(`/detail-service-barber/${item.id}`);
    }
  };
  render() {
    let { dataServiceBarber } = this.state;
    return (
      <>
        <div id="section-service" className="section-share section-service">
          <div className="section-container">
            <div className="section-header">
              <span className="title-section">
                <FormattedMessage id="homepage.serviceBarber" />
              </span>

              <hr />
            </div>
            <div className="section-body">
              <Slider {...this.props.settings}>
                {dataServiceBarber &&
                  dataServiceBarber.length > 0 &&
                  dataServiceBarber.map((item, index) => {
                    return (
                      <div
                        className="card"
                        key={index}
                        onClick={() => this.handleViewDetailServiceBarber(item)}
                      >
                        <div className="card-top">
                          <img src={item.image} alt="err" />
                        </div>
                        <div className="card-bottom">
                          <h3>{item.name}</h3>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Specialty)
);

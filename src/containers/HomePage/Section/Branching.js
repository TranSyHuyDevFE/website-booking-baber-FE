import React, { Component } from "react";

import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";

import Slider from "react-slick";
import * as actions from "../../../store/actions";
import { getAllBranching } from "../../../services/userService";
import { LANGUAGES } from "../../../utils";
import { withRouter } from "react-router";

class Branching extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataBranching: [],
    };
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    // if (prevProps.topBarberRedux !== this.props.topBarberRedux) {
    //   this.setState({
    //     arrBarber: this.props.topBarberRedux,
    //   });
    // }
  }
  async componentDidMount() {
    let res = await getAllBranching();
    if (res && res.errCode === 0) {
      this.setState({
        dataBranching: res.data ? res.data : [],
      });
    }
  }

  handleViewDetailBranching = (branching) => {
    if (this.props.history) {
      this.props.history.push(`/detail-branching/${branching.id}`);
    }
  };

  render() {
    let { dataBranching } = this.state;

    return (
      <>
        <div id="section-branching" className="section-share section-branching">
          <div className="section-container">
            <div className="section-header">
              <span className="title-section">
                <FormattedMessage id="homepage.branching" />
              </span>

              <hr />
            </div>
            <div className="section-body">
              <Slider {...this.props.settings}>
                {dataBranching &&
                  dataBranching.length > 0 &&
                  dataBranching.map((item, index) => {
                    return (
                      <div
                        className="card"
                        key={index}
                        onClick={() => this.handleViewDetailBranching(item)}
                      >
                        <div className="card-top">
                          <img src={item.image} alt="item.name" />
                          <h1></h1>
                        </div>
                        <div className="card-bottom">
                          <h3>{item.name}</h3>
                          <p>{item.address}</p>
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
  connect(mapStateToProps, mapDispatchToProps)(Branching)
);

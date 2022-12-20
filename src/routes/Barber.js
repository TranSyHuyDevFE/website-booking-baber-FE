import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";

import ManageSchedule from "../containers/System/Barber/ManageSchedule";
import Header from "../containers/Header/Header";
import "./Barber.scss";
import ManageCustomer from "../containers/System/Barber/ManageCustomer";
import ManageHistory from "../containers/System/Barber/ManageHistory";
class Barber extends Component {
  render() {
    const { isLoggedIn } = this.props;
    return (
      <div className="container-barber">
        <div className="system-header">{isLoggedIn && <Header />}</div>
        <div className="system-container">
          <div className="system-list">
            <Switch>
              <Route
                path="/barber/manage-schedule"
                component={ManageSchedule}
              />
              <Route
                path="/barber/manage-customer"
                component={ManageCustomer}
              />
              <Route
                path="/barber/manage-customer-history"
                component={ManageHistory}
              />
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    systemMenuPath: state.app.systemMenuPath,
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Barber);

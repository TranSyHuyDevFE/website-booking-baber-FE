import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";

import * as actions from "../../../store/actions";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";

import Select from "react-select";
import "./HomeManage.scss";
import { LANGUAGES, CRUD_ACTIONS } from "../../../utils";
import { getDetailInforBarber } from "../../../services/userService";
import img2 from "../../../assets/branching/shop_baber.jpeg";
import Typical from "react-typical";
const mdParser = new MarkdownIt(/* Markdown-it options */);
class HomeManage extends Component {
  render() {
    return (
      <div className="manage-home-container row">
        <h1 className="title-home">
          <Typical
            steps={["Barber 2Style Shop", 2000, "Have a nice day!", 1000]}
            loop={Infinity}
            wrapper="p"
          />
        </h1>

        <div className="img-home col-12 text-center">
          <img src={img2} alt="" />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    allBarbers: state.admin.allBarbers,
    language: state.app.language,
    allRequiredBarberInfor: state.admin.allRequiredBarberInfor,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllBarbers: () => dispatch(actions.fetchAllBarbers()),
    getAllRequiredBarberInfor: () => dispatch(actions.getRequiredBarberInfor()),
    saveDetailBarber: (data) => dispatch(actions.saveDetailBarber(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeManage);

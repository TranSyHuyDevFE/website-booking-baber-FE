import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";

import * as actions from "../../../store/actions";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import "./ManageBarber.scss";
import Select from "react-select";

import { LANGUAGES, CRUD_ACTIONS } from "../../../utils";
import { getDetailInforBarber } from "../../../services/userService";
const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageBarber extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //save to markdown table
      contentMarkdown: "",
      contentHTML: "",
      selectedOption: "",
      description: "",
      listBarbers: [],
      hasOldData: false,
      //save to barber_info table
      listPrice: [],
      listPayment: [],
      listProvince: [],
      listBranch: [],
      listServiceBarber: [],
      //selected
      selectedPrice: "",
      selectedPayment: "",
      selectedProvince: "",
      selectedBranch: "",
      selectedService: "",
      nameBranch: "",
      addressBranch: "",
      note: "",
      serviceId: "",
      branchId: "",
    };
  }
  componentDidMount() {
    this.props.fetchAllBarbers();
    this.props.getAllRequiredBarberInfor();
  }
  buildDataInputSelect = (inputData, type) => {
    let result = [];
    let { language } = this.props;
    if (inputData && inputData.length > 0) {
      if (type === "USERS") {
        inputData.map((item, index) => {
          let object = {};
          let labelVi = `${item.lastName} ${item.firstName}`;
          let labelEn = `${item.firstName} ${item.lastName}`;
          object.label = language === LANGUAGES.VI ? labelVi : labelEn;
          object.value = item.id;
          result.push(object);
        });
      }
      if (type === "PRICE") {
        inputData.map((item, index) => {
          let object = {};
          let labelVi = `${item.valueVi} VND`;
          let labelEn = `${item.valueEn} USD`;
          object.label = language === LANGUAGES.VI ? labelVi : labelEn;
          object.value = item.keyMap;
          result.push(object);
        });
      }
      if (type === "PAYMENT" || type === "PROVINCE") {
        inputData.map((item, index) => {
          let object = {};
          let labelVi = `${item.valueVi}`;
          let labelEn = `${item.valueEn}`;
          object.label = language === LANGUAGES.VI ? labelVi : labelEn;
          object.value = item.keyMap;
          result.push(object);
        });
      }
      if (type === "SERVICE_BARBER") {
        inputData.map((item, index) => {
          let object = {};
          object.label = item.name;
          object.value = item.id;
          result.push(object);
        });
      }
    }
    return result;
  };
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.allBarbers !== this.props.allBarbers) {
      let dataSelect = this.buildDataInputSelect(
        this.props.allBarbers,
        `USERS`
      );
      this.setState({
        listBarbers: dataSelect,
      });
    }
    if (
      prevProps.allRequiredBarberInfor !== this.props.allRequiredBarberInfor
    ) {
      let { resPayment, resPrice, resProvince, resServiceBarber } =
        this.props.allRequiredBarberInfor;
      let dataSelectPrice = this.buildDataInputSelect(resPrice, "PRICE");
      let dataSelectPayment = this.buildDataInputSelect(resPayment, "PAYMENT");
      let dataSelectProvince = this.buildDataInputSelect(
        resProvince,
        "PROVINCE"
      );
      let dataSelectServiceBarber = this.buildDataInputSelect(
        resServiceBarber,
        "SERVICE_BARBER"
      );

      this.setState({
        listPrice: dataSelectPrice,
        listPayment: dataSelectPayment,
        listProvince: dataSelectProvince,
        listServiceBarber: dataSelectServiceBarber,
      });
    }
    if (prevProps.language !== this.props.language) {
      let dataSelect = this.buildDataInputSelect(
        this.props.allBarbers,
        `USERS`
      );
      let { resPayment, resPrice, resProvince } =
        this.props.allRequiredBarberInfor;
      let dataSelectPrice = this.buildDataInputSelect(resPrice, "PRICE");
      let dataSelectPayment = this.buildDataInputSelect(resPayment, "PAYMENT");
      let dataSelectProvince = this.buildDataInputSelect(
        resProvince,
        "PROVINCE"
      );
      this.setState({
        listBarbers: dataSelect,
        listPrice: dataSelectPrice,
        listPayment: dataSelectPayment,
        listProvince: dataSelectProvince,
      });
    }
  }
  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentMarkdown: text,
      contentHTML: html,
    });
  };
  handleSaveContentMarkDown = () => {
    let { hasOldData } = this.state;

    this.props.saveDetailBarber({
      contentHTML: this.state.contentHTML,
      contentMarkdown: this.state.contentMarkdown,
      description: this.state.description,
      barberId: this.state.selectedOption.value,
      action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,

      selectedPrice: this.state.selectedPrice.value,
      selectedPayment: this.state.selectedPayment.value,
      selectedProvince: this.state.selectedProvince.value,
      nameBranch: this.state.nameBranch,
      addressBranch: this.state.addressBranch,
      note: this.state.note,
      branchId:
        this.state.selectedBranch && this.state.selectedBranch.value
          ? this.state.selectedBranch.value
          : "",
      serviceId: this.state.selectedService.value,
    });
  };
  handleChangeSelect = async (selectedOption) => {
    this.setState({ selectedOption });
    let { listPayment, listPrice, listProvince, listServiceBarber } =
      this.state;
    let response = await getDetailInforBarber(selectedOption.value);
    if (
      response &&
      response.errCode === 0 &&
      response.data &&
      response.data.Markdown
    ) {
      let markdown = response.data.Markdown;
      let addressBranch = "",
        nameBranch = "",
        note = "",
        paymentId = "",
        priceId = "",
        provinceId = "",
        serviceId = "",
        selectedPayment = "",
        selectedPrice = "",
        selectedProvince = "",
        selectedService = "";
      if (response.data.Barber_Infor) {
        addressBranch = response.data.Barber_Infor.addressBranch;
        nameBranch = response.data.Barber_Infor.nameBranch;
        note = response.data.Barber_Infor.note;
        paymentId = response.data.Barber_Infor.paymentId;
        priceId = response.data.Barber_Infor.priceId;
        provinceId = response.data.Barber_Infor.provinceId;
        serviceId = response.data.Barber_Infor.serviceId;
        selectedPayment = listPayment.find((item) => {
          return item && item.value === paymentId;
        });
        selectedPrice = listPrice.find((item) => {
          return item && item.value === priceId;
        });
        selectedProvince = listProvince.find((item) => {
          return item && item.value === provinceId;
        });
        selectedService = listServiceBarber.find((item) => {
          return item && item.value === serviceId;
        });
        // console.log("check find array:", findItem, listPayment, paymentId);
      }
      this.setState({
        contentHTML: markdown.contentHTML,
        contentMarkdown: markdown.contentMarkdown,
        description: markdown.description,
        hasOldData: true,
        addressBranch: addressBranch,
        nameBranch: nameBranch,
        note: note,
        selectedPayment: selectedPayment,
        selectedPrice: selectedPrice,
        selectedProvince: selectedProvince,
        selectedService: selectedService,
      });
    } else {
      this.setState({
        contentHTML: "",
        contentMarkdown: "",
        description: "",
        hasOldData: false,
        addressBranch: "",
        nameBranch: "",
        note: "",
      });
    }
    // console.log("sy huy check option", response);
  };
  handleChangeSelectBarberInfor = async (selectedOption, name) => {
    let stateName = name.name;
    let stateCopy = { ...this.state };
    stateCopy[stateName] = selectedOption;
    this.setState({
      ...stateCopy,
    });
    console.log(selectedOption, stateName);
  };
  handleOnChangeText = (e, id) => {
    let stateCopy = { ...this.state };
    stateCopy[id] = e.target.value;
    this.setState({
      ...stateCopy,
    });
    console.log(stateCopy);
  };
  render() {
    let { hasOldData } = this.state;
    return (
      <div className="manage-barber-container">
        <div className="manage-doctor-title">
          <FormattedMessage id="admin.manage-barber.title" />
        </div>
        <div className="more-info">
          <div className="content-left">
            <label>
              <FormattedMessage id="admin.manage-barber.select-barber" />
            </label>
            <Select
              value={this.state.selectedOption}
              onChange={this.handleChangeSelect}
              options={this.state.listBarbers}
              placeholder={
                <FormattedMessage id="admin.manage-barber.select-barber" />
              }
            />
          </div>
          <div className="content-right">
            <label>
              <FormattedMessage id="admin.manage-barber.intro-barber" />
            </label>
            <textarea
              className="form-control"
              onChange={(e) => this.handleOnChangeText(e, "description")}
              value={this.state.description}
            ></textarea>
          </div>
        </div>
        <div className="more-infor-extra row">
          <div className="col-4 form-group">
            <label>
              <FormattedMessage id="admin.manage-barber.price" />
            </label>
            <Select
              value={this.state.selectedPrice}
              onChange={this.handleChangeSelectBarberInfor}
              options={this.state.listPrice}
              placeholder={<FormattedMessage id="admin.manage-barber.price" />}
              name="selectedPrice"
            />
          </div>
          <div className="col-4 form-group">
            <label>
              <FormattedMessage id="admin.manage-barber.payment" />
            </label>
            <Select
              value={this.state.selectedPayment}
              onChange={this.handleChangeSelectBarberInfor}
              options={this.state.listPayment}
              placeholder={
                <FormattedMessage id="admin.manage-barber.payment" />
              }
              name="selectedPayment"
            />
          </div>
          <div className="col-4 form-group">
            <label>
              <FormattedMessage id="admin.manage-barber.province" />
            </label>
            <Select
              value={this.state.selectedProvince}
              onChange={this.handleChangeSelectBarberInfor}
              options={this.state.listProvince}
              placeholder={
                <FormattedMessage id="admin.manage-barber.province" />
              }
              name="selectedProvince"
            />
          </div>
          <div className="col-4 form-group">
            <label>
              <FormattedMessage id="admin.manage-barber.nameBranch" />
            </label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => this.handleOnChangeText(e, "nameBranch")}
              value={this.state.nameBranch}
            />
          </div>
          <div className="col-4 form-group">
            <label>
              <FormattedMessage id="admin.manage-barber.addressBranch" />
            </label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => this.handleOnChangeText(e, "addressBranch")}
              value={this.state.addressBranch}
            />
          </div>
          <div className="col-4 form-group">
            <label>
              <FormattedMessage id="admin.manage-barber.note" />
            </label>
            <textarea
              type="text"
              className="form-control"
              onChange={(e) => this.handleOnChangeText(e, "note")}
              value={this.state.note}
            />
          </div>
          <div className="col-4 form-group">
            <label>
              <FormattedMessage id="admin.manage-barber.serviceBarber" />
            </label>
            <Select
              className="form-control"
              onChange={this.handleChangeSelectBarberInfor}
              options={this.state.listServiceBarber}
              value={this.state.selectedService}
              name="selectedService"
              placeholder={
                <FormattedMessage id="admin.manage-barber.serviceBarber" />
              }
            />
          </div>
          <div className="col-4 form-group">
            <label>
              <FormattedMessage id="admin.manage-barber.selectedBranch" />
            </label>
            <Select
              type="text"
              className="form-control"
              onChange={this.handleChangeSelectBarberInfor}
              value={this.state.selectedBranch}
              options={this.state.listBranch}
              name="selectedBranch"
              placeholder={
                <FormattedMessage id="admin.manage-barber.serviceBarber" />
              }
            />
          </div>
        </div>
        <div className="manage-doctor-editor mt-2">
          <MdEditor
            style={{ height: "400px" }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={this.handleEditorChange}
            value={this.state.contentMarkdown}
          />
        </div>
        <button
          className={
            hasOldData === true
              ? "save-content-barber"
              : "create-content-barber"
          }
          onClick={() => this.handleSaveContentMarkDown()}
        >
          {hasOldData === true ? (
            <FormattedMessage id="admin.manage-barber.save" />
          ) : (
            <span>
              <FormattedMessage id="admin.manage-barber.add" />
            </span>
          )}
        </button>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageBarber);

import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from "../../../utils";
import * as actions from "../../../store/actions";
import "./UserRedux.scss";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import { createNewUser } from "../../../store/actions/adminAction";
import TableManageUser from "./TableManageUser";
import { toast } from "react-toastify";
class UserRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genderArr: [],
      positionArr: [],
      roleArr: [],
      previewImgURL: "",
      isOpen: false,
      //khai bao state input
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      address: "",
      gender: "",
      position: "",
      role: "",
      avatar: "",

      action: "",
      userEditId: "",
    };
  }

  async componentDidMount() {
    this.props.getGenderStart();
    this.props.getPositionStart();
    this.props.getRoleStart();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.genderRedux !== this.props.genderRedux) {
      let arrGenders = this.props.genderRedux;
      this.setState({
        genderArr: arrGenders,
        gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : "",
      });
    }
    if (prevProps.roleRedux !== this.props.roleRedux) {
      let arrRoles = this.props.roleRedux;
      this.setState({
        roleArr: arrRoles,
        role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : "",
      });
    }
    if (prevProps.positionRedux !== this.props.positionRedux) {
      let arrPositions = this.props.positionRedux;
      this.setState({
        positionArr: arrPositions,
        position:
          arrPositions && arrPositions.length > 0 ? arrPositions[0].keyMap : "",
      });
    }
    if (prevProps.listUsers !== this.props.listUsers) {
      let arrGenders = this.props.genderRedux;
      let arrRoles = this.props.roleRedux;
      let arrPositions = this.props.positionRedux;
      this.setState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
        address: "",
        gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : "",
        position:
          arrPositions && arrPositions.length > 0 ? arrPositions[0].keyMap : "",
        role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : "",
        avatar: "",
        action: CRUD_ACTIONS.CREATE,
        previewImgURL: "",
      });
    }
  }
  handleOnChangeImage = async (e) => {
    let data = e.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      const objectUrl = URL.createObjectURL(file);
      this.setState({
        previewImgURL: objectUrl,
        avatar: base64,
      });
    }
  };
  openPreviewImage = () => {
    if (!this.state.previewImgURL) return;
    this.setState({
      isOpen: true,
    });
  };
  handleSaveUser = () => {
    let isValid = this.checkValidateInput();
    if (isValid === false) return;
    let { action } = this.state;
    if (action === CRUD_ACTIONS.CREATE) {
      //fire redux create user
      this.props.createNewUser({
        email: this.state.email,
        password: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        address: this.state.address,
        phonenumber: this.state.phoneNumber,
        gender: this.state.gender,
        roleId: this.state.role,
        positionId: this.state.position,
        avatar: this.state.avatar,
      });
    }
    if (action === CRUD_ACTIONS.EDIT) {
      //fire redux edit user
      this.props.editUserRedux({
        id: this.state.userEditId,
        email: this.state.email,
        password: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        address: this.state.address,
        phonenumber: this.state.phoneNumber,
        gender: this.state.gender,
        roleId: this.state.role,
        positionId: this.state.position,
        avatar: this.state.avatar,
      });
    }
  };
  checkValidateInput = () => {
    let isValid = true;
    let arrCheck = [
      "email",
      "password",
      "firstName",
      "lastName",
      "phoneNumber",
      "address",
    ];

    for (let i = 0; i < arrCheck.length; i++) {
      if (!this.state[arrCheck[i]]) {
        isValid = false;
        toast.error("this input is required " + arrCheck[i]);
        break;
      }
    }
    return isValid;
  };
  onChangeInput = (e, id) => {
    let copyState = { ...this.state };
    copyState[id] = e.target.value;
    this.setState({
      ...copyState,
    });
  };
  handleEditUserFromParent = (user) => {
    let imageBase64 = "";
    if (user.image) {
      imageBase64 = new Buffer(user.image, "base64").toString("binary");
    }
    this.setState(
      {
        email: user.email,
        password: "Hard code password",
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNumber: user.phonenumber,
        address: user.address,
        gender: user.gender,
        position: user.positionId,
        role: user.roleId,
        avatar: imageBase64,
        previewImgURL: imageBase64,
        action: CRUD_ACTIONS.EDIT,
        userEditId: user.id,
      },
      () => {
        console.log(this.state);
      }
    );
  };
  render() {
    let genders = this.state.genderArr;
    let positions = this.state.positionArr;
    let roles = this.state.roleArr;
    let language = this.props.language;
    let isLoadingGenderReact = this.props.isLoadingGender;
    let {
      email,
      password,
      firstName,
      lastName,
      phoneNumber,
      address,
      gender,
      position,
      role,
    } = this.state;
    // console.log("check props redux", this.props.genderRedux);
    return (
      <div className="user-redux-container">
        <div className="title">
          {" "}
          <FormattedMessage id="manage-user.add" />
        </div>
        {isLoadingGenderReact === true ? "Loading genders" : ""}
        <div className="user-redux-body">
          <div className="container">
            <div className="row">
              <div className="col-12"></div>
              <div className="form-group col-md-6">
                <label>
                  <FormattedMessage id="manage-user.email" />
                </label>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => {
                    this.onChangeInput(e, "email");
                  }}
                  disabled={
                    this.state.action === CRUD_ACTIONS.EDIT ? true : false
                  }
                />
              </div>
              <div className="form-group col-md-6">
                <label>
                  <FormattedMessage id="manage-user.password" />
                </label>
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => {
                    this.onChangeInput(e, "password");
                  }}
                  disabled={
                    this.state.action === CRUD_ACTIONS.EDIT ? true : false
                  }
                />
              </div>
              <div className="form-group col-md-6">
                <label>
                  <FormattedMessage id="manage-user.first-name" />
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={firstName}
                  onChange={(e) => {
                    this.onChangeInput(e, "firstName");
                  }}
                />
              </div>
              <div className="form-group col-md-6">
                <label>
                  <FormattedMessage id="manage-user.last-name" />
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={lastName}
                  onChange={(e) => {
                    this.onChangeInput(e, "lastName");
                  }}
                />
              </div>
              <div className="form-group col-md-3">
                <label>
                  <FormattedMessage id="manage-user.phone-number" />
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={phoneNumber}
                  onChange={(e) => {
                    this.onChangeInput(e, "phoneNumber");
                  }}
                />
              </div>
              <div className="form-group col-md-9">
                <label>
                  <FormattedMessage id="manage-user.address" />
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={address}
                  onChange={(e) => {
                    this.onChangeInput(e, "address");
                  }}
                />
              </div>
            </div>

            <div className="row">
              <div className="form-group col-md-3">
                <label htmlFor="inputState">
                  <FormattedMessage id="manage-user.gender" />
                </label>
                <select
                  id="inputState"
                  className="form-control"
                  value={gender}
                  onChange={(e) => {
                    this.onChangeInput(e, "gender");
                  }}
                >
                  {genders &&
                    genders.length > 0 &&
                    genders.map((item, index) => {
                      return (
                        <option key={index} value={item.keyMap}>
                          {language === LANGUAGES.VI
                            ? item.valueVi
                            : item.valueEn}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="form-group col-md-3">
                <label htmlFor="inputState">
                  <FormattedMessage id="manage-user.role" />
                </label>
                <select
                  id="inputState"
                  className="form-control"
                  value={role}
                  onChange={(e) => {
                    this.onChangeInput(e, "role");
                  }}
                >
                  {roles &&
                    roles.length > 0 &&
                    roles.map((item, index) => {
                      return (
                        <option key={index} value={item.keyMap}>
                          {language === LANGUAGES.VI
                            ? item.valueVi
                            : item.valueEn}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="form-group col-md-3">
                <label htmlFor="inputState">
                  <FormattedMessage id="manage-user.position" />
                </label>
                <select
                  id="inputState"
                  className="form-control"
                  value={position}
                  onChange={(e) => {
                    this.onChangeInput(e, "position");
                  }}
                >
                  {positions &&
                    positions.length > 0 &&
                    positions.map((item, index) => {
                      return (
                        <option key={index} value={item.keyMap}>
                          {language === LANGUAGES.VI
                            ? item.valueVi
                            : item.valueEn}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="form-group col-md-3">
                <label>
                  <FormattedMessage id="manage-user.image" />
                </label>
                <div className="preview-img-container">
                  <input
                    type="file"
                    id="previewImg"
                    hidden
                    onChange={(event) => this.handleOnChangeImage(event)}
                  />
                  <label htmlFor="previewImg" className="label-upload">
                    Tải ảnh <i className="fa-solid fa-upload"></i>
                  </label>
                  <div
                    className="preview-image"
                    style={{
                      backgroundImage: `url(${this.state.previewImgURL})`,
                    }}
                    onClick={() => this.openPreviewImage()}
                  ></div>
                </div>
              </div>
            </div>
            <button
              className={
                this.state.action === CRUD_ACTIONS.EDIT
                  ? "btn btn-warning my-2"
                  : "btn btn-primary my-2"
              }
              onClick={() => this.handleSaveUser()}
            >
              {this.state.action === CRUD_ACTIONS.EDIT ? (
                <FormattedMessage id="manage-user.edit" />
              ) : (
                <FormattedMessage id="manage-user.save" />
              )}
            </button>
          </div>
        </div>
        <TableManageUser
          handleEditUserFromParentKey={this.handleEditUserFromParent}
          action={this.state.action}
        />
        {this.state.isOpen === true && (
          <Lightbox
            mainSrc={this.state.previewImgURL}
            onCloseRequest={() => this.setState({ isOpen: false })}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    genderRedux: state.admin.genders,
    positionRedux: state.admin.positions,
    roleRedux: state.admin.roles,
    isLoadingGender: state.admin.isLoadingGender,
    listUsers: state.admin.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenderStart: () => dispatch(actions.fetchGenderStart()),
    getPositionStart: () => dispatch(actions.fetchPositionStart()),
    getRoleStart: () => dispatch(actions.fetchRoleStart()),
    createNewUser: (data) => dispatch(actions.createNewUser(data)),
    fetchUserRedux: () => dispatch(actions.fetchAllUserStart()),
    editUserRedux: (data) => dispatch(actions.editUser(data)),
    // processLogout: () => dispatch(actions.processLogout()),
    // changLanguageAppRedux: (language) =>
    //   dispatch(actions.changeLanguageApp(language)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);

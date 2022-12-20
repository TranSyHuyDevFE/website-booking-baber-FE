import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";

import * as actions from "../../store/actions";

import "./Login.scss";
import { handleLoginApi } from "../../services/userService";
import img2 from "../../assets/branching/shop_baber.jpeg";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      isShowPassword: false,
      errMessage: "",
    };
  }
  handleOnChangeUserName = (event) => {
    this.setState({
      username: event.target.value,
    });
  };
  handleOnChangePassword = (event) => {
    this.setState({
      password: event.target.value,
    });
  };
  handleLogin = async () => {
    console.log("user&&password:", this.state.username, this.state.password);
    this.setState({
      errMessage: "",
    });
    try {
      let data = await handleLoginApi(this.state.username, this.state.password);
      if (data && data.errCode !== 0) {
        this.setState({
          errMessage: data.message,
        });
      }
      if (data && data.errCode === 0) {
        this.props.userLoginSuccess(data.user);
        console.log("Login succeeds");
      }
    } catch (error) {
      if (error.response) {
        if (error.response.data) {
          this.setState({
            errMessage: error.response.data.message,
          });
        }
      }
    }
  };
  handleShowHidePassword = () => {
    this.setState({
      isShowPassword: !this.state.isShowPassword,
    });
  };
  handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      this.handleLogin();
    }
  };
  render() {
    return (
      <div className="Form">
        <div className="container">
          <div className="row">
            <div className="col-lg-5">
              <img src={img2} className="img-fluid" alt="" />
            </div>
            <div className="col-lg-7 pt-5 px-5">
              <h1 className="fw-bolder py-3">FStyle Barber Shop</h1>
              <h4>Sign into your account</h4>
              <form action="">
                <div className="form-row">
                  <div className="col-lg-7">
                    <input
                      type="text"
                      placeholder="Your email"
                      className="form-control my-3 p-4"
                      value={this.state.username}
                      onChange={(event) => {
                        this.handleOnChangeUserName(event);
                      }}
                    />
                  </div>
                </div>
                <div className="form-row login-input">
                  <div className="col-lg-7">
                    <div className="custom-input-password">
                      <input
                        type={this.state.isShowPassword ? "text" : "password"}
                        placeholder="********"
                        className="form-control my-3 p-4"
                        value={this.state.password}
                        onKeyDown={(event) => {
                          this.handleKeyDown(event);
                        }}
                        onChange={(event) => {
                          this.handleOnChangePassword(event);
                        }}
                      />
                      <b
                        className="icon-hide"
                        onClick={() => {
                          this.handleShowHidePassword();
                        }}
                      >
                        {this.state.isShowPassword ? (
                          <i className="fa-solid fa-eye-slash"></i>
                        ) : (
                          <i className="fa-solid fa-eye"></i>
                        )}
                      </b>
                    </div>
                  </div>
                </div>
                <div className="form-row">
                  <div className="col-lg-7">
                    <button
                      type="button"
                      className="btn1 mt-3 mb-5"
                      onClick={() => {
                        this.handleLogin();
                      }}
                    >
                      Login
                    </button>
                  </div>
                </div>
                <div className="col-12" style={{ color: "red" }}>
                  {this.state.errMessage}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),

    userLoginFail: () => dispatch(actions.userLoginFail()),
    userLoginSuccess: (userInfo) =>
      dispatch(actions.userLoginSuccess(userInfo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

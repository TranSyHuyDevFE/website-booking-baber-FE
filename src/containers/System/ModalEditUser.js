import React, { Component } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

class ModalEditUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address: "",
      phonenumber: "",
    };
  }

  componentDidMount() {
    let { currentUser } = this.props;
    if (currentUser && !_.isEmpty(currentUser)) {
      this.setState({
        id: currentUser.id,
        email: currentUser.email,
        password: "SECRET",
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        address: currentUser.address,
        phonenumber: currentUser.phonenumber,
      });
    }
    // console.log("didmount edit modal", this.props.currentUser);
  }

  toggle = () => {
    this.props.toggleFromParent();
  };
  handleOnChangeInput = (e, id) => {
    let copyState = { ...this.state };
    copyState[id] = e.target.value;
    this.setState({
      ...copyState,
    });
  };
  checkValidateInput = () => {
    let isValid = true;
    let arrInput = Object.keys(this.state);
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        isValid = false;
        alert("missing parameter");
        break;
      }
    }
    return isValid;
  };
  handleSaveUser = () => {
    let isValid = this.checkValidateInput();
    if (isValid === true) {
      this.props.saveUser(this.state);
    }
  };
  render() {
    return (
      <div>
        <Modal
          isOpen={this.props.isOpen}
          modalTransition={{ timeout: 700 }}
          backdropTransition={{ timeout: 1300 }}
          toggle={() => {
            this.toggle();
          }}
          className={"abc"}
          size="lg"
          centered
        >
          <ModalHeader
            toggle={() => {
              this.toggle();
            }}
          >
            Edit User
          </ModalHeader>
          <ModalBody>
            <div className="container">
              <div className="row">
                <form action="/post-crud" method="POST">
                  <div className="form-row">
                    <div className="form-group col-md-12">
                      <label htmlFor="inputEmail4">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        onChange={(event) => {
                          this.handleOnChangeInput(event, "email");
                        }}
                        value={this.state.email}
                      />
                    </div>
                    <div className="form-group col-md-12">
                      <label htmlFor="inputPassword4">Password</label>
                      <input
                        type="password"
                        className="form-control"
                        onChange={(event) => {
                          this.handleOnChangeInput(event, "password");
                        }}
                        value={this.state.password}
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-12">
                      <label htmlFor="inputEmail4">First Name</label>
                      <input
                        type="text"
                        className="form-control"
                        onChange={(event) => {
                          this.handleOnChangeInput(event, "firstName");
                        }}
                        value={this.state.firstName}
                      />
                    </div>
                    <div className="form-group col-md-12">
                      <label htmlFor="inputPassword4">Last Name</label>
                      <input
                        type="text"
                        className="form-control"
                        onChange={(event) => {
                          this.handleOnChangeInput(event, "lastName");
                        }}
                        value={this.state.lastName}
                      />
                    </div>
                  </div>
                  <div className="form-group col-md-12">
                    <label htmlFor="inputAddress">Address</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="1234 Main St"
                      onChange={(event) => {
                        this.handleOnChangeInput(event, "address");
                      }}
                      value={this.state.address}
                    />
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-12">
                      <label htmlFor="inputCity">Phone Number</label>
                      <input
                        type="text"
                        className="form-control"
                        onChange={(event) => {
                          this.handleOnChangeInput(event, "phonenumber");
                        }}
                        value={this.state.phonenumber}
                      />
                    </div>
                    <div className="form-group col-md-3">
                      <label htmlFor="inputState">Gender</label>
                      <select name="gender" className="form-select">
                        <option value={1}>Male</option>
                        <option value={0}>Female</option>
                      </select>
                    </div>
                    <div className="form-group col-md-3">
                      <label htmlFor="inputZip">Role</label>
                      <select name="roleId" className="form-select">
                        <option value={1}>Admin</option>
                        <option value={2}>Barber</option>
                        <option value={3}>Customer</option>
                      </select>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              onClick={() => {
                this.handleSaveUser();
              }}
            >
              Save Changes
            </Button>
            <Button
              color="secondary"
              onClick={() => {
                this.toggle();
              }}
            >
              Close
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);

import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { emitter } from "../../utils/emitter";
class ModalUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address: "",
      phonenumber: "",
    };
    this.listenToEmitter();
  }
  listenToEmitter() {
    emitter.on("EVENT_CLEAR_MODAL_DATA", () => {
      this.setState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        address: "",
        phonenumber: "",
      });
    });
  }
  componentDidMount() {}

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
  handleAddNewUser = () => {
    let isValid = this.checkValidateInput();
    if (isValid === true) {
      this.props.createNewUser(this.state);
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
            Create New User
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
                this.handleAddNewUser();
              }}
            >
              Add
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);

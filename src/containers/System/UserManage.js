import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getAllUsers,
  createNewUserService,
  deleteUserService,
  editUserService,
} from "../../services/userService";
import ModalUser from "./ModalUser";
import ModalEditUser from "./ModalEditUser";
import { emitter } from "../../utils/emitter";
class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrUsers: [],
      isOpenModalUser: false,
      isOpenModalEditUser: false,
      userEdit: {},
    };
  }

  async componentDidMount() {
    let response = await getAllUsers("ALL");
    if (response && response.errCode === 0) {
      this.setState({
        arrUsers: response.users,
      });
    }
  }
  handleAddNewUser = () => {
    this.setState({
      isOpenModalUser: true,
    });
  };
  toggleUserModal = () => {
    this.setState({
      isOpenModalUser: false,
    });
  };
  toggleUserEDitModal = () => {
    this.setState({
      isOpenModalEditUser: false,
    });
  };
  getAllUsersFromReact = async () => {
    let response = await getAllUsers("ALL");
    if (response && response.errCode === 0) {
      this.setState({
        arrUsers: response.users,
      });
    }
  };
  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.arrUsers !== prevState.arrUsers) {
      let response = await getAllUsers("ALL");
      this.setState({
        arrUsers: response.users,
      });
    }
  }
  createNewUser = async (data) => {
    try {
      let response = await createNewUserService(data);
      // console.log(response);
      if (response && response.errMessage) {
        alert(response.errMessage);
      } else {
        await this.getAllUsersFromReact();
        this.setState({
          isOpenModalUser: false,
        });
        emitter.emit("EVENT_CLEAR_MODAL_DATA");
      }
    } catch (error) {
      console.log(error);
    }

    // console.log("check new from child", data);
  };
  handleDeleteUser = async (user) => {
    // console.log("click delete", user);
    try {
      await deleteUserService(user.id);
    } catch (error) {
      console.log(error);
    }
  };
  handleEditUser = async (user) => {
    this.setState({
      isOpenModalEditUser: true,
      userEdit: user,
    });
  };
  handleSaveUser = async (user) => {
    try {
      let response = await editUserService(user);
      // console.log(response);
      if (response && response.errMessage) {
        alert(response.errMessage);
      } else {
        await this.getAllUsersFromReact();
        this.setState({
          isOpenModalEditUser: false,
        });
        emitter.emit("EVENT_CLEAR_MODAL_DATA");
      }
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    let arrUsers = this.state.arrUsers;
    return (
      <div className="text-container">
        <ModalUser
          isOpen={this.state.isOpenModalUser}
          toggleFromParent={this.toggleUserModal}
          createNewUser={this.createNewUser}
        />
        {this.state.isOpenModalEditUser && (
          <ModalEditUser
            isOpen={this.state.isOpenModalEditUser}
            toggleFromParent={this.toggleUserEDitModal}
            currentUser={this.state.userEdit}
            saveUser={this.handleSaveUser}
          />
        )}

        <div className="title">Manage user</div>
        <button
          className="btn btn-primary px-3 mb-4"
          onClick={() => this.handleAddNewUser()}
        >
          ADD New
        </button>
        <table className="table table-striped table-hover table-bordered border-primary ">
          <thead className="table-primary">
            <tr>
              <th scope="col">Email</th>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Address</th>
              <th scope="col">Phone</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {arrUsers &&
              arrUsers.map((item) => {
                return (
                  <tr key={item.id}>
                    <td>{item.email}</td>
                    <td>{item.firstName}</td>
                    <td>{item.lastName}</td>
                    <td>{item.phonenumber}</td>
                    <td>{item.address}</td>
                    <td>
                      <button
                        className="btn btn-success"
                        onClick={() => this.handleEditUser(item)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => this.handleDeleteUser(item)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);

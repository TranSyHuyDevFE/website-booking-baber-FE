import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./ManageBranching.scss";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import { createNewBranchingWorking } from "../../../services/userService";
import Lightbox from "react-image-lightbox";
import { CommonUtils } from "../../../utils";
import { toast } from "react-toastify";
import {
  getAllBranching,
  deleteBranching,
} from "../../../services/userService";
import ModalEditBranching from "./ModalEditBranching";
const mdParser = new MarkdownIt(/* Markdown-it options */);
class ManageBranching extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrBranching: [],
      branchingEdit: {},
      previewImgURL: "",
      imageBase64: "",
      isOpen: false,
      isOpenModalEditUser: false,
      name: "",
      address: "",
      descriptionHTML: "",
      descriptionMarkDown: "",
    };
  }
  async componentDidMount() {
    let response = await getAllBranching();
    if (response && response.errCode === 0) {
      this.setState({
        arrBranching: response.data,
      });
    }
  }
  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.arrBranching !== prevState.arrBranching) {
      let response = await getAllBranching();
      this.setState({
        arrBranching: response.data,
      });
    }
  }

  toggleUserEDitModal = () => {
    this.setState({
      isOpenModalEditUser: false,
    });
  };
  handleOnChangeImage = async (e) => {
    let data = e.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      const objectUrl = URL.createObjectURL(file);
      this.setState({
        previewImgURL: objectUrl,
        imageBase64: base64,
      });
    }
  };
  openPreviewImage = () => {
    if (!this.state.previewImgURL) return;
    this.setState({
      isOpen: true,
    });
  };
  handleOnChangeInput = (event, id) => {
    let stateCopy = { ...this.state };
    stateCopy[id] = event.target.value;
    this.setState({
      ...stateCopy,
    });
  };
  handleEditorChange = ({ html, text }) => {
    this.setState({
      descriptionHTML: html,
      descriptionMarkDown: text,
    });
  };
  handleNewBranching = async () => {
    let res = await createNewBranchingWorking(this.state);
    if (res && res.errCode === 0) {
      toast.success("Thêm mới thành công!");
      this.setState({
        name: "",
        address: "",
        descriptionHTML: "",
        descriptionMarkDown: "",
        previewImgURL: "",
        imageBase64: "",
      });
    } else {
      toast.error("Xin đừng để trống!");
    }
  };
  handleEditBranching = async (branching) => {
    this.setState({
      isOpenModalEditUser: true,
      branchingEdit: branching,
    });
  };

  handleDeleteBranching = async (branching) => {
    try {
      await deleteBranching(branching.id);
      toast.success("Xóa thành công!");
    } catch (error) {
      console.log(error);
      toast.error("Rất tiếc! Đã có lỗi xảy ra!");
    }
  };
  render() {
    let { arrBranching } = this.state;
    return (
      <div className="manage-service-container">
        {this.state.isOpenModalEditUser && (
          <ModalEditBranching
            isOpen={this.state.isOpenModalEditUser}
            toggleFromParent={this.toggleUserEDitModal}
            currentService={this.state.branchingEdit}
          />
        )}
        <div className="ms-title">Quản lí các chi nhánh</div>
        <div className="add-new-service row">
          <div className="col-6 form-group">
            <label>Tên chi nhánh</label>
            <input
              type="text"
              className="form-control"
              value={this.state.name}
              onChange={(event) => this.handleOnChangeInput(event, "name")}
            />
          </div>
          <div className="col-6 form-group">
            <label>Địa chỉ chi nhánh</label>
            <input
              type="text"
              className="form-control"
              value={this.state.address}
              onChange={(event) => this.handleOnChangeInput(event, "address")}
            />
          </div>

          <div className="col-6 form-group">
            <div className="preview-img-service">
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
            {this.state.isOpen === true && (
              <Lightbox
                mainSrc={this.state.previewImgURL}
                onCloseRequest={() => this.setState({ isOpen: false })}
              />
            )}
          </div>
          <MdEditor
            style={{ height: "300px", marginTop: "1rem" }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={this.handleEditorChange}
            value={this.state.descriptionMarkDown}
          />
        </div>
        <div className="col-12">
          <button
            className="btn btn-primary mt-2"
            onClick={() => this.handleNewBranching()}
          >
            Save
          </button>
        </div>
        <div className="container-fluid container-service">
          <table className="table table-bordered table-success mt-2">
            <thead className="table-dark">
              <tr>
                <th>Mã</th>
                <th>Tên chi nhánh</th>
                <th>Địa chỉ</th>
                <th>Hình ảnh</th>
                <th>Tiện ích</th>
              </tr>
            </thead>
            <tbody>
              {arrBranching &&
                arrBranching.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td>{item.address}</td>
                      <td className="img-service-td">
                        <img
                          className="img-service"
                          src={item.image}
                          alt={item.name}
                        />
                      </td>
                      <td>
                        <button
                          onClick={() => this.handleEditBranching(item)}
                          className="btn btn-warning"
                        >
                          <i className="fa-solid fa-pen-to-square"></i>
                        </button>
                        <button
                          onClick={() => this.handleDeleteBranching(item)}
                          className="btn btn-danger mx-3"
                        >
                          <i className="fa-sharp fa-solid fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageBranching);

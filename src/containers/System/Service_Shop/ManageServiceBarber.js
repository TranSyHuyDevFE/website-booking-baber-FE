import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./ManageService.scss";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import { createNewServiceBarber } from "../../../services/userService";
import Lightbox from "react-image-lightbox";
import { CommonUtils } from "../../../utils";
import { toast } from "react-toastify";
import ModalUser from "../ModalUser";
import { emitter } from "../../../utils/emitter";
import {
  getAllServiceBarber,
  deleteServiceBarber,
} from "../../../services/userService";
import ModalEditService from "./ModalEditService";
const mdParser = new MarkdownIt(/* Markdown-it options */);
class ManageService extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrService: [],
      serviceEdit: {},
      previewImgURL: "",
      imageBase64: "",
      isOpen: false,
      isOpenModalEditUser: false,
      name: "",
      descriptionHTML: "",
      descriptionMarkDown: "",
    };
  }
  async componentDidMount() {
    let response = await getAllServiceBarber();
    if (response && response.errCode === 0) {
      this.setState({
        arrService: response.data,
      });
    }
  }
  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.arrService !== prevState.arrService) {
      let response = await getAllServiceBarber();
      this.setState({
        arrService: response.data,
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
  handleNewService = async () => {
    let res = await createNewServiceBarber(this.state);
    if (res && res.errCode === 0) {
      toast.success("Th??m m???i th??nh c??ng!");
      this.setState({
        name: "",
        descriptionHTML: "",
        descriptionMarkDown: "",
        previewImgURL: "",
        imageBase64: "",
      });
    } else {
      toast.error("Xin ?????ng ????? tr???ng!");
    }
  };
  handleEditService = async (service) => {
    this.setState({
      isOpenModalEditUser: true,
      serviceEdit: service,
    });
  };

  handleDeleteService = async (service) => {
    try {
      await deleteServiceBarber(service.id);
      toast.success("X??a th??nh c??ng!");
    } catch (error) {
      console.log(error);
      toast.error("R???t ti???c! ???? c?? l???i x???y ra!");
    }
  };
  render() {
    let { arrService } = this.state;
    return (
      <div className="manage-service-container">
        {this.state.isOpenModalEditUser && (
          <ModalEditService
            isOpen={this.state.isOpenModalEditUser}
            toggleFromParent={this.toggleUserEDitModal}
            currentService={this.state.serviceEdit}
          />
        )}
        <div className="ms-title">Qu???n l?? c??c d???ch v???</div>
        <div className="add-new-service row">
          <div className="col-6 form-group">
            <label>T??n d???ch v???</label>
            <input
              type="text"
              className="form-control"
              value={this.state.name}
              onChange={(event) => this.handleOnChangeInput(event, "name")}
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
                T???i ???nh <i className="fa-solid fa-upload"></i>
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
            onClick={() => this.handleNewService()}
          >
            Save
          </button>
        </div>
        <div className="container-fluid container-service">
          <table className="table table-bordered table-success mt-2">
            <thead className="table-dark">
              <tr>
                <th>M??</th>
                <th>T??n d???ch v???</th>
                <th>H??nh ???nh</th>
                <th>Ti???n ??ch</th>
              </tr>
            </thead>
            <tbody>
              {arrService &&
                arrService.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td className="img-service-td">
                        <img
                          className="img-service"
                          src={item.image}
                          alt={item.name}
                        />
                      </td>
                      <td>
                        <button
                          onClick={() => this.handleEditService(item)}
                          className="btn btn-warning"
                        >
                          <i className="fa-solid fa-pen-to-square"></i>
                        </button>
                        <button
                          onClick={() => this.handleDeleteService(item)}
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageService);

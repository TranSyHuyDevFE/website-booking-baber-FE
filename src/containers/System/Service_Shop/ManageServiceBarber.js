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
const mdParser = new MarkdownIt(/* Markdown-it options */);
class ManageSerivce extends Component {
  constructor(props) {
    super(props);
    this.state = {
      previewImgURL: "",
      isOpen: false,

      name: "",
      imageBase64: "",
      descriptionHTML: "",
      descriptionMarkDown: "",
    };
  }
  async componentDidMount() {}
  async componentDidUpdate(prevProps, prevState, snapshot) {}

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
  handleSaveNewService = async () => {
    let res = await createNewServiceBarber(this.state);
    if (res && res.errCode === 0) {
      toast.success("Add new service succeed!");
    } else {
      toast.error("Something wrong!");
    }
  };
  render() {
    return (
      <div className="manage-service-container">
        <div className="ms-title">Quản lí các dịch vụ</div>

        <div className="add-new-service row">
          <div className="col-6 form-group">
            <label>Tên dịch vụ</label>
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
            onClick={() => this.handleSaveNewService()}
          >
            Save
          </button>
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
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSerivce);

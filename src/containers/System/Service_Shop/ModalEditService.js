import React, { Component } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { CommonUtils } from "../../../utils";
import "./ModalEditService.scss";
import { toast } from "react-toastify";
import { editServiceBarber } from "../../../services/userService";
class ModalEditService extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      descriptionHTML: "",
      previewImgURL: "",
      imageBase64: "",
      changeImageInput: true,
      isOpenModalEditUser: true,
    };
  }
  componentDidMount() {
    let { currentService } = this.props;
    if (currentService && !_.isEmpty(currentService)) {
      this.setState({
        id: currentService.id,
        name: currentService.name,
        image: currentService.image,
        imageBase64: currentService.image,
        previewImgURL: currentService.image,
        descriptionHTML: currentService.descriptionHTML,
      });
    }
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
  handleEditOnChangeImage = async (e) => {
    let data = e.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      const objectUrl = URL.createObjectURL(file);
      this.setState({
        previewImgURL: objectUrl,
        imageBase64: base64,
        changeImageInput: false,
      });
    }
  };
  handleSaveServiceBarber = async () => {
    if (!this.state.name) {
      toast.error("Không được để trống tên dịch vụ!");
      return;
    }
    if (!this.state.descriptionHTML) {
      toast.error("Không được để trống nội dung!");
      return;
    }

    await editServiceBarber(this.state);
    this.toggle();
    toast.success("Thay đổi thành công!");
  };
  render() {
    return (
      <>
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
              Edit Service
            </ModalHeader>
            <ModalBody>
              <div className="container">
                <div className="row">
                  <form>
                    <div className="form-row">
                      <div className="form-group col-md-12">
                        <label htmlFor="inputEmail4">Mã</label>
                        <input
                          type="text"
                          className="form-control"
                          value={this.state.id}
                          disabled
                        />
                      </div>
                      <div className="form-group col-md-12">
                        <label htmlFor="inputPassword4">Tên dịch vụ</label>
                        <input
                          type="text"
                          className="form-control"
                          onChange={(event) => {
                            this.handleOnChangeInput(event, "name");
                          }}
                          value={this.state.name}
                        />
                      </div>
                      <div className="form-group col-md-12">
                        <label htmlFor="inputPassword4">Nội dung</label>
                        <textarea
                          type="text"
                          rows="12"
                          cols="50"
                          className="form-control"
                          onChange={(event) => {
                            this.handleOnChangeInput(event, "descriptionHTML");
                          }}
                          value={this.state.descriptionHTML}
                        />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="col-6 form-group">
                        <div className="preview-img-modal-service">
                          <label className="title-img" htmlFor="">
                            Ảnh hiện tại
                          </label>
                          {this.state.changeImageInput === true ? (
                            <div
                              className="preview-image"
                              style={{
                                backgroundImage: `url(${this.state.image})`,
                              }}
                            ></div>
                          ) : (
                            <div
                              className="preview-image"
                              style={{
                                backgroundImage: `url(${this.state.previewImgURL})`,
                              }}
                            ></div>
                          )}

                          <input
                            type="file"
                            id="preview-Img"
                            hidden
                            onChange={(event) =>
                              this.handleEditOnChangeImage(event)
                            }
                          />
                          <label htmlFor="preview-Img" className="label-upload">
                            Tải ảnh thay thế mới
                            <i className="fa-solid fa-upload"></i>
                          </label>
                        </div>
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
                  this.handleSaveServiceBarber();
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
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditService);

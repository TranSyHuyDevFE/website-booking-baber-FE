import React from "react";
import img7 from "../../../assets/footer_img/cetaphill.jpeg";
import img8 from "../../../assets/footer_img/dabo.jpeg";
import img9 from "../../../assets/footer_img/romano.png";
import img10 from "../../../assets/footer_img/lady-killer.jpeg";
import { FormattedMessage } from "react-intl";
export default function Footer() {
  return (
    <>
      <div className="our-clients">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <div className="client-title">
                <h2 className="project_title">
                  <FormattedMessage id="home-header.support" />
                </h2>
              </div>
            </div>
          </div>
          <div className="client_content">
            <div className="col-lg-4 col-md-12 col-sm-12 col-12 client_item">
              <img src={img7} alt="" />
            </div>
            <div className="col-lg-4 col-md-12 col-sm-12 col-12 client_item">
              <img src={img8} alt="" />
            </div>
            <div className="col-lg-4 col-md-12 col-sm-12 col-12 client_item">
              <img src={img9} alt="" />
            </div>
            <div className="col-lg-4 col-md-12 col-sm-12 col-12 client_item">
              <img src={img10} alt="" />
            </div>
          </div>
        </div>
      </div>
      <footer className="py-5">
        <div
          className="container text-center"
          data-aos="zoom-in"
          data-aos-duration="2000"
        >
          <div className="footer_main">
            <a href="#">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#">
              <i className="fab fa-google-plus-g"></i>
            </a>
            <a href="#">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>

          <div className="footer_title">
            <p>
              © 2022 VanLang University. All rights reserved | Designed by
              SyHuyHaiTrinh
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}

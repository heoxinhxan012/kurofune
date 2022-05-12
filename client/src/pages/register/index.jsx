import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import "./style.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useRegisterUserMutation } from "../../redux/api";

export const Register = () => {
  const [showPass, setPass] = useState(true);
  const [showConfirmPass, setConfirmPass] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [RegisterUser, { data, isError, error, isSuccess }] =
    useRegisterUserMutation();
  let navigation = useNavigate();
  // const authRegister = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const res = await axios.post(
  //       "http://localhost:5000/api/v1/auth/register",
  //       {
  //         username: username,
  //         password: password,
  //       }
  //     );

  //     localStorage.setItem(
  //       "register",
  //       JSON.stringify({
  //         register: res.data.success,
  //       })
  //     );

  //     navigation("/login");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    if (isSuccess) {
      localStorage.setItem(
        "register",
        JSON.stringify({
          register: data.success,
        })
      );

      navigation("/login");
    }

    if (isError) {
      console.log("Khong the dang ky!");
    }
  }, [data, isError]);

  const authRegister = async (e) => {
    e.preventDefault();
    await RegisterUser({ username, password });
  };
  return (
    <div className="register-container">
      <div className="header-register">
        <h4 className="title">Đăng ký</h4>
        <p>Vui lòng hoàn thành để tạo tài khoản của bạn</p>
      </div>
      <form id="registerForm" onSubmit={authRegister}>
        <div className="row">
          <div className="form-group">
            <label htmlFor="UserName">Tên người dùng</label>
            <input
              type="text"
              className="form-control-auth"
              id="UserName"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="Password">Mật khẩu</label>
            <input
              type={showPass ? "password" : "text"}
              className="form-control-auth"
              id="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="show-pass" onClick={() => setPass(!showPass)}>
              <FontAwesomeIcon
                icon={showPass ? faEyeSlash : faEye}
                color="#515151"
                size="sm"
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Nhập lại mật khẩu vừa tạo</label>
            <input
              type={showConfirmPass ? "password" : "text"}
              className="form-control-auth"
              id="confirmPassword"
            />
            <div
              className="show-pass"
              onClick={() => setConfirmPass(!showConfirmPass)}
            >
              <FontAwesomeIcon
                icon={showConfirmPass ? faEyeSlash : faEye}
                color="#515151"
                size="sm"
              />
            </div>
          </div>
        </div>

        <button className="btn btn-primary d-block m-auto">Đăng ký</button>
      </form>

      <div className="d-flex justify-content-center note">
        <Link to="/login">Bạn đã có tài khoản ? Đăng nhập</Link>
      </div>
    </div>
  );
};

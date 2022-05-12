import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./style.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useLoginUserMutation } from "../../redux/api";
export const Login = () => {
  const [show, setShow] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [LoginUser, { data, isError, error, isSuccess }] =
    useLoginUserMutation();
  let navigate = useNavigate();

  localStorage.setItem(
    "login",
    JSON.stringify({
      isLogin: false,
    })
  );

  useEffect(() => {
    if (isSuccess) {
      localStorage.setItem(
        "login",
        JSON.stringify({
          isLogin: true,
          token: data.accessToken,
        })
      );
      navigate("/");
    }
    if (isError) {
      localStorage.setItem(
        "login",
        JSON.stringify({
          isLogin: false,
        })
      );
    }
  }, [data, isError]);

  const AuthLogin = async (e) => {
    e.preventDefault();
    await LoginUser({ username, password });
  };
  // localStorage.setItem(
  //   "login",
  //   JSON.stringify({
  //     isLogin: false,
  //   })
  // );

  // const AuthLogin = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const res = await axios.post("http://localhost:5000/api/v1/auth/login", {
  //       username,
  //       password,
  //     });

  //     localStorage.setItem(
  //       "login",
  //       JSON.stringify({
  //         isLogin: res.data.success,
  //         token: res.data.accessToken,
  //       })
  //     );
  //     navigate("/");
  //   } catch (error) {
  //     localStorage.setItem(
  //       "login",
  //       JSON.stringify({
  //         isLogin: false,
  //       })
  //     );
  //     console.log(error.message);
  // }
  // };

  return (
    <>
      <div content="Login" title="Login" />
      <h4 className="title">Đăng nhập</h4>
      <form id="loginForm" onSubmit={AuthLogin}>
        <div className="form-group">
          <label htmlFor="UserName">Tên đăng nhập</label>
          <input
            type="text"
            className="form-control-auth"
            id="UserName"
            onChange={(e) => setUsername(e.target.value)}
          />
          <img
            className="icon-input"
            src="https://pharma.its-globaltek.com/wp-content/themes/pharmacy/assets/imgs/icon/ic-user.png"
            alt=""
          />
        </div>
        <div className="form-group">
          <label htmlFor="Password">Mật khẩu</label>
          <input
            type={show ? "password" : "text"}
            className="form-control-auth"
            id="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <img
            className="icon-input"
            src="https://pharma.its-globaltek.com/wp-content/themes/pharmacy/assets/imgs/icon/ic-key.png"
            alt=""
          />
          <div className="show-pass" onClick={() => setShow(!show)}>
            <FontAwesomeIcon
              icon={show ? faEyeSlash : faEye}
              color="#515151"
              size="sm"
            />
          </div>
        </div>

        <div className="d-flex justify-content-between remember-block">
          <div className="checkbox-remember">
            <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />
            <label htmlFor="vehicle1">Ghi nhớ</label>
          </div>
          <Link
            to="member/lostpassword"
            className="text-decoration-none text-forgot"
          >
            Quên mật khẩu
          </Link>
        </div>
        <button className="btn btn-primary d-block m-auto">Đăng nhập</button>
      </form>

      <div className="d-flex justify-content-center note">
        <Link to="/register">Bạn chưa có tài khoản ? Đăng ký tại đây</Link>
      </div>
      <div className="dropdown-language-menu">
        <span className="footer-text">@Kurofune 2022</span>
      </div>
    </>
  );
};

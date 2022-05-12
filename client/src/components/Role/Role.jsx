import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import "./role.css";
import axios from "axios";
import { Button, Modal, FormControl } from "react-bootstrap";
import InputGroup from "react-bootstrap/InputGroup";
import logo from "./image/logo.jpg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
function Role({ setPerList, perList }) {
  const baseURL = "https://62676aa478638336421f2ebf.mockapi.io/role";
  const [role, setRole] = useState("");
  const [create, setCreate] = useState("");
  const [roleId, setRoleId] = useState("");

  // State Modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

  let navigate = useNavigate();

  let checked = JSON.parse(localStorage.getItem("login"));

  const getList = async () => {
    try {
      const res = await axios.get(baseURL);
      setRole(res.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getList();
  }, [perList]);

  const handleModal = () => {
    createRole();
    handleClose();
  };
  const handleDelet = () => {
    deleteRole();
    handleClose2();
    toast.error("👩🏿‍❤️‍💋‍👨🏼 Xóa thành công!", {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const createRole = async () => {
    if (create == "") {
      setShow(false);
      toast.warn("🦄 Thêm không thành công!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    let roleNameSake = role.map((item) => item.rolename);
    if (roleNameSake.includes(create)) {
      setShow(false);
      toast.warn("🦄 Thêm không thành công!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    try {
      await instancePost.post(baseURL, {
        rolename: create,
      });
      getList();
      toast.success("💝 Thêm thành công!", {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const deleteRole = async () => {
    await instancePost.delete(`${baseURL}/${roleId}`);
    getList();
    setRoleId("");
  };
  useEffect(() => {
    if (role) {
      setPerList(role.find((item) => item.id === roleId));
    }
  }, [roleId]);

  const instancePost = axios.create();
  instancePost.interceptors.request.use(
    async (config) => {
      const { exp } = jwt_decode(checked.token);
      const expirationTime = exp * 1000;
      let currenDate = Date.now();
      if (currenDate >= expirationTime) {
        navigate("/login");
        localStorage.clear();
        alert("Hết hạn đăng nhập rồi bạn ơi!");
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const handleLogout = () => {
    setTimeout(() => {
      localStorage.setItem(
        "login",
        JSON.stringify({
          isLogin: false,
        })
      );
      navigate("/login");
    }, 500);
  };
  return (
    <div className="role">
      <div className="role-tab">
        <img src={logo} alt="" className="logo-img" />
        <div className="role-select">
          <Form.Select
            aria-label="Default select example"
            value={roleId}
            onChange={(e) => setRoleId(e.target.value)}
          >
            <option value="">Hãy chọn giá đúng</option>
            {role
              ? role.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.rolename}
                  </option>
                ))
              : "Khong co du lieu"}
          </Form.Select>
        </div>
        <div className="role-btn">
          <div className="role-btn-show">
            <button variant="primary" onClick={handleShow}>
              <i className="fa-solid fa-plus"></i>
            </button>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Thêm mới Role</Modal.Title>
              </Modal.Header>
              <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">Role</InputGroup.Text>
                <FormControl
                  placeholder="Nhập Role mới..."
                  onChange={(e) => setCreate(e.target.value)}
                />
              </InputGroup>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Đóng
                </Button>
                <button className="btn-pre" onClick={handleModal}>
                  Lưu
                </button>
              </Modal.Footer>
            </Modal>
          </div>
          <div className="role-btn-show">
            <button variant="primary" onClick={handleShow2}>
              <i className="fa-solid fa-trash-can"></i>
            </button>
            <Modal show={show2} onHide={handleClose2}>
              <Modal.Header closeButton>
                <Modal.Title>Bạn có muốn xóa Role này không?</Modal.Title>
              </Modal.Header>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose2}>
                  Không
                </Button>
                <button className="btn-pre" onClick={handleDelet}>
                  Có
                </button>
              </Modal.Footer>
            </Modal>
          </div>
          <div className="role-btn-show">
            <button
              variant="primary"
              onClick={handleLogout}
              style={{ color: "#fff" }}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Role;

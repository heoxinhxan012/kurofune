import axios from "axios";
import React, { useState, useEffect } from "react";
import { ListGroup, Form } from "react-bootstrap";
import "./premission.css";
import { Button, Modal, FormControl } from "react-bootstrap";
import InputGroup from "react-bootstrap/InputGroup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

function Premisstion({ perList, setPerList }) {
  const baseURL = "https://62676aa478638336421f2ebf.mockapi.io/premission";
  const baseURL2 = "https://62676aa478638336421f2ebf.mockapi.io/role";
  const [pre, setPre] = useState("");
  const [createPre, setCreatePre] = useState("");
  const [updatePre, setUpdatePre] = useState("");
  const [preId, setPreId] = useState("");
  const [nameVal, setNameVal] = useState("");

  // State Modal
  const [show3, setShow3] = useState(false);
  const handleClose3 = () => setShow3(false);
  const handleShow3 = () => setShow3(true);

  const [show4, setShow4] = useState(false);
  const handleClose4 = () => setShow4(false);
  const handleShow4 = () => setShow4(true);

  const [show5, setShow5] = useState(false);
  const handleClose5 = () => setShow5(false);
  const handleShow5 = () => setShow5(true);

  let navigate = useNavigate();

  let checked = JSON.parse(localStorage.getItem("login"));

  const getPre = async () => {
    try {
      const res = await axios.get(baseURL);
      setPre(res.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getPre();
  }, []);

  const handleCreatePre = async () => {
    if (createPre == "") {
      setShow3(false);
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
    let perNameSake = pre.map((item) => item.prename);
    if (perNameSake.includes(createPre)) {
      setShow3(false);
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
        prename: createPre,
      });
      getPre();
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

  const handleCreateModal = () => {
    handleClose3();
    handleCreatePre();
  };

  const handleUpdatePre = async () => {
    await instancePost.put(`${baseURL}/${preId}`, {
      prename: updatePre,
    });
    getPre();
  };

  const handleUpdateModal = () => {
    handleClose4();
    handleUpdatePre();
    toast.info("💘 Cập nhật thành công!", {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const handleDeletePre = async () => {
    await instancePost.delete(`${baseURL}/${preId}`);
    getPre();
    setPreId("");
  };

  const handleDeleteModal = () => {
    handleDeletePre();
    handleClose5();
    toast.error("💖 Xóa thành công!", {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const checkPreList = (id) => {
    return perList?.perList.find((per) => per === id) ? true : false;
  };

  const handleOnChangeCheck = (event, id) => {
    if (event.target.checked) {
      setPerList({ ...perList, perList: [...perList.perList, id] });
    } else
      setPerList({
        ...perList,
        perList: perList.perList.filter((per) => per !== id),
      });
  };

  const savePreApi = async () => {
    try {
      await axios.put(`${baseURL2}/${perList.id}`, {
        perList: perList.perList,
      });
      toast("❣️ Save thành công!", {
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
  console.log(nameVal);

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
  return (
    <div className="premission">
      <div className="pre-create-pre">
        <button
          className="btn-pre btn-cre-item"
          variant="primary"
          onClick={handleShow3}
        >
          <i className="fa-solid fa-plus"></i>
        </button>
        <Modal show={show3} onHide={handleClose3}>
          <Modal.Header closeButton>
            <Modal.Title>Thêm mới Premission</Modal.Title>
          </Modal.Header>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">Premission</InputGroup.Text>
            <FormControl
              placeholder="Nhập Premission mới..."
              onChange={(e) => setCreatePre(e.target.value)}
            />
          </InputGroup>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose3}>
              Đóng
            </Button>
            <button
              className="btn-pre"
              onClick={() => {
                handleCreateModal();
              }}
            >
              Lưu
            </button>
          </Modal.Footer>
        </Modal>
        <h3>Permission</h3>
      </div>
      <ListGroup>
        {pre
          ? pre.map((item) => (
              <div key={item.id} className="pre-list">
                <div className="per-list-item">
                  <ListGroup.Item className="list">
                    <Form.Check
                      aria-label="option 1"
                      value={item}
                      className="list-item"
                      checked={checkPreList(item.id)}
                      onChange={(event) => handleOnChangeCheck(event, item.id)}
                    />
                    {item.prename}
                    <div className="list-btn">
                      <button
                        className="btn-pre btn-right"
                        variant="primary"
                        onClick={() => {
                          handleShow4();
                          setPreId(item.id);
                          setNameVal(item);
                        }}
                      >
                        <i className="fa-solid fa-pen-to-square"></i>
                      </button>
                      <button
                        className="btn-pre"
                        variant="primary"
                        onClick={() => {
                          handleShow5();
                          setPreId(item.id);
                        }}
                      >
                        <i className="fa-solid fa-trash-can"></i>
                      </button>
                    </div>
                  </ListGroup.Item>
                </div>
              </div>
            ))
          : "Khong co du lieu!"}
        <Modal show={show4} onHide={handleClose4}>
          <Modal.Header closeButton>
            <Modal.Title>Sửa Premission</Modal.Title>
          </Modal.Header>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">Premission</InputGroup.Text>
            <FormControl
              onChange={(e) => setUpdatePre(e.target.value)}
              defaultValue={nameVal.prename}
            />
          </InputGroup>
          <p>Lưu ý: Sẽ Update trên tất cả các Role khác!</p>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose4}>
              Đóng
            </Button>
            <button className="btn-pre" onClick={handleUpdateModal}>
              Lưu
            </button>
          </Modal.Footer>
        </Modal>

        <Modal show={show5} onHide={handleClose5}>
          <Modal.Header closeButton>
            <Modal.Title>Bạn có muốn xóa Permission này không?</Modal.Title>
          </Modal.Header>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose5}>
              Không
            </Button>
            <button className="btn-pre" onClick={handleDeleteModal}>
              Có
            </button>
          </Modal.Footer>
        </Modal>
      </ListGroup>
      <button className="btn-pre save" onClick={savePreApi}>
        Save
      </button>
      <ToastContainer />
    </div>
  );
}

export default Premisstion;

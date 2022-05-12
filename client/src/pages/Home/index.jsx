import React, { useState, useEffect } from "react";
import Role from "../../components/Role/Role";
import Premisstion from "../../components/Premission/Premission";
import { Navigate } from "react-router-dom";
const Home = () => {
  const [perList, setPerList] = useState();
  let checked = JSON.parse(localStorage.getItem("login"));

  return checked?.isLogin ? (
    <div>
      <Role setPerList={setPerList} perList={perList} />
      <Premisstion perList={perList} setPerList={setPerList} />
    </div>
  ) : (
    // Navigate("/login")
    <Navigate to={"/login"} />
  );
};

export default Home;

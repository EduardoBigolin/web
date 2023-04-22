import React from "react";
import Header from "../components/Header";
import { Link } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const navigate = useNavigate();
  return (
    <>
      <Header />
      <h1>Home</h1>
      <ul>
        <li>
          <Link onClick={() => navigate("../class")}>CRUD Class</Link>
        </li>
        <li>
          <Link onClick={() => navigate("../users")}>CRUD Users</Link>
        </li>
        <li>
          <Link onClick={() => navigate("../card")}>Cartão</Link>
        </li>
      </ul>
    </>
  );
};

export default Home;

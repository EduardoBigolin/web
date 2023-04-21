import React from "react";
import Header from "../components/Header";
import { Link } from "@mui/material";

const Home: React.FC = () => {
  return (
    <>
      <Header />
      <h1>Home</h1>
      <ul>
        <li>
          <Link href="/class">CRUD Class</Link>
        </li>
        <li>
          <Link href="/users">CRUD Users</Link>
        </li>
        <li>
          <Link href="/card">Cartão</Link>
        </li>
      </ul>
    </>
  );
};

export default Home;

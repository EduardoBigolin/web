// import { Container } from './styles';

import { Link } from "@mui/material";

const Classes = () => {
  return (
    <ul>
      <li>
        <Link underline="hover" color="inherit" href="/">
          Home
        </Link>
      </li>
      <li>
        <Link underline="hover" color="inherit" href="/class/educationLevel">
          Education Level
        </Link>
      </li>
      <li>
        <Link underline="hover" color="inherit" href="/class/course">
          Course
        </Link>
      </li>
      <li>
        <Link underline="hover" color="inherit" href="/class/classRoom">
          Class Room
        </Link>
      </li>
    </ul>
  );
};

export default Classes;

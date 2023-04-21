import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Breadcrumbs, Button, Typography } from "@mui/material";
import Link from "@mui/material/Link";
import axios from "axios";
import { useAuthHeader } from "react-auth-kit";

interface Classes {
  id: string;
  name: string;
}

export default function Course() {
  const authHeader = useAuthHeader();
  const [rows, setRows] = React.useState<Classes[]>([]);

  React.useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/course", {
        headers: {
          Authorization: `${authHeader()}`,
        },
      })
      .then((response) => {
        setRows(response.data.message);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <>
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/">
          Home
        </Link>
        <Link underline="hover" color="inherit" href="/class">
          Class
        </Link>
        <Typography color="text.primary">Course</Typography>
      </Breadcrumbs>
      <br />
      <Button variant="contained">Criar</Button>
      <br />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ "&": { display: "flex", gap: 2 } }}
                >
                  <Button variant="outlined" color="success">
                    Alter
                  </Button>
                  <Button variant="outlined" color="error">
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

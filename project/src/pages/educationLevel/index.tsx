import {
  Breadcrumbs,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import axios, { AxiosError } from "axios";
import * as React from "react";
import { useAuthHeader } from "react-auth-kit";

interface Classes {
  id: string;
  name: string;
}

interface EducationalLevelProps {
  name: string;
}

const initialFormData = {
  name: "",
};

export default function EducationLevel() {
  const authHeader = useAuthHeader();
  const [isAlter, setIsAlter] = React.useState(false);
  const [formData, setFormData] = React.useState<EducationalLevelProps>(initialFormData);
  const [rows, setRows] = React.useState<Classes[]>([]);
  const [open, setOpen] = React.useState(false);

  function resetFormData() {
    setFormData(initialFormData);
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function handleSubmit() {
    axios
      .post(
        "http://localhost:3000/api/v1/educationLevel/create",
        { name: formData.name },
        {
          headers: {
            Authorization: `${authHeader()}`,
          },
        }
      )
      .then(
        (response) => {
          console.log(response);
        },
        (error: AxiosError) => {
          console.log(error);
        }
      );
    setIsAlter(true);
    handleClose();
    resetFormData();
  }

  // async function handleAlter(id: string, data: EducationalLevelProps) {
  //   axios
  //     .put(`http://localhost:3000/api/v1/educationLevel/${id}`, data, {
  //       headers: {
  //         Authorization: `${authHeader()}`,
  //       },
  //     })
  //     .then(
  //       (response) => {
  //         console.log(response);
  //       },
  //       (error: AxiosError) => {
  //         console.log(error);
  //       }
  //     );

  //   setIsAlter(true);
  //   resetFormData();
  // }

  // async function handleDelete(id: string) {
  //   axios
  //     .delete(`http://localhost:3000/api/v1/educationLevel/delete/${id}`, {
  //       headers: {
  //         Authorization: `${authHeader()}`,
  //       },
  //     })
  //     .then(
  //       (response) => {
  //         console.log(response);
  //       },
  //       (error: AxiosError) => {
  //         console.log(error);
  //       }
  //     );
  //   setIsAlter(true);
  //   resetFormData();
  // }

  React.useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/educationLevel", {
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
    setIsAlter(false);
  }, [isAlter]);

  return (
    <>
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/">
          Home
        </Link>
        <Link underline="hover" color="inherit" href="/class">
          Class
        </Link>
        <Typography color="text.primary">EducationLevel</Typography>
      </Breadcrumbs>
      <br />
      <Button variant="contained" onClick={handleClickOpen}>
        Criar
      </Button>
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
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Criar Nível de Ensino</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Nome"
            type="text"
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleSubmit}>Criar</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

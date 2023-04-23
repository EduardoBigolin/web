import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Breadcrumbs,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import Link from "@mui/material/Link";
import axios, { AxiosError } from "axios";
import { useAuthHeader } from "react-auth-kit";

interface Classes {
  id: string;
  name: string;
}

interface User {
  id: string;
  name: string;
  email:string;
  dateOfBirth: string;
  isAdmin: boolean;
  photoFile: string;
  classId: string;
  class: {
    name: string;
    Couser: {
      name: string
    }
  }
}

const initialFormData = {
  id: '',
  name: '',
  email:'',
  dateOfBirth: '',
  isAdmin: false,
  photoFile: '',
  classId: '',
  class: {
    name: '',
    Couser: {
      name: '',
    },
  },
};

export default function ClassRoom() {
  const authHeader = useAuthHeader();
  const [rows, setRows] = React.useState<User[]>([]);
  const [classes, setClasses] = React.useState<Classes[]>([]);
  const [formData, setFormData] =
    React.useState<User>(initialFormData);
  const [isAlter, setIsAlter] = React.useState(false);
  const [alter, setAlter] = React.useState(false);
  const [pass, setPass] = React.useState<string>('')
  const [file, setFile] = React.useState<File | null | undefined>()

  function resetFormData() {
    setFormData(initialFormData);
    setAlter(false);
    setPass('')
  }

  async function handleSubmit() {
    axios
      .post(
        "http://localhost:3000/api/v1/user/create",
        {
          name: formData.name,
          dateOfBirth: formData.dateOfBirth,
          email: formData.email,
          password: pass,
          classId: formData.classId,
          photoFile: file,
        },
        {
          headers: {
            Authorization: `${authHeader()}`,
            "Content-Type": "multipart/form-data",
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

  function formUpdate(data: User) {
    setFormData(data);
    setAlter(true);
    handleClickOpen();
  }

  async function handleAlter(
    id: string,
    data: {
      name: string,
      dateOfBirth: string
      email: string,
      password: string,
      classId: string,
      photoFile: File | null | undefined,
    },
  ) {
    axios
      .put(`http://localhost:3000/api/v1/user/alter/${id}`, data, {
        headers: {
          Authorization: `${authHeader()}`,
        },
      })
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

  async function handleDelete(id: string) {
    console.log("delete");

    axios
      .delete(`http://localhost:3000/api/v1/user/delete/${id}`, {
        headers: {
          Authorization: `${authHeader()}`,
        },
      })
      .then(
        (response) => {
          console.log(response);
        },
        (error: AxiosError) => {
          console.log(error);
        }
      );
    setIsAlter(true);
    resetFormData();
  }

  React.useEffect(() => {
    authHeader;
    axios
      .get("http://localhost:3000/api/v1/classroom", {
        headers: {
          Authorization: `${authHeader()}`,
        },
      })
      .then((response) => {
        setClasses(response.data.message);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get("http://localhost:3000/api/v1/user", {
        headers: {
          Authorization: `${authHeader()}`,
        },
      })
      .then((response) => {
        setRows(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    setIsAlter(false);
  }, [isAlter]);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    resetFormData();
  };

  return (
    <div className="container">
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/">
          Home
        </Link>
        <Typography color="text.primary">User</Typography>
      </Breadcrumbs>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Imagem</TableCell>
              <TableCell align="left">Nome</TableCell>
              <TableCell align="left">E-mail</TableCell>
              <TableCell align="left">Data de Nascimento</TableCell>
              <TableCell align="left">Turma</TableCell>
              <TableCell align="right">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <img className="userImg" src={"data:image/jpeg;base64, " + row.photoFile} alt="" />
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.email}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.dateOfBirth}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.class.name} de {row.class.Couser.name}
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ "&": { display: "flex", gap: 2 } }}
                >
                  <Button
                    onClick={() => formUpdate(row)}
                    variant="outlined"
                    color="success"
                  >
                    Alter
                  </Button>
                  <Button
                    onClick={() => handleDelete(row.id)}
                    variant="outlined"
                    color="error"
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button variant="outlined" onClick={handleClickOpen}>
        Adicionar
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            value={formData.name}
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="E-mail"
            type="email"
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            value={formData.email}
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Senha"
            type="text"
            onChange={(e) => setPass(e.target.value)}
            value={pass}
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            type="date"
            onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value})}
            value={formData.dateOfBirth}
            fullWidth
            variant="standard"
          />
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">class</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={formData.classId}
              label="Class"
              onChange={(e) =>
                setFormData({ ...formData, classId: e.target.value })
              }
            >
              {classes.map((c: Classes) => (
                <MenuItem value={c.id}>{c.name}</MenuItem>
              ))}
            </Select>
            {alter ? ""
            : (<Button variant="contained" component="label">
              Upload
              <input hidden accept="image/*" multiple type="file" onChange={(e) => setFile(e.target.files[0])} />
            </Button>)}
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={
              alter
                ? () =>
                    handleAlter(formData.id, {
                      name: formData.name,
                      dateOfBirth: formData.dateOfBirth,
                      email: formData.email,
                      password: pass,
                      classId: formData.classId,
                      photoFile: file,
                    })
                : () => handleSubmit()
            }
          >
            {alter ? "Alterar" : "Adicionar"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

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
  SelectChangeEvent,
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

interface FormValues {
  name: string,
  educationalLevelId: string,
}

const initialFormData = {
  name: "",
  educationalLevelId: "",
};

export default function Course() {
  const authHeader = useAuthHeader();
  const [isAlter, setIsAlter] = React.useState(false);
  const [formData, setFormData] = React.useState<FormValues>(initialFormData);
  const [rows, setRows] = React.useState<Classes[]>([]);
  const [open, setOpen] = React.useState(false);
  const [educationalLevels, setEducationalLevels] = React.useState<Classes[]>([]);
  const [educationalLevel, setEducationalLevel] = React.useState("");

  function resetFormData() {
    setEducationalLevel("");
    setFormData(initialFormData);
  }

  async function handleSubmit() {
    axios
      .post(
        "http://localhost:3000/api/v1/course/create",
        { name: formData.name, educationLevelId: educationalLevel },
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

  React.useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/educationLevel", {
        headers: {
          Authorization: `${authHeader()}`,
        },
      })
      .then((response) => {
        setEducationalLevels(response.data.message);
      })
      .catch((error) => {
        console.log(error);
      });
    setIsAlter(false);

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
    setIsAlter(false);
  }, [isAlter]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event: SelectChangeEvent) => {
    setEducationalLevel(event.target.value as string);
  };

  return (
    <div className="container">
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
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            fullWidth
            variant="standard"
          />
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Course</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={educationalLevel}
              label="Nível Educacional"
              onChange={handleChange}
            >
              {educationalLevels.map((el) => (
                <MenuItem value={el.id}>{el.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

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
  Checkbox,
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

interface ClassRoomProps {
  name: string;
  courseId: string;
  lunch: Array<string>;
}

const initialFormData = {
  name: "",
  courseId: "",
  lunch: [],
};

export default function ClassRoom() {
  const [formData, setFormData] = React.useState<ClassRoomProps>(initialFormData);
  const [isAlter, setIsAlter] = React.useState(false);
  const [lunch, setLunch] = React.useState<Array<string>>([]);

  function resetFormData() {
    setCourse('');
    setFormData(initialFormData);
    setLunch([]);
  }

  async function handleSubmit() {
    axios
      .post(
        "http://localhost:3000/api/v1/classroom/create",
        { name: formData.name, courseId: course, lunch: JSON.stringify(lunch) },
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

  // async function handleAlter(id: string, data: ClassRoomProps) {
  //   axios
  //     .put(`http://localhost:3000/api/v1/classroom/${id}`, data, {
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

  async function handleDelete(id: string) {
    axios
      .delete(`http://localhost:3000/api/v1/classroom/delete/${id}`, {
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

  const authHeader = useAuthHeader();

  const [rows, setRows] = React.useState<Classes[]>([]);

  const [courses, setCourses] = React.useState<Classes[]>([]);

  React.useEffect(() => {
    authHeader;
    axios
      .get("http://localhost:3000/api/v1/course", {
        headers: {
          Authorization: `${authHeader()}`,
        },
      })
      .then((response) => {
        setCourses(response.data.message);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get("http://localhost:3000/api/v1/classroom", {
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
    setIsAlter(!isAlter);
  }, [isAlter]);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [course, setCourse] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setCourse(event.target.value as string);
  };

  const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  return (
    <>
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/">
          Home
        </Link>
        <Link underline="hover" color="inherit" href="/class">
          Class
        </Link>
        <Typography color="text.primary">ClassRoom</Typography>
      </Breadcrumbs>
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
            fullWidth
            variant="standard"
          />
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Course</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={course}
              label="Course"
              onChange={handleChange}
            >
              {courses.map((course) => (
                <MenuItem value={course.id}>{course.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>

        {weekDays.map((day) => (
          <div>
            <Checkbox
              checked={lunch.includes(day)}
              onChange={(event) => {
                const checked = event.target.checked;
                setLunch((prev) =>
                  checked ? [...prev, day] : prev.filter((p: string) => p !== day)
                );
              }}
              inputProps={{ "aria-label": "controlled" }}
            />
            {day}
          </div>
        ))}

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

import React from "react";
import Header from "../components/Header";
import { Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Note, Group, CreditCard } from "@mui/icons-material";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";

const Home: React.FC = () => {
  const navigate = useNavigate();
  return (
    <>
      <Header />
      <Typography variant="h4" sx={{ mb: 2 }}>
        Welcome Home
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardActionArea
              component={Link}
              to="../class"
              onClick={() => navigate("../class")}
              sx={{ textDecoration: "none", display: "flex" }}
            >
              <CardMedia
                component={Note}
                sx={{ fontSize: 96, color: "primary.main", m: 2 }}
              />
              <CardContent>
                <Typography variant="h6">CRUD Class</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardActionArea
              component={Link}
              to="../user"
              onClick={() => navigate("../user")}
              sx={{ textDecoration: "none", display: "flex" }}
            >
              <CardMedia
                component={Group}
                sx={{ fontSize: 96, color: "primary.main", m: 2 }}
              />
              <CardContent>
                <Typography variant="h6">CRUD Users</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardActionArea
              component={Link}
              to="../card"
              onClick={() => navigate("../card")}
              sx={{ textDecoration: "none", display: "flex" }}
            >
              <CardMedia
                component={CreditCard}
                sx={{ fontSize: 96, color: "primary.main", m: 2 }}
              />
              <CardContent>
                <Typography variant="h6">Card</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default Home;

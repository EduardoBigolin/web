import { RequireAuth } from "react-auth-kit";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Card from "./pages/Card/Card";
import Classes from "./pages/Class";
import ClassRoom from "./pages/classroom";
import Course from "./pages/course";
import EducationLevel from "./pages/educationLevel";
import Home from "./pages/Home";
import Login from "./pages/Login";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: (
//       <RequireAuth loginPath={"/login"}>
//         <Home />,
//       </RequireAuth>
//     ),
//   },
//   {
//     path: "/login",
//     element: <SignIn />,
//   },
//   {
//     path: "/home",
//     element: <ClassRoom />,
//   },
//   {
//     path: "/class",
//     element: <Classes />,
//   },
//   {
//     path: "class/educationLevel",
//     element: <EducationLevel />,
//   },
//   {
//     path: "class/course",
//     element: <Course />,
//   },
//   {
//     path: "class/classroom",
//     element: <ClassRoom />,
//   },
//   {
//     path: "/card",
//     element: <Card />,
//   },
// ]);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/login"} element={<Login />} />
        <Route
          path={"/"}
          element={
            <RequireAuth loginPath={"/login"}>
              <Home />
            </RequireAuth>
          }
        />
        <Route
          path={"/class/"}
          element={
            <RequireAuth loginPath={"/login"}>
              <Classes />
            </RequireAuth>
          }
        />
        <Route
          path={"/class/educationLevel"}
          element={
            <RequireAuth loginPath={"/login"}>
              <EducationLevel />
            </RequireAuth>
          }
        />
        <Route
          path={"/class/course"}
          element={
            <RequireAuth loginPath={"/login"}>
              <Course />
            </RequireAuth>
          }
        />
        <Route
          path={"/class/classroom"}
          element={
            <RequireAuth loginPath={"/login"}>
              <ClassRoom />
            </RequireAuth>
          }
        />
        <Route
          path={"/home"}
          element={
            <RequireAuth loginPath={"/login"}>
              <Home />
            </RequireAuth>
          }
        />
        <Route
          path={"/card"}
          element={
            <RequireAuth loginPath={"/login"}>
              <Card />
            </RequireAuth>
          }
        />
        <Route path={"/card/public/:slug"} element={<Card />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

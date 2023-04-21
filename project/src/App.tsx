import Home from "./pages/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignIn from "./pages/Login";
import ClassRoom from "./pages/classroom";
import EducationLevel from "./pages/educationLevel";
import Course from "./pages/course";
import Classes from "./pages/Class";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <SignIn />,
  },
  {
    path: "/home",
    element: <ClassRoom />,
  },
  {
    path: "/class",
    element: <Classes />,
  },
  {
    path: "class/educationLevel",
    element: <EducationLevel />,
  },
  {
    path: "class/course",
    element: <Course />,
  },
  {
    path: "class/classroom",
    element: <ClassRoom />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

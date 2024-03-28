import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import LinkPage from "./components/LinkPage";
import Unauthorized from "./components/Unauthorized";
import Home from "./pages/home/Home";
import Manager from "./pages/manager/Manager";
import Admin from "./pages/admin/Admin";
import Inventory from "./pages/inventory/Inventory";
import Missing from "./components/Missing";
import RequireAuth from "./components/RequireAuth";
//import './App.css'; // Import CSS file for styling

const ROLES = {
  User: 1,
  Manager: 2,
  Admin: 3,
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="linkpage" element={<LinkPage />} />
        <Route path="unauthorized" element={<Unauthorized />} />

        {/* we want to protect these routes */}
        <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
          <Route path="/" element={<Home />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES.Manager]} />}>
          <Route path="editor" element={<Manager />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
          <Route path="admin" element={<Admin />} />
        </Route>

        <Route
          element={<RequireAuth allowedRoles={[ROLES.Manager, ROLES.Admin]} />}
        >
          <Route path="Inventory" element={<Inventory />} />
        </Route>

        {/* catch all */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;





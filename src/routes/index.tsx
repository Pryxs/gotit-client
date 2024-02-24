import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { Login, Register } from "pages/auth"
import { Home, Editor } from "pages/common"
import { Lessons, Users } from "pages/manage"
import AuthGuard from './AuthGuard'

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/editor" element={<Editor />} />
        <Route path="/lessons" element={<Lessons />} />
        <Route element={<AuthGuard allowedRoles={["admin"]} />}>
          <Route path="/users" element={<Users />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

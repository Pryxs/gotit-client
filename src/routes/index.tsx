import { Route, Routes } from "react-router";
import { BrowserRouter,Navigate } from "react-router-dom";
import { Login } from "pages/auth"
import { Home, Editor } from "pages/common"
import { Lessons, Users } from "pages/manage"
import AuthGuard from './AuthGuard'

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/editor" element={<Editor />} />
        <Route path="/lessons" element={<Lessons />} />
        <Route element={<AuthGuard allowedRoles={["admin"]} />}>
          <Route path="/management" element={<Users />} />
        </Route>
        <Route path='*' element={<Navigate to="/" replace />}/>
      </Routes>
    </BrowserRouter>
  );
};

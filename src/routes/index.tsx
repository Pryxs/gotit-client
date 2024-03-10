import { Route, Routes } from "react-router";
import { BrowserRouter,Navigate } from "react-router-dom";
import { Login } from "pages/auth"
import { Home, Editor, Lesson } from "pages/common"
import { Management } from "pages/management"
import AuthGuard from './AuthGuard'

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/editor" element={<Editor />} />
        <Route path="/lesson/:id" element={<Lesson />} /> 
        <Route element={<AuthGuard allowedRoles={["admin"]} />}>
          <Route path="/management" element={<Management />} />
        </Route>
        <Route path='*' element={<Navigate to="/" replace />}/>
      </Routes>
    </BrowserRouter>
  );
};

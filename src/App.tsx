import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { getUser } from "./redux/auth/authSlice";
import ProtectedRoute from "./components/ProtectedRoute";
import TouristPage from "./pages/tourist/TouristPage";
import DetailTouristPage from "./pages/tourist/DetailTouristPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/user/ProfilePage";

function App() {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const ac = new AbortController();
    user.id && dispatch(getUser(user.id));
    return () => {
      ac.abort();
    };
  }, [dispatch, user.id]);

  return (
    <>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="login" element={<LoginPage />} />

          {/* Private Routes */}
          <Route path="/profile" element={<ProtectedRoute />}>
            <Route path="/profile" element={<ProfilePage />} />
          </Route>
          <Route path="/tourist" element={<ProtectedRoute />}>
            <Route path="/tourist" element={<TouristPage />} />
            <Route path=":id" element={<DetailTouristPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

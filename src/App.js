import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Subscriptions from "./pages/SubscriptionPage";
import HomePage from "./pages/HomePage";
import PlanPage from "./pages/PlanPage";

import { UserLoggedProvider } from "./contexts/UserLoggedProvider";
import { UserDataProvider } from "./contexts/ContextUserData";
import UsersPage from "./pages/UsersPage";
import UserDataUpdate from "./pages/UserDataUpdate";

export default function App() {
  return (
    <UserLoggedProvider>
      <UserDataProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/sign-up" element={<RegisterPage />} />
            <Route path="/subscriptions" element={<Subscriptions />} />
            <Route path="/subscriptions/:idPlan" element={<PlanPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/users/:idUser" element={<UsersPage />} />
            <Route path="/users/:idUser/update" element={<UserDataUpdate />} />
          </Routes>
        </BrowserRouter>
      </UserDataProvider>
    </UserLoggedProvider>
  );
}

import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Subscriptions from "./pages/SubscriptionPage";
import HomePage from "./pages/HomePage";

import { UserLoggedProvider } from "./contexts/UserLoggedProvider";

export default function App() {
  return (
    <UserLoggedProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/sign-up" element={<RegisterPage />} />
          <Route path="/subscriptions" element={<Subscriptions />} />
          <Route path="/home" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </UserLoggedProvider>
  );
}

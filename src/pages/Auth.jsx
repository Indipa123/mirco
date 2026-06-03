import { LockKeyhole, Store, UserRound } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Auth() {
  const [mode, setMode] = useState("login");
  const [role, setRole] = useState("buyer");
  const { login } = useAuth();
  const navigate = useNavigate();

  const submitAuth = (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    login({
      email: form.get("email"),
      name: form.get("name"),
      role,
    });
    navigate("/");
  };

  return (
    <div className="auth-page">
      <section className="auth-card">
        <div className="auth-media">
          <span className="eyebrow">Perfect login</span>
          <h1>One account for buyers and vendors.</h1>
          <p>Sign in to shop faster, manage your orders, save addresses, message vendors, or list products from your own shop.</p>
        </div>
        <div className="auth-form-panel">
          <div className="segmented">
            <button className={mode === "login" ? "active" : ""} onClick={() => setMode("login")}>Login</button>
            <button className={mode === "signup" ? "active" : ""} onClick={() => setMode("signup")}>Signup</button>
          </div>
          <div className="role-row">
            <button className={role === "buyer" ? "active" : ""} onClick={() => setRole("buyer")}><UserRound size={18} /> Buyer</button>
            <button className={role === "vendor" ? "active" : ""} onClick={() => setRole("vendor")}><Store size={18} /> Vendor</button>
          </div>
          <form className="auth-fields" onSubmit={submitAuth}>
            {mode === "signup" && <label>Full name<input name="name" required placeholder="Your name" /></label>}
            {mode === "signup" && role === "vendor" && <label>Shop name<input name="shopName" required placeholder="Registered shop name" /></label>}
            <label>Email<input name="email" required type="email" placeholder="you@example.com" /></label>
            <label>Password<input required type="password" placeholder="Password" /></label>
            <button className="primary-button"><LockKeyhole size={18} /> {mode === "login" ? "Login securely" : "Create account"}</button>
          </form>
        </div>
      </section>
    </div>
  );
}

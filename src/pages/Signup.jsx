import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import "./Signup.css";

export default function Signup() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();

    // Validation
    if (!email || !password || !confirm) {
      return setError("Tous les champs sont obligatoires.");
    }

    if (password !== confirm) {
      return setError("Les mots de passe ne correspondent pas.");
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Check if user already exists
    const exists = users.find((u) => u.email === email);
    if (exists) {
      return setError("Un compte avec cet email existe déjà.");
    }

    // Create new user
    const newUser = {
      id: Date.now(),
      email,
      password,
      role: "user",
    };

    // Save in localStorage
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    // Auto login after signup
    login(email, password);

    navigate("/"); // Redirect to homepage
  };

  return (
    <div className="signup-page">
      <div className="signup-box">

        <h2>Créer un compte</h2>
        {error && <p className="error">{error}</p>}

        <form onSubmit={handleSignup}>
          <input
            type="email"
            placeholder="Adresse email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <input
            type="password"
            placeholder="Confirmer mot de passe"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />

          <button type="submit">S'inscrire</button>
        </form>

        <p style={{ marginTop: "15px" }}>
          Déjà un compte ? <Link to="/login">Se connecter</Link>
        </p>

      </div>
    </div>
  );
}

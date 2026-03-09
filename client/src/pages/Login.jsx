import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const { login, userInfo } = useAuth();
  const navigate = useNavigate();
  const { t } = useLanguage();

  useEffect(() => {
    if (userInfo) {
      if (userInfo.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    }
  }, [userInfo, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await login(email, password);
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="page-container container" style={styles.wrapper}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card" 
        style={styles.card}
      >
        <h2 style={styles.title}>{t('auth.signIn')}</h2>
        <p style={styles.subtitle}>{t('auth.access')}</p>

        {error && <div style={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>EMAIL</label>
            <input 
              type="email" 
              style={styles.input} 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>PASSWORD</label>
            <input 
              type="password" 
              style={styles.input} 
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn-primary" style={styles.btn}>
            {t('auth.login')}
          </button>
        </form>

        <div style={styles.footer}>
          <span>{t('auth.alreadyHave')}</span>
          <Link to="/register" style={styles.link}>{t('auth.register')}</Link>
        </div>
      </motion.div>
    </div>
  );
};

const styles = {
  wrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    paddingTop: "100px",
  },
  card: {
    width: "100%",
    maxWidth: "450px",
    padding: "3rem",
  },
  title: {
    fontSize: "1.75rem",
    textAlign: "center",
    letterSpacing: "0.1em",
    marginBottom: "0.5rem",
  },
  subtitle: {
    textAlign: "center",
    fontSize: "0.9rem",
    opacity: 0.6,
    marginBottom: "2rem",
  },
  error: {
    backgroundColor: "rgba(255,0,0,0.05)",
    color: "red",
    padding: "1rem",
    borderRadius: "4px",
    fontSize: "0.85rem",
    marginBottom: "1.5rem",
    border: "1px solid rgba(255,0,0,0.1)",
  },
  inputGroup: {
    marginBottom: "1.5rem",
  },
  label: {
    display: "block",
    fontSize: "0.7rem",
    letterSpacing: "0.1em",
    marginBottom: "0.5rem",
    opacity: 0.8,
  },
  input: {
    width: "100%",
    padding: "0.8rem",
    background: "rgba(255,255,255,0.5)",
    border: "1px solid rgba(0,0,0,0.1)",
    borderRadius: "4px",
    outline: "none",
    fontSize: "1rem",
  },
  btn: {
    width: "100%",
    marginTop: "1rem",
  },
  footer: {
    marginTop: "2rem",
    textAlign: "center",
    fontSize: "0.9rem",
    opacity: 0.7,
  },
  link: {
    marginLeft: "10px",
    fontWeight: 600,
    textDecoration: "underline",
    color: "var(--color-text)",
  },
};

export default Login;

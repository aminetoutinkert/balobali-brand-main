import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    address: "",
    password: "",
  });
  const [error, setError] = useState(null);

  const { register, userInfo } = useAuth();
  const navigate = useNavigate();
  const { t } = useLanguage();

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [userInfo, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await register(formData);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Try again.");
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
        <h2 style={styles.title}>{t('auth.createAccount')}</h2>
        <p style={styles.subtitle}>{t('auth.join')}</p>

        {error && <div style={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>{t('auth.fullName')}</label>
            <input 
              name="name"
              type="text" 
              style={styles.input} 
              required 
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>{t('auth.phoneNumber')}</label>
            <input 
              name="phoneNumber"
              type="tel" 
              style={styles.input} 
              required 
              value={formData.phoneNumber}
              onChange={handleChange}
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>EMAIL</label>
            <input 
              name="email"
              type="email" 
              style={styles.input} 
              required 
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>{t('auth.livingAddress')}</label>
            <input 
              name="address"
              type="text" 
              style={styles.input} 
              required 
              value={formData.address}
              onChange={handleChange}
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>PASSWORD</label>
            <input 
              name="password"
              type="password" 
              style={styles.input} 
              required 
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn-primary" style={styles.btn}>
            {t('auth.register')}
          </button>
        </form>

        <div style={styles.footer}>
          <span>{t('auth.alreadyHave')}</span>
          <Link to="/login" style={styles.link}>{t('auth.login')}</Link>
        </div>
      </motion.div>
    </div>
  );
};

const styles = {
// Combined from Login page for brevity as they share design
  wrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    paddingTop: "120px",
    paddingBottom: "50px",
  },
  card: {
    width: "100%",
    maxWidth: "500px",
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
    marginBottom: "1.2rem",
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

export default Register;

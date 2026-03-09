import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingBag, User, LogOut, Languages } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useLanguage } from "../context/LanguageContext";

const Navbar = () => {
  const { userInfo, logout } = useAuth();
  const { totalItems } = useCart();
  const { lang, setLang, t } = useLanguage();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <nav style={styles.nav} className="glass-card nav-mobile-compact">
      <div style={styles.navContainer} className="container">
        {/* Left: Links */}
        <div style={styles.linkGroup} className="nav-links-hide">
          <Link to="/shop" style={styles.link}>
            {t('nav.shop')}
          </Link>
          {userInfo && userInfo.role === 'admin' && (
            <Link to="/admin" style={styles.link}>
              {t('nav.admin')}
            </Link>
          )}
        </div>

        <div style={styles.brand}>
          <Link to="/" style={styles.logo}>
            <img
              src="/ads/LOGO.jpeg"
              alt="BALOBALI"
              style={styles.logoImg}
              className="logo-mobile-shrink"
            />
          </Link>
        </div>

        {/* Right: Icons */}
        <div style={styles.iconGroup}>
          <div style={styles.langSwitcher}>
            <Languages size={18} style={{ opacity: 0.5 }} />
            <select 
              value={lang} 
              onChange={(e) => setLang(e.target.value)}
              style={styles.select}
            >
              <option value="fr">FR</option>
              <option value="ar">AR</option>
              <option value="en">EN</option>
            </select>
          </div>

          {userInfo ? (
            <>
              <span style={styles.userName}>{userInfo.name.split(' ')[0]}</span>
              <LogOut style={styles.icon} size={20} onClick={handleLogout} />
            </>
          ) : (
            <Link to="/login">
              <User style={styles.icon} size={20} />
            </Link>
          )}
          
          <Link to="/cart" style={styles.cartContainer}>
            <ShoppingBag style={styles.icon} size={20} />
            {totalItems > 0 && (
              <span style={styles.badge}>{totalItems}</span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    position: "fixed",
    top: "15px",
    left: "50%",
    transform: "translateX(-50%)",
    width: "95%",
    maxWidth: "1300px",
    zIndex: 1000,
    padding: "0.5rem 2rem",
  },
  navContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 0,
  },
  linkGroup: {
    display: "flex",
    gap: "2rem",
    flex: 1,
  },
  link: {
    fontSize: "0.8rem",
    textTransform: "uppercase",
    letterSpacing: "0.1em",
    fontWeight: 500,
    color: 'inherit',
    textDecoration: 'none',
  },
  brand: {
    flex: 1,
    textAlign: "center",
  },
  logo: {
    display: 'inline-block',
  },
  logoImg: {
    height: "75px", 
    width: "75px",
    borderRadius: "50%",
    objectFit: "cover",
    border: "2px solid var(--color-accent)",
    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
    transition: "transform 0.3s ease",
  },
  iconGroup: {
    display: "flex",
    gap: "1.2rem",
    flex: 1,
    justifyContent: "flex-end",
    alignItems: 'center',
  },
  icon: {
    cursor: "pointer",
  },
  userName: {
    fontSize: '0.8rem',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    fontWeight: 600,
    opacity: 0.7,
  },
  langSwitcher: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    marginRight: '8px',
  },
  select: {
    background: 'transparent',
    border: 'none',
    fontFamily: 'inherit',
    fontSize: '0.75rem',
    fontWeight: 600,
    cursor: 'pointer',
    outline: 'none',
    color: 'var(--color-text)',
  },
  cartContainer: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  badge: {
    position: 'absolute',
    top: '-8px',
    right: '-8px',
    background: 'var(--color-accent)',
    color: 'white',
    fontSize: '0.65rem',
    fontWeight: 'bold',
    width: '18px',
    height: '18px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '2px solid var(--color-bg)',
  }
};

export default Navbar;

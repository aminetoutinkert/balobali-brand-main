import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingBag, User, LogOut, Languages, Menu, X } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useLanguage } from "../context/LanguageContext";

const Navbar = () => {
  const { userInfo, logout } = useAuth();
  const { totalItems } = useCart();
  const { lang, setLang, t } = useLanguage();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      setIsMenuOpen(false);
      navigate('/login');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <>
      <nav style={styles.nav} className="glass-card nav-mobile-compact">
        <div style={styles.navContainer} className="container">
          {/* Left: Links - Hidden on Mobile */}
          <div style={styles.linkGroup} className="hide-on-mobile">
            <Link to="/shop" style={styles.link}>
              {t('nav.shop')}
            </Link>
            {userInfo && userInfo.role === 'admin' && (
              <Link to="/admin" style={styles.link}>
                {t('nav.admin')}
              </Link>
            )}
          </div>

          {/* Left Spacer for mobile centering */}
          <div className="show-on-mobile" style={{ flex: 1 }}></div>

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

          {/* Hamburger Menu Icon - Mobile Only */}
          <div className="show-on-mobile" style={{ flex: 1, justifyContent: 'flex-end', display: 'flex' }}>
            <Menu 
              onClick={toggleMenu} 
              style={{ cursor: 'pointer', opacity: 0.8 }} 
              size={24}
              aria-label="Toggle Menu"
            />
          </div>

          {/* Right: Icons - Hidden on Mobile */}
          <div style={styles.iconGroup} className="hide-on-mobile">
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

      {/* Mobile Menu Drawer */}
      <div className={`mobile-menu-overlay ${isMenuOpen ? 'open' : ''}`}>
        <X className="mobile-menu-close" onClick={toggleMenu} size={30} />
        
        <div className="mobile-menu-links">
          <Link to="/" className="mobile-menu-link" onClick={toggleMenu}>
            {t('nav.home') || 'ACCUEIL'}
          </Link>
          <Link to="/shop" className="mobile-menu-link" onClick={toggleMenu}>
            {t('nav.shop')}
          </Link>
          {userInfo && userInfo.role === 'admin' && (
            <Link to="/admin" className="mobile-menu-link" onClick={toggleMenu}>
              {t('nav.admin')}
            </Link>
          )}
          <Link to="/cart" className="mobile-menu-link" onClick={toggleMenu} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShoppingBag size={24} /> {t('nav.cart') || 'PANIER'} ({totalItems})
          </Link>
          
          <hr style={{ width: '50%', opacity: 0.2, margin: '1rem 0' }} />

          <div style={styles.langSwitcher}>
            <Languages size={24} style={{ opacity: 0.5 }} />
            <select 
              value={lang} 
              onChange={(e) => {
                setLang(e.target.value);
                toggleMenu();
              }}
              style={{ ...styles.select, fontSize: '1rem' }}
            >
              <option value="fr">Français</option>
              <option value="ar">العربية</option>
              <option value="en">English</option>
            </select>
          </div>

          {userInfo ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
              <span style={{ fontSize: '1.1rem', fontWeight: 600 }}>{userInfo.name}</span>
              <button onClick={handleLogout} className="btn-primary" style={{ padding: '0.6rem 1.5rem' }}>
                 {t('nav.logout') || 'DÉCONNEXION'}
              </button>
            </div>
          ) : (
            <Link to="/login" className="mobile-menu-link" onClick={toggleMenu}>
              {t('nav.login') || 'CONNEXION'}
            </Link>
          )}
        </div>
      </div>
    </>
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

import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer style={styles.footer} className="footer-mobile-center">
      <div className="container" style={styles.grid}>
        <div>
          <img src="/LOGO.jpeg" alt="Balobali" style={styles.brandLogo} />
          <p style={styles.text}>{t('footer.tagline')}</p>
        </div>
        
        <div>
          <ul style={{ ...styles.list, padding: 0 }}>
            <li>
              <a href="https://wa.me/" target="_blank" rel="noopener noreferrer" style={{color: 'inherit', textDecoration: 'none'}}>
                {t('footer.contact')}
              </a>
            </li>
            <li>
              <Link to="/shipping-returns" style={{color: 'inherit', textDecoration: 'none'}}>
                {t('footer.shippingReturns')}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 style={styles.title}>{t('footer.newsletter')}</h4>
          <p style={styles.text}>{t('footer.newsletterDesc')}</p>
          <div style={styles.inputGroup} className="input-group-mobile">
            <input type="email" placeholder="Email Address" style={styles.input} />
            <button className="btn-primary" style={styles.btn}>{t('footer.join')}</button>
          </div>
        </div>
      </div>
      <div style={styles.copy}>
        &copy; {new Date().getFullYear()} Balobali. {t('footer.rights')}
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: 'var(--color-text)',
    color: 'var(--color-bg)',
    padding: '4rem 0 2rem 0',
    marginTop: 'auto',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '3rem',
    paddingBottom: '3rem',
    borderBottom: '1px solid rgba(255,255,255,0.1)',
  },
  brandLogo: {
    maxHeight: '100px',
    marginBottom: '1rem',
  },
  title: {
    fontSize: '1rem',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    marginBottom: '1.5rem',
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
  },
  text: {
    color: 'rgba(255,255,255,0.7)',
    marginBottom: '1rem',
  },
  inputGroup: {
    display: 'flex',
    gap: '0.5rem',
  },
  input: {
    padding: '0.75rem',
    background: 'transparent',
    border: '1px solid rgba(255,255,255,0.3)',
    color: '#fff',
    outline: 'none',
    width: '100%',
  },
  btn: {
    padding: '0.75rem 1.5rem',
    background: 'var(--color-bg)',
    color: 'var(--color-text)',
  },
  copy: {
    textAlign: 'center',
    paddingTop: '2rem',
    fontSize: '0.85rem',
    color: 'rgba(255,255,255,0.5)',
  }
};

export default Footer;

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import ShinyText from '../components/ShinyText';

const Home = () => {
  const { t } = useLanguage();
  const [currentBg, setCurrentBg] = useState(0);
  const heroImages = ['/ads/hero.png', '/ads/hero2.png'];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home-wrapper">
      {/* Hero Section */}
      <section style={{...styles.heroSection, backgroundImage: 'none'}}>
        <AnimatePresence>
          <motion.div
            key={currentBg}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.6)), url("${heroImages[currentBg]}")`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              zIndex: 1
            }}
          />
        </AnimatePresence>
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }} 
          style={styles.heroContent}
        >
          <span style={styles.heroLabel}>New Arrival / SPRING 26</span>
          <h1 style={styles.heroTitle} className="hero-title-mobile">
            <ShinyText 
              text={t('home.hero.title')} 
              disabled={false} 
              speed={3} 
              className='shiny-title'
              color="#FFFFFF"
              shineColor="var(--color-accent)"
            />
          </h1>
          <p style={styles.heroSubtitle}>
            <ShinyText 
              text={t('home.hero.subtitle')} 
              disabled={false} 
              speed={5} 
              className='shiny-subtitle'
              color="rgba(255, 255, 255, 0.85)"
              shineColor="#FFFFFF"
            />
          </p>
          <div style={styles.heroButtons}>
            <Link to="/shop">
              <button className="btn-primary" style={styles.btnExplore}>
                {t('home.hero.cta')}
              </button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Featured Categories (Editorial Layout) */}
      <section className="container" style={styles.categorySection}>
        <div style={styles.sectionHeader}>
          <div style={styles.headerTitleGroup}>
            <Link to="/shop" style={{ textDecoration: 'none', color: 'inherit' }}>
              <h2 style={styles.sectionTitle}>{t('home.categories.title')}</h2>
            </Link>
            <div style={styles.sectionLine}></div>
          </div>
          <Link to="/shop" style={styles.linkWithIcon}>
            {t('home.categories.viewAll')} <ArrowRight size={16} />
          </Link>
        </div>
        
        <div style={styles.grid} className="grid-mobile-1">
          <CategoryCard 
            title="Silk Pajamas" 
            label="Signature Collection" 
            size="tall" 
            bgColor="#f3f0ed"
            image="/ads/1.jpeg"
          />
          <CategoryCard 
            title="Loungewear" 
            label="Pure Comfort" 
            size="wide" 
            bgColor="#ece8e4"
            image="/ads/2.jpeg"
          />
          <CategoryCard 
            title="Accessories" 
            label="The Accents" 
            size="short" 
            bgColor="#e6e1db"
            image="/ads/3.jpeg"
          />
          <CategoryCard 
            title="Gifting" 
            label="For Them" 
            size="short" 
            bgColor="#dfdad4"
          />
        </div>
      </section>
    </div>
  );
};

const CategoryCard = ({ title, label, size, bgColor, image }) => {
  const cardStyle = {
    ...styles.categoryCard,
    ...(size === 'tall' ? styles.cardTall : size === 'wide' ? styles.cardWide : styles.cardShort),
    backgroundColor: bgColor,
    backgroundImage: image ? `url(${image})` : 'none',
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  };

  return (
    <motion.div 
      whileHover={{ scale: 0.98 }}
      transition={{ duration: 0.5 }}
      style={cardStyle} 
      className="glass-card"
    >
      <div style={styles.cardOverlay}></div>
      <div style={styles.cardInfo}>
        <span style={styles.cardLabel}>{label}</span>
        <h3 style={styles.cardTitle}>{title}</h3>
      </div>
    </motion.div>
  );
};

const styles = {
  heroSection: {
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 5%',
    textAlign: 'center',
    backgroundColor: '#000',
    position: 'relative',
    overflow: 'hidden',
  },
  heroLabel: {
    fontSize: '0.8rem',
    textTransform: 'uppercase',
    letterSpacing: '0.3em',
    marginBottom: '2rem',
    display: 'block',
    fontWeight: 500,
    color: 'var(--color-accent)',
  },
  heroContent: {
    maxWidth: '900px',
    zIndex: 10,
  },
  heroTitle: {
    fontSize: 'clamp(3.5rem, 10vw, 7rem)',
    lineHeight: 1.4,
    fontWeight: 700,
    marginBottom: '2rem',
    letterSpacing: '-0.04em',
    paddingBottom: '0.5em',
  },
  heroSubtitle: {
    fontSize: '1.75rem',
    color: '#FFFFFF',
    opacity: 0.9,
    marginBottom: '3rem',
    fontWeight: 500,
    maxWidth: '750px',
    margin: '0 auto 3rem auto',
    lineHeight: 1.5,
  },
  heroButtons: {
    display: 'flex',
    justifyContent: 'center',
  },
  btnExplore: {
    padding: '1.5rem 4rem',
    fontSize: '1rem',
    borderRadius: '0', 
    fontWeight: 400,
  },
  categorySection: {
    padding: '8rem 5%',
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '4rem',
  },
  headerTitleGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '2rem',
  },
  sectionTitle: {
    fontSize: '2.5rem',
    fontWeight: 300,
  },
  sectionLine: {
    height: '1px',
    width: '100px',
    background: 'var(--color-text)',
    opacity: 0.2,
  },
  linkWithIcon: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    fontSize: '0.8rem',
    fontWeight: 600,
    paddingBottom: '0.4rem',
    borderBottom: '1px solid currentColor',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '1.5rem',
    gridAutoRows: '340px',
  },
  categoryCard: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    padding: '3rem',
    overflow: 'hidden',
    cursor: 'pointer',
    border: 'none',
    borderRadius: '0', 
  },
  cardOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(to top, rgba(0,0,0,0.4), transparent)',
    zIndex: 1,
  },
  cardInfo: {
    zIndex: 2,
    transition: 'transform 0.4s ease',
  },
  cardTitle: {
    fontSize: '2rem',
    fontWeight: 400,
    color: '#fff',
    textShadow: '0 2px 4px rgba(0,0,0,0.2)',
  },
  cardLabel: {
    fontSize: '0.8rem',
    textTransform: 'uppercase',
    letterSpacing: '0.15em',
    marginBottom: '0.5rem',
    display: 'block',
    color: '#fff',
    opacity: 0.9,
  },
  cardTall: {
    gridColumn: 'span 2',
    gridRow: 'span 2',
  },
  cardWide: {
    gridColumn: 'span 2',
  },
  cardShort: {
    gridColumn: 'span 1',
  }
};

export default Home;

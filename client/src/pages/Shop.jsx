import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fetchProducts } from '../services/api';
import { useLanguage } from '../context/LanguageContext';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const { t } = useLanguage();

  const isNewProduct = (dateString) => {
    if (!dateString) return true; // Default to new if no date
    const daysDiff = (new Date() - new Date(dateString)) / (1000 * 60 * 60 * 24);
    return daysDiff <= 30;
  };

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    loadProducts();
  }, []);

  return (
    <div className="page-container container">
      <header style={styles.header}>
        <motion.h1 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {t('shop.title')}
        </motion.h1>
        <p style={styles.subtitle}>{t('shop.subtitle')}</p>
      </header>

      <div style={styles.grid}>
        {products.map((product, index) => (
          <motion.div 
            key={product._id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            style={styles.card}
          >
            <Link to={`/product/${product._id}`} style={{ position: 'relative', display: 'block' }}>
              <div style={styles.imagePlaceholder}>
                {isNewProduct(product.createdAt) && (
                  <motion.span 
                    initial={{ scale: 0, rotate: -15 }}
                    animate={{ scale: 1, rotate: 0 }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    style={styles.newBadge}
                    className="badge-shiny"
                  >
                    {t('shop.newBadge')}
                  </motion.span>
                )}
                <img 
                  src={product.images[0]} 
                  alt={product.name} 
                  style={{width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px'}} 
                />
              </div>
              <div style={styles.info}>
                <h3 style={styles.name}>{product.name}</h3>
                <p style={styles.price}>{product.price} MAD</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  header: {
    textAlign: 'center',
    marginBottom: '4rem',
  },
  subtitle: {
    color: 'rgba(0,0,0,0.6)',
    marginTop: '1rem',
    fontSize: '1.1rem',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '3rem 2rem',
    paddingBottom: '5rem',
  },
  card: {
    cursor: 'pointer',
  },
  imagePlaceholder: {
    backgroundColor: '#EBE5DF',
    aspectRatio: '3/4',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '1.5rem',
    borderRadius: '8px',
    position: 'relative',
    overflow: 'hidden',
  },
  newBadge: {
    position: 'absolute',
    top: '1rem',
    right: '1rem',
    color: '#fff',
    padding: '0.3rem 0.8rem',
    fontSize: '0.75rem',
    fontWeight: '700',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    zIndex: 2,
    borderRadius: '4px',
  },
  imgText: {
    color: 'rgba(0,0,0,0.3)',
    fontSize: '0.9rem',
  },
  info: {
    textAlign: 'center',
  },
  name: {
    fontSize: '1.1rem',
    letterSpacing: '0.05em',
    marginBottom: '0.5rem',
  },
  price: {
    color: 'rgba(0,0,0,0.7)',
  }
};

export default Shop;

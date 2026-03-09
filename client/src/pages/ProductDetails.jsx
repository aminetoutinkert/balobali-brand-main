import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fetchProductById } from '../services/api';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { useLanguage } from '../context/LanguageContext';

const ProductDetails = () => {
  const { id } = useParams();
  const [qty, setQty] = useState(1);
  const [product, setProduct] = useState({});
  const { addToCart } = useCart();
  const { addToast } = useToast();
  const { t } = useLanguage();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productData = await fetchProductById(id);
        setProduct(productData);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchData();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product, qty);
    addToast(`${product.name} ${t('product.addedToBag')}`);
  };

  if (!product.name) return <div className="page-container container" style={{paddingTop: '150px'}}>{t('product.loading')}</div>;

  return (
    <div className="page-container container" style={styles.wrapper}>
      <div style={styles.grid}>
        {/* Left: Product Images */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          style={styles.imageColumn}
        >
          <div style={styles.mainImage}>
            {product.images && product.images[0] ? (
              <img src={product.images[0]} alt={product.name} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
            ) : 'Product Image'}
          </div>
        </motion.div>

        {/* Right: Product Info */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          style={styles.infoColumn}
        >
          <h1 style={styles.title}>{product.name}</h1>
          <p style={styles.price}>{product.price} MAD</p>
          
          <div style={styles.description}>
            <p>{product.description}</p>
          </div>

          <div style={styles.actionGroup}>
            <div style={styles.qtySelector}>
              <button onClick={() => setQty(Math.max(1, qty - 1))} style={styles.qtyBtn}>-</button>
              <span style={styles.qtyValue}>{qty}</span>
              <button onClick={() => setQty(qty + 1)} style={styles.qtyBtn}>+</button>
            </div>
            <button 
              className="btn-primary" 
              style={styles.btn}
              onClick={handleAddToCart}
            >
              {t('shop.addToCart')}
            </button>
          </div>

          <div style={styles.accordion}>
            <div style={styles.accordionItem}>
              <h4>{t('product.details')}</h4>
              <p style={styles.smallText}>Premium materials. Hand-finished details. Specialist dry clean recommended.</p>
            </div>
            <div style={styles.accordionItem}>
              <h4>{t('product.shipping')}</h4>
              <p style={styles.smallText}>{t('product.freeShipping')}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    paddingTop: '150px',
    paddingBottom: '5rem',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'minmax(400px, 1.2fr) 1fr',
    gap: '5rem',
    marginBottom: '6rem',
  },
  imageColumn: {
    display: 'flex',
    flexDirection: 'column',
  },
  mainImage: {
    aspectRatio: '3/4',
    background: '#E5E0DA',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'rgba(0,0,0,0.3)',
    overflow: 'hidden'
  },
  infoColumn: {
    paddingTop: '1rem',
  },
  title: {
    fontSize: '2.5rem',
    marginBottom: '1rem',
    fontWeight: 300,
  },
  price: {
    fontSize: '1.25rem',
    marginBottom: '2rem',
    color: 'var(--color-accent)',
    fontWeight: 500,
  },
  description: {
    fontSize: '1.05rem',
    lineHeight: 1.6,
    color: 'rgba(0,0,0,0.7)',
    marginBottom: '3rem',
    fontWeight: 300,
  },
  actionGroup: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '4rem',
  },
  qtySelector: {
    display: 'flex',
    alignItems: 'center',
    border: '1px solid rgba(0,0,0,0.1)',
    padding: '0.5rem',
  },
  qtyBtn: {
    background: 'none',
    border: 'none',
    width: '40px',
    height: '40px',
    cursor: 'pointer',
    fontSize: '1.2rem',
  },
  qtyValue: {
    width: '40px',
    textAlign: 'center',
  },
  btn: {
    flex: 1,
    padding: '1rem',
    fontSize: '1rem',
  },
  accordion: {
    borderTop: '1px solid rgba(0,0,0,0.1)',
  },
  accordionItem: {
    padding: '1.5rem 0',
    borderBottom: '1px solid rgba(0,0,0,0.1)',
  },
  smallText: {
    fontSize: '0.9rem',
    color: 'rgba(0,0,0,0.6)',
    marginTop: '0.5rem',
  }
};

export default ProductDetails;

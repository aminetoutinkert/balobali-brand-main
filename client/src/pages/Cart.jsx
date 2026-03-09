import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, removeFromCart } = useCart();
  const { t } = useLanguage();

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <div className="page-container container" style={styles.wrapper}>
      <h1 style={styles.title}>{t('cart.title')}</h1>

      {cartItems.length === 0 ? (
        <div style={styles.empty}>
          <p>{t('cart.empty')}</p>
          <Link to="/shop">
            <button className="btn-primary" style={{marginTop: '2rem'}}>{t('cart.continue')}</button>
          </Link>
        </div>
      ) : (
        <div style={styles.grid} className="grid-mobile-1">
          {/* Cart Items */}
          <div style={styles.itemsColumn}>
            {cartItems.map(item => (
              <div key={item._id} style={styles.cartItem}>
                <div style={styles.itemImage}>
                  {item.images && item.images[0] ? (
                    <img src={item.images[0]} alt={item.name} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
                  ) : 'Img'}
                </div>
                <div style={styles.itemInfo}>
                  <h4>{item.name}</h4>
                  <p style={{color: 'rgba(0,0,0,0.5)', marginTop: '0.5rem'}}>Qty: {item.qty}</p>
                  <button 
                    onClick={() => removeFromCart(item._id)}
                    style={styles.removeBtn}
                  >
                    {t('cart.remove')}
                  </button>
                </div>
                <div style={styles.itemPrice}>
                  {item.price * item.qty} MAD
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div style={styles.summaryColumn}>
            <div className="glass-card" style={styles.summaryCard}>
              <h3 style={{marginBottom: '2rem'}}>{t('cart.summary')}</h3>
              <div style={styles.summaryRow}>
                <span>{t('cart.subtotal')}</span>
                <span>{subtotal} MAD</span>
              </div>
              <div style={styles.summaryRow}>
                <span>{t('cart.shipping')}</span>
                <span>{t('cart.shippingPrice')}</span>
              </div>
              <div style={styles.totalRow}>
                <span>{t('cart.total')}</span>
                <span>{subtotal} MAD</span>
              </div>
              <button 
                className="btn-primary" 
                style={styles.checkoutBtn}
                onClick={() => navigate('/checkout')}
              >
                {t('cart.checkout')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  wrapper: {
    maxWidth: '1000px',
    paddingTop: '120px'
  },
  title: {
    fontSize: '2rem',
    marginBottom: '3rem',
    borderBottom: '1px solid rgba(0,0,0,0.1)',
    paddingBottom: '1rem',
  },
  empty: {
    textAlign: 'center',
    padding: '4rem 0',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1.5fr 1fr',
    gap: '3rem',
  },
  cartItem: {
    display: 'flex',
    gap: '1.5rem',
    paddingBottom: '2rem',
    marginBottom: '2rem',
    borderBottom: '1px solid rgba(0,0,0,0.05)',
  },
  itemImage: {
    width: '100px',
    height: '130px',
    background: '#E5E0DA',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'rgba(0,0,0,0.3)',
    overflow: 'hidden'
  },
  itemInfo: {
    flex: 1,
  },
  removeBtn: {
    background: 'none',
    border: 'none',
    textDecoration: 'underline',
    fontSize: '0.8rem',
    cursor: 'pointer',
    marginTop: '1rem',
    opacity: 0.6,
  },
  itemPrice: {
    fontWeight: 500,
  },
  summaryCard: {
    padding: '2rem',
  },
  summaryRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '1rem',
    color: 'rgba(0,0,0,0.7)',
  },
  totalRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '2rem',
    paddingTop: '2rem',
    borderTop: '1px solid rgba(0,0,0,0.1)',
    fontSize: '1.25rem',
    fontWeight: 500,
  },
  checkoutBtn: {
    width: '100%',
    marginTop: '2rem',
    padding: '1.25rem',
  }
};

export default Cart;

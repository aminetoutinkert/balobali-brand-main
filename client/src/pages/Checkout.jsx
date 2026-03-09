import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, clearCart } = useCart();
  const { t } = useLanguage();

  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postalCode: '',
    phone: ''
  });

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleWhatsAppOrder = (e) => {
    e.preventDefault();
    
    // Construct WhatsApp message
    const itemsList = cartItems.map(item => `• ${item.name} (x${item.qty}) - ${item.price * item.qty} MAD`).join('%0A');
    
    const message = `*New Order - BALOBALI*%0A%0A` +
      `*Contact Details:*%0A` +
      `- Name: ${formData.firstName} ${formData.lastName}%0A` +
      `- Email: ${formData.email}%0A` +
      `- Phone: ${formData.phone}%0A` +
      `- Address: ${formData.address}, ${formData.city} (${formData.postalCode})%0A%0A` +
      `*Ordered Items:*%0A` +
      itemsList +
      `%0A%0A*Total Amount: ${subtotal} MAD*%0A%0A` +
      `_Payment Method: Cash on Delivery_`;

    const whatsappUrl = `https://wa.me/212600000000?text=${message}`;
    
    window.open(whatsappUrl, '_blank');
    clearCart();
    navigate('/');
  };

  return (
    <div className="page-container container" style={styles.wrapper}>
      <div style={styles.header}>
        <h1 style={styles.title}>{t('checkout.title')}</h1>
        <p style={styles.secure}>{t('checkout.secure')}</p>
      </div>

      <div style={styles.grid} className="grid-mobile-1">
        {/* Shipping Form */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={styles.formColumn}>
          <form onSubmit={handleWhatsAppOrder}>
            <h3 style={styles.sectionTitle}>{t('checkout.contactInfo')}</h3>
            <div style={styles.inputGroup}>
              <input 
                name="email"
                type="email" 
                placeholder={t('checkout.email')} 
                required 
                style={styles.input} 
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div style={styles.inputGroup}>
              <input 
                name="phone"
                type="tel" 
                placeholder={t('checkout.phone')} 
                required 
                style={styles.input} 
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <h3 style={styles.sectionTitle}>{t('checkout.shippingAddress')}</h3>
            <div style={styles.inputRow}>
              <input 
                name="firstName"
                type="text" 
                placeholder={t('checkout.firstName')} 
                required 
                style={styles.input} 
                value={formData.firstName}
                onChange={handleChange}
              />
              <input 
                name="lastName"
                type="text" 
                placeholder={t('checkout.lastName')} 
                required 
                style={styles.input} 
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
            <div style={styles.inputGroup}>
              <input 
                name="address"
                type="text" 
                placeholder={t('checkout.address')} 
                required 
                style={styles.input} 
                value={formData.address}
                onChange={handleChange}
              />
            </div>
            <div style={styles.inputRow}>
              <input 
                name="city"
                type="text" 
                placeholder={t('checkout.city')} 
                required 
                style={styles.input} 
                value={formData.city}
                onChange={handleChange}
              />
              <input 
                name="postalCode"
                type="text" 
                placeholder={t('checkout.postalCode')} 
                required 
                style={styles.input} 
                value={formData.postalCode}
                onChange={handleChange}
              />
            </div>

            <div style={styles.paymentMethod}>
              <h3 style={styles.sectionTitle}>{t('checkout.paymentMethod')}</h3>
              <div className="glass-card" style={styles.codBox}>
                <strong>{t('checkout.cod')}</strong>
                <p style={{fontSize: '0.9rem', marginTop: '0.5rem', opacity: 0.7}}>
                  {t('checkout.codDesc')}
                </p>
              </div>
            </div>

            <button type="submit" className="btn-primary" style={styles.payBtn}>
              {t('checkout.complete')} ({subtotal} MAD)
            </button>
          </form>
        </motion.div>

        {/* Order Summary */}
        <div style={styles.summaryColumn}>
          <div className="glass-card" style={styles.summaryCard}>
            <h3 style={{marginBottom: '1.5rem'}}>{t('checkout.summary')}</h3>
            {cartItems.map(item => (
              <div key={item._id} style={styles.summaryItem}>
                <span>{item.name} (x{item.qty})</span>
                <span>{item.price * item.qty} MAD</span>
              </div>
            ))}
            <div style={{borderTop: '1px solid rgba(0,0,0,0.1)', margin: '1rem 0', paddingTop: '1rem'}}>
              <div style={styles.summaryItem}>
                <strong>Total</strong>
                <strong>{subtotal} MAD</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    maxWidth: '1000px',
    paddingBottom: '5rem',
    paddingTop: '120px'
  },
  header: {
    textAlign: 'center',
    marginBottom: '4rem',
  },
  title: {
    fontSize: '2.5rem',
    letterSpacing: '0.1em',
  },
  secure: {
    fontSize: '0.8rem',
    color: 'rgba(0,0,0,0.5)',
    letterSpacing: '0.1em',
    marginTop: '0.5rem',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1.5fr 1fr',
    gap: '4rem',
  },
  sectionTitle: {
    fontSize: '1.25rem',
    marginBottom: '1rem',
    marginTop: '2rem',
  },
  inputGroup: {
    marginBottom: '1rem',
  },
  inputRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1rem',
    marginBottom: '1rem',
  },
  input: {
    width: '100%',
    padding: '1rem',
    border: '1px solid rgba(0,0,0,0.1)',
    borderRadius: '4px',
    background: 'transparent',
    fontFamily: 'inherit',
    fontSize: '1rem',
  },
  paymentMethod: {
    marginBottom: '2rem',
  },
  codBox: {
    padding: '1.5rem',
    border: '1px solid var(--color-accent)',
  },
  payBtn: {
    width: '100%',
    padding: '1.25rem',
    marginTop: '1rem',
  },
  summaryCard: {
    padding: '2rem',
    position: 'sticky',
    top: '120px',
  },
  summaryItem: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '1rem',
    fontSize: '0.9rem',
  }
};

export default Checkout;

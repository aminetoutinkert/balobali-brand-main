import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Package, 
  Users, 
  ShoppingBag, 
  TrendingUp, 
  Plus, 
  Edit, 
  Trash2,
  ExternalLink
} from 'lucide-react';
import API from '../services/api';
import { useLanguage } from '../context/LanguageContext';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalSales: 0,
    totalOrders: 0,
    totalProducts: 0,
    totalUsers: 0
  });
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t } = useLanguage();

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const { data: productsData } = await API.get('/products');
        const { data: ordersData } = await API.get('/orders');
        setProducts(productsData);
        setStats({
          totalSales: ordersData.reduce((acc, order) => acc + (order.isPaid ? order.totalPrice : 0), 0),
          totalOrders: ordersData.length,
          totalProducts: productsData.length,
          totalUsers: 0 
        });
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch admin data', error);
        setLoading(false);
      }
    };

    fetchAdminData();
  }, []);

  if (loading) return <div className="page-container container">Loading Dashboard...</div>;

  return (
    <div className="page-container container">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="admin-header"
        style={styles.header}
      >
        <div>
          <h1 style={styles.title}>{t('admin.console')}</h1>
          <p style={styles.subtitle}>{t('admin.subtitle')}</p>
        </div>
        <button className="btn-primary" style={styles.btnAdd}>
          <Plus size={18} /> {t('admin.newProduct')}
        </button>
      </motion.div>

      {/* Stats Grid */}
      <div style={styles.statsGrid}>
        <StatCard icon={<TrendingUp color="#D4AF37" />} label={t('admin.revenue')} value={`${stats.totalSales.toLocaleString()} MAD`} />
        <StatCard icon={<ShoppingBag color="#D4AF37" />} label={t('admin.orders')} value={stats.totalOrders} />
        <StatCard icon={<Package color="#D4AF37" />} label={t('admin.products')} value={stats.totalProducts} />
        <StatCard icon={<Users color="#D4AF37" />} label={t('admin.customers')} value="--" />
      </div>

      {/* Recent Products Table */}
      <div className="glass-card" style={styles.tableCard}>
        <div style={styles.tableHeader}>
          <h3>{t('admin.inventory')}</h3>
          <button style={styles.btnAction}>{t('admin.viewFiles')} <ExternalLink size={14} /></button>
        </div>
        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead>
              <tr style={styles.tableHeadRow}>
                <th style={styles.th}>{t('admin.product')}</th>
                <th style={styles.th}>{t('admin.category')}</th>
                <th style={styles.th}>{t('admin.price')}</th>
                <th style={styles.th}>{t('admin.stock')}</th>
                <th style={styles.th}>{t('admin.actions')}</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id} style={styles.tr}>
                  <td style={styles.td}>
                    <div style={styles.productCell}>
                      <div style={styles.productImagePlaceholder}></div>
                      <span>{product.name}</span>
                    </div>
                  </td>
                  <td style={styles.td}>{product.category}</td>
                  <td style={styles.td}>{product.price} MAD</td>
                  <td style={styles.td}>
                    <span style={product.countInStock > 5 ? styles.stockOk : styles.stockLow}>
                      {product.countInStock}
                    </span>
                  </td>
                  <td style={styles.td}>
                    <div style={styles.actions}>
                      <button style={styles.iconBtn}><Edit size={16} /></button>
                      <button style={{...styles.iconBtn, color: '#ef4444'}}><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, label, value }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="glass-card" 
    style={styles.statCard}
  >
    <div style={styles.statIcon}>{icon}</div>
    <div style={styles.statContent}>
      <p style={styles.statLabel}>{label}</p>
      <h2 style={styles.statValue}>{value}</h2>
    </div>
  </motion.div>
);

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '3rem',
  },
  title: {
    fontSize: '2.5rem',
    marginBottom: '0.5rem',
  },
  subtitle: {
    color: '#666',
    fontWeight: 300,
  },
  btnAdd: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    borderRadius: '12px',
    padding: '0.8rem 1.5rem',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: '1.5rem',
    marginBottom: '3rem',
  },
  statCard: {
    padding: '2rem',
    display: 'flex',
    alignItems: 'center',
    gap: '1.5rem',
  },
  statIcon: {
    width: '48px',
    height: '48px',
    borderRadius: '12px',
    background: 'rgba(212, 175, 55, 0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statLabel: {
    fontSize: '0.9rem',
    color: '#666',
    marginBottom: '0.2rem',
  },
  statValue: {
    fontSize: '1.5rem',
    fontWeight: 500,
  },
  tableCard: {
    padding: '0',
    overflow: 'hidden',
  },
  tableHeader: {
    padding: '2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid var(--color-muted)',
  },
  btnAction: {
    background: 'none',
    border: 'none',
    color: 'var(--color-accent)',
    fontSize: '0.9rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.3rem',
    cursor: 'pointer',
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    textAlign: 'left',
  },
  tableHeadRow: {
    background: 'rgba(0,0,0,0.02)',
  },
  th: {
    padding: '1.2rem 2rem',
    fontSize: '0.85rem',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    color: '#666',
    fontWeight: 500,
  },
  td: {
    padding: '1.2rem 2rem',
    borderBottom: '1px solid rgba(0,0,0,0.05)',
    fontSize: '0.95rem',
  },
  tr: {
    transition: 'background 0.2s',
    '&:hover': {
      background: 'rgba(0,0,0,0.01)',
    }
  },
  productCell: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  productImagePlaceholder: {
    width: '40px',
    height: '40px',
    borderRadius: '4px',
    background: '#eee',
  },
  stockOk: {
    color: '#10b981',
    fontWeight: 500,
  },
  stockLow: {
    color: '#ef4444',
    fontWeight: 500,
  },
  actions: {
    display: 'flex',
    gap: '0.5rem',
  },
  iconBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#666',
    padding: '0.4rem',
    borderRadius: '6px',
    transition: 'background 0.2s',
    '&:hover': {
      background: 'rgba(0,0,0,0.05)',
    }
  }
};

export default AdminDashboard;

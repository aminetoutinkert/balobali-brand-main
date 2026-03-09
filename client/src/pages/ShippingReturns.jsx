import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const ShippingReturns = () => {
  const { t, lang } = useLanguage();

  return (
    <div className="page-container container" style={styles.wrapper}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={styles.content}
      >
        <h1 style={styles.title}>{t('footer.shippingReturns')}</h1>
        
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>
            {lang === 'ar' ? 'معلومات الشحن' : lang === 'fr' ? 'Informations d\'expédition' : 'Shipping Information'}
          </h2>
          <p style={styles.text}>
            {lang === 'ar' 
              ? 'نقدم خدمة التوصيل السريع إلى جميع أنحاء العالم. تستغرق الطلبات المحلية عادة من يومين إلى 3 أيام عمل. الشحن مجاني لجميع الطلبات التي تتجاوز قيمتها 1000 درهم مغربي. عند شحن طلبك، ستتلقى رسالة تأكيد تحتوي على معلومات التتبع الخاصة بك.'
              : lang === 'fr'
              ? 'Nous proposons la livraison express dans le monde entier. Les commandes nationales arrivent généralement dans un délai de 2 à 3 jours ouvrables. La livraison est gratuite pour toute commande supérieure à 1000 MAD. Une fois votre commande expédiée, vous recevrez un message de confirmation avec vos informations de suivi.'
              : 'We offer express shipping worldwide. Domestic orders typically arrive within 2-3 business days. Shipping is complimentary on all orders over 1000 MAD. Once your order has shipped, you will receive a confirmation message with your tracking information.'}
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>
            {lang === 'ar' ? 'سياسة الإرجاع والاستبدال' : lang === 'fr' ? 'Politique de retour et d\'échange' : 'Return & Exchange Policy'}
          </h2>
          <p style={styles.text}>
            {lang === 'ar' 
              ? 'نظراً للطبيعة الحصرية لقطعنا والفخامة التي نقدمها، نقبل الإرجاع فقط في حالة وجود عيوب في التصنيع. يجب الإبلاغ عن أي مشكلة في غضون 48 ساعة من الاستلام. يجب أن تظل جميع المنتجات في حالتها الأصلية مع جميع العلامات المرفقة.'
              : lang === 'fr'
              ? 'En raison de la nature exclusive de nos pièces et du luxe que nous proposons, nous acceptons uniquement les retours en cas de défaut de fabrication. Tout problème doit être signalé dans les 48 heures suivant la réception. Tous les produits doivent rester dans leur état d\'origine avec toutes les étiquettes attachées.'
              : 'Given the exclusive nature of our pieces and the luxury we provide, we only accept returns in the event of manufacturing defects. Any issue must be reported within 48 hours of receipt. All products must remain in their original condition with all tags attached.'}
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>
            {lang === 'ar' ? 'الدفع عند الاستلام' : lang === 'fr' ? 'Paiement à la livraison' : 'Cash on Delivery'}
          </h2>
          <p style={styles.text}>
            {lang === 'ar' 
              ? 'لمزيد من الراحة الممزوجة بالثقة، نوفر خيار الدفع عند الاستلام (COD) داخل المغرب. سيتم تأكيد جميع طلبات الدفع عند الاستلام عبر تطبيق الواتساب قبل إرسالها لضمان التوصيل السلس.'
              : lang === 'fr'
              ? 'Pour plus de commodité mêlée de confiance, nous proposons l\'option de paiement à la livraison (COD) au Maroc. Toutes les commandes COD seront confirmées via WhatsApp avant l\'expédition pour garantir une livraison fluide.'
              : 'For added comfort mixed with trust, we offer the Cash on Delivery (COD) option within Morocco. All COD orders will be confirmed via WhatsApp before dispatch to guarantee a seamless delivery.'}
          </p>
        </section>
      </motion.div>
    </div>
  );
};

const styles = {
  wrapper: {
    paddingTop: '150px',
    paddingBottom: '8rem',
    minHeight: '80vh',
    display: 'flex',
    justifyContent: 'center',
  },
  content: {
    maxWidth: '800px',
    width: '100%',
  },
  title: {
    fontSize: '3rem',
    fontWeight: 300,
    marginBottom: '4rem',
    textAlign: 'center',
    letterSpacing: '0.05em',
  },
  section: {
    marginBottom: '3rem',
  },
  sectionTitle: {
    fontSize: '1.5rem',
    fontWeight: 400,
    marginBottom: '1.5rem',
    letterSpacing: '0.05em',
    borderBottom: '1px solid rgba(0,0,0,0.1)',
    paddingBottom: '0.5rem',
  },
  text: {
    fontSize: '1.1rem',
    lineHeight: 1.8,
    color: 'rgba(0,0,0,0.7)',
    fontWeight: 300,
  }
};

export default ShippingReturns;

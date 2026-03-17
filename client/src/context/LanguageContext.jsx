import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const translations = {
  fr: {
    nav: {
      shop: 'Boutique',
      admin: 'Admin',
      login: 'Connexion',
      register: 'S\'inscrire',
      logout: 'Déconnexion',
      home: 'Accueil',
      cart: 'Panier'
    },
    home: {
      hero: {
        title: 'L\'ART DE SE DÉTENDRE',
        subtitle: 'Pyjamas en soie de qualité supérieure et vêtements de détente conçus pour l\'âme moderne.',
        cta: 'Acheter la Collection'
      },
      categories: {
        title: 'Parcourir la Boutique',
        viewAll: 'Voir toutes les séries'
      }
    },
    shop: {
      title: 'LA COLLECTION',
      subtitle: 'Découvrez la pure détente et le luxe. Seulement 10 pièces exclusives par saison.',
      addToCart: 'Ajouter au panier',
      newBadge: 'Nouveau'
    },
    product: {
      details: 'Détails et Entretien',
      shipping: 'Livraison (Paiement à la livraison)',
      freeShipping: 'Livraison gratuite pour les commandes de plus de 1000 MAD. Payez en toute sécurité à la livraison.',
      addedToBag: 'ajouté au panier',
      loading: 'Chargement de la pièce de luxe...'
    },
    cart: {
      title: 'VOTRE PANIER',
      empty: 'Votre panier est actuellement vide.',
      continue: 'Continuer les achats',
      summary: 'RÉSUMÉ DE LA COMMANDE',
      subtotal: 'Sous-total',
      shipping: 'Livraison',
      shippingPrice: 'Calculé à la caisse',
      total: 'Total',
      checkout: 'Passer la commande',
      remove: 'Supprimer'
    },
    footer: {
      tagline: 'Redéfinir le repos de luxe.',
      shop: 'Boutique',
      newArrivals: 'Nouveautés',
      silkPajamas: 'Pyjamas en Soie',
      loungewear: 'Vêtements de détente',
      gifting: 'Cadeaux',
      support: 'Support',
      contact: 'Contactez-nous',
      shippingReturns: 'Livraison & Retours',
      faq: 'FAQ',
      newsletter: 'Rejoignez notre Newsletter',
      newsletterDesc: '10% de réduction sur votre première commande de luxe.',
      join: 'Rejoindre',
      rights: 'Tous droits réservés.'
    },
    admin: {
      console: 'Console Administration',
      subtitle: 'Gérez les opérations de votre boutique de luxe',
      newProduct: 'Nouveau Produit',
      revenue: 'Chiffre d\'affaires',
      orders: 'Commandes totales',
      products: 'Produits',
      customers: 'Clients',
      inventory: 'Gestion des stocks',
      viewFiles: 'Voir les fichiers',
      product: 'Produit',
      category: 'Catégorie',
      price: 'Prix',
      stock: 'Stock',
      actions: 'Actions'
    },
    checkout: {
      title: 'BALOBALI',
      secure: 'PAIEMENT À LA LIVRAISON - CONFIRMATION WHATSAPP',
      contactInfo: 'Informations de Contact',
      shippingAddress: 'Adresse de Livraison',
      email: 'Adresse e-mail',
      phone: 'Numéro de téléphone (WhatsApp)',
      firstName: 'Prénom',
      lastName: 'Nom',
      address: 'Adresse',
      city: 'Ville',
      postalCode: 'Code Postal',
      paymentMethod: 'Mode de Paiement',
      cod: 'Paiement à la livraison (COD)',
      codDesc: 'Payez à la réception de votre commande. Une confirmation via WhatsApp est requise.',
      complete: 'Compléter la commande',
      summary: 'Résumé de la commande'
    },
    auth: {
      signIn: 'SE CONNECTER',
      createAccount: 'CRÉER UN COMPTE',
      access: 'Accédez à votre compte exclusif Balobali.',
      join: 'Rejoignez Balobali pour un accès exclusif et des sorties anticipées.',
      fullName: 'Nom Complet',
      phoneNumber: 'Numéro de Téléphone',
      livingAddress: 'Adresse de Résidence',
      alreadyHave: 'Vous avez déjà un compte ?',
      newTo: 'Nouveau chez Balobali ?',
      login: 'Connexion',
      register: 'S\'inscrire'
    }
  },
  ar: {
    nav: {
      shop: 'متجر',
      admin: 'مسؤول',
      login: 'تسجيل الدخول',
      register: 'تسجيل',
      logout: 'تسجيل الخروج',
      home: 'الرئيسية',
      cart: 'السلة'
    },
    home: {
      hero: {
        title: 'فن الاسترخاء',
        subtitle: 'بيجامات حريرية فاخرة وملابس مريحة مصممة للروح العصرية.',
        cta: 'تسوق المجموعة'
      },
      categories: {
        title: 'تصفح المتجر',
        viewAll: 'عرض كل المجموعات'
      }
    },
    shop: {
      title: 'المجموعة',
      subtitle: 'اكتشف الاسترخاء التام والفخامة. 10 قطع حصرية فقط كل موسم.',
      addToCart: 'أضف إلى السلة',
      newBadge: 'جديد'
    },
    product: {
      details: 'التفاصيل والعناية',
      shipping: 'الشحن (الدفع عند الاستلام)',
      freeShipping: 'شحن مجاني للطلبات التي تزيد عن 1000 درهم. ادفع بأمان عند التسليم.',
      addedToBag: 'تمت إضافته إلى السلة',
      loading: 'جاري تحميل القطعة الفاخرة...'
    },
    cart: {
      title: 'حقيبتك',
      empty: 'حقيبتك فارغة حالياً.',
      continue: 'مواصلة التسوق',
      summary: 'ملخص الطلب',
      subtotal: 'المجموع الفرعي',
      shipping: 'الشحن',
      shippingPrice: 'يتم حسابه عند الدفع',
      total: 'المجموع',
      checkout: 'إتمام الطلب',
      remove: 'إزالة'
    },
    footer: {
      tagline: 'إعادة تعريف وقت الراحة الفاخر.',
      shop: 'المتجر',
      newArrivals: 'وصلنا حديثاً',
      silkPajamas: 'بيجامات حريرية',
      loungewear: 'ملابس مريحة',
      gifting: 'هدايا',
      support: 'الدعم',
      contact: 'اتصل بنا',
      shippingReturns: 'الشحن والإرجاع',
      faq: 'الأسئلة الشائعة',
      newsletter: 'انضم إلى نشرتنا الإخبارية',
      newsletterDesc: 'خصم 10% على أول طلب فاخر لك.',
      join: 'انضمام',
      rights: 'جميع الحقوق محفوظة.'
    },
    admin: {
      console: 'لوحة التحكم',
      subtitle: 'إدارة عمليات متجرك الفاخر',
      newProduct: 'منتج جديد',
      revenue: 'إجمالي الإيرادات',
      orders: 'إجمالي الطلبات',
      products: 'المنتجات',
      customers: 'العملاء',
      inventory: 'إدارة المخزون',
      viewFiles: 'عرض الملفات',
      product: 'المنتج',
      category: 'الفئة',
      price: 'السعر',
      stock: 'المخزون',
      actions: 'إجراءات'
    },
    checkout: {
      title: 'بالوبالي',
      secure: 'الدفع عند الاستلام - تأكيد عبر واتساب',
      contactInfo: 'معلومات الاتصال',
      shippingAddress: 'عنوان الشحن',
      email: 'البريد الإلكتروني',
      phone: 'رقم الهاتف (واتساب)',
      firstName: 'الاسم الأول',
      lastName: 'الاسم العائلي',
      address: 'العنوان',
      city: 'المدينة',
      postalCode: 'الرمز البريدي',
      paymentMethod: 'طريقة الدفع',
      cod: 'الدفع عند الاستلام (COD)',
      codDesc: 'ادفع عند استلام طلبك. يلزم التأكيد عبر الواتساب.',
      complete: 'إكمال الطلب',
      summary: 'ملخص الطلب'
    },
    auth: {
      signIn: 'تسجيل الدخول',
      createAccount: 'إنشاء حساب',
      access: 'الدخول إلى حساب بالوبالي الحصري الخاص بك.',
      join: 'انضم إلى بالوبالي للحصول على وصول حصري وإصدارات مبكرة.',
      fullName: 'الاسم الكامل',
      phoneNumber: 'رقم الهاتف',
      livingAddress: 'عنوان السكن',
      alreadyHave: 'هل لديك حساب بالفعل؟',
      newTo: 'جديد في بالوبالي؟',
      login: 'تسجيل الدخول',
      register: 'إنشاء حساب'
    }
  },
  en: {
    nav: {
      shop: 'Shop',
      admin: 'Admin',
      login: 'Login',
      register: 'Register',
      logout: 'Logout',
      home: 'Home',
      cart: 'Cart'
    },
    home: {
      hero: {
        title: 'THE ART OF UNWINDING',
        subtitle: 'Premium silk pajamas and loungewear crafted for the modern soul.',
        cta: 'Shop the Collection'
      },
      categories: {
        title: 'Browse Store',
        viewAll: 'View All Series'
      }
    },
    shop: {
      title: 'THE COLLECTION',
      subtitle: 'Discover pure relaxation & luxury. Only 10 exclusive pieces per season.',
      addToCart: 'Add to Cart',
      newBadge: 'New'
    },
    product: {
      details: 'Details & Care',
      shipping: 'Shipping (Cash on Delivery)',
      freeShipping: 'Complimentary shipping on orders over 1000 MAD. Pay securely upon delivery.',
      addedToBag: 'added to bag',
      loading: 'Loading luxury piece...'
    },
    cart: {
      title: 'YOUR BAG',
      empty: 'Your bag is currently empty.',
      continue: 'Continue Shopping',
      summary: 'ORDER SUMMARY',
      subtotal: 'Subtotal',
      shipping: 'Shipping',
      shippingPrice: 'Calculated at checkout',
      total: 'Total',
      checkout: 'Checkout',
      remove: 'Remove'
    },
    footer: {
      tagline: 'Redefining luxury downtime.',
      shop: 'Shop',
      newArrivals: 'New Arrivals',
      silkPajamas: 'Silk Pajamas',
      loungewear: 'Loungewear',
      gifting: 'Gifting',
      support: 'Support',
      contact: 'Contact Us',
      shippingReturns: 'Shipping & Returns',
      faq: 'FAQ',
      newsletter: 'Join Our Newsletter',
      newsletterDesc: '10% off your first luxury order.',
      join: 'Join',
      rights: 'All rights reserved.'
    },
    admin: {
      console: 'Admin Console',
      subtitle: 'Manage your luxury boutique operations',
      newProduct: 'New Product',
      revenue: 'Total Revenue',
      orders: 'Total Orders',
      products: 'Products',
      customers: 'Customers',
      inventory: 'Inventory Management',
      viewFiles: 'View Files',
      product: 'Product',
      category: 'Category',
      price: 'Price',
      stock: 'Stock',
      actions: 'Actions'
    },
    checkout: {
      title: 'BALOBALI',
      secure: 'CASH ON DELIVERY - WHATSAPP CONFIRMATION',
      contactInfo: 'Contact Information',
      shippingAddress: 'Shipping Address',
      email: 'Email Address',
      phone: 'Phone Number (WhatsApp)',
      firstName: 'First Name',
      lastName: 'Last Name',
      address: 'Address',
      city: 'City',
      postalCode: 'Postal Code',
      paymentMethod: 'Payment Method',
      cod: 'Cash on Delivery (COD)',
      codDesc: 'Pay when you receive your order. Confirmation via WhatsApp is required.',
      complete: 'Complete Order',
      summary: 'Order Summary'
    },
    auth: {
      signIn: 'SIGN IN',
      createAccount: 'CREATE ACCOUNT',
      access: 'Access your exclusive Balobali account.',
      join: 'Join Balobali for exclusive access & early releases.',
      fullName: 'Full Name',
      phoneNumber: 'Phone Number',
      livingAddress: 'Living Address',
      alreadyHave: 'Already have an account?',
      newTo: 'New to Balobali?',
      login: 'Sign In',
      register: 'Create Account'
    }
  }
};

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('lang') || 'fr'; // French as default as per user request (main languages FR, AR)
  });

  useEffect(() => {
    localStorage.setItem('lang', lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  const t = (path) => {
    const keys = path.split('.');
    let value = translations[lang];
    for (const key of keys) {
      value = value?.[key];
    }
    return value || path;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);

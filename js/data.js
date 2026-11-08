/**
 * Dados da loja e do catálogo.
 * Para adicionar/editar produtos, edite o array PRODUCTS abaixo.
 * price: 0 significa produto ESGOTADO (o site trata automaticamente).
 */

const STORE = {
  name: "PS Perfumes Importados",
  shortName: "PS",
  tagline: "Perfumaria importada de alta fragrância",
  whatsapp: "5581982418341",
  whatsappDisplay: "+55 81 98241-8341",
  instagram: "@ps.perfumesimportados",
  instagramUrl: "https://instagram.com/ps.perfumesimportados",
};

const CATEGORIES = [
  { slug: "todos", label: "Todos" },
  { slug: "masculinos", label: "Masculinos" },
  { slug: "femininos", label: "Femininos" },
  { slug: "cremes", label: "Cremes/Body Splash" },
  { slug: "kit", label: "Kit" },
  { slug: "miniaturas", label: "Miniaturas 30ml" },
  { slug: "decants", label: "Decants" },
  { slug: "outros", label: "Outros" },
];

const PRODUCTS = [
  // Masculinos
  { code: "014", name: "Adyan Sharf", category: "masculinos", price: 225.0, image: "assets/products/adyan-sharf.jpg" },
  { code: null, name: "Aquilo", category: "masculinos", price: 0, image: "assets/products/aquilo.jpg" },
  { code: "020", name: "Asad Black", category: "masculinos", price: 0, image: "assets/products/asad-black.jpg" },
  { code: "001", name: "Asad Elixir", category: "masculinos", price: 0, image: "assets/products/asad-elixir.jpg" },
  { code: "006", name: "Attar al Wesal", category: "masculinos", price: 0, image: "assets/products/attar-al-wesal.jpg" },
  { code: "005", name: "Attar al Wesal Gold", category: "masculinos", price: 235.0, image: "assets/products/attar-al-wesal-gold.jpg" },

  // Femininos
  { code: "024", name: "Amber Rouge", category: "femininos", price: 560.0, image: "assets/products/amber-rouge.jpg" },
  { code: "028", name: "Amerat Al Arab Red", category: "femininos", price: 199.0, image: "assets/products/amerat-al-arab-red.jpg" },
  { code: "025", name: "Amerat al Wataniah", category: "femininos", price: 195.0, image: "assets/products/amerat-al-wataniah.jpg" },
  { code: "029", name: "Chants Tanderina", category: "femininos", price: 199.0, image: "assets/products/chants-tanderina.jpg" },
  { code: "022", name: "CK One 200ml", category: "femininos", price: 0, image: "assets/products/ck-one-200ml.jpg" },
  { code: null, name: "Club de Nuit Woman", category: "femininos", price: 285.0, image: "assets/products/club-de-nuit-woman.jpg" },

  // Cremes / Body Splash
  { code: null, name: "Body Splash Sabah Sugar", category: "cremes", price: 90.0, image: "assets/products/body-splash-sabah-sugar.jpg" },
  { code: null, name: "Body Splash Asad Elixir da Afeer", category: "cremes", price: 90.0, image: "assets/products/body-splash-asad-elixir-da-afeer.jpg" },
  { code: null, name: "Body Splash Atheeri Abelhinha", category: "cremes", price: 90.0, image: "assets/products/body-splash-atheeri-abelhinha.jpg" },
  { code: "043", name: "Body Splash Atheeri da Afeer", category: "cremes", price: 90.0, image: "assets/products/body-splash-atheeri-da-afeer.jpg" },
  { code: null, name: "Body Splash Delilah", category: "cremes", price: 110.0, image: "assets/products/body-splash-delilah.jpg" },
  { code: null, name: "Body Splash Nuit Royale", category: "cremes", price: 90.0, image: "assets/products/body-splash-nuit-royale.jpg" },

  // Kit
  { code: null, name: "Kit 3 Sabonetes Abelhinha da Afeer", category: "kit", price: 75.0, image: "assets/products/kit-3-sabonetes-abelhinha-da-afeer.png" },
  { code: null, name: "Kit 3 Sabonetes da Yara", category: "kit", price: 75.0, image: "assets/products/kit-3-sabonetes-da-yara.jpg" },
  { code: null, name: "Kit 3 Sabonetes Fakhar Black", category: "kit", price: 75.0, image: "assets/products/kit-3-sabonetes-fakhar-black.jpg" },
  { code: null, name: "Kit 3 Sabonetes Fakhar Rose", category: "kit", price: 75.0, image: "assets/products/kit-3-sabonetes-fakhar-rose.jpg" },
  { code: null, name: "Kit 3 Sabonetes Nuit Royale", category: "kit", price: 75.0, image: "assets/products/kit-3-sabonetes-nuit-royale.jpg" },
  { code: null, name: "Kit 3 Sabonetes Royal Amber", category: "kit", price: 75.0, image: "assets/products/kit-3-sabonetes-royal-amber.jpg" },

  // Miniaturas 30ml
  { code: null, name: "Miniatura Delilah Afeer", category: "miniaturas", price: 80.0, image: "assets/products/miniatura-delilah-afeer.jpg" },
  { code: "056", name: "Fakhar Rose 30ml", category: "miniaturas", price: 80.0, image: "assets/products/fakhar-rose-30ml.jpg" },
  { code: "052", name: "Jardin de Rêve 30ml", category: "miniaturas", price: 0, image: "assets/products/jardin-de-reve-30ml.jpg" },
  { code: null, name: "Jean Lowe Immortal 30ml", category: "miniaturas", price: 80.0, image: "assets/products/jean-lowe-immortal-30ml.jpg" },
  { code: null, name: "Jean Lowe Noir", category: "miniaturas", price: 80.0, image: "assets/products/jean-lowe-noir.jpg" },
  { code: "054", name: "Love Collection Herba 30ml", category: "miniaturas", price: 80.0, image: "assets/products/love-collection-herba-30ml.jpg" },

  // Decants
  { code: null, name: "Decant 10ml Issey Miyake Sport", category: "decants", price: 65.0, image: "assets/products/decant-10ml-issey-miyake-sport.jpg" },
  { code: null, name: "Decant 10ml Jardin de Rêve", category: "decants", price: 45.0, image: "assets/products/decant-10ml-jardin-de-reve.jpg" },
  { code: null, name: "Decant 10ml Delilah", category: "decants", price: 45.0, image: "assets/products/decant-10ml-delilah.jpg" },
  { code: null, name: "Decant 5ml Jardin de Rêve", category: "decants", price: 25.0, image: "assets/products/decant-5ml-jardin-de-reve.jpg" },
  { code: null, name: "Decant 10ml Sabah al Ward", category: "decants", price: 45.0, image: "assets/products/decant-10ml-sabah-al-ward.jpg" },
  { code: null, name: "Decant 10ml Issey Feminino", category: "decants", price: 65.0, image: "assets/products/decant-10ml-issey-feminino.jpg" },

  // Outros
  { code: null, name: "Body Splash Asad da Afeer", category: "outros", price: 90.0, image: "assets/products/body-splash-asad-da-afeer.jpg" },
];

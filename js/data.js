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
  { code: "014", name: "Adyan Sharf", category: "masculinos", price: 225.0 },
  { code: null, name: "Aquilo", category: "masculinos", price: 0 },
  { code: "020", name: "Asad Black", category: "masculinos", price: 0 },
  { code: "001", name: "Asad Elixir", category: "masculinos", price: 0 },
  { code: "006", name: "Attar al Wesal", category: "masculinos", price: 0 },
  { code: "005", name: "Attar al Wesal Gold", category: "masculinos", price: 235.0 },

  // Femininos
  { code: "024", name: "Amber Rouge", category: "femininos", price: 560.0 },
  { code: "028", name: "Amerat Al Arab Red", category: "femininos", price: 199.0 },
  { code: "025", name: "Amerat al Wataniah", category: "femininos", price: 195.0 },
  { code: "029", name: "Chants Tanderina", category: "femininos", price: 199.0 },
  { code: "022", name: "CK One 200ml", category: "femininos", price: 0 },
  { code: null, name: "Club de Nuit Woman", category: "femininos", price: 285.0 },

  // Cremes / Body Splash
  { code: null, name: "Body Splash Sabah Sugar", category: "cremes", price: 90.0 },
  { code: null, name: "Body Splash Asad Elixir da Afeer", category: "cremes", price: 90.0 },
  { code: null, name: "Body Splash Atheeri Abelhinha", category: "cremes", price: 90.0 },
  { code: "043", name: "Body Splash Atheeri da Afeer", category: "cremes", price: 90.0 },
  { code: null, name: "Body Splash Delilah", category: "cremes", price: 110.0 },
  { code: null, name: "Body Splash Nuit Royale", category: "cremes", price: 90.0 },

  // Kit
  { code: null, name: "Kit 3 Sabonetes Abelhinha da Afeer", category: "kit", price: 75.0 },
  { code: null, name: "Kit 3 Sabonetes da Yara", category: "kit", price: 75.0 },
  { code: null, name: "Kit 3 Sabonetes Fakhar Black", category: "kit", price: 75.0 },
  { code: null, name: "Kit 3 Sabonetes Fakhar Rose", category: "kit", price: 75.0 },
  { code: null, name: "Kit 3 Sabonetes Nuit Royale", category: "kit", price: 75.0 },
  { code: null, name: "Kit 3 Sabonetes Royal Amber", category: "kit", price: 75.0 },

  // Miniaturas 30ml
  { code: null, name: "Miniatura Delilah Afeer", category: "miniaturas", price: 80.0 },
  { code: "056", name: "Fakhar Rose 30ml", category: "miniaturas", price: 80.0 },
  { code: "052", name: "Jardin de Rêve 30ml", category: "miniaturas", price: 0 },
  { code: null, name: "Jean Lowe Immortal 30ml", category: "miniaturas", price: 80.0 },
  { code: null, name: "Jean Lowe Noir", category: "miniaturas", price: 80.0 },
  { code: "054", name: "Love Collection Herba 30ml", category: "miniaturas", price: 80.0 },

  // Decants
  { code: null, name: "Decant 10ml Issey Miyake Sport", category: "decants", price: 65.0 },
  { code: null, name: "Decant 10ml Jardin de Rêve", category: "decants", price: 45.0 },
  { code: null, name: "Decant 10ml Delilah", category: "decants", price: 45.0 },
  { code: null, name: "Decant 5ml Jardin de Rêve", category: "decants", price: 25.0 },
  { code: null, name: "Decant 10ml Sabah al Ward", category: "decants", price: 45.0 },
  { code: null, name: "Decant 10ml Issey Feminino", category: "decants", price: 65.0 },

  // Outros
  { code: null, name: "Body Splash Asad da Afeer", category: "outros", price: 90.0 },
];

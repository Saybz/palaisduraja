// Configuration SEO centralisée pour le site Palais du Raja
export const seoConfig = {
  siteName: "Palais du Raja",
  siteUrl: "https://palaisduraja.fr",
  defaultTitle: "Palais du Raja | Restaurant Indien à Tours | Cuisine Traditionnelle",
  defaultDescription:
    "Restaurant indien et pakistanais traditionnel à Tours. Découvrez une cuisine authentique, des spécialités épicées et une ambiance chaleureuse. Réservation au 02 47 64 81 55. Ouvert du mardi soir au dimanche.",
  keywords: [
    "restaurant indien Tours",
    "restaurant pakistanais Tours",
    "cuisine indienne Tours",
    "spécialités indiennes",
    "curry Tours",
    "naan Tours",
    "restaurant Tours",
    "Palais du Raja",
    "restaurant traditionnel Tours",
    "cuisine épicée Tours",
    "restaurant rue Colbert Tours",
    "réservation restaurant Tours",
    "restaurant indien Centre-Val de Loire",
    "biryani Tours",
    "tandoori Tours",
    "plats végétariens Tours",
    "restaurant halal Tours",
  ],
  contact: {
    phone: "+33247648155",
    email: "contact@palaisduraja.fr", // À mettre à jour avec l'email réel
    address: {
      street: "113 rue Colbert",
      city: "Tours",
      postalCode: "37000",
      region: "Centre-Val de Loire",
      country: "FR",
    },
    coordinates: {
      latitude: 47.395992871171224,
      longitude: 0.689015977602613,
    },
  },
  openingHours: {
    description: "Ouvert du mardi soir au dimanche",
    structured: [
      {
        day: ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "19:00",
        closes: "22:30",
      },
      {
        day: ["Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "12:00",
        closes: "14:00",
      },
    ],
  },
  social: {
    // Ajoutez vos réseaux sociaux ici quand vous les aurez
    facebook: "", // "https://www.facebook.com/palaisduraja"
    instagram: "", // "https://www.instagram.com/palaisduraja"
    tripadvisor: "", // "https://www.tripadvisor.fr/Restaurant..."
    googleMaps:
      "https://www.google.com/maps/place/Le+Palais+du+Rajah+(Rajasthan)/@47.395992871171224,0.689015977602613",
  },
};


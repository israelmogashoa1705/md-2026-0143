
export const services = [
  {
    id: "general",
    name: "General consultation",
    category: "Primary care",
    duration: "30 minutes",
    description:
      "Talk to a healthcare practitioner about a general health concern.",
    practitioners: [
      "Dr. Naledi Mokoena",
      "Nurse Thabo Dlamini"
    ],
    includes: [
      "General health assessment",
      "Discussion of health concerns",
      "Guidance on available treatment"
    ],
    audience:
      "People who need help with general health concerns.",
    preparation:
      "Bring any relevant medical information."
  },

  {
    id: "screening",
    name: "Preventive health screening",
    category: "Prevention",
    duration: "30 minutes",
    description:
      "A routine screening appointment to discuss your general wellbeing.",
    practitioners: [
      "Nurse Thabo Dlamini",
      "Nurse Ayesha Khan"
    ],
    includes: [
      "Basic health checks",
      "Preventive health guidance",
      "Wellbeing discussion"
    ],
    audience:
      "People interested in monitoring their general health.",
    preparation:
      "Bring your identification and relevant medical information."
  },

  {
    id: "maternal",
    name: "Maternal and family health",
    category: "Family health",
    duration: "45 minutes",
    description:
      "Support and guidance for maternal and family health needs.",
    practitioners: [
      "Nurse Ayesha Khan",
      "Dr. Naledi Mokoena"
    ],
    includes: [
      "Maternal health guidance",
      "Family health support",
      "General health advice"
    ],
    audience:
      "Families and individuals seeking maternal or family health support.",
    preparation:
      "Bring any relevant medical records."
  },

  {
    id: "wellness",
    name: "Wellness support",
    category: "Wellbeing",
    duration: "30 minutes",
    description:
      "Discuss healthy routines, wellbeing, and available community support.",
    practitioners: [
      "Dr. Naledi Mokoena"
    ],
    includes: [
      "Wellbeing discussion",
      "Healthy lifestyle guidance",
      "Community support information"
    ],
    audience:
      "People looking for general wellbeing support.",
    preparation:
      "Think about any wellbeing concerns you would like to discuss."
  }
];

// Categories used by the service directory filters.
export const categories = [
  "All services",
  "Primary care",
  "Prevention",
  "Family health",
  "Wellbeing"
];

// Simulated appointment availability.
// This is demonstration data, not a live clinic booking system.
export function fetchAvailability(practitioner) {
  if (!practitioner) {
    return [];
  }

  return [
    "09:00",
    "10:00",
    "11:00",
    "14:00",
    "15:00"
  ];
}


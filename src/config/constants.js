// Enviroplan - Constants Configuration
// Centralized values for grant amounts, deadlines, and program descriptions
// Updated for 2025/2026 regulatory changes

/**
 * Funding amounts for various grant programs
 * Values based on NFOŚiGW documentation for 2025/2026
 */
export const FUNDING_AMOUNTS = {
  // Czyste Powietrze - Maximum at Najwyższy Poziom (complex retrofit with PV + heat pump)
  CZYSTE_POWIETRZE_MAX: "136 200 zł",
  // Czyste Powietrze - Minimum at Poziom Podstawowy
  CZYSTE_POWIETRZE_MIN: "66 000 zł",
  // ZUS - Konkurs Prewencyjny 2025/2026 (inwestycje w BHP)
  ZUS_MAX: "300 000 zł",
  // Mój Prąd 7.0 - Forecast for PV + energy storage (launch Q1 2026)
  MOJ_PRAD_MAX: "28 000 zł",
  // Kredyt Ekologiczny (FENG/BGK) - funding intensity range
  KREDYT_EKOLOGICZNY: "do 80%",
  // Refunded energy audit cost (required for highest grant level)
  AUDYT_REFUND: "1 200 zł"
};

/**
 * Program deadlines and timelines
 */
export const DEADLINES = {
  // Mój Prąd 7.0 expected launch
  MOJ_PRAD_7_START: "I kwartał 2026",
  // ZUS competition window 2025/2026
  ZUS_2026_START: "luty-marzec 2026",
  // Ecological Credit (FENG) expected windows
  FENG_2025: "IV kwartał 2025",
  FENG_2026: "I kwartał 2026"
};

/**
 * Program descriptions for consistent messaging across the application
 */
export const PROGRAM_DESCRIPTIONS = {
  CZYSTE_POWIETRZE: "Program Priorytetowy NFOŚiGW",
  MOJ_PRAD_7: "Przygotowanie do Mój Prąd 7.0 (2026) – PV z Magazynem Energii",
  AUDYT_REFUNDOWANY: "Audyt Energetyczny 100% Refundowany (do 1200 zł) przy realizacji inwestycji",
  ZUS_BHP: "Dotacje ZUS na poprawę bezpieczeństwa pracy (wentylacja, oświetlenie, maszyny)"
};

/**
 * Contact information
 */
export const CONTACT = {
  phone: "+48 579 517 423",
  email: "kontakt@enviroplan.pl",
  address: "ul. św. Michala 30, 62-200 Gniezno",
  locality: "Gniezno",
  postalCode: "62-200",
  country: "PL"
};

/**
 * Income thresholds for Czyste Powietrze program
 * Note: These values are subject to indexation - use ranges in UI, not exact grosz amounts
 */
export const INCOME_THRESHOLDS = {
  PODSTAWOWY: {
    desc: "Poniżej 135 000 zł rocznie",
    value: 135000
  },
  PODWYŻSZONY: {
    desc: "Poniżej progów podwyższonych (wymagane zaświadczenie z gminy)",
    note: "Próg waloryzowany, realnie ok. 2 250 zł / 3 150 zł na osobę"
  },
  NAJWYŻSZY: {
    desc: "Poniżej progów najwyższych (wymagane zaświadczenie z gminy)",
    note: "Próg waloryzowany, realnie ok. 1 300 zł / 1 800 zł na osobę"
  }
};

/**
 * Grant calculation ranges for calculator (estimated values)
 */
export const GRANT_RANGES = {
  DOM_NAJWYŻSZY: "99 000 - 136 200 zł",
  DOM_PODWYŻSZONY: "66 000 - 99 000 zł",
  DOM_PODSTAWOWY: "30 000 - 66 000 zł"
};

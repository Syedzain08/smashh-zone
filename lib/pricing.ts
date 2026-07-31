export type PassTierKey = "rhythm" | "champion" | "elite";
export type PassTier = "RHYTHM" | "CHAMPION" | "ELITE";

export interface PassFeature {
  label: string;
  included: boolean;
}

export interface PassVariant {
  slug: PassTierKey;
  tier: PassTier;
  label: string;
  tagline: string;
  /** Price in paisa (1 PKR = 100 paisa) */
  price: number;
  totalTickets: number;
  popular?: boolean;
  features: PassFeature[];
}

export const VARIANTS: Record<PassTierKey, PassVariant> = {
  rhythm: {
    slug: "rhythm",
    tier: "RHYTHM",
    label: "The Rhythm Pass",
    tagline: "Concert Only Access",
    price: 199900,
    totalTickets: 2300,
    features: [
      { label: "Badminton Access", included: false },
      { label: "Base Concert Access", included: true },
      { label: "VIP Concert Access", included: false },
      { label: "Front Row Seats", included: false },
    ],
  },
  champion: {
    slug: "champion",
    tier: "CHAMPION",
    label: "The Champion Pass",
    tagline: "Badminton + Concert Access",
    price: 229900,
    totalTickets: 1000,
    popular: true,
    features: [
      { label: "Badminton Access", included: true },
      { label: "Base Concert Access", included: true },
      { label: "VIP Concert Access", included: false },
      { label: "Front Row Seats", included: false },
    ],
  },
  elite: {
    slug: "elite",
    tier: "ELITE",
    label: "The Elite Pass",
    tagline: "VIP Experience + Badminton Access",
    price: 499900,
    totalTickets: 200,
    features: [
      { label: "Badminton Access", included: true },
      { label: "Base Concert Access", included: true },
      { label: "VIP Concert Access", included: true },
      { label: "Front Row Seats", included: true },
    ],
  },
};



const DELEGATION_DISCOUNT_PER_TICKET_PAISA = 100 * 100;

// MDR: 2.9% + Rs 30 flat (Safepay's published domestic card rate)
const MDR_PERCENTAGE_RATE = 0.029;
const MDR_FLAT_PAISA = 30 * 100;

// Tax buffer: 1% income tax + 2% sales tax withheld + 0.4% tax-on-MDR = 3.4%
const TAX_BUFFER_RATE = 0.034;

// Temporary flat safety buffer 
const SAFETY_BUFFER_PAISA = 50 * 100;

const PERCENTAGE_RATE = MDR_PERCENTAGE_RATE + TAX_BUFFER_RATE; // 0.063
const FLAT_FEE_PAISA = MDR_FLAT_PAISA + SAFETY_BUFFER_PAISA; // Rs 80

export interface PricingResult {
  grossSubtotalPaisa: number;
  totalDiscountPaisa: number;
  netSubtotalPaisa: number;
  processingFeePaisa: number;
  totalAmountPaisa: number;
  isDelegation: boolean;
}

export default function computePricing(
  price: number,
  quantity: number,
  tierLabel: string,
  affiliation: string
): PricingResult {
  const isEligibleForDelegation = tierLabel !== "The Rhythm Pass" && affiliation !== "Private";
  const isDelegation = isEligibleForDelegation && quantity >= 5;

  const totalDiscountPaisa = isDelegation ? quantity * DELEGATION_DISCOUNT_PER_TICKET_PAISA : 0;
  const grossSubtotalPaisa = price * quantity;
  const netSubtotalPaisa = Math.max(0, grossSubtotalPaisa - totalDiscountPaisa);

  // Solve: totalAmount - (PERCENTAGE_RATE * totalAmount) - FLAT_FEE = netSubtotal
  // => totalAmount = (netSubtotal + FLAT_FEE) / (1 - PERCENTAGE_RATE)
  const totalAmountPaisa = Math.ceil((netSubtotalPaisa + FLAT_FEE_PAISA) / (1 - PERCENTAGE_RATE));
  const processingFeePaisa = totalAmountPaisa - netSubtotalPaisa;

  return {
    grossSubtotalPaisa,
    totalDiscountPaisa,
    netSubtotalPaisa,
    processingFeePaisa,
    totalAmountPaisa,
    isDelegation,
  };
}
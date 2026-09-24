export type PassTierKey = "rhythm" | "champion" | "test";
export type PassTier = "RHYTHM" | "CHAMPION" | "TEST";

export interface PassFeature {
  label: string;
  included: boolean;
}

export interface PassVariant {
  tierKey: PassTierKey;
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
    tierKey: "rhythm",
    tier: "RHYTHM",
    label: "The Rhythm Pass",
    tagline: "DJ Night Only Access",
    price: 169900,
    totalTickets: 2500,
    features: [
      { label: "Badminton Access", included: false },
      { label: "DJ Night Access", included: true },
      { label: "Front Row Access", included: false },
    ],
  },
  champion: {
    tierKey: "champion",
    tier: "CHAMPION",
    label: "The Champion Pass",
    tagline: "Badminton + DJ Night Access",
    price: 199900,
    totalTickets: 1000,
    popular: true,
    features: [
      { label: "Badminton Access", included: true },
      { label: "DJ Night Access", included: true },
      { label: "Front Row Access", included: true },
    ],
  },
  test: {
    tierKey: "test",
    tier: "TEST",
    label: "Test Pass",
    tagline: "Internal test product",
    price: 5000, // Rs. 50
    totalTickets: 50,
    features: [
      { label: "Badminton Access", included: false },
      { label: "Base DJ Night Access", included: false },
      { label: "VIP DJ Night Access", included: false },
      { label: "Front Row Seats", included: false },
    ],
  },
};

const DELEGATION_DISCOUNT_PER_TICKET_PAISA = 100 * 100;

// MDR: 2.9% + Rs 30 flat (Safepay's published domestic card rate)
const MDR_PERCENTAGE_RATE = 0.029;
const MDR_FLAT_PAISA = 30 * 100;

// Sales tax is charged on the MDR fee itself (16% of MDR).
const SALES_TAX_ON_MDR_RATE = 0.16;
const SALES_TAX_ON_MDR_PERCENTAGE_RATE = SALES_TAX_ON_MDR_RATE * MDR_PERCENTAGE_RATE;
const SALES_TAX_ON_MDR_FLAT_PAISA = SALES_TAX_ON_MDR_RATE * MDR_FLAT_PAISA;
const WITHHOLDING_INCOME_TAX_RATE = 0.01;

const PERCENTAGE_RATE = MDR_PERCENTAGE_RATE + SALES_TAX_ON_MDR_PERCENTAGE_RATE + WITHHOLDING_INCOME_TAX_RATE;

const FLAT_FEE_PAISA = MDR_FLAT_PAISA + SALES_TAX_ON_MDR_FLAT_PAISA;

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
  affiliation: string,
  tierKey?: PassTierKey
): PricingResult {
  void tierKey;
  const isEligibleForDelegation = tierLabel !== "The Rhythm Pass" && affiliation !== "Private";
  const isDelegation = isEligibleForDelegation && quantity >= 5;

  const totalDiscountPaisa = isDelegation ? quantity * DELEGATION_DISCOUNT_PER_TICKET_PAISA : 0;
  const grossSubtotalPaisa = price * quantity;
  const netSubtotalPaisa = Math.max(0, grossSubtotalPaisa - totalDiscountPaisa);

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
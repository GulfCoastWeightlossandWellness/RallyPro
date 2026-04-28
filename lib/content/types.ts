export type ProductCategory = "flagship" | "fiber" | "blend" | "mineral" | "system";

export type Product = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  /** U.S.-market English; structure/function oriented */
  story: string[];
  bullets: string[];
  priceMonthly: number;
  priceOneTime: number;
  badge?: string;
  /** When true, shows expandable “Needs Legal Review” for U.S. copy & claims */
  legalReview?: boolean;
  category: ProductCategory;
  heroImage: string;
  detailImage?: string;
  sourceUrl?: string;
};

export type FaqGroup = "product" | "taking" | "safety" | "ingredients" | "manufacturing" | "subscription";

export type FaqItem = {
  question: string;
  answer: string;
  group: FaqGroup;
};

export type IngredientRow = {
  category: "Prebiotic" | "Probiotic" | "Digestive Support" | "Other";
  name: string;
  latin: string;
  form: string;
  dose: string;
  source: string;
  tested: string[];
  note: string;
};

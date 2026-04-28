import type { IngredientRow } from "./types";

/** Illustrative transparency table — replace with final Supplement Facts / COA-backed rows */
export const flagshipIngredients: IngredientRow[] = [
  {
    category: "Prebiotic",
    name: "Sunroot Inulin",
    latin: "Helianthus tuberosus (Jerusalem artichoke) extract",
    form: "Granulated powder",
    dose: "5,000 mg †",
    source: "Armenia — verify on label",
    tested: ["Identity", "Potency", "Heavy metals"],
    note: "Described on Rally Sunroot as grown without chemical fertilizer with patented extraction (AM2018013Y). Confirm on U.S. label.",
  },
  {
    category: "Probiotic",
    name: "Multi-strain blend (placeholder)",
    latin: "Species-level listing pending final blend",
    form: "Freeze-dried cultures",
    dose: "TBD CFU ‡",
    source: "Certified suppliers — TBD",
    tested: ["Strain ID", "CFU at expiry"],
    note: "Do not publish strain counts from marketing screenshots until they match the master formula and COA.",
  },
  {
    category: "Digestive Support",
    name: "Polyphenol support complex (optional)",
    latin: "Botanical extracts — TBD",
    form: "Standardized extracts",
    dose: "TBD",
    source: "TBD",
    tested: ["Identity"],
    note: "If you follow the Rally Pro.md Option B split (AM/PM), align actives to the actual certificate.",
  },
];

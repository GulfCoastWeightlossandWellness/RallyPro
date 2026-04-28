import type { FaqItem } from "./types";

export const faqItems: FaqItem[] = [
  {
    group: "product",
    question: "How is Daily Gut System different from a standard probiotic?",
    answer:
      "Many products deliver only live cultures. Daily Gut System is merchandised as three complementary roles — prebiotic substrate, probiotic blend, and digestive-support nutrients — so the routine addresses the whole daily architecture, not a single ingredient. Exact formulation text follows your finished U.S. label.",
  },
  {
    group: "product",
    question: "What is sunroot inulin?",
    answer:
      "Sunroot refers to Jerusalem artichoke (Helianthus tuberosus). Inulin is a soluble dietary fiber fermented in the colon and discussed in the literature as a prebiotic — it helps nourish beneficial bacteria.† Armenian sourcing emphasizes controlled growing without chemical fertilizer and a patented extraction process; confirm all statements on your final packaging.",
  },
  {
    group: "taking",
    question: "When should I take it?",
    answer:
      "Follow the Directions on your product label once it is finalized. A common pattern for two-part systems is morning and evening separation — your clinician can personalize timing if you take prescription drugs.",
  },
  {
    group: "safety",
    question: "Who should talk to a clinician first?",
    answer:
      "Anyone who is pregnant or breastfeeding, immunocompromised, preparing for surgery, or managing a diagnosed GI disorder should speak with a qualified healthcare provider before starting any new supplement.",
  },
  {
    group: "ingredients",
    question: "Why do some products show “Needs Legal Review”?",
    answer:
      "SKUs carried over from the Armenian catalog — especially those naming “detox” or featuring zeolite — need U.S. supplement counsel to finalize structure/function claims, labeling, and import strategy before you run paid traffic or checkout.",
  },
  {
    group: "manufacturing",
    question: "Where is Rally Sunroot product manufactured?",
    answer:
      "Public Armenian materials state production in Armenia with patented technology. Your U.S. site should repeat only what is true for the finished goods you actually sell stateside (facility, certifications, testing).",
  },
  {
    group: "subscription",
    question: "How will subscriptions work?",
    answer:
      "This preview uses static pricing. Production builds should implement Shopify + Skio (or equivalent) with FTC-compliant cancellation paths — see Rally Pro.md Section 15.",
  },
];

export function getFaqsByGroup(): Record<string, FaqItem[]> {
  return faqItems.reduce<Record<string, FaqItem[]>>((acc, item) => {
    acc[item.group] ??= [];
    acc[item.group].push(item);
    return acc;
  }, {});
}

import type { Metadata } from "next";
import Link from "next/link";
import { flagshipIngredients } from "@/lib/content/ingredients";
import { Container, Eyebrow, FdaDisclaimer } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Ingredients — Full Transparency",
};

export default function IngredientsPage() {
  return (
    <div className="border-b border-line py-16 md:py-24">
      <Container>
        <Eyebrow>Ingredients</Eyebrow>
        <h1 className="max-w-xl font-display text-4xl font-normal text-charcoal md:text-5xl">
          Every ingredient, disclosed
        </h1>
        <p className="mt-6 max-w-xl text-graphite leading-relaxed">
          Illustrative table until your master specification syncs. Replace doses and strains with
          label-accurate data before launch.
        </p>
        <div className="mt-12 overflow-x-auto rounded-md border border-line">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="bg-paper text-[10px] font-bold uppercase tracking-wider text-mineral">
              <tr>
                <th className="px-4 py-3">Ingredient</th>
                <th className="px-4 py-3">Details</th>
                <th className="px-4 py-3">Dose</th>
                <th className="px-4 py-3">Testing</th>
              </tr>
            </thead>
            <tbody>
              {flagshipIngredients.map((ing, i) => (
                <tr key={ing.name} className={i % 2 === 0 ? "bg-ivory" : "bg-bone"}>
                  <td className="align-top px-4 py-4">
                    <span className="mb-1 inline-block rounded-pill bg-sage-deep px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-ivory">
                      {ing.category}
                    </span>
                    <div className="font-semibold text-charcoal">{ing.name}</div>
                  </td>
                  <td className="align-top px-4 py-4">
                    <div className="font-mono text-[11px] italic text-mineral">{ing.latin}</div>
                    <div className="text-xs text-mineral">{ing.form}</div>
                    <p className="mt-2 text-graphite leading-relaxed">{ing.note}</p>
                  </td>
                  <td className="align-top px-4 py-4 font-mono text-charcoal">{ing.dose}</td>
                  <td className="align-top px-4 py-4">
                    <div className="flex flex-wrap gap-1">
                      {ing.tested.map((t) => (
                        <span
                          key={t}
                          className="rounded-pill border border-line bg-paper px-2 py-0.5 text-[10px] font-semibold text-graphite"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <FdaDisclaimer className="mt-8 max-w-2xl" />
        <p className="mt-8 text-sm">
          <Link href="/science" className="font-semibold text-sage-deep underline-offset-2 hover:underline">
            Read the science →
          </Link>
        </p>
      </Container>
    </div>
  );
}

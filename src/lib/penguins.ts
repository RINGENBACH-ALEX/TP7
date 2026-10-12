import * as Plot from "@observablehq/plot";
import penguins from "../assets/penguins.json";
import type { Chart } from "../components/ChartCard.astro";

export { penguins };

// Liste des espèces déterminée automatiquement (map + Set pour dédoublonner)
export const species: string[] = [...new Set(penguins.map((p) => p.species))].sort();

// Îles où vit chaque espèce, elles aussi déduites des données
export const islandsOf = (sp: string) =>
  [...new Set(penguins.filter((p) => p.species === sp).map((p) => p.island))].sort();

const descriptions: Record<string, string> = {
  Adelie:
    "La plus répandue des trois dans l'archipel Palmer, présente sur les trois îles (Biscoe, Dream, Torgersen). Bec plutôt court mais épais : le nuage se tasse à gauche du graphique.",
  Gentoo:
    "Présent uniquement sur l'île Biscoe. Bec long mais peu épais : le nuage glisse vers la droite et vers le bas, bien détaché des deux autres espèces.",
  Chinstrap:
    "Présent uniquement sur l'île Dream. Bec à la fois long et épais : le nuage se place en haut à droite. C'est la plus petite population des trois.",
};

// Échelles fixes et partagées entre les espèces pour pouvoir les comparer
const echelles = {
  grid: true,
  x: { domain: [30, 60], label: "Longueur du bec (mm)" },
  y: { domain: [12, 22], label: "Épaisseur du bec (mm)" },
  color: { domain: species, legend: true },
};

// Graphique d'une espèce
export function penguinChart(sp: string): Chart {
  const data = penguins.filter((p) => p.species === sp);
  return {
    title: sp,
    subtitle: `${data.length} manchots (${islandsOf(sp).join(", ")}) — longueur du bec contre épaisseur du bec`,
    label: `Nuage de points des ${data.length} manchots ${sp}, longueur du bec en abscisse (30 à 60 mm) et épaisseur en ordonnée (12 à 22 mm).`,
    caption: descriptions[sp],
    options: {
      ...echelles,
      marks: [
        Plot.dot(data, { x: "culmen_length_mm", y: "culmen_depth_mm", stroke: "species", tip: true }),
      ],
    },
  };
}

// Graphique de toutes les espèces
export function allPenguinsChart(): Chart {
  return {
    title: `Les ${species.length} espèces`,
    subtitle: `${penguins.length} manchots — longueur du bec (mm) contre épaisseur du bec (mm)`,
    label: `Nuage de points des ${penguins.length} manchots : longueur du bec en abscisse, épaisseur en ordonnée, une couleur par espèce.`,
    caption:
      "Chaque espèce occupe une zone distincte du graphique : c'est ce qui permet de les distinguer à partir des seules mesures du bec.",
    options: {
      ...echelles,
      marks: [Plot.dot(penguins, { x: "culmen_length_mm", y: "culmen_depth_mm", stroke: "species" })],
    },
  };
}

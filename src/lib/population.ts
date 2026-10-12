import * as Plot from "@observablehq/plot";
import populationMain from "../assets/populationMain.json";
import departements from "../assets/departements.geojson.json";

export { populationMain, departements };

// Listes des valeurs possibles, déduites des données (map + Set pour dédoublonner).
// Années de la plus récente à la plus ancienne : la première est sélectionnée par défaut.
export const listePeriode = [...new Set(populationMain.map((d) => d.Période))].reverse();
export const listeSexe = [...new Set(populationMain.map((d) => d.Sexe))];
// "Ensemble" d'abord, puis les tranches dans l'ordre croissant de leur premier âge
const ageMin = (a: string) => (a === "Ensemble" ? -1 : parseInt(a));
export const listeAge = [...new Set(populationMain.map((d) => d.Âge))].sort((a, b) => ageMin(a) - ageMin(b));

const format = new Intl.NumberFormat("fr-FR");
// Seuils de la légende en version courte (« 274 k », « 1,2 M ») pour qu'ils ne se chevauchent pas
const abrege = (d: number) =>
  d >= 1e6
    ? `${new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 1 }).format(d / 1e6)} M`
    : `${Math.round(d / 1000)} k`;

// Options Plot de la carte choroplèthe : utilisées côté serveur (PlotFigure)
// comme côté client (Plot.plot dans un <script>).
export function populationMapOptions(periode: number, sexe: string, age: string) {
  // Population de chaque département pour la sélection, indexée par code
  const valeurs = new Map(
    populationMain
      .filter((d) => d.Période === periode && d.Sexe === sexe && d.Âge === age)
      .map((d) => [d.Code, d.Valeur]),
  );
  const valeurOf = (f: { properties: { code: string } }) => valeurs.get(f.properties.code);

  return {
    width: 700,
    height: 680,
    marginLeft: 0,
    marginBottom: 0,
    projection: { type: "conic-conformal", parallels: [44, 49], rotate: [-3, 0], domain: departements },
    // Échelle par quantiles : chaque couleur regroupe autant de départements, ce qui
    // lisse les écarts énormes (Lozère contre Nord). Sa légende est faite de
    // rectangles SVG, alors qu'une échelle continue dessine un <canvas> que jsdom
    // ne sait pas produire côté serveur.
    color: {
      type: "quantile",
      n: 7,
      scheme: "reds",
      legend: true,
      label: "Habitants (7 groupes de départements)",
      width: 480,
      tickFormat: abrege,
    },
    marks: [
      Plot.geo(
        departements,
        Plot.centroid({
          fill: valeurOf,
          stroke: "white",
          strokeWidth: 0.5,
          tip: { format: { fill: false, x: false, y: false } },
          channels: {
            Département: (f) => `${f.properties.nom} (${f.properties.code})`,
            Habitants: (f) => format.format(valeurOf(f) ?? 0),
          },
        }),
      ),
    ],
  } satisfies Plot.PlotOptions;
}

export function populationMapLabel(periode: number, sexe: string, age: string) {
  const total = populationMain
    .filter((d) => d.Période === periode && d.Sexe === sexe && d.Âge === age && d.Code.length < 3)
    .reduce((s, d) => s + d.Valeur, 0);
  return `Carte de France métropolitaine des ${departements.features.length} départements colorés selon leur population au 1er janvier ${periode} (sexe : ${sexe.toLowerCase()}, âge : ${age.toLowerCase()}). Total en métropole : ${format.format(total)} habitants.`;
}

import * as Plot from "@observablehq/plot";
import weather from "../assets/weather.json";
import type { Chart } from "../components/ChartCard.astro";

export { weather };

// Liste des types de temps déterminée automatiquement (map + Set)
export const weatherTypes: string[] = [...new Set(weather.map((d) => d.weather))].sort();

// Traductions pour l'affichage
export const weatherLabels: Record<string, string> = {
  drizzle: "Bruine",
  fog: "Brouillard",
  rain: "Pluie",
  snow: "Neige",
  sun: "Soleil",
};
export const labelOf = (type: string) => weatherLabels[type] ?? type;

// Échelle des températures commune à tous les types de temps
const tempDomain = [
  Math.min(...weather.map((d) => d.temp_min)),
  Math.max(...weather.map((d) => d.temp_max)),
];

const mois = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];
const moyenne = (values: number[]) => values.reduce((a, b) => a + b, 0) / values.length;

// Légende calculée à partir des données
function describe(data: typeof weather) {
  const part = Math.round((data.length / weather.length) * 100);
  const parMois = mois.map((_, m) => data.filter((d) => new Date(d.date).getUTCMonth() === m).length);
  const moisMax = mois[parMois.indexOf(Math.max(...parMois))];
  return (
    `${part} % des jours relevés. Maximale moyenne : ${moyenne(data.map((d) => d.temp_max)).toFixed(1)} °C, ` +
    `minimale moyenne : ${moyenne(data.map((d) => d.temp_min)).toFixed(1)} °C. Mois le plus représenté : ${moisMax}.`
  );
}

// Températures min/max de chaque jour pour un type de temps donné
export function weatherChart(type: string): Chart {
  const raw = weather.filter((d) => d.weather === type);
  const data = raw.map((d) => ({ ...d, date: new Date(d.date) }));
  return {
    title: labelOf(type),
    subtitle: `${data.length} jours à Seattle (2012-2015) — température maximale (rouge) et minimale (bleu)`,
    label: `Graphique des ${data.length} jours de type ${labelOf(type)} : date en abscisse, température en ordonnée, un trait relie la minimale et la maximale de chaque jour.`,
    caption: describe(raw),
    options: {
      grid: true,
      x: { label: "Date", type: "utc", domain: [new Date("2012-01-01"), new Date("2016-01-01")] },
      y: { label: "Température (°C)", domain: tempDomain },
      marks: [
        Plot.ruleY([0], { stroke: "#94a3b8" }),
        Plot.ruleX(data, { x: "date", y1: "temp_min", y2: "temp_max", stroke: "#cbd5e1" }),
        Plot.dot(data, { x: "date", y: "temp_max", fill: "#c50337", r: 2.5, tip: true }),
        Plot.dot(data, { x: "date", y: "temp_min", fill: "#2563eb", r: 2.5 }),
      ],
    },
  };
}

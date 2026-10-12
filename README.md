- URL site WEB :
- URL Notebook Observable :
- Nom : Ringenbach
- Prénom : Alex
- Nom binome :
- Prénom binome :

# Remarques :

TP7 R3.12 — reprend tout le site du TP6 (routes paramétriques avec Astro, TailwindCSS et Observable Plot) et ajoute un menu TP7 ([sommaire](src/pages/tp7/index.astro)) pour les pages de cette séance.

## Pages

- [Accueil](src/pages/index.astro)
- [Toutes les espèces en onglets](src/pages/penguins.astro) : liste des espèces calculée par `[...new Set(penguins.map(...))]`, onglets générés par `map`.
- Rendu dynamique ([index](src/pages/rendu-dynamique/index.astro), [[species]](src/pages/rendu-dynamique/[species].astro)) : `export const prerender = false;`, espèce lue dans `Astro.params`, 404 si l'espèce n'existe pas.
- Rendu statique ([index](src/pages/rendu-statique/index.astro), [[species]](src/pages/rendu-statique/[species].astro)) : pages générées au build par `getStaticPaths()`.
- TD voitures ([index](src/pages/cars/year/index.astro), [[year]](src/pages/cars/year/[year].astro)).
- Bonus, dataset `weather` d'Observable ([onglets](src/pages/meteo/index.astro), [dynamique](src/pages/meteo/rendu-dynamique/[weather].astro), [statique](src/pages/meteo/rendu-statique/[weather].astro)).

## Éléments techniques

- Données et graphiques factorisés dans [src/lib/penguins.ts](src/lib/penguins.ts) et [src/lib/weather.ts](src/lib/weather.ts), cartes de graphique dans [ChartCard](src/components/ChartCard.astro).
- `cars.json` et `weather.json` convertis depuis les CSV du paquet npm `@observablehq/sample-datasets`.
- Accessibilité : lien d'évitement, onglets ARIA navigables au clavier (flèches, Début, Fin), `aria-current` dans les menus, graphiques avec `role="img"` et description.
- Menu à sous-menus en `<details>` (fonctionne sans JS), échelles communes entre les pages pour comparer les graphiques.

## TP7 : accessibilité et cartes

- [Accessibilité](src/pages/tp7/accessibilite.astro) : options `title`, `subtitle`, `caption`, `ariaLabel` et `ariaDescription` de Plot (rendu natif en `<figure>` par [PlotNative](src/components/PlotNative.astro)), comparées à un `<figure>` fait à la main. On vérifie ensuite avec Lighthouse et l'arborescence d'accessibilité de Chrome.
- [Leaflet](src/pages/tp7/leaflet.astro) : carte OpenStreetMap des établissements d'enseignement supérieur, avec des `circleMarker` en popup, un filtre par type et une liste textuelle en alternative à la carte.
- GeoJSON + Plot : population par département avec `Plot.geo` et une projection conique conforme, [côté serveur](src/pages/tp7/geojson-serveur.astro) puis [côté client](src/pages/tp7/geojson-client.astro) avec 3 `<select>` (année, sexe, âge). Le code est partagé dans [src/lib/population.ts](src/lib/population.ts).
- Données :
  - `listeEtablissements.json` : [principaux établissements d'enseignement supérieur](https://data.enseignementsup-recherche.gouv.fr/explore/dataset/fr-esr-principaux-etablissements-enseignement-superieur/) (MESR).
  - `populationMain.json` : estimations localisées de population de l'Insee (API Melodi, `DS_ESTIMATION_POPULATION`), regroupées en grandes tranches d'âge, de 2016 à la dernière année disponible.
  - `departements.geojson.json` : [france-geojson](https://github.com/gregoiredavid/france-geojson), version simplifiée.

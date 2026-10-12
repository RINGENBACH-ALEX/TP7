// Menu principal : un menu déroulant par TP, avec ses pages.
// "match" sert à garder le lien actif sur toutes les pages d'une même famille
// (ex. le lien "Pages par espèce" reste actif sur /tp2/species/Gentoo/).
// "text" est la description affichée sur la page d'accueil.
export const menu: {
  label: string;
  title: string;
  links: { href: string; label: string; text: string; match?: string }[];
}[] = [
  {
    label: "TP1",
    title: "Des graphiques rendus côté serveur",
    links: [
      {
        href: "/tp1/penguins/",
        label: "Penguins",
        text: "Nuage de points et histogramme sur le jeu de données Palmer Penguins.",
      },
      {
        href: "/tp1/examples/",
        label: "Autres exemples",
        text: "Fréquence des lettres, action Apple, voitures, athlètes olympiques, température mondiale.",
      },
    ],
  },
  {
    label: "TP2",
    title: "Plusieurs graphiques : pages et ancres",
    links: [
      {
        href: "/tp2/species/Adelie/",
        label: "Pages par espèce",
        text: "Une page par espèce et un menu de liens pour naviguer.",
        match: "/tp2/species/",
      },
      {
        href: "/tp2/anchors/",
        label: "Page à ancres",
        text: "Slider horizontal, menu à ancres et entrée active suivie par IntersectionObserver.",
      },
    ],
  },
  {
    label: "TP3",
    title: "Select, iframe et onglets",
    links: [
      {
        href: "/tp3/species/Adelie/",
        label: "Pages par espèce",
        text: "Une page par espèce, navigation par un <select>.",
        match: "/tp3/species/",
      },
      { href: "/tp3/anchors/", label: "Page à ancres", text: "Le slider piloté par un <select> (location.hash)." },
      { href: "/tp3/iframe/", label: "Page à cadre", text: "Le <select> change la propriété src d'un <iframe>." },
      { href: "/tp3/tabs/", label: "Page à onglets", text: "Les 3 graphiques dans des onglets accessibles." },
    ],
  },
  {
    label: "TP4",
    title: "Graphiques côté client",
    links: [
      { href: "/tp4/", label: "Sommaire", text: "La liste des essais de graphiques construits dans le navigateur." },
      { href: "/tp4/simple/", label: "Simple", text: "L'exemple « Plot in vanilla HTML » de la documentation." },
      { href: "/tp4/simple-penguin/", label: "Simple Penguin", text: "Le nuage de points des manchots, côté client." },
      { href: "/tp4/penguin-filtre/", label: "Penguin avec filtre", text: "Un <select> d'espèce redessine le graphique." },
      {
        href: "/tp4/penguin-filtres/",
        label: "Penguin avec plusieurs filtres",
        text: "Filtres combinés : espèce, île et sexe.",
      },
      { href: "/tp4/cars-filtres/", label: "Cars avec filtres", text: "Des voitures filtrées par origine et cylindres." },
    ],
  },
  {
    label: "TP6",
    title: "Routes paramétriques",
    links: [
      {
        href: "/penguins/",
        label: "Toutes les espèces (onglets)",
        text: "Liste des espèces calculée par map + new Set, onglets générés par une boucle.",
      },
      {
        href: "/rendu-dynamique/",
        label: "Rendu dynamique",
        text: "Route [species].astro rendue à la demande (prerender = false).",
      },
      {
        href: "/rendu-statique/",
        label: "Rendu statique",
        text: "La même route, pré-générée au build avec getStaticPaths().",
      },
      {
        href: "/cars/year/",
        label: "Voitures par année (TD)",
        text: "Puissance contre poids, une page par année via [year].astro.",
      },
      {
        href: "/meteo/",
        label: "Météo (onglets)",
        text: "Un autre dataset Observable : la météo de Seattle par type de temps.",
      },
      {
        href: "/meteo/rendu-dynamique/",
        label: "Météo · rendu dynamique",
        text: "Une page par type de temps, rendue à la demande.",
      },
      {
        href: "/meteo/rendu-statique/",
        label: "Météo · rendu statique",
        text: "Une page par type de temps, générée au build.",
      },
    ],
  },
  {
    label: "TP7",
    title: "Accessibilité et cartes",
    // Les pages du TP7 s'ajoutent ici au fil de la séance : elles apparaissent
    // alors dans le menu, sur l'accueil et sur le sommaire /tp7/.
    links: [
      { href: "/tp7/", label: "Sommaire", text: "Le sommaire des pages réalisées pendant le TP7." },
      {
        href: "/tp7/accessibilite/",
        label: "Accessibilité (a11y)",
        text: "Options title, subtitle, caption et ariaLabel de Plot, et vérification avec les DevTools.",
      },
      {
        href: "/tp7/leaflet/",
        label: "Leaflet : établissements",
        text: "Carte interactive des établissements d'enseignement supérieur, filtrable par type.",
      },
      {
        href: "/tp7/geojson-serveur/",
        label: "GeoJSON côté serveur",
        text: "Population par département : contours GeoJSON dessinés par Plot.geo au build.",
      },
      {
        href: "/tp7/geojson-client/",
        label: "GeoJSON côté client",
        text: "La même carte dans le navigateur, avec un <select> pour l'année, le sexe et l'âge.",
      },
    ],
  },
];

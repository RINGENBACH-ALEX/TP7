// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import netlify from '@astrojs/netlify';

// https://astro.build/config
export default defineConfig({
  // Netlify sert les pages statiques via un dossier /chemin/index.html :
  // on force donc le / final partout (liens internes, redirections).
  trailingSlash: 'always',

  vite: {
    plugins: [tailwindcss()],
    // Bibliothèques utilisées dans des <script> côté client : pré-optimisées dès
    // le démarrage du serveur de dev. Sinon Vite les découvre en cours de route,
    // régénère son cache et les pages déjà chargées reçoivent des 504
    // (« Outdated Optimize Dep ») : la carte ne s'affiche pas.
    optimizeDeps: {
      include: ['leaflet', '@observablehq/plot']
    }
  },

  adapter: netlify()
});

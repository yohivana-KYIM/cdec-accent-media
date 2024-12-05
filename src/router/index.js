import { createRouter, createWebHistory } from "vue-router";

import Home from "../views/Home.vue";
import ContactUs from "../components/frontend/ContactUs/contact_us.vue";
import LacDec from "../components/frontend/LacDec/lacdec.vue";

import Missions from "../components/frontend/Missions/missions.vue";
import Gouvernance from "../components/frontend/Gouvernance/Gouvernance.vue";
import ConsAdmin from "../components/frontend/Serviceslist/cons_admin.vue";
import Organigramme from "../components/frontend/Organigramme/Organigramme.vue";
import TextesReglementaires from "../components/frontend/TextesReglementaires/TextesReglementaires.vue";
// Import du composant TextesReglementaires
import ConsJudiciaire from "../components/frontend/Serviceslist/cons_judiciaire.vue";
import ConsConvention from "../components/frontend/Serviceslist/cons_convention.vue";
import Actualites from "../components/frontend/Publications/actualites.vue";
import Interviews from "../components/frontend/Publications/Interviews.vue";
import Publications from "../components/frontend/Publications/publications.vue";
import GuideUtilisateurs from "../components/frontend/Publications/guide_utilisateurs.vue";
import Communique from "../components/frontend/Publications/communique.vue";
import Partenaires from "../components/frontend/partenaires/partenaires.vue";

import mediatheque from "../components/frontend/Publications/mediatheque.vue";

// Imported once, for both routes
import Admin from "../views/Admin/dashboard.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/contact_us",
    name: "contact_us",
    component: ContactUs,
  },
  { path: "/lacdec", name: "lacdec", component: LacDec },
  { path: "/missions", name: "missions", component: Missions },
  { path: "/Gouvernance", name: "Gouvernance", component: Gouvernance },
  { path: "/organigramme", name: "organigramme", component: Organigramme },
  {
    path: "/textes_reglementaires",
    name: "textes_reglementaires",
    component: TextesReglementaires,
  },

  { path: "/partenaires", name: "partenaires", component: Partenaires },
  { path: "/cons_admin", name: "cons_admin", component: ConsAdmin },
  {
    path: "/cons_judiciaire",
    name: "cons_judiciaire",
    component: ConsJudiciaire,
  },

  {
    path: "/guide_utilisateurs",
    name: "guide_utilisateurs",
    component: GuideUtilisateurs,
  },
  {
    path: "/publications",
    name: "publications",
    component: Publications,
  },
  {
    path: "/Interviews",
    name: "Interviews",
    component: Interviews,
  },

  {
    path: "/mediatheque",
    name: "mediatheque",
    component: mediatheque,
  },

  {
    path: "/actualites",
    name: "actualites",
    component: Actualites,
  },
  {
    path: "/cons_convention",
    name: "cons_convention",
    component: ConsConvention,
  },
  {
    path: "/communique",
    name: "communique",
    component: Communique,
  },
  {
    path: "/Admin",
    children: [
      {
        path: "dashboard",
        name: "dashboard",
        component: Admin,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

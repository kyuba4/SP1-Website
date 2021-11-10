import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Subpage from "../views/Subpage.vue";
import Panel from "../views/Panel.vue";
import Add from "../views/Add.vue";
import Edit from "../views/Edit.vue";
import EditPost from "../views/EditPost.vue";
import ErrorPage from "../views/ErrorPage.vue";
import SubpagesPanel from "../views/SubpagesPanel.vue";
import AddSubpage from "../views/AddSubpage.vue";
import EditSubpage from "../views/EditSubpage.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "*",
    name: "ErrorPage",
    component: ErrorPage,
    meta: { hideFooter: true, title: "Nie znaleziono" },
  },
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      title: "Strona Główna",
    },
  },
  {
    path: "/page/:subpage",
    name: "Subpage",
    component: Subpage,
    meta: {
      title: "Wiadomości",
    },
  },
  {
    path: "/panel",
    name: "Panel",
    component: Panel,
    meta: { hideFooter: true, title: "Panel" },
  },
  {
    path: "/panel/dodaj",
    name: "Add",
    component: Add,
    meta: { hideFooter: true, title: "Dodaj Post" },
  },
  {
    path: "/panel/edytuj",
    name: "Edit",
    component: Edit,
    meta: { hideFooter: true, title: "Edytuj Post" },
  },
  {
    path: "/panel/edytuj/:postID",
    name: "EditPost",
    component: EditPost,
    meta: { hideFooter: true, title: "Edycja Postu" },
    props: true,
  },
  {
    path: "/podstrony",
    name: "Subpages",
    component: SubpagesPanel,
    meta: { hideFooter: true, title: "Edycja Podstron" },
  },
  {
    path: "/podstrony/dodaj",
    name: "AddSubpage",
    component: AddSubpage,
    meta: { hideFooter: true, title: "Dodaj Podstronę" },
  },
  {
    path: "/podstrony/edytuj",
    name: "EditSubpage",
    component: EditSubpage,
    meta: { hideFooter: true, title: "Edycja Podstron" },
  },
];

const router = new VueRouter({
  routes,
  mode: "history",
});

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} - SP1`;
  next();
});

export default router;

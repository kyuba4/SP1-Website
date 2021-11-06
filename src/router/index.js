import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Panel from "../views/Panel.vue";
import Add from "../views/Add.vue";
import Edit from "../views/Edit.vue";
import EditPost from "../views/EditPost.vue";
import ErrorPage from "../views/ErrorPage.vue";

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

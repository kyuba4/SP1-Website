<template>
   <ul>
      <li v-for="(link, index) in links" :key="index">
         <router-link :to="{ name: 'Subpage', params: { subpage: `${link.path}`, title: `${link.title}` } }">{{ link.title }}</router-link>
      </li>
      <div class="skelet-link-wrap" v-show="linksLoading">
         <div class="skelet-link"></div>
         <div class="skelet-link"></div>
         <div class="skelet-link"></div>
         <div class="skelet-link"></div>
         <div class="skelet-link"></div>
         <div class="skelet-link"></div>
      </div>
   </ul>
</template>

<script>
import { database as db } from "@/components/firebaseInit";

export default {
   name: "Navlinks",
   data() {
      return {
         links: [],
         linksLoading: false,
      };
   },
   methods: {
      async getLinks() {
         this.linksLoading = true;

         const response = await db.collection("subpages").orderBy("title", "asc").where("place", "==", "header").get();

         await response.docs.forEach((doc) => {
            this.links = [...this.links, doc.data()];
         });

         this.linksLoading = false;
      },
   },
   created() {
      this.getLinks();
   },
};
</script>

<style lang="scss" scoped>
ul {
   display: flex;
   align-items: center;
   flex-wrap: wrap;

   a {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-wrap: wrap;
   }

   .skelet-link-wrap {
      display: flex;

      @media (max-width: 750px) {
         display: none;
      }

      .skelet-link {
         width: 80px;
         height: 15px;
         border-radius: 15px;
         background-image: linear-gradient(90deg, #e2e2e2 0px, #efefef 30px, #e2e2e2 60px);
         background-size: calc(100% + 100%);
         animation: refresh 1.5s infinite ease-out;
         margin: 0 5px;
      }
   }
}
</style>
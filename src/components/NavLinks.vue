<template>
   <ul>
      <li v-for="(link, index) in links" :key="index">
         <router-link :to="{ name: 'Subpage', params: { subpage: `${link.path}`, title: `${link.title}` } }">{{ link.title }}</router-link>
      </li>
   </ul>
</template>

<script>
import { database as db } from "@/components/firebaseInit";

export default {
   name: "Navlinks",
   data() {
      return {
         links: [],
      };
   },
   methods: {
      async getLinks() {
         const response = await db.collection("subpages").orderBy("title", "asc").where("place", "==", "header").get();

         await response.docs.forEach((doc) => {
            this.links = [...this.links, doc.data()];
         });
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
}
</style>
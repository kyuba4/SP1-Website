<template>
   <div>
      <Loader v-show="loading" />
      <GoBackButton :link="'Subpages'" />
      <div class="wrap" v-show="!loading">
         <div class="column">
            <h1>Header</h1>
            <ul>
               <li v-for="(subpage, index) in subpagesHeader" :key="index">
                  <router-link :to="{ name: 'SubpageEditor', params: { pageID: subpage.path } }">{{ subpage.title }}</router-link>
               </li>
            </ul>
         </div>
         <div class="column">
            <h1>Sidebar</h1>
            <ul>
               <li v-for="(subpage, index) in subpagesSidenav" :key="index">
                  <router-link :to="{ name: 'SubpageEditor', params: { pageID: subpage.path } }">{{ subpage.title }}</router-link>
               </li>
            </ul>
         </div>
      </div>
   </div>
</template>
<script>
import GoBackButton from "../components/GoBackButton.vue";
import Loader from "../components/Loader.vue";
import { database as db } from "../components/firebaseInit";

export default {
   name: "EditSubpage",
   components: {
      GoBackButton,
      Loader,
   },
   data() {
      return {
         loading: false,
         subpagesHeader: [],
         subpagesSidenav: [],
      };
   },
   methods: {
      async getData() {
         this.loading = true;

         try {
            const data1 = await db.collection("subpages").where("place", "==", "header").get();

            data1.docs.forEach((doc) => {
               this.subpagesHeader = [...this.subpagesHeader, doc.data()];
            });

            const data2 = await db.collection("subpages").where("place", "==", "sidebar").get();

            data2.docs.forEach((doc) => {
               this.subpagesSidenav = [...this.subpagesSidenav, doc.data()];
            });
            this.loading = false;
         } catch (error) {
            console.log(error.message);
            this.loading = false;
         }
      },
   },
   created() {
      this.getData();
   },
};
</script>
<style lang="scss" scoped>
.wrap {
   display: flex;
   margin: 0 auto;
   justify-content: space-evenly;

   .column {
      display: flex;
      flex-direction: column;

      h1 {
         text-align: center;
      }

      ul {
         list-style: none;

         li {
            text-align: center;
            border: 1px solid #ccc;
            display: flex;
            margin: 25px 0;

            a {
               padding: 15px 25px;
               width: 100%;
               height: 100%;
            }
         }
      }
   }
}
</style>
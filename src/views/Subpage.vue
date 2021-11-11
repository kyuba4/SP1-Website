<template>
   <div>
      <Loader v-show="loading" />
      <ImageSlider />
      <div class="content">
         <div class="description-wrap">
            <div class="description-content" v-show="!loading">
               <h1 class="content-header">{{ header }}</h1>
               <div class="content-description" v-html="content"></div>
            </div>
         </div>
         <Sidebar />
      </div>
   </div>
</template>
<script>
import Loader from "@/components/Loader";
import ImageSlider from "@/components/ImageSlider";
import Sidebar from "@/components/Sidenav.vue";
import { database as db } from "@/components/firebaseInit";

export default {
   name: "Subpage",
   components: {
      Loader,
      ImageSlider,
      Sidebar,
   },
   data() {
      return {
         loading: false,
         header: "",
         content: "",
      };
   },
   methods: {
      async getContent() {
         this.loading = true;

         const docName = this.$route.params.subpage;

         try {
            const response = await db.collection("subpages").where("path", "==", docName).get();
            this.content = await response.docs[0].data().desc;
            this.header = await response.docs[0].data().title;
            this.loading = false;
         } catch (error) {
            console.log(error);
            this.loading = false;
            this.$router.push({ name: "ErrorPage" });
         }
      },
   },
   created() {
      this.getContent();
   },
};
</script>
<style lang="scss" scoped>
.description-wrap {
   display: flex;
   flex: 3;

   .description-content {
      display: flex;
      flex-direction: column;
      width: 75%;
      height: fit-content;
      margin: 0 auto;
      box-shadow: 0 2px 8px 0 #909090;
      border-radius: 15px;
      padding: 30px;

      .content-header {
         font-weight: 500;
         margin-bottom: 15px;
      }

      a {
         text-decoration: underline;
         color: rgb(0, 132, 255);
      }
   }
}
</style>
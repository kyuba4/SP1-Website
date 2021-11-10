<template>
   <div>
      <Loader v-show="loading" />
      <ImageSlider />
      <div class="content">
         <div class="description-wrap">
            <div class="description-content">
               <h1 class="content-header">{{ $route.params.title }}</h1>
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
            this.loading = false;
         } catch (error) {
            console.log(error);
            this.loading = false;
         }
      },
   },
   mounted() {
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
   }
}
</style>
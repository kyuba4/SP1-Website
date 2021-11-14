<template>
   <div>
      <GoBackButton :link="'EditSubpagePanel'" />
      <Loader v-show="loading" />
      <VueEditor :data="data" @save="editSubpage" :showCheckbox="true" />
   </div>
</template>
<script>
import GoBackButton from "@/components/GoBackButton";
import Loader from "@/components/Loader";
import VueEditor from "@/components/VueEditor";
import { database as db } from "@/components/firebaseInit";

export default {
   name: "SubpageEditor",
   props: ["data"],
   components: {
      GoBackButton,
      VueEditor,
      Loader,
   },
   data() {
      return {
         loading: false,
         docID: this.data.docID,
         newPath: "",
      };
   },
   methods: {
      async editSubpage(data) {
         this.setPath(data.path);

         this.loading = true;

         try {
            await db.collection("subpages").doc(this.docID).update({
               title: data.title,
               desc: data.desc,
               place: data.place,
               path: this.newPath,
            });
            this.loading = false;
            this.$router.push({ name: "EditSubpagePanel" });
            window.location.reload();
         } catch (error) {
            console.log(error.message);
            this.loading = false;
         }
      },
      setPath(title) {
         // eslint-disable-next-line no-useless-escape
         const firstPathFormat = title.replace(/[&\/\\#,+()^=@!$~%.'":*?<>{}]/g, "").toLocaleLowerCase();
         this.newPath = "";

         for (let i = 0; i < firstPathFormat.length; i++) {
            this.newPath += this.formatLink(firstPathFormat[i]);
         }

         this.data.path = this.newPath;
      },
      formatLink(letter) {
         switch (letter) {
            case "ą":
               return "a";

            case "ę":
               return "e";

            case "ł":
               return "l";

            case "ń":
               return "n";

            case "ć":
               return "c";

            case "ó":
               return "o";

            case "ś":
               return "s";

            case "ż":
               return "z";

            case "ź":
               return "z";

            case " ":
               return "";

            case "-":
               return "";

            case "[":
               return "";

            case "]":
               return "";

            default:
               return letter;
         }
      },
   },

   created() {
      if (!this.data) {
         this.$router.push({ name: "EditSubpagePanel" });
      }
   },
};
</script>
<style lang="scss">
</style>
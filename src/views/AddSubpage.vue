/* eslint-disable no-useless-escape */
<template>
   <div>
      <GoBackButton :link="'Subpages'" />
      <Loader v-show="loading" />
      <VueEditor :data="data" :showCheckbox="true" @save="addSubpage" />
   </div>
</template>
<script>
import GoBackButton from "../components/GoBackButton.vue";
import Loader from "../components/Loader.vue";
import VueEditor from "../components/VueEditor.vue";
import { database as db } from "../components/firebaseInit.js";

export default {
   name: "AddSubpage",
   components: {
      GoBackButton,
      VueEditor,
      Loader,
   },
   data() {
      return {
         loading: false,
         data: {
            title: null,
            desc: null,
            place: null,
            path: null,
         },
      };
   },
   methods: {
      async addSubpage(data) {
         this.loading = true;

         this.data.title = data.title;
         this.data.desc = data.desc;
         this.data.place = data.place ? "sidebar" : "header";
         this.setPath(data.title);

         try {
            await db.collection("subpages").add(this.data);
            window.location.reload();
         } catch (e) {
            console.log(e.message);
         }

         this.loading = false;
      },
      setPath(title) {
         // eslint-disable-next-line no-useless-escape
         const firstPathFormat = title.replace(/[&\/\\#,+()^=@!$~%.'":*?<>{}]/g, "").toLocaleLowerCase();
         this.data.path = "";

         for (let i = 0; i < firstPathFormat.length; i++) {
            this.data.path += this.formatLink(firstPathFormat[i]);
         }
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
};
</script>

<style lang="scss">
</style>
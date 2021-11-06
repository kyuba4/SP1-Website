<template>
   <div>
      <GoBackButton :link="'Panel'" />
      <div class="panel">
         <div class="panel__header"><h1>Panel Sterowania</h1></div>
         <div class="panel__cards">
            <PanelCard :data="card" v-for="(card, index) in cards" :key="index" />
         </div>
      </div>
   </div>
</template>
<script>
import GoBackButton from "../components/GoBackButton.vue";
import PanelCard from "../components/PanelCard.vue";

export default {
   name: "Subpage",
   components: {
      GoBackButton,
      PanelCard,
   },
   data() {
      return {
         cards: [
            {
               link: "AddSubpage",
               img: "add",
               text: "Dodaj Podstrony",
            },
            {
               link: "EditSubpage",
               img: "edit",
               text: "Edytuj Zawartość",
            },
         ],
      };
   },
};
</script>
<style lang="scss">
</style>
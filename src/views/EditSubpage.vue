<template>
   <div><GoBackButton :link="'Subpages'" /></div>
</template>
<script>
import GoBackButton from "../components/GoBackButton.vue";

export default {
   name: "EditSubpage",
   components: {
      GoBackButton,
   },
};
</script>
<style lang="scss">
</style>
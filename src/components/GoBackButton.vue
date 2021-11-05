<template>
   <router-link :to="{ name: link }">
      <button class="btn-back"><i class="fas fa-arrow-left"></i> Wróć</button>
   </router-link>
</template>
<script>
export default {
   name: "GoBackButton",
   props: ["link"],
};
</script>
<style lang="scss">
</style>
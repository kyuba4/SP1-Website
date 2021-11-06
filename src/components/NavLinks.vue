<template>
   <ul>
      <li><router-link to="#">O szkole</router-link></li>
      <li><router-link to="#">Rekrutacja</router-link></li>
      <li><router-link to="#">Uczniowie</router-link></li>
      <li><router-link to="#">Rodzice</router-link></li>
      <li><router-link to="#">Nottuln</router-link></li>
      <li><router-link to="#">Kontakt</router-link></li>
      <li><router-link to="#">Archiwalne</router-link></li>
      <li><router-link :to="{ name: 'Panel' }">Panel</router-link></li>
   </ul>
</template>

<script>
export default {
   name: "Navlinks",
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
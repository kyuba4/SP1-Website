<template>
   <ul>
      <li>O szkole</li>
      <li>Rekrutacja</li>
      <li>Uczniowie</li>
      <li>Rodzice</li>
      <li>Nottuln</li>
      <li>Kontakt</li>
      <li>Archiwalne</li>
      <li><router-link :to="{ name: 'Panel' }">Panel</router-link></li>
   </ul>
</template>

<script>
export default {
   name: "Navlinks",
};
</script>

<style lang="scss" scoped>
a {
   width: 100%;
   height: 100%;
   display: flex;
   align-items: center;
   justify-content: center;
}
</style>
<template>
   <div class="slider">
      <div class="placeholder-img">
         <img class="image-holder" src="../assets/image-holder.png" alt="image" />
      </div>

      <div class="image-wrap" :class="highlighted === 0 ? 'active' : null">
         <img class="image" src="https://sp1chodziez.pl/thumb_76700d260986.jpeg" alt="image" />
      </div>

      <div class="image-wrap" :class="highlighted === 1 ? 'active' : null">
         <img class="image" src="https://sp1chodziez.pl/thumb_60caa6fc42b2.jpeg" alt="image" />
      </div>

      <div class="image-wrap" :class="highlighted === 2 ? 'active' : null">
         <img class="image" src="https://sp1chodziez.pl/thumb_34073542668e.jpeg" alt="image" />
      </div>
   </div>
</template>
<script>
export default {
   name: "ImageSlider",
   data() {
      return {
         highlighted: 0,
      };
   },
   mounted() {
      const numberOfImages = document.querySelectorAll(".image").length;

      setInterval(() => {
         this.highlighted += 1;

         if (this.highlighted === numberOfImages) {
            this.highlighted = 0;
         }
      }, 5000);
   },
};
</script>
<style lang="scss">
.slider {
   position: relative;
   display: flex;
   align-items: flex-start;
   width: 100%;
   max-height: 100%;
   margin-top: 50px;

   .image-wrap {
      width: 100%;
      opacity: 0;
      transition: opacity 500ms ease;
      position: absolute;
      display: grid;
      place-content: center;
      padding: 0 20px;

      &:first-child {
         z-index: 3;
      }

      .image {
         max-width: 100%;
         border-radius: 15px;
         box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
      }
   }

   .placeholder-img {
      margin: 0 auto;
      opacity: 0;
      visibility: hidden;

      img {
         max-width: 100%;
         height: auto;
      }
   }
}

.active {
   opacity: 1 !important;
}
</style>
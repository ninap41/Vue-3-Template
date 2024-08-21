
<template>
  <LogoComponent class="logo-position"/>
  <Toast />
  <ReadMeComponent></ReadMeComponent>  
</template>

<script lang="ts" setup>
  import ReadMeComponent from "@/components/ReadMeComponent.vue"
  import LogoComponent from "@/components/LogoComponent.vue"
</script>

<style>

  .logo-position {
    position: absolute;
    z-index: 90;
    top: 0;
    padding-top: 1.12rem;
    padding-left: 1rem;
    mix-blend-mode: soft-light;
  }
</style>

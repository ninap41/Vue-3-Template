<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router"
import HelloWorld from "@/components/HelloWorld.vue"
	import NavComponent from "@/components/NavComponent.vue"
</script>

<template>
<NavComponent></NavComponent>
	<div class="view-container">
		<RouterView />
	</div>
</template>

<style>
	@import "@/assets/base.css";
</style>

<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router"
import HelloWorld from "@/components/HelloWorld.vue"
</script>

<template>
	<header>
		<RouterLink to="/">Soundboard</RouterLink>
		<RouterLink to="/about">About</RouterLink>
		<RouterLink to="/state">State</RouterLink>
	</header>
	<div class="view-container">
		<RouterView />
	</div>
</template>

<style>
@import "@/assets/base.css";

#app {
	max-width: 1280px;
	margin: 0 auto;
	padding: 2rem;
	font-weight: normal;
}

header {
	width: 100%;
	font-size: 12px;
	text-align: center;
	margin-top: 2rem;
	display: flex;
	justify-content: space-around;
}

.view-container {
	padding: 2rem 1rem;
	text-align: center;
}
</style>

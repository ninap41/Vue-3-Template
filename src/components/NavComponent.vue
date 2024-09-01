<template setup>
	<header>
		<div v-for="route in $router.options.routes" :key="route.path">"
		<RouterLink :to="route.path">{{route.name}}</RouterLink>
		</div>
	</header>
</template>

<script setup lang="ts">
	
</script>
<style scoped>
	@tailwind base;
	@tailwind components;
	@tailwind utilities;
</style>
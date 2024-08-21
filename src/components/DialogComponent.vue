<template>
<div>
	<!--  WIP-->
	<Dialog v-model:visible="visible" modal header="Edit Profile" :style="{ width: '25rem' }">
			<span class="text-surface-500 dark:text-surface-400 block mb-8">Update your information.</span>

			<div class="flex justify-end gap-2">
					<Button type="button" label="Cancel" severity="secondary" @click="visible = false"></Button>
					<Button type="button" label="Save" @click="visible = false"></Button>
			</div>
	</Dialog>
</div>
</template>

<script setup lang="ts">
	import {defineProps} from 'vue';
	import Dialog from 'primevue/dialog';
	
const props = defineProps<{ visible: boolean }>();
	
</script>
<style>
</style>


<template>
	<h1 class="green my-2">Examples</h1>
	<div class="flex flex-column my-2">
		<div class="flex flex-column">
			<div><h2>Button + Toast Composition</h2></div>
			<div class="flex flex-row">
			<Button label="Success" severity="success" @click="success('Hello I am Success.')" />
			<Button class="mr-1" label="Warn" severity="warn" @click="warn('Hello I am Warn.')" />
			<Button class="mr-1" label="danger" severity="danger" @click="error('Hello I am Error.')" />
			<Button label="info" severity="info" @click="info('Hello I am Info.')" />
		<Toast />
		</div>
		</div>
		<div class="flex flex-column gap-2 my-2">
			<div><h2>Modal</h2></div>
		</div>

		<Button label="Show" @click="() => visible = true" />

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
	import {ref} from "vue";
	
import  Button from "primevue/button"
import Toast from "primevue/toast"
import { useToasts } from "@/composition/use-toasts"
import Dialog from 'primevue/dialog';
import { useDialog } from "@/composition/use-dialog"
const { success, warn, error, info } = useToasts()
const visible = ref(false)
</script>
<style scoped>

	
</style>

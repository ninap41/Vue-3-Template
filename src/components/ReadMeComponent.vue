<template>
	<div v-html="compiledMarkdown" class="markdown-content"></div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import MarkdownIt from 'markdown-it';
const md = new MarkdownIt({});
const compiledMarkdown = ref('');

onMounted(async () => {
	try {
		const response = await fetch('/README.md');
		if (!response.ok) {
			throw new Error('Failed to load Markdown file');
		}
		const text = await response.text();
		console.log("text", text)
		compiledMarkdown.value = md.render(`${text}`);
	} catch (error) {
		console.error('Error fetching or processing Markdown file:', error);
	}
});
</script>

<style scoped>
.markdown-content {
	text-align: left;
	white-space: pre-line;
}
	.markdown-content > code, code.markdown-content  {
		background-color: black !important;
		color: green !important;
	}

</style>
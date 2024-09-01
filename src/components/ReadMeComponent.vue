<template>
	<div v-if="compiledMarkdown !== ''">
	 <vue-markdown :source="compiledMarkdown" class="markdown-content"  />
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import VueMarkdown from 'vue-markdown-render'
const compiledMarkdown = ref('');

onMounted(async () => {
	try {
		const response = await fetch('/README.md');
		if (!response.ok) {
			throw new Error('Failed to load Markdown file');
		}
		const text = await response.text();
		compiledMarkdown.value =text;
	} catch (error) {
		console.error('Error fetching or processing Markdown file:', error);
	}
});
</script>

<style>
	.markdown-content {
		box-shadow: 0 0 0.5rem rgba(255, 255, 255, 0.05);
		background: linear-gradient(to right top, #394664, #1e3d00);
		border-radius: 1rem;
		padding: 4rem;
	}

	.markdown-content > h1, .markdown-content > h2,.markdown-content > h3 {
		font-size-adjust: 1;
		margin-bottom:1rem;
		line-height:2;
		color: snow;
		z-index: 100;
	}
	.markdown-content > hr {
		margin: 2rem 0;
		margin-top: 2.5rem;
		width: 100%;
		border-radius: 4px;
		opacity: .3;
		border: 2px solid white;
	}

	.markdown-content > p {
		color: snow;
		text-shadow: 0 0 4px black;
		z-index: 100;
	}
	
	.markdown-content > ul > li a  {
		text-decoration: none;
		color: #d7ffb3;
	}
	.markdown-content > ul > li a:hover {
		color: lightgoldenrodyellow;
		text-shadow: 0 0 5px yellowgreen;
	}
	.markdown-content a  {
		text-decoration: none;
		color: #d7ffb3;
	}
	
	.markdown-content  a:hover {
		color: lightgoldenrodyellow;
		text-shadow: 0 0 5px yellowgreen;
	}
	
	.markdown-content > ul > li {
		list-style: circle;
		margin-block-start: .25rem;
		margin-block-end: 0rem;
		text-align: left;
	}
	
	.markdown-content > pre, pre.markdown-content  {
		background-color: black !important;
		border-radius: 1rem;
		margin-top: 1rem;
		pre: "$";
		padding: 2rem;
		color: limegreen;
		text-shadow: 0 0 5px yellowgreen;
	}

</style>
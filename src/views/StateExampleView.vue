<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useCounterStore } from '@/stores/counter';
import { defineComponent, ref } from 'vue';
  
const counterStore = useCounterStore();
  const pageTitle = ref('About Us');
    const pageDescription = ref('We are a company that specializes in...');

const increment = () => {
  counterStore.increment();
};
</script>

<template>
    <div >
    <h1>This page is an example of how to use Pinia for state management.</h1>
    <br /> <br />

    <button @click="increment">
      Count: {{ counterStore.counter }}
    </button>

    <br /><br />

    Double the count is {{ counterStore.doubleCount }}.
  </div>
</template>

<style>
button {
  padding: 8px 12px;
  font-size: 16px;
}
</style>
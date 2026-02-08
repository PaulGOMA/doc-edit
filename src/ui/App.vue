<script setup lang="ts">
import EditorCanvas from './EditorCanvas.vue'
import { editorStore } from '../stores'
import { Button } from 'primevue'
</script>

<template>
  <Button label="Ajouter un texte" @click="editorStore.addWidget('text')" />

  <EditorCanvas />
</template>

<script setup lang="ts">
import { Toolbar, Button } from 'primevue'
import { editorStore } from '../../stores'
</script>

<template>
  <Toolbar>
    <template #start>
      <Button
        aria-label="doument-button"
        label="Document"
        icon="pi pi-file"
        icon-pos="top"
        variant="outlined"
        severity="secondary"
      />
    </template>

    <template #center>
      <section class="center-section">
        <Button
          aria-label="text-button"
          @click="editorStore.addWidget('text')"
          class="text-button"
          variant="outlined"
          severity="secondary"
        >
          <i class="text-icon">T</i>
          <span>Texte</span>
        </Button>

        <Button
          label="Image"
          aria-label="image-button"
          icon="pi pi-image"
          icon-pos="top"
          variant="outlined"
          severity="secondary"
        />

        <Button
          label="Table"
          aria-label="table-button"
          icon="pi pi-table"
          icon-pos="top"
          variant="outlined"
          severity="secondary"
        />
      </section>
    </template>
  </Toolbar>
</template>

<style lang="css">
.text-button {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.text-icon {
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.center-section {
  width: fit-content;
  height: fit-content;
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 0.75rem;
  margin: 0;
  padding: 0;
}
</style>

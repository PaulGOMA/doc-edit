<script setup lang="ts">
import { ref, computed } from 'vue'
import { selectedComponent } from '../../stores/Selectors'
import { updateComponentProps } from '../../stores/Actions'
import type { ImageWidgetModel } from '../../core/models/ImageWidgetModel'
import { Button, Select } from 'primevue'

const fileInput = ref<HTMLInputElement | null>(null)

const imageNode = computed(() =>
  selectedComponent.value?.type === 'image' ? (selectedComponent.value as ImageWidgetModel) : null,
)

const scaleModes = [
  { label: 'Ajuster', value: 'fit' },
  { label: 'Remplir', value: 'fill' },
  { label: 'Étirer', value: 'stretch' },
  { label: 'Original', value: 'none' },
]

function onScaleModeChange(mode: string) {
  if (!imageNode.value) return
  updateComponentProps(imageNode.value.id, { scaleMode: mode })
}

function triggerReplace() {
  fileInput.value?.click()
}

function onFileChange(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (!file || !imageNode.value) return

  const reader = new FileReader()
  reader.onload = () => {
    updateComponentProps(imageNode.value!.id, {
      source: reader.result as string,
    })
  }
  reader.readAsDataURL(file)
}
</script>

<template>
  <section v-if="imageNode" class="image-assistant-section">
    <!-- Mode d'affichage -->
    <Select
      :options="scaleModes"
      option-label="label"
      option-value="value"
      v-model="imageNode.props.scaleMode"
      @change="onScaleModeChange($event.value)"
      placeholder="Mode d'affichage"
    />

    <!-- Remplacer l'image -->
    <Button
      label="Remplacer l'image"
      icon="pi pi-refresh"
      @click="triggerReplace"
      severity="secondary"
    />

    <!-- Input invisible -->
    <input
      ref="fileInput"
      type="file"
      accept="image/*"
      style="display: none"
      @change="onFileChange"
    />
  </section>
</template>

<style scoped>
.image-assistant-section {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
}
</style>

<template>
  <div class="toolbar-assistant-container">
    <slot></slot>
  </div>
</template>

<style lang="css">
.toolbar-assistant-container {
  width: fit-content;
  min-height: 2rem;
  max-height: fit-content;
  background: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border: 1.25px solid #e2e8f0;
  border-radius: 5px;
}
</style>

<template>
  <div class="example-block-line">
    <div class="example-block-line-items">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.example-block-line {
  padding: 1rem;
  display: flex;
  gap: 1em;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;

  &-items {
    width: 100%;
    display: flex;
    align-items: center;
    padding: 0.5rem;
    gap: 1.5em;
    flex-wrap: wrap;
  }
}
</style>

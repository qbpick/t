<script setup lang="ts"></script>

<template>
  <div class="relative">
    <Input
      v-bind="componentField"
      :class="{ 'border-destructive': errors.length }"
      v-bind:data-allow-mismatch=""
      type="password"
      placeholder="Пароль"
    />
    <span class="absolute right-2 top-1/2 -translate-y-1/2">
      <Eye class="text-muted-foreground" />
      <!-- <EyeOff class="text-muted-foreground" /> -->
    </span>
  </div>
</template>

<style scoped></style>

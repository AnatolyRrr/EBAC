<template>
  <LayoutDefault>
    <AppAlert />
    
    <ProfilePage />
  </LayoutDefault>
</template>

<script setup lang="ts">
import LayoutDefault from "@/layouts/LayoutDefault.vue";
import { ProfilePage } from "@/pages/ui";
import { AppAlert } from "./shared/ui";
</script>

<style lang="scss">
// App
</style>

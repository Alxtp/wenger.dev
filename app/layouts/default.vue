<script setup lang="ts">
useHead({
    titleTemplate: (title) => {
        return title ? `${title} | Wenger.Dev` : "Wenger.Dev";
    },
});
</script>

<template>
    <div>
        <Navigation />
        <slot />
        <Footer />
    </div>
</template>

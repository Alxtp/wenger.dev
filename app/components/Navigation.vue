<script setup lang="ts">
const colorMode = useColorMode();

const isDark = computed({
    get() {
        return colorMode.value === "dark";
    },
    set(_isDark) {
        colorMode.preference = _isDark ? "dark" : "light";
    },
});
</script>

<template>
    <div class="flex w-full justify-end p-5 gap-6 items-center">
        <ULink to="/">Home</ULink>
        <ULink to="/about">About</ULink>
        <ULink to="https://blog.wenger.dev" target="_blank">Blog</ULink>
        <ULink to="/services">Services</ULink>
        <UButton
            :icon="isDark ? 'i-lucide-moon' : 'i-lucide-sun'"
            color="secondary"
            variant="ghost"
            @click="isDark = !isDark"
        />
    </div>
</template>

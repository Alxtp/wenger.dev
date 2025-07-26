<script setup lang="ts">
useHead({
    title: "Services",
});

const services = ref([
    {
        title: "Weather Dashboard",
        description: "Dashboard of personal weather station",
        icon: "i-lucide-cloud",
        link: "https://weather.wenger.dev",
    },
    {
        title: "Weather Cam 01",
        description: "Private weather camera",
        icon: "i-lucide-webcam",
        link: "https://cam01.wenger.dev",
    },
    {
        title: "Weather Cam 02",
        description: "Private weather camera",
        icon: "i-lucide-webcam",
        link: "https://cam02.wenger.dev",
    },
    {
        title: "Weather Cam 03",
        description: "Private weather camera",
        icon: "i-lucide-webcam",
        link: "https://cam03.wenger.dev",
    },
    {
        title: "Auth Portal",
        description: "Authentication portal",
        icon: "i-lucide-lock-keyhole",
        link: "https://auth.wenger.dev",
    },
]);
</script>

<template>
    <div class="p-10 container">
        <h1>Services</h1>
        <div class="grid lg:grid-cols-5 gap-10 md:grid-cols-2 sm:grid-cols-1">
            <div
                v-for="service in services"
                class="items-center text-center rounded-lg bg-neutral dark:bg-neutral-800 ring ring-neutral-700/5 shadow-xl p-10"
            >
                <ULink :to="service.link" target="_blank">
                    <UIcon :name="service.icon" class="size-10" />
                    <p class="text-lg font-medium">{{ service.title }}</p>
                    <p class="opacity-70">{{ service.description }}</p>
                </ULink>
            </div>
        </div>
    </div>
</template>

<style></style>

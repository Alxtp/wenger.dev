<script setup lang="ts">
useHead({
    title: "About",
});
</script>

<template>
    <div class="container p-10 lg:w-1/2 md:w-full">
        <h1>About Me</h1>
        <div class="space-y-5 text-lg">
            <p>
                Hi! I'm a platform engineer who likes to express his creativity
                and constantly seeks to learn new things. I'm experienced in
                building cloud infrastructure in an automated way and always
                trying to find the optimal architecture. My next goal? To become
                an architect!
            </p>

            <p>
                I love creating
                <strong>simple, lightweight, modern and secure</strong>
                solutions. I strongly believe in simplicity, which is mostly
                also the most secure, and I absolutely hate bloat.
            </p>

            <p>
                When I'm not working, I do sports and also like self-hosting
                containers on my Raspberry Pi.
            </p>

            <p>
                I think that knowledge should be shared and that the best things
                are built by passion and shared with everyone. Also, most of my
                work, even when not the best, is publicly available.
            </p>
        </div>

        <div class="text-center pt-8">
            <UButton
                to="https://github.com/GreedTP"
                target="_blank"
                icon="i-lucide-github"
                size="lg"
                variant="outline"
            >
                Check out my work on GitHub
            </UButton>
        </div>
    </div>
</template>

<style scoped></style>

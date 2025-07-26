<script setup lang="ts">
useHead({
    title: "Home",
});

onMounted(() => {
    let i = 0;
    const txt = "Hello There!"; /* The text */
    const speed = 100; /* The speed/duration of the effect in milliseconds */
    const element = document.getElementById("greeting");

    function typeWriter() {
        if (i < txt.length) {
            if (element) {
                element.innerHTML += txt.charAt(i);
                i++;
                setTimeout(typeWriter, speed);
            }
        } else {
            // After typing is complete, show the blinking cursor
            const cursor = document.getElementById("cursor");
            if (cursor) {
                cursor.style.display = "inline";
            }
        }
    }

    if (element) {
        typeWriter();
    }
});
</script>

<template>
    <div class="container flex justify-center">
        <div class="text-4xl pt-45">
            <span id="greeting"></span>
            <span id="cursor" class="cursor">|</span>
        </div>
    </div>
</template>

<style scoped>
.cursor {
    display: none;
    animation: blink 1s infinite;
}

@keyframes blink {
    0%,
    50% {
        opacity: 1;
    }
    51%,
    100% {
        opacity: 0;
    }
}
</style>

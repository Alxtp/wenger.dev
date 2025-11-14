<script setup lang="ts">
useHead({
    title: "Ananas Clicker",
});

const count = ref(0);

const items = ref({
    0: {
        name: "Ananas Quality",
        description: "Increase manually farmed Ananas value by 1",
        cost: 10,
        generates: 0,
        lock: false,
        icon: "✳️",
        count: 0,
    },
    1: {
        name: "Ananas Tree",
        description: "Automatically grows 1 Ananas per second",
        cost: 100,
        generates: 1,
        lock: true,
        icon: "🌴",
        count: 0,
    },
    2: {
        name: "Ananas Farmer",
        description: "Automatically farms 10 Ananas per second",
        cost: 10000,
        generates: 10,
        lock: true,
        icon: "👨‍🌾",
        count: 0,
    },
    3: {
        name: "Ananas Farm",
        description: "Automatically grows 100 Ananas per second",
        cost: 1000000,
        generates: 100,
        lock: true,
        icon: "🚜",
        count: 0,
    },
    4: {
        name: "Canned Ananas",
        description: "Increases the value of all Ananases by 1",
        cost: 100000000,
        generates: 0,
        lock: true,
        icon: "🥫",
        count: 0,
    },
    5: {
        name: "Ananas Factory",
        description: "Automatically produces 1000 Ananas per second",
        cost: 10000000000,
        generates: 1000,
        lock: true,
        icon: "🏭",
        count: 0,
    },
});

function buyItem(id: number) {
    const item = items.value[id];

    if (count.value >= item.cost) {
        console.log("Buying", item.name);
    } else {
        alert("Dont engohg Ananas!");
    }
}
</script>

<template>
    <div class="container">
        <h1>Ananas Clicker</h1>
        <div class="grid grid-cols-3 gap-10 h-150">
            <div class="rounded-lg ring ring-neutral-700/50 p-5">
                <p class="text-2xl">Shop</p>
                <div class="flex flex-col gap-3 pt-5">
                    <button
                        class="grid grid-cols-[auto_1fr_1fr] gap-2 hover:bg-neutral-700/20 p-1"
                        v-for="(item, key) in items"
                        :key="key"
                    >
                        <span class="text-4xl">{{ item.icon }}</span>
                        <div class="text-left">
                            <p class="font-bold">
                                {{ item.name }}
                            </p>
                            <p class="font-light text-sm">
                                {{ item.description }}
                            </p>
                            <UButton @click="buyItem(key)" class="mt-2">
                                Buy for {{ item.cost }}🍍
                            </UButton>
                        </div>
                        <p class="flex justify-self-end items-center">
                            Count: {{ item.count }}
                        </p>
                    </button>
                </div>
            </div>
            <div
                class="flex flex-col border-3 border-primary justify-center items-center gap-5"
            >
                <button
                    @click="count++"
                    class="text-9xl cursor-pointer select-none"
                >
                    🍍
                </button>
                <p>{{ count }}</p>
            </div>
            <div class="border-3 border-primary"></div>
        </div>
    </div>
</template>

<style scoped></style>

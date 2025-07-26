<script setup lang="ts"></script>

<template>
    <footer class="w-full">
        <div class="flex justify-between p-5 border-t border-default mx-auto">
            <p>
                © {{ new Date().getFullYear() }}
                <ULink to="https://github.com/Alxtp">Alexander Wenger</ULink>.
                No rights reserved.
            </p>
            <UButton
                icon="i-lucide-code-xml"
                color="secondary"
                variant="ghost"
                to="https://github.com/Alxtp/wenger.dev"
            >
                View on GitHub
            </UButton>
        </div>
    </footer>
</template>

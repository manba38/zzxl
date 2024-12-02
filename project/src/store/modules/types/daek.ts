// stores/darkMode.js
import { defineStore } from 'pinia';

export const useDarkModeStore = defineStore('darkMode', {
    state: () => ({
        dark: false,
    }),
    actions: {
        toggleDarkMode() {
            this.dark = !this.dark;
        },
    },
});
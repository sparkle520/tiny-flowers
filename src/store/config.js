import { defineStore } from 'pinia'

export const useConfigStore = defineStore('config', {
    state: () => ({

        theme: false,
        layout: true,

    }),
    actions: {
        change_g_theme() {
            this.theme = !this.theme;
        },
        change_g_layout() {
            this.layout = !this.layout;
        }
    }
})
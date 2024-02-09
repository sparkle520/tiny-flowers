import { defineStore } from 'pinia'

export const useConfigStore = defineStore('config', {
    state: () => ({

        theme: false,
        layout: true,
        list_layout: true,

    }),
    actions: {
        change_g_theme() {
            this.theme = !this.theme;
        },
        change_g_list_layout(v) {
            this.list_layout = v;
        },
        change_g_layout() {
            this.layout = !this.layout;
        }
    }
})
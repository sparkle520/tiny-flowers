import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
    state: () => ({

        name: '花降らし',
        signature: "人一旦失去重要的东西，就很难再获得了",


    }),
    actions: {
        // ...
    }
})
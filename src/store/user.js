import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
    state: () => ({

        name: '花降らし',
        signature: "人一旦失去重要的东西，就很难再获得了",
        avatar:'https://pic.imgdb.cn/item/659e63dc871b83018a2d7de3.jpg'

    }),
    actions: {
        // ...
    }
})
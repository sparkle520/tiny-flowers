import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
    state: () => ({

        name: '花降らし',
        signature: "人一旦失去重要的东西，就很难再获得了",
        avatar:'https://pic.imgdb.cn/item/65b6b29c871b83018af70c9a.png'

    }),
    actions: {
        // ...
    }
})
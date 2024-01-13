const data = [
    {
        id: 2,
        title: 'Rust写的第一个算法',
        link: '/unknownWorldMap/topic/2',
        data: '1月14号?2024?11:06',
        img: '',
        tags: 'rust?algorithm',
        classification: '学习笔记',
        short_message: 'Given n, take the sum of the digits of n. If that value has more than one digit...'
    },
    { id: 1, title: 'Weathering With you(经典语录)', link: '/unknownWorldMap/topic/1', data: '1月6号?2024?7:06', img: 'https://pic.imgdb.cn/item/659d3a51871b83018a5b5766.jpg', tags: 'weathering with you', classification: '二次元', short_message: '彼女と過ごした、あの年の夏。東京の空の上で僕たちは、世界の形を決定的に変えてしまったのだ」<br>那年夏天，在那个天空之上的我们，把这个世界的样貌，彻底的改变了' },
]

// {
//     id: ,
//     title: '',
//     link: '/unknownWorldMap/topic/',
//     data: '1月6号?2024?7:06',
//     img: '',
//     tags: '',
//     classification: '二次元',
//     short_message: ''
// },
const acg = [
    {  id: 1,title: 'Weathering With you(经典语录)',  link: '/unknownWorldMap/topic/1', data: '1月6号?2024?7:06',  img: 'https://pic.imgdb.cn/item/659d3a51871b83018a5b5766.jpg',tags: 'weathering with you?天气の子',classification: '二次元', short_message: '彼女と過ごした、あの年の夏。東京の空の上で僕たちは、世界の形を決定的に変えてしまったのだ」<br>那年夏天，在那个天空之上的我们，把这个世界的样貌，彻底的改变了'},
    {  id: 1,title: 'Weathering With you(经典语录)',  link: '/unknownWorldMap/topic/1', data: '1月6号?2024?7:06',  img: 'https://pic.imgdb.cn/item/659d3a51871b83018a5b5766.jpg',tags: 'weathering with you?天气の子',classification: '二次元', short_message: '彼女と過ごした、あの年の夏。東京の空の上で僕たちは、世界の形を決定的に変えてしまったのだ」<br>那年夏天，在那个天空之上的我们，把这个世界的样貌，彻底的改变了'},
    {  id: 1,title: 'Weathering With you(经典语录)',  link: '/unknownWorldMap/topic/1', data: '1月6号?2024?7:06',  img: 'https://pic.imgdb.cn/item/659d3a51871b83018a5b5766.jpg',tags: 'weathering with you?天气の子',classification: '二次元', short_message: '彼女と過ごした、あの年の夏。東京の空の上で僕たちは、世界の形を決定的に変えてしまったのだ」<br>那年夏天，在那个天空之上的我们，把这个世界的样貌，彻底的改变了'},
    {  id: 1,title: 'Weathering With you(经典语录)',  link: '/unknownWorldMap/topic/1', data: '1月6号?2024?7:06',  img: 'https://pic.imgdb.cn/item/659d3a51871b83018a5b5766.jpg',tags: 'weathering with you?天气の子',classification: '二次元', short_message: '彼女と過ごした、あの年の夏。東京の空の上で僕たちは、世界の形を決定的に変えてしまったのだ」<br>那年夏天，在那个天空之上的我们，把这个世界的样貌，彻底的改变了'},
    {  id: 1,title: 'Weathering With you(经典语录)',  link: '/unknownWorldMap/topic/1', data: '1月6号?2024?7:06',  img: 'https://pic.imgdb.cn/item/659d3a51871b83018a5b5766.jpg',tags: 'weathering with you?天气の子',classification: '二次元', short_message: '彼女と過ごした、あの年の夏。東京の空の上で僕たちは、世界の形を決定的に変えてしまったのだ」<br>那年夏天，在那个天空之上的我们，把这个世界的样貌，彻底的改变了'},
    {  id: 1,title: 'Weathering With you(经典语录)',  link: '/unknownWorldMap/topic/1', data: '1月6号?2024?7:06',  img: 'https://pic.imgdb.cn/item/659d3a51871b83018a5b5766.jpg',tags: 'weathering with you?天气の子',classification: '二次元', short_message: '彼女と過ごした、あの年の夏。東京の空の上で僕たちは、世界の形を決定的に変えてしまったのだ」<br>那年夏天，在那个天空之上的我们，把这个世界的样貌，彻底的改变了'},
    {  id: 1,title: 'Weathering With you(经典语录)',  link: '/unknownWorldMap/topic/1', data: '1月6号?2024?7:06',  img: 'https://pic.imgdb.cn/item/659d3a51871b83018a5b5766.jpg',tags: 'weathering with you?天气の子',classification: '二次元', short_message: '彼女と過ごした、あの年の夏。東京の空の上で僕たちは、世界の形を決定的に変えてしまったのだ」<br>那年夏天，在那个天空之上的我们，把这个世界的样貌，彻底的改变了'},
    {  id: 1,title: 'Weathering With you(经典语录)',  link: '/unknownWorldMap/topic/1', data: '1月6号?2024?7:06',  img: 'https://pic.imgdb.cn/item/659d3a51871b83018a5b5766.jpg',tags: 'weathering with you?天气の子',classification: '二次元', short_message: '彼女と過ごした、あの年の夏。東京の空の上で僕たちは、世界の形を決定的に変えてしまったのだ」<br>那年夏天，在那个天空之上的我们，把这个世界的样貌，彻底的改变了'},
    {  id: 1,title: 'Weathering With you(经典语录)',  link: '/unknownWorldMap/topic/1', data: '1月6号?2024?7:06',  img: 'https://pic.imgdb.cn/item/659d3a51871b83018a5b5766.jpg',tags: 'weathering with you?天气の子',classification: '二次元', short_message: '彼女と過ごした、あの年の夏。東京の空の上で僕たちは、世界の形を決定的に変えてしまったのだ」<br>那年夏天，在那个天空之上的我们，把这个世界的样貌，彻底的改变了'},
    {  id: 1,title: 'Weathering With you(经典语录)',  link: '/unknownWorldMap/topic/1', data: '1月6号?2024?7:06',  img: 'https://pic.imgdb.cn/item/659d3a51871b83018a5b5766.jpg',tags: 'weathering with you?天气の子',classification: '二次元', short_message: '彼女と過ごした、あの年の夏。東京の空の上で僕たちは、世界の形を決定的に変えてしまったのだ」<br>那年夏天，在那个天空之上的我们，把这个世界的样貌，彻底的改变了'},
    {  id: 1,title: 'Weathering With you(经典语录)',  link: '/unknownWorldMap/topic/1', data: '1月6号?2024?7:06',  img: 'https://pic.imgdb.cn/item/659d3a51871b83018a5b5766.jpg',tags: 'weathering with you?天气の子',classification: '二次元', short_message: '彼女と過ごした、あの年の夏。東京の空の上で僕たちは、世界の形を決定的に変えてしまったのだ」<br>那年夏天，在那个天空之上的我们，把这个世界的样貌，彻底的改变了'},
    {  id: 1,title: 'Weathering With you(经典语录)',  link: '/unknownWorldMap/topic/1', data: '1月6号?2024?7:06',  img: 'https://pic.imgdb.cn/item/659d3a51871b83018a5b5766.jpg',tags: 'weathering with you?天气の子',classification: '二次元', short_message: '彼女と過ごした、あの年の夏。東京の空の上で僕たちは、世界の形を決定的に変えてしまったのだ」<br>那年夏天，在那个天空之上的我们，把这个世界的样貌，彻底的改变了'},
    {  id: 1,title: 'Weathering With you(经典语录)',  link: '/unknownWorldMap/topic/1', data: '1月6号?2024?7:06',  img: 'https://pic.imgdb.cn/item/659d3a51871b83018a5b5766.jpg',tags: 'weathering with you?天气の子',classification: '二次元', short_message: '彼女と過ごした、あの年の夏。東京の空の上で僕たちは、世界の形を決定的に変えてしまったのだ」<br>那年夏天，在那个天空之上的我们，把这个世界的样貌，彻底的改变了'},
    {  id: 1,title: 'Weathering With you(经典语录)',  link: '/unknownWorldMap/topic/1', data: '1月6号?2024?7:06',  img: 'https://pic.imgdb.cn/item/659d3a51871b83018a5b5766.jpg',tags: 'weathering with you?天气の子',classification: '二次元', short_message: '彼女と過ごした、あの年の夏。東京の空の上で僕たちは、世界の形を決定的に変えてしまったのだ」<br>那年夏天，在那个天空之上的我们，把这个世界的样貌，彻底的改变了'},
    {  id: 1,title: 'Weathering With you(经典语录)',  link: '/unknownWorldMap/topic/1', data: '1月6号?2024?7:06',  img: 'https://pic.imgdb.cn/item/659d3a51871b83018a5b5766.jpg',tags: 'weathering with you?天气の子',classification: '二次元', short_message: '彼女と過ごした、あの年の夏。東京の空の上で僕たちは、世界の形を決定的に変えてしまったのだ」<br>那年夏天，在那个天空之上的我们，把这个世界的样貌，彻底的改变了'},
    {  id: 1,title: 'Weathering With you(经典语录)',  link: '/unknownWorldMap/topic/1', data: '1月6号?2024?7:06',  img: 'https://pic.imgdb.cn/item/659d3a51871b83018a5b5766.jpg',tags: 'weathering with you?天气の子',classification: '二次元', short_message: '彼女と過ごした、あの年の夏。東京の空の上で僕たちは、世界の形を決定的に変えてしまったのだ」<br>那年夏天，在那个天空之上的我们，把这个世界的样貌，彻底的改变了'},
    {  id: 1,title: 'Weathering With you(经典语录)',  link: '/unknownWorldMap/topic/1', data: '1月6号?2024?7:06',  img: 'https://pic.imgdb.cn/item/659d3a51871b83018a5b5766.jpg',tags: 'weathering with you?天气の子',classification: '二次元', short_message: '彼女と過ごした、あの年の夏。東京の空の上で僕たちは、世界の形を決定的に変えてしまったのだ」<br>那年夏天，在那个天空之上的我们，把这个世界的样貌，彻底的改变了'},
    {  id: 1,title: 'Weathering With you(经典语录)',  link: '/unknownWorldMap/topic/1', data: '1月6号?2024?7:06',  img: 'https://pic.imgdb.cn/item/659d3a51871b83018a5b5766.jpg',tags: 'weathering with you?天气の子',classification: '二次元', short_message: '彼女と過ごした、あの年の夏。東京の空の上で僕たちは、世界の形を決定的に変えてしまったのだ」<br>那年夏天，在那个天空之上的我们，把这个世界的样貌，彻底的改变了'},
    {  id: 1,title: 'Weathering With you(经典语录)',  link: '/unknownWorldMap/topic/1', data: '1月6号?2024?7:06',  img: 'https://pic.imgdb.cn/item/659d3a51871b83018a5b5766.jpg',tags: 'weathering with you?天气の子',classification: '二次元', short_message: '彼女と過ごした、あの年の夏。東京の空の上で僕たちは、世界の形を決定的に変えてしまったのだ」<br>那年夏天，在那个天空之上的我们，把这个世界的样貌，彻底的改变了'},
    {  id: 1,title: 'Weathering With you(经典语录)',  link: '/unknownWorldMap/topic/1', data: '1月6号?2024?7:06',  img: 'https://pic.imgdb.cn/item/659d3a51871b83018a5b5766.jpg',tags: 'weathering with you?天气の子',classification: '二次元', short_message: '彼女と過ごした、あの年の夏。東京の空の上で僕たちは、世界の形を決定的に変えてしまったのだ」<br>那年夏天，在那个天空之上的我们，把这个世界的样貌，彻底的改变了'},
]
const technique = [
    { id: 1, title: 'Weathering With you(经典语录)', link: '/unknownWorldMap/topic/1', data: '1月6号?2024?7:06', img: 'https://pic.imgdb.cn/item/659d3a51871b83018a5b5766.jpg', tags: 'weathering with you', classification: '二次元', short_message: '彼女と過ごした、あの年の夏。東京の空の上で僕たちは、世界の形を決定的に変えてしまったのだ」<br>那年夏天，在那个天空之上的我们，把这个世界的样貌，彻底的改变了' },
]
const study = [
    {
        id: 1,
        title: 'Rust写的第一个算法',
        link: '/unknownWorldMap/topic/2',
        data: '1月14号?2024?11:06',
        img: '',
        tags: 'rust?algorithm',
        classification: '学习笔记',
        short_message: 'Given n, take the sum of the digits of n. If that value has more than one digit...'
    },
]
const life = [
    { id: 1, title: 'Weathering With you(经典语录)', link: '/unknownWorldMap/topic/1', data: '1月6号?2024?7:06', img: 'https://pic.imgdb.cn/item/659d3a51871b83018a5b5766.jpg', tags: 'weathering with you', classification: '二次元', short_message: '彼女と過ごした、あの年の夏。東京の空の上で僕たちは、世界の形を決定的に変えてしまったのだ」<br>那年夏天，在那个天空之上的我们，把这个世界的样貌，彻底的改变了' },
]
export default { data, acg, technique, study, life };
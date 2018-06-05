<template lang="pug">
    div
        img.has-bg-img
        app-header
        div.container.m-t-3
            div.card.m-b-1(v-for="post in posts")
                div.box
                    div.card-header 
                        div.card-header-title Title: {{post.title}}
                    div.card-content
                        p {{ post.body }}
                        br
                        nuxt-link(:to="'/posts/'+ post.id") Read more...
</template>

<script>
import axios from 'axios';
import Header from '~/components/Header.vue';

export default {
    components: {
        appHeader: Header
    },
    asyncData ({ params }) {
        return axios.get(`https://jsonplaceholder.typicode.com/posts/`)
        .then((res) => {
            return {
                posts: res.data
            }
        })
    }
}
</script>

<style lang="scss">
.m-t-3 {
    margin-top: 3rem;
}
.m-b-1 {
    margin-bottom: 1rem;
}
.box {
    background: rgba(255,255,255, 0.6);
}
.card {
    background: rgba(255,255,255, 0.6);
    color: rgba(0,0,0,1);
}
.has-bg-img {
    background: url('~/assets/bg-img.jpg');
    background-size: cover;
    background-position: top;
    position: fixed;
    height: 100vh;
    width: 100vw;
}
</style>


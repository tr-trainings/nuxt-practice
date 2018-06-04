<template lang="pug">
    div
        app-header
        div.container.m-t-3
            div.box(v-for="post in posts")
                div.card
                    div.card-header 
                        div.card-header-title Title: {{post.title}}
                        p(value="") by: {{ post.name }}
                    div.card-content
                        p {{ post.body }}
                        br
                        nuxt-link(:to="'/posts/'+ post.id") Read more...
</template>

<script>
import axios from 'axios';

import Header from '~/components/Header.vue';

export default {
    data() {
      return {
      }
    },
    components: {
        appHeader: Header
    },
    methods: {
        getUser(id) {
          axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
            .then((res) => {
                // console.log(res.data.name);
                return res.data.name
            })
            // .then (res => {
            //     console.log(res);
            //     return res;
            // })
            .catch((err) =>{
                console.log(err);
            })
        }
    },
    updated () {
      
    },
    asyncData ({ params }) {
        return axios.get(`https://jsonplaceholder.typicode.com/posts/`)
        .then(async (res) => {
          await res.data.forEach(function(element, index) {
            res.data[index].name = axios.get(`https://jsonplaceholder.typicode.com/users/${element.userId}`)
          })
          res.data.forEach(function(element, index) {
            element.name.then(function(result) {
              res.data[index].name = result.data.name
            })
          })
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
</style>
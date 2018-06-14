<template>
    <div>
        <p>userId: {{userId}}</p>
        <p>id: {{id}}</p>
        <p>title: {{title}}</p>
        <p>body: {{body}}</p>
    </div>
</template>

<script>

import axios from 'axios';

export default {

    //********** Returning a promise **********//

    /* asyncData ({ params }) {
        return axios.get(`https://jsonplaceholder.typicode.com/posts/${params.id}`)
        .then((res) => {
            return {
                userId: res.data.userId,
                id: res.data.id,
                title: res.data.title,
                body: res.data.body,
            }
        })
    } */


    //********** Using async/await **********//

    /* async asyncData ({ params }) {
        let { data } = await axios.get(`https://jsonplaceholder.typicode.com/posts/${params.id}`)
        return {
            userId: data.userId,
            id: data.id,
            title: data.title,
            body: data.body,
        }
    } */


    //********** Using a callback **********//

    asyncData ({ params }, callback) {
      axios.get(`https://jsonplaceholder.typicode.com/posts/${params.id}`)
      .then((res) => {
          callback(null, {
              userId: res.data.userId,
              id: res.data.id,
              title: res.data.title,
              body: res.data.body,
          })
      })
    }
}
</script>

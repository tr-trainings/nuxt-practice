<template lang="pug">
div
	img.has-bg-img
	div.container
		div.card.m-b-1(v-for="post in posts")
			div.box
				div.card-header
					div.card-header-title Title: {{post.title}}
					span by: {{ post.name }}
				div.card-content
					p {{ post.body }}
					br
					nuxt-link(:to="'/posts/'+ post.id") Read more...
</template>

<script>
import  axios  from  'axios';

export  default {
	async  asyncData ({ params }) {
		// get all posts from jsonplaceholder.typicode.com/post/
		let  posts  =  await  axios.get(`https://jsonplaceholder.typicode.com/posts/`).then((res) => {
			return  res;
		})

		// use the userId from the fetched posts to locate the name of the user
		let  injectToPosts  = [];
		posts.data.forEach((rawPost, index) => {
			let  toInject  =  axios.get(`https://jsonplaceholder.typicode.com/users/${rawPost.userId}`)
			injectToPosts.push(toInject);
		});

		//injection the name of the user to posts
		await  axios.all(injectToPosts).then((result) => {
			for (let  i  =  0; i  <  result.length; i++){
				posts.data[i].name  =  result[i].data.name;
			}
		})

		// sending
		return {
			posts:  posts.data
		}
	}
}
</script>

<style  lang="scss">
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


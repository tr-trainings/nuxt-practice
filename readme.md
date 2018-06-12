In this tutorial I'll try to help you understand the fundamental workings of the Nuxt.js, create a mini blog app at the end and deploy it. This tutorial uses the [official Nuxt.js documentation](https://nuxtjs.org/) as a reference.

Techonologies used:
- Vue
- Nuxt
- Webpack
- Babel
- Sass/Scss
- Pug
- Vuex
- Axios
- Buefy


# 1. [Installation from scratch](https://nuxtjs.org/guide/installation)
First we need to create a folder where our project would be located and initialize a package.json.
```shell
$ mkdir nuxt-practice
$ cd nuxt-practice/
$ npm init
```
After the initialization of package.json, let's install the Nuxt.js by typing
```
$ npm install --save nuxt
```
Then let's add a script for Nuxt.js by opening the package.json from your favorite text editor and adding the line
``` "dev": "nuxt" ``` to the scripts. 

Your folder and package.json should look like this.
![image of package.json and folder structure](https://raw.githubusercontent.com/trleonarddalmacio/images/master/nuxt-tutorial/https://raw.githubusercontent.com/trleonarddalmacio/images/master/nuxt-tutorial/1.%20Intro%201.png)

To verify that it's running correctly let's create a folder named **pages**, and create an **index.vue** file inside the created folder. 

---

**NOTE:** The pages folder will serve as the routing path in the parameter field. 

---

For example,
You have a site called **googlee<span></span>.com**
The file in the **/pages/users/index.vue** will be automatically routed and rendered to **googlee<span></span>.com/users**.

More of this would be discussed later.

Coming back, inside the index.vue file lets add a template with Hello World.
```html
<template>
	<div>
		<h1>Hello WORLD!</h1>
	</div>
</template>
```
Then run
```
$ npm run dev
```
Now your file should be running at **http://localhost:3000/**
![hello world](https://raw.githubusercontent.com/trleonarddalmacio/images/master/nuxt-tutorial/1.%20Intro%202.png)

# 2. [Directory Structure](https://nuxtjs.org/guide/directory-structure)
There are 8 folder and 2 files that are important for Nuxt.js. Included in those are the **pages** folder and the **package.json**, but in this tutorial, we would not be using all of them. Still, I would be creating all of them.

Let's create the other 7 folders (**assets**, **component**, **layouts**, **middleware**, **plugins**, **static**, ) and the file **nuxt.config.js**

My current folder structure look like this:

![folder structure](https://raw.githubusercontent.com/trleonarddalmacio/images/master/nuxt-tutorial/2.%20Directory.png)


---
**NOTE:** You can also use a template to setup a Nuxt.js project.
### Installation using a starter template
First you need to have a [vue-cli](https://github.com/vuejs/vue-cli) installed. In case you don't have it, you can install it by going to the terminal and typing
```
$ sudo npm install -g @vue/cli 
# or 
$ sudo yarn global add @vue/cli
```
After installing the vue-cli, you can immediately create a nuxt project with
```
# (folder) refers to the name of your folder you want to create
$ vue init nuxt-community/starter-template (folder)
$ cd (folder)
$ npm install 
$ npm run dev
```
---

# 3. Routing
If you're familiar with [vue-router](https://router.vuejs.org/), this is easier to understand. In essence the **Nuxt.js** would automatically setup the routing of the site based on the folder and file structure of the **pages** folder. 

### There are 3 types of routing that we would be using
1. Basic Routing
2. Dynamic Routing
3. Nested Routing

#### Basic Routing
This is similar to what we have done earlier. To let it sink in let's do it again.
Let's create a folder named **basic-routes** inside the pages folder. Within the **basic-routes** folder create **index.vue**, **other.vue** and copy

index.vue
```html
<template>
	<div>
		<h1>This is the pages/basic-routes/index.vue</h1>
	</div>
</template>
```
other.vue
```html
<template>
	<div>
		<h1>This is the pages/basic-routes/index.vue</h1>
	</div>
</template>
```
![basic routing image](https://raw.githubusercontent.com/trleonarddalmacio/images/master/nuxt-tutorial/3%20Routes%201.png)

Then go to http://localhost:3000 and try accessing the routes. 

1. http://localhost:3000/basic-routes/
2. http://localhost:3000/basic-routes/other

### Dynamic Routing
Dynamic routes can be created by prefixing an **underscore** to the name of the folder or file.

Make a folder named dynamic-routes, and put their paths inside
![dynamic](https://raw.githubusercontent.com/trleonarddalmacio/images/master/nuxt-tutorial/3%20Routes%202.png)

/pages/dynamic-routes/folder/index.vue
```html
<template>
	<div>
		<h1>/pages/dynamic-routes/folder/index.vue</h1>
	</div>
</template>
```
repeat this pattern to other files.

Try accessing
1. http://localhost:3000/dynamic-routes/
2. http://localhost:3000/dynamic-routes/hahaha
3. http://localhost:3000/dynamic-routes/folder/
4. http://localhost:3000/dynamic-routes/folder/hehehe

### Nested Routes
To create a nested route you should create a Vue file with the **same name as the directory** which contains the children and add ```<nuxt-child/>``` inside the parent component.
![nested-routes](https://raw.githubusercontent.com/trleonarddalmacio/images/master/nuxt-tutorial/3%20Routes%203.png)

users.vue
```html
<template>
	<div>
		<h1>/pages/nested-routes/users.vue</h1>
		<nuxt-child/> <!-- this is where the child component will render -->
	</div>
</template>
```
Do the same with other Vue files as we did above just remove the ```<nuxt-child/>``` to the child components

Try accessing 
http://localhost:3000/nested-routes/users
http://localhost:3000/nested-routes/users/3

---

**NOTE:** You can validate params by adding a validate method. Change the content of the _id.vue to
```html
<template>
	<div>
		<h1>/pages/nested-routes/users/_id.vue</h1>
	</div>
</template>
  
<script>
export default {
	validate ({ params }) {
		// Must be a number
		return /^\d+$/.test(params.id)
	}
}
</script>
```
and try accessing
http://localhost:3000/nested-routes/users/one

---

# 4. [Async Data](https://nuxtjs.org/guide/async-data)
You may want to use asyncData if you want to fetch a data from the server without using store. ```asyncData``` is always called before loading a component. There are **3 ways** you can use asyncData, by **returning a promise**, **using await/async** and **using a callback**. I will be using https://jsonplaceholder.typicode.com/ to fetch some dummy data so we can try it without creating an API.

Before starting let's install axios by running
```
$ npm install --save axios
```

After installing, in  your pages folder create a folder named **posts** and inside the **posts** folder make a Vue file named **_id.vue** and copy the code below

_id.vue
```html
<template>
	<div>
		<p>userId: {{userId}}</p>
		<p>id: {{id}}</p>
		<p>title: {{title}}</p>
		<p>body: {{body}}</p>
	</div>
</template>

<script>
import  axios  from  'axios';

export  default {
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
				userId:  res.data.userId,
				id:  res.data.id,
				title:  res.data.title,
				body:  res.data.body,
			})
		})
	}
}
</script>
```

The page should look like

![async-data](https://raw.githubusercontent.com/trleonarddalmacio/images/master/nuxt-tutorial/4%20Async%20Data%201.1.png)

# 5. [Assets](https://nuxtjs.org/guide/assets)
The files inside **assets folder** are things that the **webpack would try to touch and process** so files that needs to be processed should be inside the assets folder like sass and less. Otherwise you can put them on the **static folder** which is automatically served by the Nuxt.js.

Files in the assets folder can be access by adding ```~/assets/{desitnation}```, while files in static folder can be accessed with ```/{desitnation}```

Example:
```html
<!-- webpacked image from assets directory -->
<img src="~/assets/my-image-2.png"/>

<!-- Static image from static directory -->
<img src="/my-image.png"/>
```

To try this let's download 2 image, any image is fine. Name them img1, img2 and put them at assets and static folder. Afterwards try to link them in the /pages/index.vue

My folder structure looks like:
	![assets-static-structure](https://raw.githubusercontent.com/trleonarddalmacio/images/master/nuxt-tutorial/5%20Assets%201.1.png)

In browser:

![assets-static-result](https://raw.githubusercontent.com/trleonarddalmacio/images/master/nuxt-tutorial/5%20Assets%202.1.png)


# 6. [Plugins](https://nuxtjs.org/guide/plugins)
Plugins are called before the initialization of the root vue.js application.

In this step we will create a simple blog app that can get a list of posts and their specific content.

If we have external packages that we need to use, we must include them in nuxt.config.js so they won't be duplicated every time we import them.

Thus we will fix the Axios that we import earlier and add some plugins and packages that we need to use.

To install the packages type the
```
$ npm install --save nuxt-buefy
# and
$ npm install --save-dev pug@2.0.0-beta6 pug-loader node-sass sass-loader
```

After it's done installing, create a file called **buefy.js** inside the **plugins folder** and add the following code
```javascript
import Vue  from  'vue';
import Buefy  from  'buefy';
import 'buefy/lib/buefy.css';

Vue.use(Buefy);
```

Thereafter, open the nuxt.config.js and copy this code
```javascript
module.exports = {
	build: {
		vendor: [
			'axios',
			'buefy'
		]
	},
	plugins: [
		{ src: '~/plugins/buefy', ssr:  false }
	]
	// modules: [
	// // Simple usage
	// 'nuxt-buefy',
	// ['nuxt-buefy', { /* buefy options */ }]
	// ],
}
```
---

**NOTE:**  This is **not** the optimal way to **use Buefy with Nuxt**. You should  run `npm install --save nuxt-buefy` and simply include it on **modules** at **nuxt.config.js**. I've imported Buefy through plugins to show how to add a plugin. But both of them do work, it's just that importing Buefy through the plugin would delay the application of the css.

**This is the correct way**
```
$ npm install --save nuxt-buefy
```
nuxt.config.js
```js
module.exports  = {
	build: {
		vendor: [
			'axios',
		]
	},
	//plugins: [
	//	{ src: '~/plugins/buefy', ssr:  false }
	//]
	modules: [
		// Simple usage
		'nuxt-buefy',
		['nuxt-buefy', { /* buefy options */ }]
	],
	// ** You don't need the /plugins/buefy.js if you imported through modules **
}
```

---

Now we can freely use the Buefy inside our modules. Now, let's create a Header.vue file inside the components directory. Copy this code inside
```pug
<template  lang="pug">
	nav.navbar.is-primary.has-shadow.is-spaced
		div.container
			div.navbar-brand
				a.nav-item.is-size-3.has-text-light </> Blog Posts
		div.navbar-menu
			div.navbar-start.m-l-2
				a.navbar-item.button.is-primary.control Home
				a.navbar-item.button.is-primary.control About Us
			div.navbar-end
				a.button.is-primary.control Login
				a.button.is-primary.control Sign Up
</template>

  

<style>
.m-l-2 {
	margin-left: 2rem;
}
</style>
```

Then lets create an index.vue file in the pages/posts/ and connect the Header.vue. Copy this code to your pages/posts/index.vue
```pug
<template  lang="pug">
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
import  axios  from  'axios';
import  Header  from  '~/components/Header.vue';

export  default {
	components: {
		appHeader:  Header
	},
	asyncData ({ params }) {
		return  axios.get(`https://jsonplaceholder.typicode.com/posts/`)
			.then((res) => {
				return {
					posts:  res.data
				}
			})
	}
}
</script>

<style  lang="scss">
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
```
I've downloaded a background image of my own, you can download your own background image.

My files
![plugin-file-structure](https://raw.githubusercontent.com/trleonarddalmacio/images/master/nuxt-tutorial/6%20Plugins%201.png)

Output:

![plugin-output](https://raw.githubusercontent.com/trleonarddalmacio/images/master/nuxt-tutorial/6%20Plugins%202.png)

# 7. [Deployment](https://nuxtjs.org/faq/heroku-deployment)
Finally, we will learn how to deploy our application into Heroku.

If you don't have an account, please do [sign up for a Heroku account](https://signup.heroku.com/login). 

Then Install the Heroku CLI by running
```
$ sudo npm -g heroku
```
and login by typing
```
$ heroku login
```
![heroku-login](https://raw.githubusercontent.com/trleonarddalmacio/images/master/nuxt-tutorial/7%20Deployment%201.png)

In your Heroku dashboard create a new app
![heroku-create-app](https://raw.githubusercontent.com/trleonarddalmacio/images/master/nuxt-tutorial/7%20Deployment%202.png)

After creation type,
```
$ heroku config:set NPM_CONFIG_PRODUCTION=false -a <app-name>
# <app-name> is the name of the app you created at heroku
$ heroku config:set HOST=0.0.0.0 -a <app-name>
$ heroku config:set NODE_ENV=production -a <app-name>
```
![heroku-config](https://raw.githubusercontent.com/trleonarddalmacio/images/master/nuxt-tutorial/7%20Deployment%203.png)

To let our application run on Heroku, we need to modify our scripts in the package.json. 
Replace your scripts with this
```js
"scripts": {
	"dev": "nuxt",
	"build": "nuxt build",
	"start": "nuxt start",
	"heroku-postbuild": "npm run build"
},
```
![heroku-script](https://raw.githubusercontent.com/trleonarddalmacio/images/master/nuxt-tutorial/7%20Deployment%204.png)

Now lets connect create our repo, connect it to Heroku and then, deploy it!
Navigate to your project folder and type
```
$ git init
$ git add .
$ git commit -m "deploying"
$ heroku git:remote -a <app-name>
$ git push heroku master
```
Wait for it to be pushed, if you are successful you should have seen this message

![pushing-to-heroku](https://raw.githubusercontent.com/trleonarddalmacio/images/master/nuxt-tutorial/7%20Deployment%205.png)

Now let's see our deployed website!
![deployed-website](https://raw.githubusercontent.com/trleonarddalmacio/images/master/nuxt-tutorial/7%20Deployment%206.png)

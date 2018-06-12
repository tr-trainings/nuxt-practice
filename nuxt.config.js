module.exports = {
    build: {
        vendor: [
            'axios', 
        ]
    },
    css: [
      './node_modules/buefy/lib/buefy.css'

    ],
    plugins: [
        { src: '~/plugins/buefy', ssr: true }
    ],
  //   modules: [
  //     // Simple usage
  //     'nuxt-buefy',
  
  //     ['nuxt-buefy', { /* buefy options */ }]
  //  ],
}
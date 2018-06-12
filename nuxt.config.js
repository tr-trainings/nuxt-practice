module.exports = {
    build: {
        vendor: [
            'axios', 
        ]
    },
    css: [
      './node_modules/buefy/lib/buefy.css'

    ],
    modules: [
      // Simple usage
      'nuxt-buefy',
  
      ['nuxt-buefy', { /* buefy options */ }]
   ],
}
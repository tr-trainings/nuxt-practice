module.exports = {
    build: {
        vendor: [
            'axios', 
            'buefy'
        ]
    },
    plugins: [
        { src: '~/plugins/buefy', ssr: false }
    ]
}
export default {
    // Disable server-side rendering (https://go.nuxtjs.dev/ssr-mode)
    ssr: false,

    // Global page headers (https://go.nuxtjs.dev/config-head)
    head: {
        title: "WriteKit",
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: '' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
            { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/boxicons@2.0.5/css/boxicons.min.css' },
            { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Montserrat&display=swap' }
        ]
    },

    // Global CSS (https://go.nuxtjs.dev/config-css)
    css: [],

    // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
    plugins: [
        { src: '~/plugins/global.js', mode: 'client' },
        { src: '~/plugins/autoresize.js', mode: 'client' }
    ],

    // Auto import components (https://go.nuxtjs.dev/config-components)
    components: true,

    // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
    buildModules: [
        '@nuxtjs/pwa'
    ],

    // Modules (https://go.nuxtjs.dev/config-modules)
    modules: [
        // https://go.nuxtjs.dev/buefy
        'nuxt-buefy',
    ],

    // Build Configuration (https://go.nuxtjs.dev/config-build)
    build: {},

    pwa: {
        icon: {
            iconSrc: './assets/icon.png'
        },
        manifest: {
            name: 'WriteKit',
            lang: 'en',
            theme_color: '#00CEC9',
            start_url: '/dashboard',
            description: 'A powerful, flexible, and simple block based document editor.',
            useWebmanifestExtension: false
        }
    },
    generate: {
        fallback: true
    }

}
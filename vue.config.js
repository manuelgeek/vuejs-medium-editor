module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? '/vuejs-medium-editor/' : '/',
    configureWebpack: {
        externals: {
            jsonData: '../assets/test.json'
        }
    }
}

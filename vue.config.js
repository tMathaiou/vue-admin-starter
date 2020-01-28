module.exports = {
  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: true
    }
  },
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://localhost:3061',
        ws: true,
        changeOrigin: true
      }
    }
  }
}

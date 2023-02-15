const devServer = {
  proxy: {
    '/api': {
      target: 'https://weetalk.online',
      secure: false,
      ws: true,
      changeOrigin: true,
    },
  },
}

module.exports = {
  devServer: devServerConfig => {
    devServerConfig = { ...devServerConfig, ...devServer }
    return devServerConfig
  },
}

const path = require('path')
const ruta = process.env.VUE_APP_RUTA
const subDir = process.env.VUE_APP_SUBDIR
const pathsy = `./dist/${ruta}/${subDir}/index.html`
module.exports = {
  devServer: {
    port: 9008,
  },
  indexPath: path.resolve(__dirname, pathsy),
  outputDir: path.resolve(__dirname, './dist'),
  assetsDir: `${ruta}/${subDir}`,
  chainWebpack: (config) => {
    // config.plugins.delete('prefetch') // elimina el rel="prefech" del html y mejora performance del loader
    config.plugin('define').tap((args) => {
      let v = JSON.stringify(require('./package.json').version)
      args[0]['process.env']['PACKAGE_VERSION'] = v
      return args
    })
  },
}

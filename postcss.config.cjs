module.exports = {
  plugins: {
    '@csstools/postcss-global-data': {
      files: [
        './src/styles/variables.css',
        './src/styles/custom-media-queries.css',
      ]
    },
    autoprefixer: {},
    'postcss-css-variables': {},
    'postcss-custom-media': {},
  },
}

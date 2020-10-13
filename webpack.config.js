// Webpack utilise ce module pour travailler avec les dossiers.
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");


// Ceci est la configuration principale de ton projet
// Ici, tu peux écrire les différentes options que tu souhaites et dire à Webpack que faire.
module.exports = {
  // Ceci est le chemin de ton point d'entrée. C'est depuis ce fichier que Webpack commencera à travailler.
  entry: "./src/js/index.js",
  watch: true,
  // Ceci sera le chemin et le nom du fichier qui résultera de ton bundle
  // Webpack va compresser tout ton Javascript dans un seul fichier
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },

  // Par défaut, le mode de Webpack est "production". En fonction de ce qui est écrit ici, tu pourras appliquer différentes méthodes dans ton bundle final.
  // Pour le moment, nous avons besoin de paramètres de développement. Nous n'avons, par exemple, pas besoin de minifier notre code, nous allons donc le mettre en "développement"
  mode: "development",

  module: {
    rules: [

      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },

      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            // On le met en premier afin qu'il soit executé en dernier, une fois que tous nos changements souhaités soient appliqués à notre CSS.
            loader: MiniCssExtractPlugin.loader,
          },
          // {
          //   // Adds CSS to the DOM by injecting a `<style>` tag
          //   loader: 'style-loader'
          // },
          {
            loader: "css-loader",
          },
          {
            loader: "postcss-loader",
          },
          {
            loader: "sass-loader",
            options: {
              implementation: require("sass"),
            },
          },
        ],
      },

    ]
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: "bundle.css"
    })
  ],

};
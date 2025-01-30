import path from "path";
import CompressionPlugin from "compression-webpack-plugin";

export default {
  entry: "./app/components/storyStyles/TestEffect",
  output: {
    path: path.resolve("extensions/product-stories/assets"),
    filename: "[name].[contenthash].js",
    chunkFilename: "[name].[contenthash].chunk.js",
    library: "AppReelsList",
    libraryTarget: "umd",
    publicPath: "/extensions/product-stories/assets/",
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-react"],
            plugins: ["transform-remove-strict-mode"],
          },
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  // Removed the "externals" configuration to bundle all dependencies
  optimization: {
    splitChunks: {
      chunks: "all",
      minSize: 20 * 1024,
      maxSize: 250 * 1024,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
        },
      },
    },
  },
  mode: "production",
  plugins: [
    new CompressionPlugin({
      algorithm: "gzip",
      test: /\.(js|css)$/,
      threshold: 1024,
    }),
  ],
};
const webpack = require("webpack");
const browserSync = require("browser-sync");
const server = browserSync.create();

webpack.task("reload", (done) => {
  server.reload();
  done();
});

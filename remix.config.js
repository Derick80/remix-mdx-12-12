/** @type {import('@remix-run/dev').AppConfig} */

module.exports = {
  ignoredRouteFiles: ["**/.*"],
serverBuildPath: "./build/index.js",
  serverModuleFormat: "cjs",
   dev: {
  port: 4004
   }

};
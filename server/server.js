import * as fs from "node:fs";
import express from "express";
import compression from "compression";
import morgan from "morgan";
import { createRequestHandler } from "@remix-run/express";
import { broadcastDevReady, installGlobals } from "@remix-run/node";
import sourceMapSupport from "source-map-support";
installGlobals();
sourceMapSupport.install();
const BUILD_PATH = "/build/index.js";
const WATCH_PATH = "/build/version.txt";
let build = require(BUILD_PATH);
const chokidar = true ? require("chokidar") : null;
const app = express();
app.use(compression());
app.disable("x-powered-by");
app.use(
  "/build",
  express.static("public/build", { immutable: true, maxAge: "1y" })
);
app.use(express.static("public", { maxAge: "1h" }));
app.use(morgan("tiny"));
app.all(
  "*",
  true ? createDevRequestHandler() : createRequestHandler({
    build,
    mode: "development"
  })
);
const port = process.env.PORT || 3e3;
app.listen(port, async () => {
  console.log(`Express server listening on port ${port}`);
  if (true) {
    await broadcastDevReady(build);
  }
});
function createDevRequestHandler() {
  async function handleServerUpdate() {
    build = await reimportServer();
    if (build?.assets === void 0) {
      console.log(build.assets);
      debugger;
    }
    await broadcastDevReady(build);
  }
  chokidar?.watch(WATCH_PATH, { ignoreInitial: true }).on("add", handleServerUpdate).on("change", handleServerUpdate);
  return async (req, res, next) => {
    try {
      return createRequestHandler({
        build,
        mode: "development"
      })(req, res, next);
    } catch (error) {
      next(error);
    }
  };
}
async function reimportServer() {
  const stat = fs.statSync(BUILD_PATH);
  return require(BUILD_PATH + "?t=" + stat.mtimeMs);
}

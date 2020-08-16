const http = require("http");
const url = require("url");
const fs = require("fs");
const path = require("path");
const util = require("util");
fs.readFileAsync = util.promisify(fs.readFile);
/**
 * @param {String} name full file name of asset in asset folder
 */
const findAsset = async (name) => {
  const assetPath = path.join(__dirname, "assets", name);
  const result = [];
  try {
    const response = await fs.readFileAsync(assetPath, { encoding: "utf-8" });
    result[1] = response;
  } catch (error) {
    result[0] = new Error("Asset not found!");
  } finally {
    return result;
  }
};

const hostname = "127.0.0.1";
const port = 3000;

// log incoming request coming into the server. Helpful for debugging and tracking
const logRequest = (method, route, status) =>
  console.log(method, route, status);

const handleRequest = async (req, res, route) => {
  const method = req.method;
  const [error, result] = await findAsset(route);
  if (error) {
    res.writeHead(404);
    logRequest(method, route, 404);
    res.write(error.message);
  } else {
    res.writeHead(200, req.headers["content-type"]);
    logRequest(method, route, 200);
    res.write(result);
  }
  res.end();
};
const server = http.createServer(async (req, res) => {
  const route = url.parse(req.url).pathname;

  if (route === "/") {
    handleRequest(req, res, "index.html");
  } else {
    handleRequest(req, res, route);
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

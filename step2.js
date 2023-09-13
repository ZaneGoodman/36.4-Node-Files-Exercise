const fs = require("fs");
const axios = require("axios");
const isUrl = require("is-url");
const arg = process.argv[2];

checkArgType(arg);
function checkArgType(arg) {
  fs.lstat(arg, async (err, stats) => {
    try {
      if (isUrl(arg)) {
        await webCat(arg);
        console.log("This is a URL");
        process.exit(0);
      }
      if (stats.isFile()) {
        cat();
        console.log("This is a File");
        process.exit(0);
      }
    } catch {
      console.log(err);
    }
  });
}
function cat() {
  fs.readFile(process.argv[2], "utf8", (err, data) => {
    if (err) {
      console.log("ERROR", err);
      process.kill(1);
    }
    console.log("DATA : ", data);
  });
}

async function webCat(url) {
  response = await axios.get(url);
  console.log(response.data);
}

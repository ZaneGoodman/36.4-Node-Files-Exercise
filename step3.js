const fs = require("fs");
const axios = require("axios");
const isUrl = require("is-url");
const firstArg = process.argv[2];

checkArgType();

function checkArgType() {
  if (firstArg === "--out") {
    let outputArg = process.argv[4];
    checkIfFileOrURL(outputArg);
  } else {
    checkIfFileOrURL(firstArg);
  }
}

function checkIfFileOrURL(arg) {
  fs.lstat(arg, async (err, stats) => {
    try {
      if (isUrl(arg)) {
        await webCat(arg);
        console.log("This is a URL");
        return;
      }
      if (stats.isFile()) {
        cat(arg);
        console.log("This is a File");
        return;
      }
    } catch {
      console.log(err);
      process.kill(1);
    }
  });
}
function cat(arg) {
  fs.readFile(arg, "utf8", (err, data) => {
    if (err) {
      console.log("ERROR", err);
      process.kill(1);
    }

    if (firstArg === "--out") {
      outputDataToFiles(data);
    } else {
      console.log("DATA : ", data);
    }
  });
}

async function webCat(url) {
  response = await axios.get(url);

  if (firstArg === "--out") {
    outputDataToFiles(response.data);
  } else {
    console.log(response.data);
  }
}

function appendToFile(file, content) {
  console.log(content);

  fs.appendFile(file, content, "utf8", (err) => {
    if (err) {
      console.log("ERROR", err);
      process.kill(1);
    }
    console.log("Completed appending content to File");
  });
}

function outputDataToFiles(data) {
  let addToFile = process.argv[3];

  appendToFile(addToFile, data);
}

const fs = require("fs");
const axios = require("axios");
const isUrl = require("is-url");
const arg = process.argv[2];

outputDataToFiles();
// appendToFile("one.txt", "this is update");
function checkArgType(arg) {
  fs.lstat(arg, async (err, stats) => {
    try {
      if (isUrl(arg)) {
        let data = await webCat(arg);
        console.log("This is a URL");

        return data;
      }
      if (stats.isFile()) {
        let data = cat(arg);
        console.log("This is a File", data);
        return data;
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
    console.log("DATA : ", data);
    return data;
  });
}

async function webCat(url) {
  response = await axios.get(url);
  console.log(response.data);
  return response.data;
}

// // fs.appendFile('podem.txt', "\nAPPEND ME!!!", 'utf8', err => {
// //   if (err) {
// //     console.log("ERROR!!!", err)
// //     process.kill(1)
// //   }
// //   console.log("IT WORKED!")
// // })

// function readFile() {
//   if (process.argv[4]) {
//     fs.readFile(process.argv[4]);
//   }
// }

function appendToFile(file, content) {
  fs.appendFile(file, content, "utf8", (err) => {
    if (err) {
      console.log("ERROR", err);
      process.kill(1);
    }
    console.log("Completed appending content to File");
  });
}

function outputDataToFiles() {
  if (arg === "--out") {
    let output = process.argv[4];
    let addToFile = process.argv[3];
    let outputData = String(checkArgType(output));

    appendToFile(addToFile, outputData);
  } else {
    checkArgType(arg);
  }
}

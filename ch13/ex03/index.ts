import * as fs from "node:fs";

// export function mkdir(path: string, options?: {}) {
//     return new Promise((resolve: Function, reject: Function) => {
//         fs.mkdir(path, options, (err) => {
//             if (err) {
//                 reject(err);
//                 return;
//             }
//             resolve();
//         });
//     });
// }

// fs.readdir
export function readdir(path: string, options?: {}) {
  return new Promise((resolve: Function, reject: Function) => {
    fs.readdir(path, options, (err, files) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(files);
    });
  });
}

// fs.stat
export function stat(path: string, options?: {}) {
  return new Promise((resolve: Function, reject: Function) => {
    fs.stat(path, options, (err, files) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(files);
    });
  });
}

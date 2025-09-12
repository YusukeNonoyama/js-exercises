import * as fs from "node:fs";
import { promisify } from "util"

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
// Promise constructor
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

// fs.readdir
// promisify
export const promisifiedReaddir = promisify(fs.readdir);

// fs.stat
// Promise constructor
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

// fs.stat
// promisify
export const promisifiedstat = promisify(fs.stat);
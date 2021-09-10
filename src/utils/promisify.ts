import {exec} from 'child_process';
import fs from 'fs';

export function execPromise(command: string): Promise<string> {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error);
      }

      resolve(stdout);
    })
  })
}

export function writeFilePromise(path: string, content: string = ''): Promise<null> {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, content, (err) => {
      if (err) reject(err);
      resolve(null);
    })
  })
}

export function mkdirPromise(path: string): Promise<null> {
  return new Promise((resolve, reject) => {
    fs.mkdir(path, { recursive: true }, (err) => {
      if (err) reject(err);
      resolve(null);
    });
  })
}
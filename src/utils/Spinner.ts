import rdl from 'readline';

export default class Spinner {
  spin() {
    process.stdout.write("\x1B[?25l");

    const spinner = ['-', '\\', '|', '/'];

    let index = 0;

    setInterval(() => {
      let line = spinner[index]

      if (line === undefined) {
        index = 0
        line = spinner[index]
      }

      process.stdout.write(line);
      rdl.cursorTo(process.stdout, 0, 0);
      index = index
    })
  }
}
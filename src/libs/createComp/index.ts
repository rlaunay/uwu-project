import ora from 'ora';
import { Argv } from 'yargs';
import fs from 'fs';
import chalk from 'chalk';
import checkSetup from './checkSetup';
import { mkdirPromise, writeFilePromise } from '../../utils/promisify';

export default async function createComp(args: {
  [x: string]: unknown;
  page: boolean;
  _: (string | number)[];
  $0: string;
} | {
  [x: string]: unknown;
  page: boolean;
  _: (string | number)[];
  $0: string;
}) {
  const spinner = ora();

  try {
    console.log('oui')
    const isProjectFolder = fs.existsSync('./package.json');
    if (!isProjectFolder) return console.log(chalk.red('You are not in project !'))

    const {isTs, isScss} = await checkSetup();

    const path = args._[1];
    const isPage = args.page;

    const root = `./src/${isPage ? 'pages' : 'components'}`;
    const fullPath = `${root}/${path}/`;
    const name = [ ...path.toString().split('/') ].pop()

    spinner.start('Creating ' + fullPath);
    await mkdirPromise(fullPath);
    spinner.succeed();

    const indexContent = [
      'import React from \'react\';',
      '',
      `import classes from './${name}.module.${isScss ? 'scss' : 'css'}';`,
      '',
      `const ${name}${isTs ? ': React.FC' : ''} = () => {`,
      '  return (',
      '    <div></div>',
      '  );',
      '};',
      '',
      `export default ${name};`
    ]

    spinner.start(`Creating ${fullPath}index.${isTs ? 'ts' : 'js'}x`)
    await writeFilePromise(`${fullPath}index.${isTs ? 'ts' : 'js'}x`, indexContent.join('\n'));
    spinner.succeed();

    spinner.start(`Creating ${fullPath}${name}.module.${isScss ? 'scss' : 'css'}`);
    await writeFilePromise(`${fullPath}${name}.module.${isScss ? 'scss' : 'css'}`);
    spinner.succeed();

  } catch (error) {
    console.log(error);
  }
}
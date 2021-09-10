import fs from 'fs';
import ora from 'ora';
import { Argv } from 'yargs';
import { execPromise } from '../../utils/promisify';
import { overwrite, projectSetup } from './prompt';
import genSrc from './genSrc';
import modifyPackage from './modifyPackage';
import genEslintConf from './genEslintConf';

export default async function generateProject({ argv }: Argv) {
  const spinner = ora()

  try {

    const answer = await projectSetup();

    if (fs.existsSync(answer.name)) {
      const choice = await overwrite();

      if (!choice.overwrite) return;
      fs.rmSync(answer.name, { recursive: true, force: true })
    }
    
    
    spinner.start('Create React vite project');
    
    const lang = answer.lang === 'ts' ? '-ts' : '';
    const stdout = await execPromise(`npm init vite@latest ${answer.name} --template react${lang}`);
    spinner.succeed();

    await modifyPackage(answer, spinner);
    await genEslintConf(answer);
    spinner.succeed();

    spinner.start('Create source folder structure');
    await genSrc(answer);

    spinner.succeed();
    console.clear();
    console.log(stdout);

  } catch (error) {
    spinner.fail();
    console.log(error);
  }
}
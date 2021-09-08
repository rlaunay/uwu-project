import { AnswerSetup } from "./prompt";
import { execPromise } from '../../utils/promisify';
import fs from 'fs';
import { Ora } from "ora";

export default async function modifyPackage(answer: AnswerSetup, spinner: Ora) {
  const filePath = `./${answer.name}/package.json`;
    const res = fs.readFileSync(filePath);
    const packageContent = JSON.parse(res.toString());

    if (answer.scss) {
      spinner.start('Adding scss');
      const sass = await execPromise('npm show sass version');
      packageContent.devDependencies['sass'] = `^${sass.replace(/(\r\n|\n|\r)/gm, "")}`;
      spinner.succeed();
    }

    if (answer.router) {
      spinner.start('Adding react router');

      const router = await execPromise('npm show react-router-dom version');
      packageContent.dependencies['react-router-dom'] = `^${router.replace(/(\r\n|\n|\r)/gm, "")}`;

      if (answer.lang === 'ts') {
        const types = await execPromise('npm show @types/react-router-dom version');
        packageContent.devDependencies['@types/react-router-dom'] = `^${types.replace(/(\r\n|\n|\r)/gm, "")}`;
      }
      spinner.succeed();
    }

    spinner.start('Adding eslint');
    const eslint = await execPromise('npm show eslint version');
    const eslintReact = await execPromise('npm show eslint-plugin-react version');

    packageContent.devDependencies['eslint'] = `^${eslint.replace(/(\r\n|\n|\r)/gm, "")}`;
    packageContent.devDependencies['eslint-plugin-react'] = `^${eslintReact.replace(/(\r\n|\n|\r)/gm, "")}`;
    
    if (answer.lang === 'ts') {
      const eslintTs = await execPromise('npm show @typescript-eslint/eslint-plugin version');
      const eslintTsParser = await execPromise('npm show @typescript-eslint/parser version');

      packageContent.devDependencies['@typescript-eslint/eslint-plugin'] = `^${eslintTs.replace(/(\r\n|\n|\r)/gm, "")}`;
      packageContent.devDependencies['@typescript-eslint/parser'] = `^${eslintTsParser.replace(/(\r\n|\n|\r)/gm, "")}`;
    }

    fs.writeFileSync(filePath, JSON.stringify(packageContent, null, 2));
}
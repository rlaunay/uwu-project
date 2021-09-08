import { AnswerSetup } from "./prompt";
import fs from 'fs';
import path from 'path';

export default async function genSrc(answer: AnswerSetup) {
  const { name, scss, lang } = answer;

  const srcPath = `./${name}/src`

  fs.rmSync(srcPath, { recursive: true, force: true });
  fs.mkdirSync(srcPath);

  const styleExt = scss ? 'scss' : 'css';
  const scriptExt = lang === "ts" ? 'ts' : 'js';

  const main = [
    'import React from \'react\';',
    'import ReactDOM from \'react-dom\';',
    'import App from \'./App\';',
    `import './index.${styleExt}';`,
    '',
    'ReactDOM.render(',
    '  <React.StrictMode>',
    '    <App />',
    '  </React.StrictMode>,',
    '  document.getElementById(\'root\')',
    ');'
  ];

  const app = [
    'import React from \'react\';',
    '',
    `const App${lang === 'ts' ? ': React.FC' : ''} = () => {`,
    '  return (',
    '    <h1>Hello UwU</h1>',
    '  );',
    '};',
    '',
    'export default App;'
  ];

  fs.writeFileSync(`${srcPath}/main.${scriptExt}x`, main.join('\n'));
  fs.writeFileSync(`${srcPath}/index.${styleExt}`, '');
  fs.writeFileSync(`${srcPath}/App.${scriptExt}x`, app.join('\n'));

  fs.mkdirSync(`${srcPath}/components`);
  fs.mkdirSync(`${srcPath}/pages`);
  fs.mkdirSync(`${srcPath}/hooks`);
  fs.mkdirSync(`${srcPath}/libs`);

  const favicon = path.resolve(__dirname, '../../../assets/favicon.svg');

  fs.copyFileSync(favicon, `${srcPath}/favicon.svg`);
}
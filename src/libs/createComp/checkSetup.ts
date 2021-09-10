import fs from 'fs';

export default async function checkSetup() {
  
  const isTs = fs.existsSync('./tsconfig.json');
  const res = fs.readFileSync('./package.json');
  const packageContent = JSON.parse(res.toString());

  const isScss = 'sass' in packageContent.devDependencies;
  
  return { isTs, isScss };
}
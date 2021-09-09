#!/usr/bin/env node
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers'
import createComp from './libs/createComp';
import generateProject from "./libs/createProject/projectGeneractor";

yargs(hideBin(process.argv))
  .command('new', 'Create React project with vite',  generateProject)
  .command('comp <path>', 'Generate components in components or pages folder', async (cmd) => {
    const newCmd = cmd.option('page', {
      alias: 'p',
      type: 'boolean',
      description: 'Create component in pages dir',
      default: false
    })

    const args = await newCmd.argv
    console.log(args);
    await createComp(args);
  })
  .argv;

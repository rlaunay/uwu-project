#!/usr/bin/env node
import { exec } from 'child_process';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers'
import generateProject from "./libs/projectGeneractor";

yargs(hideBin(process.argv))
  .command('new', 'Create React project with vite',  generateProject)
  .command('comp <path>', 'Generate components in components or pages folder', ({ argv }) => {
    console.log('comp', argv);
  })
  .option('page', {
    alias: 'p',
    type: 'boolean',
    description: 'Create component in pages dir',
    default: false
  })
  .argv;

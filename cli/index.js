#!/usr/bin/env node
const { program } = require('commander');
const fs = require('fs-extra');
const chalk = require('chalk');
const path = require('path');
const { version } = require('./package.json');

const cwd = process.cwd();
const wyaRoot = path.resolve(cwd, '..');

program.version(version);

function showFilepathExistsError(filepath) {
    console.log(`${chalk.red('Error!')} ${filepath} exists. Please use a unique name.`);
};

function showFilepathCreateSuccess(filepath) {
    console.log(`${chalk.green('Success!')} Created ${filepath}`);
};

program
    .command('create <type> <name>')
    .description('creates the react files of the specified <type> with the given <name>')
    .action((type, name) => {
        let basePath;
        name = name.split(' ').join('');
        switch(type) {
            case 'c':
            case 'component': {
                const component = require('./templates/component');
                const componentTest = require('./templates/componentTest');

                basePath = path.resolve(wyaRoot, 'src', 'components');
                fs.ensureDirSync(basePath);

                const componentDir = path.resolve(basePath, name);
                if (fs.existsSync(componentDir)) {
                    showFilepathExistsError(componentDir);
                } else {
                    const componentTsx = path.resolve(componentDir, `${name}.tsx`);
                    const componentSpecTsx = path.resolve(componentDir, `${name}.spec.tsx`);
                    const componentCss = path.resolve(componentDir, `${name}.css`);

                    fs.ensureDirSync(componentDir);
                    fs.writeFileSync(componentTsx, component(name), { flag: 'wx' });
                    showFilepathCreateSuccess(componentTsx);

                    fs.writeFileSync(componentSpecTsx, componentTest(name), { flag: 'wx' });
                    showFilepathCreateSuccess(componentSpecTsx);

                    fs.writeFileSync(componentCss, '', { flag: 'wx' });
                    showFilepathCreateSuccess(componentCss);
                };

                break;
            };

            case 'cx':
            case 'context': {
                const context = require('./templates/context');
                basePath = path.resolve(wyaRoot, 'src', 'contexts');
                fs.ensureDirSync(basePath);

                const filepath = path.resolve(basePath, `${name}Context.tsx`);

                if (fs.existsSync(filepath)) {
                    showFilepathExistsError(filepath);
                } else {
                    fs.writeFileSync(filepath, context(name), { flag: 'wx' });
                    showFilepathCreateSuccess(filepath);
                };
                
                break;
            };

            case 'p':
            case 'page': {
                const page = require('./templates/page');
                const pageTest = require('./templates/pageTest');

                basePath = path.resolve(wyaRoot, 'src', 'pages');
                fs.ensureDirSync(basePath);

                const pageDir = path.resolve(basePath, `${name}Page`);
                if (fs.existsSync(pageDir)) {
                    showFilepathExistsError(pageDir);
                } else {
                    const pageTsx = path.resolve(pageDir, `${name}Page.tsx`);
                    const pageSpecTsx = path.resolve(pageDir, `${name}Page.spec.tsx`);
                    const pageCss = path.resolve(pageDir, `${name}Page.css`);

                    fs.ensureDirSync(pageDir);
                    fs.writeFileSync(pageTsx, page(name), { flag: 'wx' });
                    showFilepathCreateSuccess(pageTsx);

                    fs.writeFileSync(pageSpecTsx, pageTest(name), { flag: 'wx' });
                    showFilepathCreateSuccess(pageSpecTsx);

                    fs.writeFileSync(pageCss, '', { flag: 'wx' });
                    showFilepathCreateSuccess(pageCss);
                };

                break;
            };

            default: {
                console.log(chalk.red(`Unrecognized type - [${type}]`));
            };
        }
    });

program.parse(process.argv);
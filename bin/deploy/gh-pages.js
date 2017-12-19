const chalk = require('chalk')
const exec = require('child_process').exec
const fs = require('fs-extra')
const path = require('path')

/// Handle deploying to GitHub pages.
const handler = async (config) => {
    const deployConfig = config.deploy || {}
    const cwd = process.cwd()
    const buildDir = path.join(cwd, 'docs-dist')
    const deployDir = path.join(cwd, 'deploy')
    const repository = deployConfig.repository

    if (!repository) {
        console.error(chalk.red('Deploy repository not specified in config file.'))
        process.exit(1)
    }

    try {
        await exec('which git')
    } catch (err) {
        console.error(chalk.red('Git is needed to deploy to GitHub pages.'))
        process.exit(1)
    }

    
    try {
        console.log(`Creating deploy directory ${deployDir}`)
        await fs.mkdir(deployDir)
    } catch (err) {
        if (err.code === 'EEXIST') {
            console.error(chalk.yellow('Deploy directory already exists. Remove or rename and try again.'))
            process.exit(1)
        }

        console.error(chalk.red('Failed to create deploy directory'));
        throw err
    }

    // If it's a .github.io repo, we deploy to master
    // else GitHub uses the gh-pages branch
    const branch = repository.indexOf('.github.io') !== -1 ? 'master' : 'gh-pages';

    try {
        console.log(`Cloning deploy repository ${repository} to ${deployDir}`)
        await exec(`git clone ${repository} ${deployDir}`)
    } catch (err) {
        console.error(chalk.red('Cloning repository failed.'))
        throw err
    }

    process.chdir(deployDir)
    console.log(`Working directory changed to: ${process.cwd()}`)

    try {
        console.log(`Checking out branch ${branch}`)
        await exec(`git checkout origin/${branch}`)

        try {
            await exec(`git checkout -b ${branch}`)
            await exec(`git branch --set-upstream-to=origin/${branch}`)
        } catch (err) {
            console.error(chalk.red(`Failed to checkout branch ${branch}`))
            process.exit(1)
        }
    } catch (err) {
        // Branch does not exist. Try and create it
        try {
            console.log(`Deploy branch ${branch} does not exist. Creating an orphaned branch.`)
            await exec(`git checkout --orphan ${branch}`)
        } catch (err) {
            console.error(chalk.red(`Could not create branch ${branch}`))
            process.exit(1)
        }
    }

    // At this point we are in the deploy folder, with the latest version of the branch
    try {
        console.log('Beginning copy to deploy directory')
        await exec(`cp -rf ${path.join(buildDir, '*')} .`)
        console.log('Finished copy to deploy directory')
    } catch (err) {
        console.log('here')
        console.error(chalk.red('Failed to clean deploy directory and copy build to deploy directory'))
        process.exit(1)
    }

    try {
        await exec('git add --all')
        await exec('git commit -m "GitDocs deploy"')
    } catch (err) {
        console.error(chalk.red('Failed to commit deployed changes to git'))
        process.exit(1)
    }

    try {
        await exec(`git push origin ${branch}`)
    } catch (err) {
        console.error(chalk.red('Failed to push to GitHub'))
        process.exit(1)
    }
}


module.exports = handler
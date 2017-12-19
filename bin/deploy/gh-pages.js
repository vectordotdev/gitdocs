const chalk = require('chalk')

/// Handle deploying to GitHub pages.
const handler = async (config) => {
    const deployConfig = config.deploy || {}
    const repository = deployConfig.repository

    if (!repository) {
        console.error(chalk.red('Deploy repository not specified in '))
    }
}


module.exports = handler
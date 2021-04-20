const core = require('@actions/core');
const github = require('@actions/github');

try {
    const path = core.getInput('path');
    console.log(`Path = ${path}`);
} catch (error) {
    core.setFailed(error.message);
}

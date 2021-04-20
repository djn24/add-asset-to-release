const core = require('@actions/core');
const github = require('@actions/github');

try {
    const token = core.getInput('token');
    const octokit = github.getOctokit(token);

    const path = core.getInput('path');
    console.log(`Path = ${path}`);

    console.log(`Event name = ${github.context.eventName}`);
    const releaseId = github.context.payload.release.id;
    console.log(`Release id = ${releaseId}`);

} catch (error) {
    core.setFailed(error.message);
}

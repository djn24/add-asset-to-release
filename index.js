const core = require('@actions/core');
const github = require('@actions/github');

try {
    const sourceToken = core.getInput('source-token');
    const octokit = github.getOctokit(sourceToken);

    const path = core.getInput('path');
    console.log(`Path = ${path}`);

    console.log(`Event name = ${github.context.eventName}`);
    const releaseId = github.context.payload.release.id;
    console.log(`Release id = ${releaseId}`);

} catch (error) {
    core.setFailed(error.message);
}

const core = require('@actions/core');
const github = require('@actions/github');
const fs = require('fs').promises;

(async () => {
    try {
        const token = core.getInput('token');
        const octokit = github.getOctokit(token);

        const owner = github.context.repo.owner;
        const repo = github.context.repo.repo;
        console.log(`Owner = ${owner}`);
        console.log(`Repo = ${repo}`);

        const path = core.getInput('path');
        console.log(`Path = ${path}`);

        console.log(`Event name = ${github.context.eventName}`);
        const releaseId = github.context.payload.release.id;
        console.log(`Release id = ${releaseId}`);

        const fileContent = await fs.readFile(path);

        await octokit.rest.repos.uploadReleaseAsset({
            owner: owner,
            repo: repo,
            release_id: releaseId,
            data: fileContent
        });

    } catch (error) {
        core.setFailed(error.message);
    }
})();

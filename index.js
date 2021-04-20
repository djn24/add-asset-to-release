const core = require('@actions/core');
const github = require('@actions/github');
const fs = require('fs').promises;

(async () => {
    try {
        const token = core.getInput('token');
        const octokit = github.getOctokit(token);

        const owner = github.context.repo.owner;
        const repo = github.context.repo.repo;
        const path = core.getInput('path');

        const eventName = github.context.eventName;
        if (eventName !== 'release') {
            core.setFailed(`Should be run by a release event but event name = ${eventName}`);
        }
        const releaseId = github.context.payload.release.id;

        const pathParts = path.split('/');
        const filename = pathParts[pathParts.length - 1];

        const fileContent = await fs.readFile(path);
        console.log(`Read ${fileContent.length} bytes from ${path}`);

        console.log(`Uploading as ${filename}`);
        await octokit.rest.repos.uploadReleaseAsset({
            owner: owner,
            repo: repo,
            release_id: releaseId,
            name: filename,
            data: fileContent
        });

    } catch (error) {
        core.setFailed(error.message);
    }
})();

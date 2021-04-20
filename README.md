# add-asset-to-release

Uploads an asset (e.g. a compiled binary) to an existing GitHub release. Expects to be run as part of a workflow
triggered by the release. Will fail if it isn't because it reads the release id from the payload of the triggering
event.

Written in JavaScript, so it can be used by any runner type.

### Example usage

```yaml
- name: Upload
  uses: djn24/add-asset-to-release@v1
  with:
    token: ${{secrets.GITHUB_TOKEN}}
    path: 'path/to/binary'
```

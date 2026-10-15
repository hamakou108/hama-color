---
name: release
description: Release HamaColor to the Chrome Web Store — merge the Release Please PR, build and package the extension from the release tag, and guide the user through uploading it and submitting it for review in the Chrome Web Store Developer Dashboard.
disable-model-invocation: true
---

# Release HamaColor

Confirm with the user right before each action that changes GitHub or the Chrome Web Store: merging, editing a PR body, re-running a workflow, and submitting for review.

```
- [ ] Review the Release PR changelog and merge the PR
- [ ] Confirm the tag v<version> and its GitHub release exist
- [ ] Build from the tag and check that dist/manifest.json has the new version
- [ ] Package the zip
- [ ] Prepare the dashboard changes; the user uploads and submits
```

## Release PR

Release Please keeps an open Release PR labelled `autorelease: pending`. It bumps `package.json`, which `vite.config.ts` reads for the manifest version, so no manual version edit is needed. If there is no such PR, there is nothing to release.

Show the user the changelog and point out entries that do not affect the shipped extension, such as a `fix` to the Renovate or CI configuration. To correct an entry:

- Do not edit the Release PR branch; Release Please overwrites it on its next run.
- Add a `BEGIN_COMMIT_OVERRIDE` ... `END_COMMIT_OVERRIDE` block with the corrected commit message to the body of the merged PR that produced the entry. A type such as `chore` drops the entry from the changelog.
- The `release-please` workflow only runs on pushes to `main`, so re-run its latest run to regenerate the Release PR.

Merging creates the tag `v<version>` and its GitHub release through the `release-please` workflow.

## Package

Build from the release tag. The zip contains a single top-level directory `hama-color-<version>/` holding the contents of `dist`.

## Chrome Web Store

The user does the dashboard work. Chrome does not allow extensions to script Chrome Web Store pages, so browser automation through an extension such as Claude in Chrome cannot operate the [Developer Dashboard](https://chrome.google.com/webstore/devconsole).

Prepare what the user needs to change:

- **Privacy tab:** every permission and host permission needs a justification. Compare the built `dist/manifest.json` with the one from the previous release rather than `vite.config.ts`, since @crxjs/vite-plugin generates parts of the manifest. Draft new or rewritten justifications in English.
- **Store listing:** if the popup or the visible behavior changed, tell the user which screens to capture. They take the screenshots themselves and export each at 1280×800.

Ask the user to check that the Package tab shows the new version after uploading, and to share their changes before submitting for review.

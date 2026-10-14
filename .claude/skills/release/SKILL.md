---
name: release
description: Release HamaColor to the Chrome Web Store — merge the Release Please PR, build the extension, package it as a zip, upload it from the Chrome Web Store Developer Dashboard, and submit it for review.
disable-model-invocation: true
---

# Release HamaColor

Release Please opens a Release PR (`chore(main): release X.Y.Z`) that bumps `package.json`, `.release-please-manifest.json`, and `CHANGELOG.md`. The extension manifest reads its version from `package.json` in `vite.config.ts`, so no manual version edit is needed.

Merging the PR and submitting for review are outward-facing actions. Confirm with the user right before each one.

## 1. Merge the Release PR

1. Find the open Release PR:

   ```bash
   gh pr list --label "autorelease: pending" --state open
   ```

   If there is none, stop and tell the user that there is nothing to release.

2. Show the user the version and the changelog entries from the PR, then ask for approval to merge.
3. Check that CI has passed, then merge:

   ```bash
   gh pr merge <number> --squash --delete-branch
   ```

4. Wait for the `release-please` workflow on `main` to finish, then confirm that the tag `v<version>` and its GitHub release exist:

   ```bash
   gh release view v<version>
   ```

## 2. Build and package

Build from the release tag, not from a working branch:

```bash
git fetch --tags origin
git switch --detach v<version>
pnpm install --frozen-lockfile
pnpm build
```

Check that `dist/manifest.json` has `"version": "<version>"`. Then create the zip. The archive keeps a top-level `hama-color-<version>/` directory:

```bash
out_dir="$TMPDIR"   # or ~/Downloads when writable
cp -r dist "hama-color-<version>"
zip -r "$out_dir/hama-color-<version>.zip" "hama-color-<version>"/*
rm -rf "hama-color-<version>"
```

Report the absolute path of the zip to the user.

## 3. Upload to the Chrome Web Store

Use browser automation in the user's Chrome session. The user must already be signed in to the developer account; if not, ask them to sign in.

1. Open the [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole) and select HamaColor.
2. On the **Package** page, choose **Upload new package** and upload the zip.
3. Check that the dashboard shows the new version.

## 4. Fill in the listing and submit

1. Review the **Store listing** and **Privacy** pages. Update any fields the changes in this release affect (for example, a new permission needs a justification). Ask the user when the right content is unclear.
2. If the store screenshots need updating, ask the user to take them. Do not take them yourself. Tell the user which screens to capture; they resize a browser window with their own script and export each screenshot at 1280×800. Upload the files they provide.
3. Show the user a summary of what changed on the dashboard and ask for approval. Then click **Submit for review**.

Finish by telling the user the submitted version and the review status shown on the dashboard.

---
name: release
description: Release HamaColor to the Chrome Web Store — merge the Release Please PR, build the extension, package it as a zip, and guide the user through uploading it and submitting it for review in the Chrome Web Store Developer Dashboard.
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

2. Show the user the version and the changelog entries from the PR. Point out any entry that does not affect the shipped extension (for example, a `fix` to the Renovate or CI configuration).
3. If the user wants to correct an entry, do not edit the Release PR branch; Release Please overwrites it on its next run. Instead:
   1. Read the body of the merged PR that produced the entry, then append an override with the corrected commit message. A type such as `chore` drops the entry from the changelog:

      ```
      BEGIN_COMMIT_OVERRIDE
      chore(renovate): exclude pre-1.0.0 packages from automerge
      END_COMMIT_OVERRIDE
      ```

   2. Re-run the latest `release-please` workflow run on `main` so that it regenerates the Release PR:

      ```bash
      gh run list --workflow release-please --branch main --limit 1
      gh run rerun <run-id>
      ```

      If the token lacks permission to re-run workflows, ask the user to re-run it.

   3. Check that the regenerated PR body and `CHANGELOG.md` reflect the correction.

4. Ask for approval to merge. Check that CI has passed, then merge, pinning the head commit the user approved:

   ```bash
   gh pr merge <number> --squash --delete-branch --match-head-commit <sha>
   ```

5. Wait for the `release-please` workflow run on the merge commit to finish, then confirm that the tag `v<version>` and its GitHub release exist:

   ```bash
   gh run watch <run-id> --exit-status
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

If `pnpm install` stops to ask for confirmation before removing `node_modules`, it cannot proceed without a terminal. Ask the user to run `pnpm install --frozen-lockfile && pnpm build` themselves.

Check that `dist/manifest.json` has `"version": "<version>"`. Then create the zip. The archive keeps a top-level `hama-color-<version>/` directory; a symlink provides that name without copying `dist`:

```bash
ln -sfn "$PWD/dist" "$TMPDIR/hama-color-<version>"
(cd "$TMPDIR" && zip -qr "hama-color-<version>.zip" "hama-color-<version>"/*)
```

Report the absolute path of the zip to the user, then return the checkout to `main`.

## 3. Prepare the dashboard changes

The user uploads the package and submits it. Chrome does not allow extensions to script Chrome Web Store pages, so browser automation through an extension such as Claude in Chrome cannot operate the dashboard.

Compare the manifest between the previous release and this one:

```bash
git diff v<previous> v<version> -- vite.config.ts
```

From the diff and the changelog, prepare for the user:

- The permissions that were added or removed, and the permission justifications on the **Privacy** tab that need adding, removing, or rewriting. Draft the new text in English.
- Whether the **Store listing** needs changes. If the popup or the visible behavior changed, tell the user which screens to capture for new screenshots; they take them and export each one at 1280×800.

## 4. Upload and submit

Give the user these steps, with the zip path and the prepared changes:

1. Open the [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole) and select HamaColor.
2. On the **Package** tab, choose **Upload new package** and select the zip.
3. Apply the prepared changes on the **Privacy** and **Store listing** tabs.
4. Before clicking **Submit for review**, share what changed so it can be checked.

When the user reports the changes, review them against what was prepared and confirm before they submit. Finish by asking for the review status shown on the dashboard.

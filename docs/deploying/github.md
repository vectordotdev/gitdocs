# Deploying to GitHub Pages

Deplying a GitDocs site to [GitHub pages](https://pages.github.com/) is straightforward. There are two options for deploying to GitHub pages. 

## Manual Deploy

The first step in a manual deploy is to build your documentation.

```bash
gitdocs build
```

This will create a `docs-dist` folder containing the built files. They can then be copied to the folder with the repository for your github pages branch. The following snippet assumes that the `github-pages-dir` is already correctly linked to GitHub and is on the correct branch.

```bash
# cp is sometimes aliased to `cp -i`.
# An alternative is to directly use /bin/cp
yes | cp -rf docs-dist/* github-pages-dir

cd github-pages-dir
git add --all
git commit -m "GitDocs deploy"
git push
```

## Automatic Deploy

The GitDocs CLI ships with a command that can help automate deploying to GitHub pages. This command builds your documentation, then automatically syncs the relevant GitHub branch, makes the changes and deploys the update.

The command is run as follows:

```bash
gitdocs deploy --location=gh-pages
```

<Warning>The deploy command needs extra configuration added to the config file. </Warning>

To specify deployment options, add `deploy` section to your `docs.json` file. The deploy script automatically selects a branch name based on the repository name. If the repository name include `'.github.io'`, the script deploys to the `master` branch. Otherwise it will deploy to the `gh-pages` branch.

```json
{
  "deploy": {
    "repository": "git@github.com:example/exmple.github.io.git"
  }
}
```

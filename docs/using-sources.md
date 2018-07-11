---
description: Pull in documentation from outside sources, such as another git repo.
---
# Using Sources

GitDocs has the awesome ability to compose a documentation site from files spread across multiple locations. Sources is how you define these locations. A source can be a local file, another git repo, or a remote file (support pending.) To use a source, define `source` and `source_type` in the front matter of a file. Once we fetch the source, it will _replace_ the original file that defines the source.

For example, let's say our documentation structure looks something like this:

```
docs/
  languages/
    python/
    ruby/
    node.md
```

```yaml
---
# in docs/languages/node.md
source: https://github.com/my-org/node.git
source_type: git
---
```

and `https://github.com/my-org/node` looks something like this:

```
docs/
  installation/
  readme.md
  troubleshooting.md
src/
package.json
```

What will happen when we build this site? GitDocs will clone the Node repo behind the scenes, and replace `docs/languages/node.md` with the contents of the repo's `docs` folder (which is the default for `source_root`.) The result will look something like this:

```
docs/
  languages/
    python/
    ruby/
    node/
      installation/
      readme.md
      troubleshooting.md
```

See how the `node.md` file was replaced by the contents of `node.git/docs/`? You can think of the file as a placeholder for the contents of the source.

[Learn more about defining sources.](/api/front-matter)

## Best Practices

Since external sources cannot be live reloaded, it's best to work on each repo's documentation as a self-contained documentation site and merge into the "main" repo when it is ready to go. This lets you take advantage of the [dev environment](/running-locally).

---

<div align="right">
  <h3><a href="/index-files">Index Files →</a></h3>
</div>

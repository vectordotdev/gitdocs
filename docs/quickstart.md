# Quick Start

Assuming you have a folder with markdown files at `/docs`, you can automatically preview your docs site by running:

```bash
gitdocs serve
```

and build your site to any destination with:

```bash
gitocs build --output="docs-dist"
```

- The `readme.md` in your repo will be used as the default homepage for your docs
- `docs/docs.json` allows you to specify your project settings like the version, name and much more
- The navigation will automatically be built using your docs folder structure, but you can override this in `docs.json` to generate your own navigation. See [configuration/sidebar](/configuration/sidebar.md) for more info.

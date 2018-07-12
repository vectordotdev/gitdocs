# Commands

### `gitdocs init`

This initializes a new project. If you already have documentation files, you can specify the location of them when asked. If not, it will generate some example files for you to work from. It will also create a config file located at `.gitdocs.json` with some default values.

See [Getting Started](/getting-started) for more info.

### `gitdocs serve` / `gitdocs start`

This will start the local development environment. When the server is running, you can access your site at [http://localhost:8000](http://localhost:8000) (unless you changed the host or port.) It will live reload any files you are editing, meaning if you change some markdown, the page will instantly show the updated page as soon as you hit save.

See [Running Locally](/running-locally) for more info.

### `gitdocs build`

This will generate a static, minified, production-ready version of your documentation site. It will output to `.gitdocs_build` (or whatever your output folder is set to), and is ready to be uploaded to S3, GitHub Pages, Netlify, Surge or any other static hosting service.

See [Production Builds](/production-builds) for more info.

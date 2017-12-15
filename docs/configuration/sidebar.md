# Sidebar Configuration

By default GitDocs will automatically generate the navigation based on your `/docs` folder structure.

## Options

The sidebar configuration supports the following options:

```javascript
{
  // Number of levels of the navigation will be expanded by default
  defaultDepth: 2,

  // Location of the sidebar. Either "left" or "right"
  position: "left",
}
```

## Custom Structuure

We recommend configuring the sidebar navigation in `docs.json` like so:

```json
{
  "sidebar": {
    "position": "left",
    "items": {
      "Introduction": "README.md",
      "Quickstart": "quickstart.md",
      "Writing": {
        "markdown": "markdown/markdown.md",
        "syntax": "syntax/code/languagues.md",
        "Components": {
          "helpers": "helpers.md",
          "custom": "components/readme.md"
        }
      }
    }
  }
}
```

You can infinitely nest folders, although we recommend limiting this to 2 or 3 levels otherwise navigating can become tedious and it's more difficult to visualize the hierarchy.

You can use the `defaultDepth` option to control how many levels of the navigation will be expanded by default.

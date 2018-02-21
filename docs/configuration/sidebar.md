# Sidebar Configuration

By default GitDocs will automatically generate the navigation based on your `/docs` folder structure.

## Options

The sidebar configuration supports the following options:

```javascript
export default {
  sidebar: {
    // Number of levels of the navigation will be expanded by default
    defaultDepth: 2,
    // Location of the sidebar. Either "left" or "right"
    position: "left",
  }
}
```

## Custom Structure

If you would rather define a custom structure for your sidebar, you can configure it in `docs.js` like so:

```javascript
export default {
  sidebar: {
    position: 'left',
    items: [
      { name: 'Introduction', src: 'README.md' },
      { name: 'Quickstart', src: 'quickstart.md' },
      {
        name: 'Writing',
        children: [
          { name: 'markdown', src: 'markdown/markdown.md' },
          { name: 'syntax', src: 'syntax/code/languagues.md' },
          {
            name: 'Components',
            children: [
              { name: 'helpers', src: 'helpers.md' },
              { name: 'custom', src: 'components/readme.md' },
            ],
          },
        ],
      },
    ],
  },
}
```

You can infinitely nest folders, although we recommend limiting this to 2 or 3 levels otherwise navigating can become tedious and it's more difficult to visualize the hierarchy.

You can use the `defaultDepth` option to control how many levels of the navigation will be expanded by default.

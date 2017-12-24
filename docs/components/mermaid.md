# Mermaid JS Integration

GitDocs supports native integration of [Mermaid](https://mermaidjs.github.io/) diagrams using the `<Mermaid>` tag in your markdown files. Mermaid can be used to generate Gantt charts, flowcharts, and even Git branching diagrams.

```markdown
<Mermaid>
gantt
    title A Gantt Diagram
    dateFormat  YYYY-MM-DD
    section Section
    A task           :a1, 2014-01-01, 30d
    Another task     :after a1  , 20d
    section Another
    Task in sec      :2014-01-12  , 12d
    another task      : 24d
</Mermaid>
```

<Mermaid>
gantt
    title Gantt Diagram
    dateFormat  YYYY-MM-DD
    section Section
    A task           :a1, 2014-01-01, 30d
    Another task     :after a1  , 20d
    section Another
    Task in sec      :2014-01-12  , 12d
    another task      : 24d
</Mermaid>

## Configuring Sizes

The `<Mermaid>` component supports `width` and `height` attributes to override the size of the diagram SVG. 

```markdown
<Mermaid width="400px">
gantt
    title A Gantt Diagram
    dateFormat  YYYY-MM-DD
    section Section
    A task           :a1, 2014-01-01, 30d
    Another task     :after a1  , 20d
    section Another
    Task in sec      :2014-01-12  , 12d
    another task      : 24d
</Mermaid>
```

<Mermaid width="400">
gantt
    title A Gantt Diagram
    dateFormat  YYYY-MM-DD
    section Section
    A task           :a1, 2014-01-01, 30d
    Another task     :after a1  , 20d
    section Another
    Task in sec      :2014-01-12  , 12d
    another task      : 24d
</Mermaid>

## Custom Configs

Each Mermaid diagram is highly customizable. The `<Mermaid>` component takes an option `config` parameter that points to an object with the properties you want to configure.

```markdown
<Mermaid config={{ gantt: {barGap: 20 }}}>
gantt
    title A Gantt Diagram
    dateFormat  YYYY-MM-DD
    section Section
    A task           :a1, 2014-01-01, 30d
    Another task     :after a1  , 20d
    section Another
    Task in sec      :2014-01-12  , 12d
    another task      : 24d
</Mermaid>
```

<Mermaid config={{ gantt: { barGap: 20 } }}>
gantt
    title A Gantt Diagram
    dateFormat  YYYY-MM-DD
    section Section
    A task           :a1, 2014-01-01, 30d
    Another task     :after a1  , 20d
    section Another
    Task in sec      :2014-01-12  , 12d
    another task      : 24d
</Mermaid>
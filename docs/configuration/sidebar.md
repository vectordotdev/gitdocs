# Sidebar Configuration

By default GitDocs will automatically generate the navigation based on your `/docs` folder structure.

## Custom

We recommend configuring the sidebar navigation in `docs.json` like so:

```json
{
  "sidebar": {
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
```

```ocaml
module Graphql = struct
  (* ... *)

  let rec to_json : 'src. 'src -> 'src typ -> json =
    fun src typ ->
      match typ with
      | Scalar s ->
          s.serialize src
      | Object o ->
          let members = List.map (resolve_field src) o.fields in
          Object members

  and resolve_field : 'src. 'src -> 'src field -> string * json =
    fun src (Field field) ->
      let field_src  = field.resolve src in
      let field_json = to_json field_src field.output_type in
      (field.name, field_json)
end
```

```javascript
const highlight = (code, language) => {
  try {
    return Prism.highlight(code, Prism.languages[language], language)
  } catch (e) {
    console.warn(`Ensure your language ${language} is defined in docs.json`)
    return escapeHTML(code)
  }
}
```


You can infinitely nest folders, although we recommend limiting this to 2 or 3 levels otherwise navigating can become tedious and it's more difficult to visualize the hierarchy.

![alt text](/git-branching.png)

# Syntax Highlighting

GitDocs offers extremely flexible and performant syntax highlighting for hundreds of languages, and a number of different ways you can configure it.

### Pick Your Highlighter

GitDocs has out of the box support for both [Prism](prismjs.com) or [Highlight.js](https://highlightjs.org/), Prism is the default but you can easily override this by specifying

```json
highlighter: "highlight.js"
```

in your `docs.json` file.


### Pick Your Theme

GitDocs also has built in support for tons of themes via `react-syntax-highlighter`, all of which you can see [here](https://github.com/conorhastings/react-syntax-highlighter/tree/master/src/styles). As if that weren't enough, you can also include any custom theme in your `docs/public/custom.css` file and simple leave the theme blank in your `docs.json` to bring your own. You can themes for Prism [here](https://github.com/PrismJS/prism-themes/tree/master/themes) and for highlight.js [here](https://github.com/isagalaev/highlight.js/tree/master/src/styles).

### Pick Your Languages

In order to optimize your page speed, you should specify your supported languages in your `docs.json` like so:

```json
languages: ["javascript", "ocaml", "rust", "elixir", "bash"]
```

You can find a list of available languages for Prism [here](http://prismjs.com/index.html#languages-list) and for highlight.js [here](https://highlightjs.org/static/demo/).

### Writing Code

GitDocs uses GitHub Flavored Markdown (GFM) which supports inline and fenced code blocks, meaning you can easily highlight code inline `like this` or in blocks by prefixing it like:

<pre>
```javascript
const isAwesome = str => `${str} is awesome.`
```
</pre>

If you don't specify a language a regular ol' `pre` will be rendered using your current theme.

Here's come OCaml for you to look at, isn't it pretty?

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

and some javascript:

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

and some bash:

```bash
curl https://api.stripe.com/v1/subscriptions \
   -u sk_test_BQokikJOvBiI2HlWgH4olfQ2: \
   -d customer=cus_4fdAW5ftNQow1a \
   -d plan=pro-monthly \
   -H "Stripe-Account: {CONNECTED_STRIPE_ACCOUNT_ID}"
```

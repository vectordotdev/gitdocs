# Languages

Here's an `inline code` example too.

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

```
const highlight = (code, language) => {
  try {
    * return Prism.highlight(code, Prism.languages[language], language)
  } catch (e) {
    console.warn(`Ensure your language ${language} is defined in docs.json`)
    return escapeHTML(code)
  }
}
```

```
const highlight = (code, language) => {}
```

<pre data-lines="1-3" class="test" id="test">
const highlight = (code, language) => {
  try {
    return Prism.highlight(code, Prism.languages[language], language)
  } catch (e) {
    console.warn(`Ensure your language ${language} is defined in docs.json`)
    return escapeHTML(code)
  }
}
</pre>

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

```shell
curl https://api.stripe.com/v1/subscriptions \
   -u sk_test_BQokikJOvBiI2HlWgH4olfQ2: \
   -d customer=cus_4fdAW5ftNQow1a \
   -d plan=pro-monthly \
   -H "Stripe-Account: {CONNECTED_STRIPE_ACCOUNT_ID}"
```

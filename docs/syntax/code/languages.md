We support a bunch of languages via highlight.js

```graphql
(* (user, int) Graphql.field *)
let id_field = Graphql.Field {
  name    = "id";
  typ     = Graphql.int;
  resolve = fun user -> user.id
}

(* (user, string) Graphql.field *)
let name_field = Graphql.Field {
  name    = "name";
  typ     = Graphql.string;
  resolve = fun user -> user.name
}
```

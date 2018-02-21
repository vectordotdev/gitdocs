# JSX in Markdown

Coming soon... stay tuned!
<!-- You can also use arrow functions and more advanced expressions, provided the function does not use any input other than literals. The following will work and will evaluate the property to `'abc'`.

## Arrow Functions

Simple arrow functions can be run from JSX. The body of the function can only access variables that are defined in the scope of the function. Access global variables is not allowed.

You can use these functions to generate JSX dynamically if needed.

```jsx
<ReactComponent>
  { [1, 2, 3].map(x => (<Child>{x}</Child>))}
</ReactComponent>
```

will generate

```jsx
<ReactComponent>
  <Child>1</Child>
  <Child>2</Child>
  <Child>3</Child>
</ReactComponent>
```

<Danger>Running arbitrary functions from text in markdown is dangerous. While GitDocs does not `eval` code, you should use caution when using these features and avoid them if possible.</Danger>

## Call Expressions

The following functions can be called from expressions

* `Array.prototype.join`
* `Array.prototype.map`
* `String.prototype.split`

## Member Expressions

The GitDocs JSX markdown processor supports accessing object properties, such as the length of an array.

```jsx
<ReactComponent attr={[3, 4].length} />
```

will set the attribute named `attr` to `2`. -->

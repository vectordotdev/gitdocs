import React from 'react'
import { Switch, Route, Link } from 'react-router-dom'

const req = require.context(`${process.cwd}/docs`, true, /^\.\/.*\.md$/)
const files = req.keys().map(k => ({
  file: k,
  contents: req(k),
}))

const NoMatch = () => <p>Nothing here.</p>

const App = () => (
  <div>
    <aside>
      {files.map(f => (
        <Link to={`/docs/${f.file.replace('.md', '')}`} key={f.file}>
          {f.file}
        </Link>
      ))}
    </aside>
    <Switch>
      <Route path="/" exact render={() => <p>Home!</p>} />
      {files.map(f => (
        <Route
          exact
          path={`/docs/${f.file.replace('.md', '')}`}
          key={f.file}
          render={() => (
            <div>
              {f.file} {f.contents}
            </div>
          )}
        />
      ))}
      <Route component={NoMatch} />
    </Switch>
  </div>
)

export default App

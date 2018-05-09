import React from 'react'
import { ConfigContext } from '../context'
import Search from '../search'
import styles from './styles'

export default function (props) {
  return (
    <ConfigContext.Consumer>
      {config =>
        <header className={styles.wrapper}>
          <Search config={config} manifest={props.manifest} />
          <nav className={styles.nav}>
            {config.header_links.map(({ text, ...rest }) => (
              <a {...rest} key={`nav-${text}`}>{text}</a>
            ))}
          </nav>
        </header>
      }
    </ConfigContext.Consumer>
  )
}

// const logo = props.logo
//   ? <img src={require(`docs/${props.logo}`)} />
//   : props.name

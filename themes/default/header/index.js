import React from 'react'
import { placeholder } from 'glamor'
import { ConfigContext } from '../context'
import styles from './styles'

export default function (props) {
  return (
    <ConfigContext.Consumer>
      {config =>
        <header className={styles.wrapper}>
          <input
            {...placeholder(styles.searchPlaceholder)}
            className={styles.search}
            placeholder="Search documentation..."
          />

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

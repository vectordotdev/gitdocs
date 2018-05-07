import React from 'react'
import { placeholder } from 'glamor'
import styles from './styles'

function Header (props) {
  return (
    <header className={styles.wrapper}>
      <input
        {...placeholder(styles.searchPlaceholder)}
        className={styles.search}
        placeholder="Search documentation..."
      />

      <nav className={styles.nav}>
        {props.links.map(({ text, ...rest }) => (
          <a {...rest} key={`nav-${text}`}>{text}</a>
        ))}
      </nav>
    </header>
  )
}

Header.defaultProps = {
  links: [],
}

export default Header

// const logo = props.logo
//   ? <img src={require(`docs/${props.logo}`)} />
//   : props.name

import React from 'react'
import { Link } from 'react-router-dom'
import styles from './styles'

function Header (props) {
  return (
    <header className={styles.wrapper}>
      <Link className={styles.logo} to="/">
        {props.name.toUpperCase()}
      </Link>

      <nav className={styles.nav}>
        {props.navigation.map(({ text, ...rest }) => (
          <a {...rest} key={`nav-${text}`}>{text}</a>
        ))}
      </nav>
    </header>
  )
}

Header.defaultProps = {
  navigation: [],
}

export default Header

// const logo = props.logo
//   ? <img src={require(`docs/${props.logo}`)} />
//   : props.name

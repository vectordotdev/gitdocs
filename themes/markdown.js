import React from 'react'
// import Loadable from 'react-loadable'
import Markdown from 'markdown-to-jsx'
// import Syntax, { registerLanguage } from 'react-syntax-highlighter/light'
// import docco from 'react-syntax-highlighter/styles/hljs/docco'

// const Code = (props) => {
//   const {
//     className = '',
//     children,
//   } = props

//   const language = className.split('-')[1]

//   const Highlighted = (
//     <Syntax
//       showLineNumbers
//       style={docco}
//       language={language}
//     >
//       {children}
//     </Syntax>
//   )

//   const Comp = Loadable({
//     loader: () => import(`react-syntax-highlighter/languages/hljs/${language}`),
//     loading: () => Highlighted,
//     render: (loaded) => {
//       registerLanguage(language, loaded.default)
//       return Highlighted
//     },
//   })

//   return <Comp />
// }

export default function (props) {
  const options = {
    overrides: {
      // code: Code,
    },
  }

  return (
    <Markdown options={options}>
      {props.source}
    </Markdown>
  )
}

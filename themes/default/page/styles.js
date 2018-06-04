import styled from 'react-emotion'

export const Wrapper = styled('div')`
  padding: 30px 50px;
  box-sizing: border-box;
  position: relative;

  @media(max-width: 1200px) {
    flex-direction: column-reverse;
    nav { margin-left: 0 }
    padding: 15px 50px;
  }

  @media(max-width: 500px) {
    padding: 10px 20px;
  }
`

export const ContentWrapper = styled('div')`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap-reverse;
  justify-content: flex-start;
`

export const MarkdownWrapper = styled('div')`
  flex: 1;
  max-width: 850px;

  @media(max-width: 1200px) {
    padding: 0 50px 0 0;
  }

  @media(max-width: 600px) {
    padding: 0;
  }
`

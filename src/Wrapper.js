import styled from 'styled-components'

export default styled.main`
  display: flex;
  height: 100vh;

  > div { display: flex; height: 100vh; }

  @media(max-width: 700px) {
    main > div { flex-direction: column }

    aside {
      min-height: 200px;
      width: 100%;
      background: #F4F3FB;
      overflow: scroll;
    }
  }

  @media(min-width: 1500px) {
    max-width: 1280px;
    margin: 0 auto;
    height: auto;

    aside {
      height: auto;
      background: #FFF;
      margin: 2rem 0;
      padding-top: 0;

      .back {
        border: none;
      }
    }
  }
`

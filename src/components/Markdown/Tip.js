import styled from 'styled-components'

export default styled.div`
  padding: 12px 24px 12px 20px;
  margin: 2em 0;
  border-left: 4px solid;
  position: relative;
  border-bottom-right-radius: 2px;
  border-top-right-radius: 2px;
  border-left-color: #3c763d;
  background-color: rgba(241,249,241,.83);

  &::before {
    background-color: #3c763d;
    content: "!";
    position: absolute;
    top: 14px;
    left: -12px;
    color: #fff;
    width: 20px;
    height: 20px;
    border-radius: 100%;
    text-align: center;
    line-height: 20px;
    font-weight: 700;
    font-family: Dosis,Source Sans Pro,Helvetica Neue,Arial,sans-serif;
  }
`

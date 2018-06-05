import styled from 'react-emotion'
import { Link } from 'react-router-dom'
import { ChevronRight } from 'react-feather'

export const Wrapper = styled('nav')`
  margin-bottom: 20px;
`

export const CrumbWrapper = styled('div')`
  display: inline-block;
`

export const Crumb = styled(Link)`
  color: #848B8E;
  font-weight: 600;
  font-size: 1rem;
  text-decoration: none;
  opacity: .5;
  transition: opacity .1s;
  &:hover {
    opacity: 1;
  }
`

export const CrumbInactive = styled(Crumb.withComponent('span'))`
  &:hover {
    opacity: .5;
  }
`

export const Seperator = styled(ChevronRight)`
  display: inline-block;
  opacity: .2;
  padding: 0 5px;
  position: relative;
  top: 2px;
`

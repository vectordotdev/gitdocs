import React, { Component } from 'react'
import enhanceClickOutside from 'react-click-outside'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Highlight from 'react-highlight-words'
import { Search as SearchIcon, ChevronRight } from 'react-feather'
import { createDB } from './db'
import strip from './strip'
import history from '../history'
import { ellipsify } from '../utils'
import { Wrapper, Input, Results, Result, Center } from './styles'

const UP = 'ArrowUp'
const DOWN = 'ArrowDown'
const ENTER = 'Enter'
const ESCAPE = 'Escape'

class Search extends Component {
  constructor (props) {
    super(props)

    // Basic state for querying and loading
    this.state = {
      query: '',
      loading: false,
      selectedIndex: 0,
      results: [],
    }

    // Index docs for search results
    this.loadResults()
  }

  componentDidUpdate (prevProps, prevState) {
    if (this.state.selectedIndex !== prevState.selectedIndex) {
      this.ensureActiveItemVisible()
    }
  }

  ensureActiveItemVisible () {
    if (!this.activeItem) return false

    const distanceFromTop = this.activeItem.offsetTop
    const height = this.activeItem.offsetHeight
    const scrollTop = this.results.scrollTop
    const clientHeight = this.results.clientHeight

    if (distanceFromTop === 0) {
      return this.results.scrollTop = 0
    }

    if (distanceFromTop < scrollTop) {
      return this.results.scrollTop = distanceFromTop
    }

    if ((distanceFromTop + height) > (scrollTop + clientHeight)) {
      return this.results.scrollTop = distanceFromTop - height
    }
  }

  async loadResults () {
    // Initialize search instance and set indices
    const resp = await axios.get('/db.json')
    this.db = createDB({
      ref: 'url',
      indices: ['title', 'content'],
      items: resp.data,
    })
  }

  handleChange = e => {
    const { value } = e.target
    this.setState({
      query: value,
      loading: value.length !== 0,
      selectedIndex: 0,
    }, async () => {
      const results = await this.fetchResults(value)
      this.setState({ results, loading: false })
      this.results.scrollTop = 0
    })
  }

  handleKeyUp = e => {
    const { key } = e

    if (e.key === ESCAPE) {
      return this.clearSearch()
    }

    // Only listen for key up, down, and enter
    if (
      !key === UP &&
      !key === DOWN &&
      !key === ENTER
    ) return false

    // Get the selected index if it exists
    const { selectedIndex = 0, results } = this.state

    if (key === ENTER) {
      const selected = results[selectedIndex]
      if (selected) history.push(selected.url)
      this.clearSearch()
    }

    // Next selected index
    let nextIndex = selectedIndex

    if (key === UP) {
      if (selectedIndex === 0) {
        nextIndex = results.length - 1
      } else if (selectedIndex < 0) {
        nextIndex = results.length - 1
      } else {
        nextIndex = selectedIndex - 1
      }
    }

    if (key === DOWN) {
      if (selectedIndex === results.length - 1) {
        nextIndex = 0
      } else {
        nextIndex = selectedIndex + 1
      }
    }

    this.setState({ selectedIndex: nextIndex })
  }

  handleClickOutside () {
    this.clearSearch()
  }

  fetchResults (query) {
    return new Promise((resolve, reject) => {
      const results = this.db
        .search(query)
        .slice(0, 10)
      resolve(results)
    })
  }

  clearSearch = () => {
    this.setState({
      loading: false,
      query: '',
      results: [],
      selectedIndex: 0,
    })
  }

  renderBreadCrumb (result) {
    return result.breadcrumbs
      .slice(1, result.breadcrumbs.length)
      .map(({ title }, i) => (
        <span key={`${title}-${i}`}>
          {i !== 0 && <ChevronRight
            size={14}
            style={{
              display: 'inline-block',
              padding: '0 .25rem',
              position: 'relative',
              top: 2,
            }}
          />}

          {title}
        </span>
      ))
  }

  renderResults () {
    const { query, loading, selectedIndex, results } = this.state
    if (!query.length) return null

    // Map over search results and create links
    const items = results.map((r, i) =>
      <Result
        key={r.url}
        selected={i === selectedIndex}
        innerRef={ref => i === selectedIndex ? this.activeItem = ref : null}
        onClick={this.clearSearch}
      >
        <Link to={r.url}>
          <h5>{this.renderBreadCrumb(r)}</h5>
          <p>
            <Highlight
              highlightClassName="highlight"
              searchWords={query.length > 2 ? query.split(' ') : []}
              autoEscape
              textToHighlight={strip(ellipsify(r.content, 200))}
            />
          </p>
          <span className="url">{r.url}</span>
        </Link>
      </Result>
    )

    return (
      <Results innerRef={ref => this.results = ref}>
        {items.length !== 0 && !loading && items}
        {items.length === 0 && !loading && <Center>No Results Found matching {`"${query}"`}...</Center>}
        {loading && <span>Loading...</span>}
      </Results>
    )
  }

  render () {
    return (
      <Wrapper>
        <SearchIcon color="#BCBFC1" size={20} />
        <Input
          onChange={this.handleChange}
          onKeyUp={this.handleKeyUp}
          value={this.state.query}
          placeholder="Search documentation..."
        />
        {this.renderResults()}
      </Wrapper>
    )
  }
}

export default enhanceClickOutside(Search)

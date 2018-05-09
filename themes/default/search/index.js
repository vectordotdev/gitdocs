import React, { Component } from 'react'
import cx from 'classnames'
import { Link } from 'react-router-dom'
import { placeholder } from 'glamor'
import { createDB } from './db'
import history from '../history'
import styles from './styles'

const UP = 'ArrowUp'
const DOWN = 'ArrowDown'
const ENTER = 'Enter'

class Search extends Component {
	constructor (props) {
		super(props)

		// Basic state for querying and loading
		this.state = {
			query: '',
			loading: false,
			selectedIndex: null,
			results: [],
		}

		// Initialize search instance and set indices
		this.db = createDB({
			ref: 'url',
			indices: ['title'],
			items: props.manifest.files,
		})
	}

	handleChange = e => {
		const { value } = e.target
		this.setState({
			query: value,
			loading: value.length !== 0
		}, async () => {
			const results = await this.fetchResults(value)
			this.setState({ results, loading: false })
		})
	}

	handleKeyUp = e => {
		const { key } = e

		// Only listen for key up, down, and enter
		if (
			!key === UP &&
			!key === DOWN &&
			!key === ENTER
		) return false

		// Get the selected index if it exists
		const { selectedIndex = -1, results } = this.state

		if (key === ENTER) {
			const selected = results[selectedIndex]
			if (selected) history.push(selected.url)
			this.clearSearch()
		}

		// Next selected index
		let nextIndex

		if (key === UP) {
			if (selectedIndex === 0) {
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

		this.setState({ selectedIndex:  nextIndex })
	}

	fetchResults (query) {
		return new Promise((resolve, reject) => {
			const results = this.db.search(query)
			resolve(results)
		})
	}

	clearSearch = () => {
		this.setState({ loading: false, query: '', results: [] })
	}

	renderResults () {
		const { query, loading, selectedIndex, results } = this.state
		if (!query.length) return null

		// Map over search results and create links
		const items = results.map((r, i) =>
			<div
				key={r.file} 
				className={
					cx({
						[styles.result]: true,
						[styles.selected]: i === selectedIndex
					})
				}
				onClick={this.clearSearch}
			>
				<Link to={r.url}>
					<h2 className={styles.resultTitle}>{r.title}</h2>
					<p className={styles.resultURL}>{r.url}</p>
				</Link>
			</div>
		)

		return (
			<div className={styles.results}>
				{items.length !== 0 && !loading && items}
				{items.length === 0 && !loading && <span>No Results...</span>}
				{loading && <span>Loading...</span>}
			</div>
		)
	}

	render () {
		return (
			<div className={styles.search}>
				<input
					onChange={this.handleChange}
					onKeyUp={this.handleKeyUp}
					value={this.state.query}
				  {...placeholder(styles.searchPlaceholder)}
				  className={styles.input}
				  placeholder="Search documentation..."
				/>
				{this.renderResults()}
			</div>
		)
	}
}

export default Search

import React, { Component } from 'react'
import './search.css'


class Search extends Component {
    state = {
        text: ''
    }

    handleTextChange(e) {
        this.setState({ text: e.target.value })
        this.props.changeFilter(e.target.value)
    }
    stopSearch() {
        this.setState({ text: '' })
        this.props.changeFilter('')
        document.getElementById('search-el').focus()
    }

    render() {
        return (
            <form className='navbar-form navbar-left pos-p'>
                <input id='search-el' className={`size from-search ${this.state.text ? 'color' : ''}`} placeholder='Search'
                    onChange={(e) => this.handleTextChange(e)}
                    value={this.state.text} />
                {this.state.text ?
                    <span tabIndex='0'
                        className='del-icon'
                        onClick={() => this.stopSearch()}> × </span> :
                    null}
            </form>
        )
    }
}

export default Search


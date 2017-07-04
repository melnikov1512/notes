import React, { Component } from 'react'
import Masonry from 'react-masonry-component'
import Note from './Note.js'

class NoteGrid extends Component {

    render() {
        console.log('filter', this.props.filter)
        let noteComponents = ''
        if (this.props.filter) {
            noteComponents = this.props.notes.filter(el => {
                console.log('title', el.title.includes(this.props.filter))
                console.log('text', el.text.includes(this.props.filter))
                return el.title.includes(this.props.filter) || el.text.includes(this.props.filter)
            }).map((el, i) => {
                return (
                    <Note key={el._id} delNote={this.props.delNote} updateNote={this.props.updateNote} data={el} />
                )
            })
        } else {
            noteComponents = this.props.notes.map((el, i) => {
                return (
                    <Note key={el._id} delNote={this.props.delNote} updateNote={this.props.updateNote} data={el} />
                )
            })
        }

        return (
            <div className='row'>
                <div className='container'>
                    <Masonry>
                        {noteComponents}
                    </Masonry>
                </div>
            </div>
        )
    }
}

export default NoteGrid
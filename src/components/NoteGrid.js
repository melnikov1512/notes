import React, { Component } from 'react'
import Masonry from 'react-masonry-component'
import Note from './Note.js'

class NoteGrid extends Component {

    render() {
        let noteComponents = this.props.notes.map((el, i) => {
            return (
                <Note email={this.props.user} title={el.title} text={el.text} colorNote={el.color} key={el._id} noteId={el._id} delNote={this.props.delNote} updateNote={this.props.updateNote} />
            )
        })

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
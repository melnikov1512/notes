import React, { Component } from 'react';
import { connect } from 'react-redux'
import NoteGrid from '../components/NoteGrid.js'
import NoteEditor from '../components/NoteEditor.js'
import { delNote, fetchNotes, createNote, updateNote } from '../actions/NoteActions.js'

class NotesPage extends Component {


    componentWillMount() {
        if (this.props.user.name) {
            this.props.fetchNotes(this.props.user.name)
        }
    }
    componentWillReceiveProps(nextProps) {
        console.log('nextprops', nextProps.user.user)
        if (nextProps.user.name !== this.props.user.name) {
            nextProps.fetchNotes(nextProps.user.name)
        }
    }

    render() {
        return (
            <div className='row'>
                <NoteEditor createNote={this.props.createNote} />
                <NoteGrid filter={this.props.search.filter} notes={this.props.notes.notes} delNote={this.props.delNote} updateNote={this.props.updateNote} />
            </div>
        )
    }
}
function mapStateToProps(state) {
    let { notes, user, search } = state
    return { notes, user, search }
}

export default connect(mapStateToProps, { delNote, fetchNotes, createNote, updateNote })(NotesPage)
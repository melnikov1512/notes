import React, { Component } from 'react';
import { connect } from 'react-redux'
import NoteGrid from '../components/NoteGrid.js'
import NoteEditor from '../components/NoteEditor.js'
import { delNote, fetchNotes, createNote, updateNote } from '../actions/NoteActions.js'

class NotesPage extends Component {


    componentWillMount() {
        if (this.props.user.user) {
            this.props.fetchNotes(this.props.user.user)
        }
    }
    componentWillReceiveProps(nextProps) {
        console.log('nextprops', nextProps.user.user)
        if (nextProps.user.user !== this.props.user.user) {
            nextProps.fetchNotes(nextProps.user.user)
        }
    }

    render() {
        return (
            <div className='row'>
                <NoteEditor user={this.props.user.user ? this.props.user.user.email : ''} createNote={this.props.createNote} />
                <NoteGrid user={this.props.user.user ? this.props.user.user.email : ''} notes={this.props.notes.notes} delNote={this.props.delNote} updateNote={this.props.updateNote} />
            </div>
        )
    }
}
function mapStateToProps(state) {
    let { notes, user } = state
    return { notes, user }
}

export default connect(mapStateToProps, { delNote, fetchNotes, createNote, updateNote })(NotesPage)
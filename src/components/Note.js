import React, { Component } from 'react';
import './note.css'
import ColorPicker from './ColorPicker.js'
import ContentEditable from 'react-contenteditable'

class Note extends Component {

    constructor(props) {
        super(props)
        this.state = {
            title: this.props.title,
            text: this.props.text,
            color: this.props.colorNote,
            firstFocus: false,
            editStarting: false,
            colorChanging: false,
            childFocused: false,
        }
    }

    handleDelIconFocus(e) {
        e.stopPropagation()
    }

    deleteNote() {
        this.setState({ childFocused: false })
        this.props.delNote(this.props.noteId, this.props.email)
    }

    handleTitleChange(e) {
        this.setState({ title: e.target.value })
    }

    handleTextChange(e) {
        this.setState({ text: e.target.value })
    }
    handleButtonClick() {
        this.setState({ editStarting: false, firstFocus: false })
        this.props.updateNote({
            _id: this.props.noteId,
            title: this.state.title,
            text: this.state.text,
            color: this.state.color
        })
    }

    handlColorClick(color) {

        this.setState({ color: color, colorChanging: true })
    }

    handleFocus() {
        if (!this.state.firstFocus) {
            this.setState({ editStarting: true, firstFocus: true })
        } else {
            this.setState({ editStarting: true, childFocused: true })
        }
    }

    handleBlur() {
        setTimeout(() => {
            if (this.state.childFocused === true) {
                this.setState({ childFocused: false })
            }
            else {
                this.setState({ editStarting: false, colorChanging: false, firstFocus: false, title: this.props.title, text: this.props.text, color: this.props.colorNote })
            }
        }, 50)
    }

    render() {
        const style = {
            backgroundColor: this.state.color
        }
        return (
            <div onFocus={() => this.handleFocus()} onBlur={() => this.handleBlur()} tabIndex='0'
                className={`${this.state.editStarting ? 'note-editor-place' : 'col-md-3 col-sm-3 col-lg-3'} ${this.state.colorChanging ? 'color' : ''}`}
                style={!this.state.editStarting ? {} : style} >
                <div tabIndex='0'
                    className={`${this.state.editStarting ? '' : 'note-place'}`}
                    style={this.state.editStarting ? {} : style}>

                    {/*del icon*/}
                    {this.state.editStarting ?
                        null :
                        <span tabIndex='0'
                            className='Note__del-icon'
                            onClick={() => this.deleteNote()}
                            onFocus={(e) => this.handleDelIconFocus(e)}> × </span>}

                    {/*title string*/}
                    {(this.state.editStarting || this.state.title) ?
                        <ContentEditable id='note-title' className={`NoteEditor__title`} placeholder={`${this.state.editStarting ? 'TITLE' : ''}`}
                            html={this.state.title} disabled={!this.state.editStarting}
                            onChange={(e) => this.handleTitleChange(e)} /> :
                        null}

                    {/*text string*/}
                    <ContentEditable id='note-text' className={`NoteEditor__text`} placeholder={`${this.state.editStarting ? 'TEXT' : ''}`}
                        html={this.state.text}
                        disabled={!this.state.editStarting}
                        onChange={(e) => this.handleTextChange(e)} />
                </div>
                {/*colorpicker and button*/}
                <div tabIndex='0' className={`${this.state.editStarting ? '' : ' hide'}`}>
                    <ColorPicker onChange={(color) => this.handlColorClick(color)} value={this.state.color} />
                    <button id='_button' type='button' disabled={!this.state.text} className='NoteEditor__button' onClick={() => { this.handleButtonClick() }}> OK </button>
                </div>
            </div>
        )
    }
}

export default Note
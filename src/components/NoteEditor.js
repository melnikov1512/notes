import React, { Component } from 'react'
import ColorPicker from './ColorPicker.js'
import ContentEditable from 'react-contenteditable'
import './noteEditor.css'

class NoteEditor extends Component {
    state = {
        title: '',
        text: '',
        color: '#FFFFFF',
        firstFocus: false,
        editStarting: false,
        childFocused: false
    }

    handleTitleChange(e) {
        this.setState({ title: e.target.value })
    }

    handleTextChange(e) {
        this.setState({ text: e.target.value })
    }
    handleButtonClick() {

        this.props.createNote({
            title: this.state.title,
            text: this.state.text,
            color: this.state.color
        })
        this.setState({ title: '', text: '', color: '#FFFFFF', editStarting: false })

    }

    handlColorClick(color) {
        this.setState({ color })
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
                this.setState({ editStarting: false, title: '', text: '', color: '#FFFFFF', firstFocus: false })
            }
        }, 50)

    }

    render() {
        let style = {
            backgroundColor: this.state.color
        }

        return (
            <div className='row note-editor' id='_container'>
                <div onFocus={() => this.handleFocus()}
                    onBlur={() => this.handleBlur()}
                    tabIndex='0'
                    className='container note-creator-place'
                    style={style}>
                    <div tabIndex='1'>
                        {/*title string*/}
                        <ContentEditable id='note-title'
                            className={`NoteEditor__title${this.state.editStarting ? '' : ' hide'}`}
                            placeholder='TITLE'
                            html={this.state.title} disabled={!this.state.editStarting}
                            onChange={(e) => this.handleTitleChange(e)} />
                        {/*text string*/}
                        <ContentEditable id='note-text'
                            className={`NoteEditor__text`}
                            placeholder='TEXT' html={this.state.text}
                            disabled={!this.state.editStarting}
                            onChange={(e) => this.handleTextChange(e)} />
                    </div>
                    {/*colorpicker and button*/}
                    <div tabIndex='2' className={`${this.state.editStarting ? '' : ' hide'}`}>
                        <ColorPicker onChange={(color) => this.handlColorClick(color)}
                            value={this.state.color} />
                        <button id='_button' type='button'
                            disabled={!this.state.text}
                            className='NoteEditor__button'
                            onClick={() => { this.handleButtonClick() }}> OK </button>
                    </div>
                </div>
            </div >
        )
    }
}

export default NoteEditor
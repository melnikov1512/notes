import React from 'react';
import './ColorPicker.css'

const COLORS = ['#FFFFFF', '#80D8FF', '#A7FFEB', '#CCFF90', '#FFFF8D', '#FFD180', '#FF8A80', '#CFD8DC'];

class ColorPicker extends React.Component {
    render() {
        return (
            <div className='ColorPicker'>
                {
                    COLORS.map((color, index) =>
                        <div
                            tabIndex={index.toString()}
                            key={color}
                            className={`ColorPicker__swatch ${this.props.value === color ? 'selected' : ''}`}
                            style={{ backgroundColor: color }}
                            onClick={() => this.props.onChange(color)}
                        />
                    )
                }
            </div>
        );
    }
}

export default ColorPicker;

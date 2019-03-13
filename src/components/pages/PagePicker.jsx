import React from 'react';

import '../../foundation.min.css';


const button_style_bottom = {
    marginBottom: 0,
};

const li_style = {
    margin: 0,
    padding: 0,
};

const ul_style = {
    listStyle: "none",
    margin: 0,
    padding: 0,
    fontSize: 0,
};

class PagePicker extends React.Component {
    render() {
        return (
            <div>
                <ul style={ul_style}>
                    <li style={li_style}>
                        <button className="button large primary expanded"
                                onClick={this.props.onEditorClick}>
                            New Editor
                        </button>
                    </li>
                    <li>
                        <button style={button_style_bottom}
                                className="button hollow large secondary expanded"
                                onClick={this.props.onJoinEditorClick}>
                            Join Editor
                        </button>
                    </li>
                </ul>
            </div>
        )
    }
}

export default PagePicker;

import React from 'react';
import PagePicker from './pages/PagePicker';
import Editor from './pages/Editor';
import JoinEditor from './pages/JoinEditor';
import '../foundation.min.css';

const background_color_title = {
    backgroundColor: "#074E68",
};
const title_style = {
    color: "white",
};
const row_item_style = {
    maxWidth: "60rem",
    marginRight: "auto",
    marginLeft: "auto",
};


function HomeButton(props) {
    return (
        <div className="row">
            <div className="small-6 small-centered text-center columns">
                <button className="button hollow small secondary large-centered"
                        onClick={props.onClick}>Home
                </button>
            </div>
        </div>
    )
}

class Container extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentScreen: 'pagePicker',
            code: '',
        };

        this.handleEditor = this.handleEditor.bind(this);
        this.handleJoinEditor = this.handleJoinEditor.bind(this);
        this.handleHomeClick = this.handleHomeClick.bind(this);

        this.handleSuccessfulJoin = this.handleSuccessfulJoin.bind(this);
    }

    handleEditor() {
        this.setState({currentScreen: 'editor'});
    }

    handleJoinEditor() {
        this.setState({currentScreen: 'joinEditor'});
    }

    handleHomeClick() {
        this.setState({
            currentScreen: 'pagePicker',
            code: '',
        });
    }

    handleSuccessfulJoin(code) {
        this.setState({
            currentScreen: 'editor',
            code: code,
        });
    }

    renderTitle() {
        return (
            <div>
                <div className="callout large" style={background_color_title}>
                    <h1 style={title_style}>Pair Programming</h1>
                </div>
            </div>
        )
    }


    render() {
        switch (this.state.currentScreen) {
            case 'pagePicker': {
                return (
                    <div>
                        {this.renderTitle()}
                        <div style={row_item_style} className="callout">
                            <PagePicker onEditorClick={() => this.handleEditor()}
                                        onJoinEditorClick={() => this.handleJoinEditor()}/>
                        </div>
                    </div>
                );
            }
            case 'editor': {
                return (
                    <div>
                        {this.renderTitle()}
                        <div style={row_item_style} className="callout">
                            <Editor code={this.state.code}/>
                        </div>
                        <HomeButton className="home-button" onClick={() => this.handleHomeClick()}/>
                    </div>
                );
            }
            case 'joinEditor': {
                return (
                    <div>
                        {this.renderTitle()}
                        <div style={row_item_style} className="callout">
                            <JoinEditor onSuccessfulJoin={(value) => this.handleSuccessfulJoin(value)}/>
                        </div>
                        <HomeButton className="home-button" onClick={() => this.handleHomeClick()}/>
                    </div>
                );
            }
            default: {
                console.log('Could not find out which screen to be at, it\'s ' + this.state.currentScreen + ' rn');
                break;
            }
        }
    }
}

export default Container;

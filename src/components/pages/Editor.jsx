import React from 'react';

const button_style_bottom = {
    marginBottom: 0,
};

const ip = '192.168.2.13';

class Editor extends React.Component {

    constructor(props) {
        super(props);

        this.state = {code: 'default', text: ''};

        this.handleChange = this.handleChange.bind(this);
    }

    connectWebSocket() {
        this.connection = new WebSocket('ws://' + ip + ':8086');

        this.connection.onopen = evt => {
            console.log("Connection opened, joining exchange with code '" + this.state.code + "'");
            const message = {
                "version": "1.0.0",
                "type": "JOIN_EXCHANGE",
                "message": this.state.code,
            };
            this.connection.send(JSON.stringify(message));
        };
        // this.connection = new WebSocket('ws://192.168.34.25:8085'); // adversitement

        // listen to onmessage event
        this.connection.onmessage = evt => {
            // add the new message to state
            this.setState({
                text: JSON.parse(evt.data).message
            })
        };
    }

    componentDidMount() {
        if (this.props.code) {
            console.log("We have a code! It's '" + this.props.code + "'");
            this.setState({code: this.props.code});
            this.connectWebSocket();
        } else {
            console.log("We do not have a code. Requesting a new one.");
            fetch('http://' + ip + ':4567/newEditor')
                .then(response => response.json())
                .then(jsonResponse => this.setState({code: jsonResponse.message}))
                .then(thing => this.connectWebSocket())
                .catch(error => console.error(error))
        }
        // for testing: sending a message to the echo service every 2 seconds,
        // the service sends it right back
        // setInterval(_ => {
        //     this.connection.send("samplemessage");
        // }, 2000)
    }

    handleChange(event) {
        const text = event.target.value;
        this.setState({text: text});

        const message = {
            "version": "1.0.0",
            "type": "NEW_MESSAGE",
            "message": text,
        };
        this.connection.send(JSON.stringify(message));
    }

    render() {
        return (
            <div>
                <h5>Code: {this.state.code}</h5>

                <textarea value={this.state.text}
                          id="textArea"
                          style={button_style_bottom}
                          onChange={this.handleChange}
                          placeholder="Hello World!"
                          cols="50" rows="25"/>
            </div>
        );
    }
}

export default Editor;

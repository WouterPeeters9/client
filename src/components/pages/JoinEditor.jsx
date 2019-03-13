import React from 'react';


const button_style_bottom = {
    marginBottom: 0,
};

const ip = '192.168.2.13';

class JoinEditor extends React.Component {

    constructor(props) {
        super(props);

        this.state = {value: ''};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        const code = this.state.value;

        // Check if code is a UUID
        if (!code.match(/^[\w]{8}-[\w]{4}-[\w]{4}-[\w]{4}-[\w]{12}$/)) {
            alert('Invalid code \'' + code + '\'.');
            return;
        }

        fetch('http://' + ip + ':4567/joinEditor?code=' + code)
            .then(response => {
                if (response.ok) {
                    const jsonResponse = response.json();
                    jsonResponse.then(json => {
                        console.log(json);
                        this.props.onSuccessfulJoin(code);
                    });
                } else {
                    const jsonResponse = response.json();
                    jsonResponse.then(json => {
                        alert(json.message);
                        console.error(json.message);
                    });
                }
            })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        <h5>
                            Code
                        </h5>
                        <input placeholder="..." type="text" className="text-center" value={this.state.value}
                               onChange={this.handleChange}/>
                    </label>
                    <input className="button primary" style={button_style_bottom} type="submit" value="Submit"/>
                </form>
            </div>
        );
    }
}

export default JoinEditor;

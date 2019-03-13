import React, {Component} from 'react';
import './foundation.min.css';
import Container from './components/Container';

const style = {
    textAlign: 'center',
};

class App extends Component {
    render() {
        return (
            <div style={style}>
                <Container/>
            </div>
        );
    }
}

export default App;

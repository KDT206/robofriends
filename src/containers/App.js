import React from 'react'
import CardList from '../components/CardList.js'
import SearchBox from '../components/SearchBox.js'
import Scroll from '../components/Scroll.js'
import './App.css'
import ErrorBoundary from '../components/ErrorBoundary.js'

class App extends React.Component {
    constructor() {
        super()
        this.state = {
            robots: [],
            searchfield: ''
        }
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(res => res.json())
        .then(users => this.setState({ robots: users }));
    }

    onSearchChange = (event) => {
        this.setState({searchfield: event.target.value})
    }

    render() {
        const filteredRobots = this.state.robots.filter(robots => {
            return robots.name.toLowerCase().includes(this.state.searchfield.toLowerCase());
        })

        if(this.state.robots.length === 0) {
            return <h1>Loading</h1>
        } else {
            return (
            <div className="tc">
                <h1 className="f1">RoboFriends</h1>
                <SearchBox searchChange={this.onSearchChange} />
                <Scroll>
                    <ErrorBoundary>
                        <CardList robots={filteredRobots} />
                    </ErrorBoundary>
                </Scroll>
            </div>
        );
        }
    }
}

export default App;
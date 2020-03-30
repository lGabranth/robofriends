import React, { Component } from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import '../containers/App.css';

// const state = {
// 	robots: robots,
// 	searchField:''
// };

// const App = () => {
// 	return (
// 		<div className="tc">
// 			<h1>RoboFriends</h1>
// 			<SearchBox />
// 			<CardList robots={robots}/>
// 		</div>
// 	);
// }

class App extends Component {
	constructor(){
		super();
		this.state = {
			robots: [],
			searchfield:''
		}
	}

	componentDidMount(){
		fetch('https://jsonplaceholder.typicode.com/users').then(response => response.json()).then(users => this.setState({ robots: users}));
	}

	onSearchChange = (event) => {
		this.setState({ searchfield: event.target.value });
	}

	render(){
		const { robots, searchfield } = this.state;
		const filteredRobots = robots.filter(robot => { 
			let nom = robot.name.toLowerCase();
			let email = robot.email.toLowerCase();
			// let username = robot.username.toLowerCase();
			let rech = searchfield.toLowerCase();

			return nom.includes(rech) || email.includes(rech) /*|| username.includes(rech)*/;
		});

		// if(!robots.length/*CORRESPOND A robots.length === 0*/) { 
		// 	return <h1>Loading..</h1> 
		// } 
		// else {
		// 	return (
		// 		<div className="tc">
		// 			<h1 className='f1'>RoboFriends</h1>
		// 			<SearchBox searchChange={this.onSearchChange}/>
		// 			<Scroll>
		// 				<CardList robots={filteredRobots}/>
		// 			</Scroll>
		// 		</div>
		// 	);
		// }
		return !robots.length ? 
		<h1>Loading..</h1> 
		: 
		(<div className="tc">
 			<h1 className='f1'>RoboFriends</h1>
 			<SearchBox searchChange={this.onSearchChange}/>
 			<Scroll>
 				<CardList robots={filteredRobots}/>
 			</Scroll>
 		</div>);

	}
}

export default App;
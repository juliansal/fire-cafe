import React, { Component } from "react";
import { Helmet } from "react-helmet";
import Home from "./pages/Home";
import "./App.css";

class App extends Component {
	render() {
		return (
			<div className="App">
				<Helmet>
                	<meta charSet="utf-8" />
                	<title>Fire Cafe</title>
            	</Helmet>
				<h1>Cloud Cafe</h1>
				<Home />
			</div>
		);
	}
}

export default App;

import React, { Component } from "react";

export default class Cafes extends Component {
	
	cafeList = (props) => {
		let cafeList = props.cafeList.map(cafe => {
			return (
				<li onClick={this.handleClick} key={ cafe.id }>
					<span>{ cafe.name }</span>
					<span>{ cafe.city }</span>
				</li>
			)
		});
	
		return cafeList;
	}

	handleClick = (e) => {
		console.log(e.type);
	}
	
	render() {
		
		return (
			<ul id="cafe-list">
				{ this.cafeList(this.props) }
			</ul>
		)
					
	}
}
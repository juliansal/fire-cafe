import React, { Component } from "react";

export default class Cafes extends Component {
	
	cafeList = (props) => {
		let cafeList = props.cafeList.map(cafe => {
			return (
				<li data-key={ cafe.id } key={ cafe.id }>
					<span onClick={ this.props.editCafe }>{ cafe.name }</span>
					<span>{ cafe.city }</span>
					<div onClick={ this.deleteCafe }>x</div>
				</li>
			)
		});
	
		return cafeList;
	}

	deleteCafe = (e) => {
		e.stopPropagation();
		const db = this.props.store;
		const docId = e.target.parentElement.getAttribute('data-key');

		db.collection('cafes').doc(docId)
			.delete()
			.then(() => {
				this.removeFromList(docId);
			}).catch(err => {
				console.log(err);
			});
		
	}

	removeFromList = (docId) => {
		let cafeList = document.getElementById("cafe-list");
		let li = cafeList.querySelector('[data-key=' + docId + ']');
		cafeList.removeChild(li);
	}
	
	render() {
		
		return (
			<ul id="cafe-list">
				{ this.cafeList(this.props) }
			</ul>
		)
					
	}
}
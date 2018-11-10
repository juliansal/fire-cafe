import React, { Component } from "react";

export default class CafeForm extends Component {

	componentDidUpdate() {
		console.log("Changed!!", this.props.passInputs.name);
		let { cafe, city } = this.getInputFields();

		cafe.value = this.props.passInputs.name || '';
		city.value = this.props.passInputs.city || '';
	}

	cafeSubmit = (e) => {
		e.preventDefault();
		const db = this.props.store;
		let { cafe, city } = this.getInputFields();

		db.collection('cafes')
			.add({
				name: cafe.value,
				city: city.value
			}).then(() => {
				cafe.value = '';
				city.value = '';
			});
	}

	updateCafe = (e) => {
		e.preventDefault();
		const db = this.props.store;
		let { cafe, city } = this.getInputFields();

		db.collection('cafes').doc(this.props.passInputs.id).update({
			name: cafe.value,
			city: city.value
		}).then(() => {
			cafe.value = '';
			city.value = '';
		});
	}

	getInputFields = () => {
		let cafeList = document.getElementById("add-cafe-form");
		let cafe = cafeList.querySelector('[name=cafe]');
		let city = cafeList.querySelector('[name=city]');

		return { cafeList, cafe, city }
	}

	render() {
		return (
			<form id="add-cafe-form">
				<input 
					defaultValue={ this.props.passInputs.name || '' }
					type="text" name="cafe" placeholder="Cafe Name" />
				<input 
					defaultValue={ this.props.passInputs.city || '' }
					type="text" name="city" placeholder="Cafe City" />
				<button onClick={ this.cafeSubmit }>Add Cafe</button>
				<button onClick={ this.updateCafe }>Update Cafe</button>
			</form>
		)
	}
}
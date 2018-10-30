import React, { Component } from "react";

export default class CafeForm extends Component {
	state = {
		city: '',
		cafe: ''
	}

	fieldChanged = (e) => {
		let key = e.target.name;
		this.setState({
			[key]: e.target.value
		});
	}

	cafeSubmit = (e) => {
		e.preventDefault();
		const db = this.props.store;

		db.collection('cafes')
			.add({
				city: this.state.city,
				name: this.state.cafe
			}).then(() => {
				this.setState({
					city: '',
					cafe: ''
				});
			})

	}

	render() {
		return (
			<form onSubmit={this.cafeSubmit} id="add-cafe-form">
				<input 
					onChange={this.fieldChanged} 
					value={ this.state.cafe }
					type="text" name="cafe" placeholder="Cafe Name" />
				<input 
					onChange={this.fieldChanged} 
					value={ this.state.city }
					type="text" name="city" placeholder="Cafe City" />
				<button>Add Cafe</button>
			</form>
		)
	}
}
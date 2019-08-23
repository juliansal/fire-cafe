import React, { Component } from "react";
import firebase from "firebase";
import Cafes from "../components/cafes";
import CafeForm from "../components/cafeForm";

firebase.initializeApp({
	apiKey: "AIzaSyC-wghKecpcEYsw8ldzbR2_mrSNd-Ag5PY",
    authDomain: "fire-cafe.firebaseapp.com",
    databaseURL: "https://fire-cafe.firebaseio.com",
    projectId: "fire-cafe",
    storageBucket: "",
    messagingSenderId: "90384294266"
});
const db = firebase.firestore();
//db.settings({ timestampsInSnapshots: true });

export default class Home extends Component {

	state = {
		cafes: [],
		formInputs: {}
	}

	componentDidMount() {
		this.loadCafes('name');
	}

	loadCafes = (order) => {
		let cafes = [];
		db.collection('cafes')
			.orderBy(order)
			.onSnapshot((snap) => {
				snap.docChanges().forEach(change => {
					let { doc } = change;
					if(change.type === "added") {
						cafes.push({
							id: doc.id,
							name: doc.data().name,
							city: doc.data().city
						});
					} else if(change.type === "modified") {
						let updated = cafes.findIndex(entry => {
							return entry.id === doc.id;
						})
						cafes.splice(updated, 1);
						cafes.push({
							id: doc.id,
							name: doc.data().name,
							city: doc.data().city
						});
					} else if (change.type === "removed") {
						this.setState({ 
							formInputs: {
								id: '',
								name: '', 
								city: '' 
							}
						});
					}
				})
				this.setState({ cafes: cafes });
		});
	}

	getEditableCafe = (e) => {
		let editId = e.target.parentElement.getAttribute('data-key');
		let docRef = db.collection('cafes').doc(editId);

		docRef.get().then((doc) => {
			let {name, city} = doc.data();
			this.setState({ 
				formInputs: {
					id: doc.id,
					name: name, 
					city: city 
				}
			});
		}).catch(err => {
			console.log(err);
		});
		
	}

	orderBy = (e) => {
		const order = e.target.getAttribute('data-order');
		this.loadCafes(order);
	}

	render() {
		return (
			<div className="content">
				<CafeForm store={ db } passInputs={ this.state.formInputs } />
				<button 
					onClick={ this.orderBy }
					data-order="city">Order By City</button>
				<button 
					onClick={ this.orderBy }
					data-order="name">Order By Cafe</button>
				<Cafes editCafe={ this.getEditableCafe } store={ db } cafeList={ this.state.cafes } />
			</div>
		)
	}
}

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
db.settings({ timestampsInSnapshots: true });

export default class Home extends Component {

	state = {
		cafes: [],
	}
	
	componentWillMount() {
		this.loadCafes('name');
	}

	

	loadCafes = (order) => {
		let cafes = [];
		db.collection('cafes')
			.orderBy(order)
			.onSnapshot((snap) => {
				snap.docChanges().forEach(({doc}) => {
					console.log(doc.id);
					cafes.push({
						id: doc.id,
						name: doc.data().name,
						city: doc.data().city
					});
				})
				this.setState({ cafes: cafes });
		});
	}

	orderBy = (e) => {
		const order = e.target.getAttribute('data-order');
		this.loadCafes(order);
	}

	render() {
		return (
			<div className="content">
				<CafeForm store={ db } />
				<button 
					onClick={ this.orderBy }
					data-order="city">Order By City</button>
				<button 
					onClick={ this.orderBy }
					data-order="name">Order By Cafe</button>
				<Cafes store={ db } cafeList={ this.state.cafes } />
			</div>
		)
	}
}

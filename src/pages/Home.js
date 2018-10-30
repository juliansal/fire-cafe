import React, { Component } from "react";
import firebase from "firebase";
import Cafes from "../components/cafes";

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
		this.loadCafes();
	}

	loadCafes = () => {
		let cafes = [];
		db.collection('cafes').get()
			.then((snap) => {
				snap.docs.forEach(doc => {
					cafes.push({
						id: doc.id,
						name: doc.data().name,
						city: doc.data().city
					});
				})
				this.setState({ cafes: cafes });
		});
	}

	render() {
		return (
			<div className="content">
				<form id="add-cafe-form"></form>
				<Cafes cafeList={ this.state.cafes } />
			</div>
		)
	}
}

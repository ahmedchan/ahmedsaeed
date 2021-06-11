import * as firebase from 'firebase'

const config = {
	apiKey: "AIzaSyAGXFunQYAbo4RNSgf_rYT9045tm5BC2SM",
	authDomain: "ahmedsaeed-ee39c.firebaseapp.com",
	projectId: "ahmedsaeed-ee39c",
	storageBucket: "ahmedsaeed-ee39c.appspot.com",
	messagingSenderId: "178597880051",
	appId: "1:178597880051:web:ed0c062561f3f82f511786",
	measurementId: "G-LXHFXKLH64"
}

export const firebaseApp = firebase.initializeApp( config )
export const portfolioRef = firebase.firestore().collection('portfolio')
export const storage = firebase.storage()
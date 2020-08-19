import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';
import { createFirestoreInstance, firestoreReducer } from 'redux-firestore'; 
import buscarUsuarioReducer from './reducers/buscarUsuarioReducer';
import thunk from 'redux-thunk';

const firebaseConfig = {
	apiKey: process.env.REACT_APP_apiKey,
	authDomain: process.env.REACT_APP_authDomain,
	databaseURL: process.env.REACT_APP_databaseURL,
	projectId: process.env.REACT_APP_projectId,
	storageBucket: process.env.REACT_APP_storageBucket,
	messagingSenderId: process.env.REACT_APP_messagingSenderId,
	appId: process.env.REACT_APP_appId
};

const userConfig = {
	userProfile: 'users',
	useFirestoreForProfile: true 
};

firebase.initializeApp(firebaseConfig);

firebase.firestore(); 

const rootReducer = combineReducers({
	firebase: firebaseReducer,
	firestore: firestoreReducer,
	subscriber: buscarUsuarioReducer
});

const initialState = {};
const store = createStore(
	rootReducer,
	initialState,
	compose(
		applyMiddleware(thunk)
	)
);

const userProps = {
	firebase,
	config: userConfig,
	dispatch: store.dispatch,
	createFirestoreInstance
};

export { store, userProps };

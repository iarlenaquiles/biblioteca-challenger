import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store, rrfProps } from './store';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';

import Usuarios from './components/Usuarios/Usuarios';
import Usuario from './components/Usuarios/Usuario';
import NovoUsuario from './components/Usuarios/NovoUsuario';
import EditarUsuario from './components/Usuarios/EditarUsuario';
import Navbar from './components/layouts/Navbar';
import Livros from './components/Livros/Livros';
import Livro from './components/Livros/Livro';
import EditarLivro from './components/Livros/EditarLibro';
import NovoLivro from './components/Livros/NuevoLibro';
import EmprestarLivro from './components/Livros/EmprestarLivro';
import Login from './components/Auth/Login';
import {
	UserIsAuthenticated,
	UserIsNotAuthenticated
} from './components/helpers/auth';

function App() {
	return (
		<Provider store={store}>
			<ReactReduxFirebaseProvider {...rrfProps}>
				<Router>
					<Navbar />
					<div className="container">
						<Switch>
							<Route
								exact
								path="/login"
								component={UserIsNotAuthenticated(Login)}
							/>
							
							<Route
								exact
								path="/"
								component={UserIsAuthenticated(Livros)}
							/>
							<Route
								exact
								path="/livro/:id"
								component={UserIsAuthenticated(Livro)}
							/>
							<Route
								exact
								path="/livros/novo"
								component={UserIsAuthenticated(NovoLivro)}
							/>
							<Route
								exact
								path="/livros/editar/:id"
								component={UserIsAuthenticated(EditarLivro)}
							/>
							<Route
								exact
								path="/livros/emprestimo/:id"
								component={UserIsAuthenticated(EmprestarLivro)}
							/>
							
							<Route
								exact
								path="/usuario/:id"
								component={UserIsAuthenticated(Usuario)}
							/>
							<Route
								exact
								path="/usuarios"
								component={UserIsAuthenticated(Usuarios)}
							/>
							<Route
								exact
								path="/usuarios/novo"
								component={UserIsAuthenticated(NovoUsuario)}
							/>
							<Route
								exact
								path="/usuarios/editar/:id"
								component={UserIsAuthenticated(
									EditarUsuario
								)}
							/>
							<Route
								render={() => (
									<h1 className="text-center">
										Pagina não encontrada
									</h1>
								)}
							/>
						</Switch>
					</div>
				</Router>
			</ReactReduxFirebaseProvider>
		</Provider>
	);
}

export default App;
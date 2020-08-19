import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useFirebase } from 'react-redux-firebase';

const Navbar = () => {
	const firebase = useFirebase();

	const autenticacion = useSelector((state) => state.firebase.auth);
	
	return (
		<nav className="navbar navbar-expand-lg navbar-dark bg-info mb-5">
			<nav className="navbar navbar-dark">
				<span className="navbar-brand mb-0 h1">
					Biblioteca
				</span>
			</nav>

			{!autenticacion.isEmpty && (
				<ul className="navbar-nav mr-auto">
					<li className="nav-item">
						<Link className="nav-link" to={'/usuarios'}>
							Usuários
						</Link>
					</li>
					<li className="nav-item">
						<Link className="nav-link" to={'/'}>
							Livros
						</Link>
					</li>
				</ul>
			)}

			{autenticacion.uid && (
				<ul className="navbar-nav ml-auto">
					<li className="nav-item">
						<Link className="nav-link" to={'#'}>
							{autenticacion.email}
						</Link>
					</li>
					<li className="nav-item">
						<button
							className="btn btn-danger"
							onClick={() => {
								firebase.logout();
							}}
						>
							Sair
						</button>
					</li>
				</ul>
			)}
		</nav>
	);
};

export default Navbar;

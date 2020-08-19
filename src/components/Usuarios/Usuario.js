import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useFirestoreConnect } from 'react-redux-firebase';
import Spinner from '../layouts/Spinner';

const Usuario = ({ match }) => {
	useFirestoreConnect([
		{ collection: 'usuarios' } 
  ]);
  
	const subscribers = useSelector(
		(state) => state.firestore.ordered.usuarios
  );
  
  const { id } = match.params;
  
  if (!subscribers) return <Spinner />;
  
	const usuario = subscribers.find((subscriber) => subscriber.id === id);

	return (
		<div className="row">
			<div className="col-md-6 mb-4">
				<Link to={'/usuarios'} className="btn btn-secondary">
					Voltar <i className="la la-arrow-circle-left" />{' '}
				</Link>
			</div>
			<div className="col-md-6">
				<Link
					to={`/usuarios/editar/${usuario.id}`}
					className="btn btn-primary float-right"
				>
					Editar usuário <i className="la la-user-edit" />
				</Link>
			</div>
			<hr className="mx-5 w-100" />
			<div className="col-12">
				<h2 className="mb-4">
					{usuario.nome} {usuario.sobrenome}
				</h2>
				
				<p>
					<span className="font-weight-bold">
						Numero de controle: 
					</span>
					{usuario.noControl}
				</p>
			</div>
		</div>
	);
};

export default Usuario;
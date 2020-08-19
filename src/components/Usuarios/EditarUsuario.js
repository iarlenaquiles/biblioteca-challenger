import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { useFirestoreConnect, useFirestore } from 'react-redux-firebase';
import Spinner from '../layouts/Spinner';
import Swal from 'sweetalert2';

const EditarUsuario = ({ history, match }) => {
	const nomeRef = useRef('');
	const sobrenomeRef = useRef('');
  const noControlRef = useRef('');
  
	useFirestoreConnect([
		{ collection: 'usuarios' } 
  ]);
  
	const firestore = useFirestore();

	const subscribers = useSelector(
		(state) => state.firestore.ordered.usuarios
  );
  
  if (!subscribers) return <Spinner />;
  
  const { id } = match.params;
  
  const usuario = subscribers.find((subscriber) => subscriber.id === id);
  
  if (!usuario) return <Spinner />;
  
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (
			nomeRef.current.value.trim() === '' ||
			sobrenomeRef.current.value.trim() === '' ||
			noControlRef.current.value.trim() === ''
		) {
			Swal.fire({
				icon: 'error',
				title: 'Erro',
				text: 'Todos os campos são obrigatorios!'
			});
			return;
    }
    
		const usuarioAtualizado = {
			nome: nomeRef.current.value,
			sobrenome: sobrenomeRef.current.value,
			noControl: noControlRef.current.value
    };
    
		await firestore
			.update(
				{ collection: 'usuarios', doc: usuario.id },
				usuarioAtualizado
			)
			.then(() => {
				Swal.fire('Feito', 'Usuario atualizado', 'success');
				history.push('/usuarios');
			});
  };
  
	return (
		<div className="row">
			<div className="col-12 mb-4">
				<Link to={'/suscriptores'} className="btn btn-secondary">
					Voltar <i className="la la-arrow-circle-left" />{' '}
				</Link>
			</div>
			<div className="col-12">
				<h2>
					Editar usuario <i className="la la-user-edit" />
				</h2>
				<form onSubmit={handleSubmit}>
					<div className="row justify-content-center">
						<div className="col-md-8 mt-5">
							<div className="form-group">
								<label htmlFor="nombre">Nome:</label>
								<input
									type="text"
									name="nome"
									className="form-control"
									placeholder="Nome"
									required
									defaultValue={usuario.nome}
									ref={nomeRef}
								/>
							</div>

							<div className="form-group">
								<label htmlFor="sobrenome">Sobrenome:</label>
								<input
									type="text"
									name="sobrenome"
									className="form-control"
									placeholder="sobrenome"
									required
									defaultValue={usuario.sobrenome}
									ref={sobrenomeRef}
								/>
							</div>
						
							<div className="form-group">
								<label htmlFor="noControl">
									Numero de controle:
								</label>
								<input
									type="text"
									name="noControl"
									className="form-control"
									placeholder="Numero de control del suscriptor"
									required
									defaultValue={usuario.noControl}
									ref={noControlRef}
								/>
							</div>
							<input
								type="submit"
								value="Atualizar"
								className="btn btn-success btn-block"
							/>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};

export default withRouter(EditarUsuario);
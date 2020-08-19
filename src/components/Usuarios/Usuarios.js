import React from 'react';
import { useSelector } from 'react-redux';
import {
	useFirestoreConnect,
	isLoaded,
	isEmpty,
	useFirestore
} from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import Spinner from '../layouts/Spinner';

const Usuarios = () => {
	useFirestoreConnect([
		{ collection: 'usuarios' } 
  ]);
  
	const subscribers = useSelector(
		(state) => state.firestore.ordered.usuarios
	);

	const firestore = useFirestore();
	if (!isLoaded(subscribers) || !subscribers) return <Spinner />;

	if (isEmpty(subscribers)) {
		return (
      <>
        <div className="col-md-12 mb-4">
          <Link to={'/usuarios/novo'} className="btn btn-primary">
            <i className="la la-plus" /> Novo usuário
          </Link>
			  </div>
        <div>Não há usuários cadastrados</div>
      </>
    )
	}
	const deletarUsuario = (id) => {
		Swal.fire({
			title: 'Remover usuário?',
			text: 'Deseja remover esse usuário?',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Remover!',
			cancelButtonText: 'Cancelar'
		}).then(async (result) => {
			if (result.value) {
				await firestore
					.delete({
						collection: 'usuarios',
						doc: id
					})
					.then(() => {
						Swal.fire(
							'Feito',
							'Usuário removido',
							'success'
						);
					});
			}
		});
	};
	return (
		<div className="row">
			<div className="col-md-12 mb-4">
				<Link to={'/usuarios/novo'} className="btn btn-primary">
					<i className="la la-plus" /> Novo usuário
				</Link>
			</div>
			<div className="col-md-8">
				<h2>
					<i className="las la-users" />Usuários
				</h2>
			</div>
			<table className="table table-striped mt-4">
				<thead className="text-light bg-primary">
					<tr>
						<th>Nome</th>
						<th>Ações</th>
					</tr>
				</thead>
				<tbody>
					{subscribers.map((subscriber) => (
						<tr key={subscriber.id}>
							<td>
								{subscriber.nome} {subscriber.sobrenome}
							</td>
						
							<td>
								<Link
									to={`/usuario/${subscriber.id}`}
									className="btn btn-success btn-block"
								>
								  Detalhes
									<i className="la la-info-circle" />
								</Link>
								<button
									className="btn btn-danger btn-block"
									onClick={() =>
										deletarUsuario(subscriber.id)}
								>
								  Deletar
									<i className="la la-trash-alt" />
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default Usuarios;
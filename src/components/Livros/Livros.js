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

const Livros = () => {
	useFirestoreConnect([
		{ collection: 'livros' }
  ]);
  
	const livros = useSelector((state) => state.firestore.ordered.livros);

	const firestore = useFirestore();
	if (!isLoaded(livros) || !livros) return <Spinner />;

	if (isEmpty(livros)) {
		return (
    <>
      <div className="col-md-12 mb-4">
				<Link to={'/livros/novo'} className="btn btn-primary">
					Novo Livro <i className="la la-plus" />
				</Link>
			</div>
      <h1 className="text-center">Não há livros cadastrados</h1>
    </>);
  }
  
	const deletarLivro = (id) => {
		Swal.fire({
			title: 'Deseja remover?',
			text: 'Deseja remover esse livro?',
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
						collection: 'livros',
						doc: id
					})
					.then(() => {
						Swal.fire('Sucesso', 'Livro removido', 'success');
					});
			}
		});
	};
	return (
		<div className="row">
			<div className="col-md-12 mb-4">
				<Link to={'/livros/novo'} className="btn btn-primary">
					Novo Livro <i className="la la-plus" />
				</Link>
			</div>
			<div className="col-md-8">
				<h2>
					Livros <i className="la la-book" />
				</h2>
			</div>
			<table className="table table-striped mt-4">
				<thead className="text-light bg-info">
					<tr>
						<th>Titulo</th>
						<th>ISBN</th>
						<th>Editora</th>
						<th>Quantidade</th>
						<th>Disponíveis</th>
						<th>Ações</th>
					</tr>
				</thead>

				<tbody>
					{livros.map((livro) => (
						<tr key={livro.id}>
							<td>{livro.titulo}</td>
							<td>{livro.isbn}</td>
							<td>{livro.editora}</td>
							<td>{livro.quantidade}</td>
							<td>{livro.quantidade - livro.locados.length}</td>
							<td>
								<Link
									to={`/livro/${livro.id}`}
									className="btn btn-success btn-block"
								>
								  Detalhes
									<i className="la la-info-circle" />
								</Link>
								<button
									className="btn btn-danger btn-block"
									onClick={() => deletarLivro(livro.id)}
								>
									Deletar livro
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

export default Livros;
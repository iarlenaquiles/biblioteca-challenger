import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFirestore } from 'react-redux-firebase';
import Swal from 'sweetalert2';

const NovoLivro = ({ history }) => {
  const firestore = useFirestore();
  
	const [ titulo, setTitulo ] = useState('');
	const [ editora, setEditora ] = useState('');
	const [ isbn, setIsbn ] = useState('');
	const [ quantidade, setQuantidade ] = useState('');
  const locados = [];
  
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (
			titulo.trim() === '' ||
			editora.trim() === '' ||
			isbn.trim() === '' ||
			quantidade.trim() === ''
		) {
			Swal.fire({
				icon: 'error',
				title: 'Erro',
				text: 'Todos os campos são obrigatórios!'
			});
			return;
    }
    
		await firestore
			.add(
				{ collection: 'livros' },
				{ titulo, editora, isbn, quantidade, locados }
			)
			.then(() => {
				Swal.fire(
					'Sucesso',
					'Livro cadastrado',
					'success'
				);
				history.push('/');
			});
  };
  
	return (
		<div className="row">
			<div className="col-12 mb-4">
				<Link to={'/'} className="btn btn-secondary">
					Voltar <i className="la la-arrow-circle-left" />
				</Link>
			</div>

			<div className="col-12">
				<h2>
					Livro novo <i className="la la-book" />
				</h2>

				<div className="justify-content-center row">
					<div className="col-md-8 mt-5">
						<form onSubmit={handleSubmit}>
							<div className="form-group">
								<label htmlFor="titulo">Titulo:</label>
								<input
									type="text"
									name="titulo"
									className="form-control"
									placeholder="Titulo"
									required
									value={titulo}
									onChange={(e) => setTitulo(e.target.value)}
								/>
							</div>

							<div className="form-group">
								<label htmlFor="editora">Editora:</label>
								<input
									type="text"
									name="editora"
									className="form-control"
									placeholder="Editora"
									required
									value={editora}
									onChange={(e) =>
										setEditora(e.target.value)}
								/>
							</div>
							<div className="form-group">
								<label htmlFor="isbn">ISBN:</label>
								<input
									type="text"
									name="isbn"
									className="form-control"
									placeholder="ISBN"
									required
									value={isbn}
									onChange={(e) => setIsbn(e.target.value)}
								/>
							</div>
							<div className="form-group">
								<label htmlFor="quantidade">Quantidade:</label>
								<input
									type="number"
									min="0"
									name="quantidade"
									className="form-control"
									placeholder="Quantidade"
									required
									value={quantidade}
									onChange={(e) =>
										setQuantidade(e.target.value)}
								/>
							</div>
							<input
								type="submit"
								className="btn btn-success btn-block"
								value="Salvar"
							/>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default NovoLivro;
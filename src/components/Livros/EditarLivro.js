import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useFirestoreConnect, useFirestore } from 'react-redux-firebase';
import Spinner from '../layouts/Spinner';
import Swal from 'sweetalert2';

const EditarLivro = ({ match, history }) => {
  const { id } = match.params;
  
  const firestore = useFirestore();
  
	const tituloRef = useRef('');
	const isbnRef = useRef('');
	const quantidadeRef = useRef('');
	const editoraRef = useRef('');

  useFirestoreConnect(`livros/${id}`); 
  
	const livro = useSelector(
		({ firestore: { ordered: { livros } } }) => livros && livros[0]
  );
  
	if (!livro) return <Spinner />;

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (
			tituloRef.current.value.trim() === '' ||
			editoraRef.current.value.trim() === '' ||
			isbnRef.current.value.trim() === '' ||
			quantidadeRef.current.value.trim() === ''
		) {
			Swal.fire({
				icon: 'error',
				title: 'Erro',
				text: 'Todos os campos são obrigatorios!'
			});
			return;
    }
    
		const livroAtualizado = {
			titulo: tituloRef.current.value,
			editora: editoraRef.current.value,
			isbn: isbnRef.current.value,
			quantidade: quantidadeRef.current.value
    };
    
		await firestore
			.update({ collection: 'livros', doc: livro.id }, livroAtualizado)
			.then(() => {
				Swal.fire('Sucesso', 'Livro atualizado', 'success');
				history.push('/');
			});
	};

	return (
		<div className="row">
			<div className="col-12 mb-4">
				<Link to={'/'} className="btn btn-secondary">
					Voltar <i className="la la-arrow-circle-left" />{' '}
				</Link>
			</div>
			<div className="col-12">
				<h2>
					Atualizando livro <i className="la la-book" />
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
									defaultValue={livro.titulo}
									ref={tituloRef}
								/>
							</div>

							<div className="form-group">
								<label htmlFor="editorial">Editora:</label>
								<input
									type="text"
									name="editora"
									className="form-control"
									placeholder="Editora"
									required
									defaultValue={livro.editora}
									ref={editoraRef}
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
									defaultValue={livro.isbn}
									ref={isbnRef}
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
									defaultValue={livro.quantidade}
									ref={quantidadeRef}
								/>
							</div>

							<input
								type="submit"
								className="btn btn-success btn-block"
								value="Atualizar"
							/>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default EditarLivro;
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useFirestoreConnect, useFirestore } from 'react-redux-firebase';
import Spinner from '../layouts/Spinner';
import Swal from 'sweetalert2';

const Livro = ({ match, history }) => {
  const { id } = match.params;
  
	const firestore = useFirestore();
  useFirestoreConnect(`livros/${id}`); 
  
	const livro = useSelector(
		({ firestore: { ordered: { livros } } }) => livros && livros[0]
  );

  console.log(livro);
  
  if (!livro) return <Spinner />;
  
	let btnLocacao = livro.quantidade - livro.locados.length > 0 && (
		<Link
			to={`/livros/emprestimo/${livro.id}`}
			className="btn btn-success my-3"
		>
			Solicitar emprestimo
		</Link>
	);

	const devolverLivro = async (id) => {
		const locados = livro.locados.filter(
			(locado) => locado.noControl !== id
		);

		await firestore
			.update(
				{ collection: 'livros', doc: livro.id },
				{ locados }
			)
			.then(() => {
				Swal.fire(
					'Sucesso',
					'Livro devolvido',
					'success'
				);
				history.push('/');
			});
	};

	return (
		<div className="row">
			<div className="col-md-6 mb-4">
				<Link to={`/`} className="btn btn-secondary">
					Voltar <i className="la la-arrow-circle-left" />
				</Link>
			</div>
			<div className="col-md-6 mb-4">
				<Link
					to={`/livros/editar/${livro.id}`}
					className="btn btn-primary"
				>
					Editar livro <i className="la la-edit" />
				</Link>
			</div>
			<hr className="mx-5 w-100" />
			<div className="col-12">
				<h2 className="mb-4">{livro.titulo}</h2>
				<p>
					<span className="font-weight-bold">ISNB: </span>
					{livro.isbn}
				</p>
				<p>
					<span className="font-weight-bold">Editora: </span>
					{livro.editora}
				</p>
				<p>
					<span className="font-weight-bold">Quantidade: </span>
					{livro.quantidade}
				</p>
				<p>
					<span className="font-weight-bold">Disponíveis: </span>
					{livro.locados && (livro.quantidade - livro.locados.length) > 0 ? livro.quantidade - livro.locados.length : 0}
				</p>
				{btnLocacao}

				{livro.locados.length > 0 && (
					<h3 className="my-2">
            Pessoas com o livro emprestado
					</h3>
        )}
        
				{livro.locados.map((locado) => (
					<div key={locado.noControl} className="card my-2">
						<h4 className="card-header">
							{locado.nome} {locado.sobrenome}
						</h4>
						<div className="card-body">
							<p>
								<span className="font-weight-bold">
									No.Control:
								</span>
								{locado.noControl}
							</p>
							
							<p>
								<span className="font-weight-bold">
									Data de solicitação:
								</span>
								{locado.dataSolicitacao}
							</p>
						</div>
						<div className="card-footer">
							<button
								className="btn btn-success font-weight-bold"
								onClick={() =>
									devolverLivro(locado.noControl)}
							>
								Devolver livro
							</button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Livro;
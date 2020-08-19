import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
	useFirestoreConnect,
	useFirestore,
	isEmpty
} from 'react-redux-firebase';
import Spinner from '../layouts/Spinner';
import Swal from 'sweetalert2';
import FichaUsuario from '../Usuarios/FichaUsuario';
import { buscarUsuarioAction } from '../../actions/buscarUsuarioAction';

const EmprestarLivro = ({ match, history }) => {
  const { id } = match.params;
  
	const [ busca, setBusca ] = useState('');
	const firestore = useFirestore();
	const dispatch = useDispatch();

	const subscriberState = useSelector((state) => state.subscriber);

	const dataSubscriber = (subscriber) =>{
    console.log(subscriber)
    dispatch(buscarUsuarioAction(subscriber));    
  }
	useEffect(() => {
		dataSubscriber({});
	}, []);

  useFirestoreConnect(`livros/${id}`); 
  
	const livro = useSelector(
		({ firestore: { ordered: { livros } } }) => livros && livros[0]
  );
  
	if (!livro) return <Spinner />;

	const handleSubmit = async (e) => {
		e.preventDefault();
		const subscriber = await firestore.get({
			collection: 'usuarios',
			where: [ 'noControl', '==', busca ]
    });
    
		if (!subscriber.empty) {
			dataSubscriber(subscriber.docs[0].data());
		} else {
      dataSubscriber({});
      
			Swal.fire({
				icon: 'error',
				title: 'Erro',
				text:
					'Não foi encontrado ninguem com esse numero de controle'
			});
		}
  };
  
	const solicitarEmprestimo = async () => {
    console.log(subscriberState);
		subscriberState.dataSolicitacao = new Date().toLocaleDateString();
    livro.locados.push(subscriberState);
    
		await firestore
			.update(
				{ collection: 'livros', doc: livro.id },
				{ locados: livro.locados }
			)
			.then(() => {
				Swal.fire(
					'Sucesso',
					'Emprestimo registrado',
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
					Solicitar emprestimo: {livro.titulo}
					<i className="la la-book" />
				</h2>

				<div className="row justify-content-center">
					<div className="col-md-8">
						<form onSubmit={handleSubmit} className="mb-4">
							<legend className="color-primary text-center">
								Buscar usuário por código
							</legend>

							<div className="form-group">
								<input
									type="text"
									name="busca"
									className="form-control"
									onChange={(e) =>
										setBusca(e.target.value)}
								/>
							</div>

							<input
								type="submit"
								className="btn btn-success btn-block"
								value="Buscar usuário"
							/>
						</form>
					
						{!isEmpty(subscriberState) && (
							<FichaUsuario
                subscriber={subscriberState}
								solicitarEmprestimo={solicitarEmprestimo}
							/>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default EmprestarLivro;
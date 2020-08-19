import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFirestore } from 'react-redux-firebase';
import Swal from 'sweetalert2';

const NovoUsuario = ({ history }) => {
	const [ nome, setNome ] = useState('');
	const [ sobrenome, setSobrenome ] = useState('');
	const [ noControl, setNoControl ] = useState('');
  const [ error, setError ] = useState(false);
  
	const firestore = useFirestore();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (
			nome.trim() === '' ||
			sobrenome.trim() === '' ||
			noControl.trim() === ''
		) {
			Swal.fire({
				icon: 'error',
				title: 'Erro',
				text: 'Todos os campos são obrigatorios!'
			});
			setError(true);
			return;
    }
    
		if (!error) {
			await firestore
				.add(
					{ collection: 'usuarios' },
					{
						nome,
						sobrenome,
						noControl
					}
				)
				.then(() => {
					Swal.fire(
						'Feito',
						'Usuário cadastrado',
						'success'
					);
					setNome('');
					setSobrenome('');
					setNoControl('');
					setError(false);
					history.push('/usuarios');
				});
		}
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
					Novo usuário <i className="la la-user-plus" />
				</h2>

				<form onSubmit={handleSubmit}>
					<div className="row justify-content-center">
						<div className="col-md-8 mt-5">
							<div className="form-group">
								<label htmlFor="nome">Nome:</label>
								<input
									type="text"
									name="nome"
									className="form-control"
									placeholder="Nome"
									required
									value={nome}
									onChange={(e) => setNome(e.target.value)}
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
									value={sobrenome}
									onChange={(e) =>
										setSobrenome(e.target.value)}
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
									value={noControl}
									onChange={(e) =>
										setNoControl(e.target.value)}
								/>
							</div>

							<input
								type="submit"
								value="Salvar"
								className="btn btn-success btn-block"
							/>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};

export default NovoUsuario;
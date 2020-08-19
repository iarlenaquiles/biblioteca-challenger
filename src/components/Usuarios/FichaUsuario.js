import React from 'react';

const FichaUsuario = ({ subscriber, solicitarEmprestimo }) => {
	return (
		<div className="card my-3">
			<h3 className="card-header bg-primary text-white">
				Dados do solicitante
			</h3>
			<div className="card-body">
				<p>
					<span className="font-weight-bold">Nome: </span>
					{subscriber.nome} {subscriber.sobrenome}
				</p>
				<p>
					<span className="font-weight-bold">No. Control: </span>
					{subscriber.noControl}
				</p>
				
				<button
					className="btn btn-primary btn-block"
					onClick={() => solicitarEmprestimo()}
				>
					Solicitar Emprestimo
				</button>
			</div>
		</div>
	);
};

export default FichaUsuario;
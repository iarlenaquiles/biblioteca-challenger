import { BUSCA_SUCCESS, BUSCA_ERROR } from '../actions/types';

const initialState = {};

const buscarUsuarioReducer = (state = initialState, action) => {
	switch (action.type) {
		case BUSCA_SUCCESS:
			return {
				nome: action.payload.nome,
				sobrenome: action.payload.sobrenome				
			};
		case BUSCA_ERROR:
			return {};
		default:
			return state;
	}
};
export default buscarUsuarioReducer;

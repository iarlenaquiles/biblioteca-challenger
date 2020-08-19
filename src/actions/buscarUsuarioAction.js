import { BUSCA_SUCCESS, BUSCA_ERROR } from '../actions/types';

export const buscarUsuarioAction = (subcriber) => {
	return (dispatch) => {
		if (Object.keys(subcriber).length !== 0) {
			dispatch(buscaSuccess(subcriber));
		} else {
			dispatch(buscaError());
		}
	};
};

export const buscaSuccess = (subcriber) => {
	return {
		type: BUSCA_SUCCESS,
		payload: subcriber
	};
};
export const buscaError = () => ({
	type: BUSCA_ERROR
});

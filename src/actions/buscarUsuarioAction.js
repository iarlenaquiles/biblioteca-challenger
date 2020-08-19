import { BUSCA_SUCCESS, BUSCA_ERROR } from '../actions/types';

export const buscarUsuarioAction = (subscriber) => {
	return (dispatch) => {
		if (Object.keys(subscriber).length !== 0) {
			dispatch(buscaSuccess(subscriber));
		} else {
			dispatch(buscaError());
		}
	};
};

export const buscaSuccess = (subscriber) => {
	return {
		type: BUSCA_SUCCESS,
		payload: subscriber
	};
};
export const buscaError = () => ({
	type: BUSCA_ERROR
});

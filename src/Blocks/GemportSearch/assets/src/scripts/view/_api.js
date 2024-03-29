import { useEffect, useState } from '@wordpress/element';

export const apiStates = {
	IDLE: 'IDLE',
	LOADING: 'LOADING',
	SUCCESS: 'SUCCESS',
	ERROR: 'ERROR',
};

// export const apiPost = (url) => {
// 	const [state, setState] = useState(apiStates.IDLE);
// 	const [data, setData] = useState(null);
// 	const doPost = (data, nonce) => {
// 		setState(apiStates.LOADING);
// 		fetch(url, {
// 			method: 'POST',
// 			headers: {
// 				Accept: 'application/json',
// 				'Content-Type': 'application/json',
// 				'X-WP-Nonce': nonce,
// 			},
// 			body: JSON.stringify(data),
// 		})
// 			.then((response) => response.json())
// 			.then((data) => {
// 				setState(apiStates.SUCCESS);
// 				setData(data);
// 			})
// 			.catch(() => {
// 				setState(apiStates.ERROR);
// 			});
// 	};
// 	return {
// 		state,
// 		data,
// 		doPost,
// 		setState,
// 		setData,
// 	};
// };

export const apiGet = (url) => {
	const [api_data, setAPIData] = useState({
		state: apiStates.LOADING,
		error: '',
		data: [],
		headers: {},
	});

	const setPartData = (partialData) => setAPIData({ ...api_data, ...partialData });

	useEffect(() => {
		setPartData({
			state: apiStates.LOADING,
		});
		fetch(url, {
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		})
			.then((response) => {
				if (!!response.status && response.status > 399) {
					throw Error({
						status: response.status,
						text: !!response.statusText ? response.statusText : '',
					});
				}
				return response;
			})
			.then((response) => response.json())
			.then((json) => {
				setPartData({
					state: apiStates.SUCCESS,
					data: json,
				});
			})
			.catch((error) => {
				setPartData({
					state: apiStates.ERROR,
					error: !!error.statusText ? error.statusText : 'fetch failed',
				});
			});
	}, []);

	return api_data;
};

import { useEffect, useState } from '@wordpress/element';

export const apiStates = {
	IDLE: 'IDLE',
	LOADING: 'LOADING',
	SUCCESS: 'SUCCESS',
	ERROR: 'ERROR',
};

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

export const useApiGet = () => {
	const [data, setData] = useState({
		state: apiStates.IDLE,
		error: '',
		data: [],
		headers: {},
	});

	const fetchData = (url) => {
		setData({ ...data, state: apiStates.LOADING });

		fetch(url, {
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		})
			.then((response) => {
				if (!response.ok) {
					throw Error({
						status: response.status,
						text: response.statusText || '',
					});
				}
				return response.json();
			})
			.then((json) => {
				setData({
					state: apiStates.SUCCESS,
					data: json,
				});
			})
			.catch((error) => {
				setData({
					state: apiStates.ERROR,
					error: error.statusText || 'fetch failed',
				});
			});
	};

	return [data, fetchData];
};

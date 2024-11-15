export class TimeoutRequestError extends Error {
	constructor(message = 'По какой-то причине запрос выполняется долго') {
		super(message);
		this.name = 'Время ожидания выполнения запроса истекло';
	}
}

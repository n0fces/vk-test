export class AbortRequest extends Error {
	constructor(message = 'Запрос был отменен') {
		super(message);
		this.name = 'Отмена запроса';
	}
}

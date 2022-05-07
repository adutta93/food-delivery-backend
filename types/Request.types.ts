export interface IRequest extends Request {
	user: {
		_id: string;
	};
	get: any;
}

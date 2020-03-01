export interface IResult {
	success: boolean,
	status: boolean,
	error: string,
	errors: string[],
	data: any,
	token: string,
}
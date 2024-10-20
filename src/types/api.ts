export interface IApiResponse<T> {
	count: number;
	next: string;
	previous: string | null;
	results: T[]
}
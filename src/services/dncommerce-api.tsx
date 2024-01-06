import axios from "axios";

export namespace DncommerceApiClient {
	const url = process.env.API_URL;
	const token = `token=${process.env.DNCOMMERCE_API_TOKEN}`;
	const productURL = `${url}/products`;
	const userURL = `${url}/users`;
	const loginUrl = `${url}/login`;

	export interface IUser {
		id?: number;
		name?: string;
		cpf?: string;
		email?: string;
		pass?: string;
		gender?: string;
		access_level?: number;
		token_timestamp?: number;
	}

	export interface IProduct {
		id?: number;
		name?: string;
		description?: string;
		price?: number;
		discount?: string;
		stock?: number;
	}

	type ObjectBody = IUser | IProduct;

	export abstract class HTTPRequests {
		abstract get(): Promise<ObjectBody[]>;
		abstract getId(id: string): Promise<ObjectBody>;
		abstract create(body: ObjectBody): Promise<any>;
		abstract update(id: string, body: ObjectBody): Promise<any>;
		abstract delete(ids: string): Promise<any>;
	}

	export class Users extends HTTPRequests {
		private static _instance: Users;

		public static Instance() {
			return this._instance || (this._instance = new this());
		}

		async login(email: string, pass: string): Promise<any> {
			const response = await axios
				.post(`${loginUrl}/${email}/${pass}`)
				.then((res) => res.data.token)
				.catch((error) => error.response.data.message);

			return response;
		}

		async get(): Promise<IUser[]> {
			const {
				data: { data },
			} = await axios.get(`${userURL}?${token}`);
			return data;
		}
		async getId(id: string): Promise<IUser> {
			const {
				data: { data },
			} = await axios.get(`${userURL}/${id}?${token}`);
			return data[0];
		}
		async create(body: IUser): Promise<any> {
			const response = await axios
				.post(`${userURL}?${token}`, body)
				.catch((res) => res.response.data.message);

			return response;
		}
		async update(id: string, body: IUser): Promise<any> {
			const response = await axios
				.put(`${userURL}/${id}?${token}`, body)
				.catch((res) => res.response.data.message);

			return response;
		}
		async delete(id: string): Promise<any> {
			const response = await axios
				.delete(`${userURL}/${id}?${token}`)
				.catch((res) => res.response.data.message);

			return response;
		}
	}

	export class Products extends HTTPRequests {
		private static _instance: Products;

		public static Instance() {
			return this._instance || (this._instance = new this());
		}

		async get(): Promise<IProduct[]> {
			const {
				data: { data },
			} = await axios.get(`${productURL}?${token}`);
			return data;
		}
		async getId(id: string): Promise<IProduct> {
			const {
				data: { data },
			} = await axios.get(`${productURL}/${id}?${token}`);
			return data;
		}
		async create(body: IProduct): Promise<any> {
			const response = await axios
				.post(`${productURL}?${token}`, body)
				.catch((res) => res.response.data.message);

			return response;
		}
		async update(id: string, body: IProduct): Promise<boolean> {
			const response = await axios
				.put(`${productURL}/${id}?${token}`, body)
				.catch((res) => res.response.data.message);

			return response;
		}
		async delete(id: string): Promise<boolean> {
			const response = await axios
				.delete(`${productURL}/${id}?${token}`)
				.catch((res) => res.response.data.message);

			return response;
		}
	}
}

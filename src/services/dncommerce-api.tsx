import axios from "axios";

export namespace DncommerceApiClient {
	const url = process.env.API_URL;
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
		abstract get(token: string): Promise<ObjectBody[]>;
		abstract getId(id: string, token: string): Promise<ObjectBody>;
		abstract create(body: ObjectBody, token: string): Promise<string>;
		abstract update(id: string, body: ObjectBody, token: string): Promise<string>;
		abstract delete(ids: string, token: string): Promise<string>;
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

		async get(token: string): Promise<IUser[]> {
			try {
				const {
					data: { data },
				} = await axios.get(`${userURL}?token=${token}`);

				return data;
			} catch (error) {
				return [];
			}
		}
		async getId(id: string, token: string): Promise<IUser> {
			try {
				const {
					data: { data },
				} = await axios.get(`${userURL}/${id}?token=${token}`);

				return data[0];
			} catch (error) {
				return {};
			}
		}
		async create(body: IUser, token: string): Promise<string> {
			const response = await axios
				.post(`${userURL}?token=${token}`, body)
				.catch((res) => res.response.data.message);

			return response;
		}
		async update(id: string, body: IUser, token: string): Promise<string> {
			const response = await axios
				.put(`${userURL}/${id}?token=${token}`, body)
				.catch((res) => res.response.data.message);

			return response;
		}
		async delete(id: string, token: string): Promise<string> {
			const response = await axios
				.delete(`${userURL}/${id}?token=${token}`)
				.catch((res) => res.response.data.message);

			return response;
		}
	}

	export class Products extends HTTPRequests {
		private static _instance: Products;

		public static Instance() {
			return this._instance || (this._instance = new this());
		}

		async get(token: string): Promise<IProduct[]> {
			try {
				const {
					data: { data },
				} = await axios.get(`${productURL}?token=${token}`);

				return data;
			} catch (error) {
				return [];
			}
		}
		async getId(id: string, token: string): Promise<IProduct> {
			try {
				const {
					data: { data },
				} = await axios.get(`${productURL}/${id}?token=${token}`);

				return data[0];
			} catch (error) {
				return {};
			}
		}
		async create(body: IProduct, token: string): Promise<string> {
			const response = await axios
				.post(`${productURL}?token=${token}`, body)
				.catch((res) => res.response.data.message);

			return response;
		}
		async update(id: string, body: IProduct, token: string): Promise<string> {
			const response = await axios
				.put(`${productURL}/${id}?token=${token}`, body)
				.catch((res) => res.response.data.message);

			return response;
		}
		async delete(id: string, token: string): Promise<string> {
			const response = await axios
				.delete(`${productURL}/${id}?token=${token}`)
				.catch((res) => res.response.data.message);

			return response;
		}
	}
}

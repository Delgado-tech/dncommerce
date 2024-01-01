import axios from "axios";

export namespace DncommerceApiClient {
	const url = "https://dncommerce-api.vercel.app";
	const token = `token=${process.env.DNCOMMERCE_API_TOKEN}`;
	const productURL = `${url}/products`;
	const userURL = `${url}/users`;

	export interface IUser {
		id?: number;
		name?: string;
		cpf?: string;
		email?: string;
		pass?: string;
		gender?: string;
		access_level?: number;
	}

	export interface IProduct {
		id?: number;
		name?: string;
		description?: string;
		price?: number;
		discount?: number;
		stock?: number;
	}

	type ObjectBody = IUser | IProduct;

	export abstract class HTTPRequests {
		abstract get(): Promise<ObjectBody[]>;
		abstract getId(id: string): Promise<ObjectBody>;
		abstract create(body: ObjectBody): Promise<boolean>;
		abstract update(id: string, body: ObjectBody): Promise<boolean>;
		abstract delete(ids: string): Promise<boolean>;
	}

	export class Users extends HTTPRequests {
		private static _instance: Users;

		public static Instance() {
			return this._instance || (this._instance = new this());
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
			return data;
		}
		async create(body: IUser): Promise<boolean> {
			await axios.post(`${userURL}?${token}`, body);

			return true;
		}
		async update(id: string, body: IUser): Promise<boolean> {
			await axios.put(`${userURL}/${id}?${token}`, body);

			return true;
		}
		async delete(id: string): Promise<boolean> {
			await axios.delete(`${userURL}/${id}?${token}`);
			return true;
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
		async create(body: IProduct): Promise<boolean> {
			await axios.post(`${productURL}?${token}`, body);

			return true;
		}
		async update(id: string, body: IProduct): Promise<boolean> {
			await axios.put(`${productURL}/${id}?${token}`, body);

			return true;
		}
		async delete(id: string): Promise<boolean> {
			await axios.delete(`${productURL}/${id}?${token}`);
			return true;
		}
	}
}

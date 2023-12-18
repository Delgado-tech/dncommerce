import axios from "axios";

export namespace DncommerceApiClient {
	const url = "https://dncommerce-api.vercel.app";
	const token = `token=${process.env.DNCOMMERCE_API_TOKEN}`;

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
		abstract getId(id: string): ObjectBody;
		abstract create(body: ObjectBody): void;
		abstract update(id: string, body: ObjectBody): void;
		abstract delete(id: string): void;
	}

	export class Users extends HTTPRequests {
		private static _instance: Users;

		public static Instance() {
			return this._instance || (this._instance = new this());
		}

		async get(): Promise<IUser[]> {
			throw new Error("Method not implemented.");
		}
		getId(id: string): IUser {
			throw new Error("Method not implemented.");
		}
		create(body: IUser): void {
			throw new Error("Method not implemented.");
		}
		update(id: string, body: IUser): void {
			throw new Error("Method not implemented.");
		}
		delete(id: string): void {
			throw new Error("Method not implemented.");
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
			} = await axios.get(`${url}/products?${token}`);
			return data;
		}
		getId(id: string): IProduct {
			throw new Error("Method not implemented.");
		}
		create(body: IProduct): void {
			throw new Error("Method not implemented.");
		}
		update(id: string, body: IProduct): void {
			throw new Error("Method not implemented.");
		}
		delete(id: string): void {
			throw new Error("Method not implemented.");
		}
	}
}

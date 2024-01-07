"use client";

import Image from "next/image";
import Input from "../Form/Input";
import RoundButton from "../Buttons/RoundButton";
import { useState } from "react";

import { useRouter } from "next/navigation";
import Loading from "../Loading";
import axios from "axios";

interface Props {}

interface IInvalidLogin {
	isInvalid: boolean;
	message: string;
}

export default function Login({}: Props) {
	const router = useRouter();

	const [invalidLogin, setInvalidLogin] = useState<IInvalidLogin>({
		isInvalid: false,
		message: "",
	});
	const [showPass, setShowPass] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false);

	const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const target = event.target as HTMLFormElement;
		const formData = new FormData(target);
		const { email, pass } = Object.fromEntries(formData.entries());

		setLoading(true);

		axios
			.post(`${window.location.protocol}//${window.location.host}/api/login`, {
				email,
				pass,
			})
			.then((res) => {
				if (res.data.success) {
					router.push("/panel");
					return;
				}
				setLoading(false);
				setInvalidLogin({ isInvalid: true, message: res.data.errorMessage });
			});
	};

	const showPassword = (
		event: React.MouseEvent<HTMLInputElement, MouseEvent>,
	) => {
		const target = event.target as HTMLInputElement;

		if (target.checked) {
			setShowPass(true);
			return;
		}

		setShowPass(false);
	};

	return (
		<section className="flex h-screen w-full items-center justify-center overflow-auto bg-zinc-200 tall:items-start">
			{loading && <Loading />}
			<main className="flex w-[clamp(500px,_25%,_800px)] flex-col items-center gap-12 overflow-auto rounded bg-white p-8 sm:h-screen sm:w-full">
				<section className="flex flex-col items-center gap-4">
					{/* Admin Panel Logo */}
					<div className="flex items-center gap-4">
						<figure>
							<Image alt={"logo"} src={"/svg/logo.svg"} width={30} height={30} />
						</figure>
						<h1 className="text-base font-medium text-sky-900">Admin Panel</h1>
					</div>

					<div className="flex flex-col items-center gap-2">
						<span className="text-2xl">Fazer Login</span>
						<p>Use sua conta da empresa</p>
					</div>
				</section>

				<form
					onSubmit={onSubmit}
					className="flex w-full flex-col gap-8 px-8 pb-12 sm:px-0"
				>
					<span className="h-4 self-center text-lg text-red-500">
						{invalidLogin.message}
					</span>
					<Input
						inputId={"email"}
						label={"E-mail"}
						required
						type="email"
						isInvalid={invalidLogin.isInvalid}
					/>
					<div className="flex flex-col gap-2">
						<Input
							inputId={"pass"}
							label={"Senha"}
							type={showPass ? "text" : "password"}
							isInvalid={invalidLogin.isInvalid}
							required
						/>
						<div className="flex items-center gap-2 text-zinc-600">
							<input
								id={"checkbox"}
								className="cursor-pointer"
								type="checkbox"
								onClick={showPassword}
							/>
							<label htmlFor="checkbox" className="cursor-pointer">
								Mostrar senha
							</label>
						</div>
					</div>
					<span className="self-end sm:absolute sm:bottom-8 sm:left-0 sm:flex sm:w-full sm:justify-center tall:relative tall:pt-2 tall:sm:bottom-0 tall:sm:pt-8">
						<span className="sm:w-[200px]">
							<RoundButton text="Avançar" type={"submit"} invertColors />
						</span>
					</span>
				</form>
			</main>
		</section>
	);
}

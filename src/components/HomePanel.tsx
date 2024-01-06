"use client";

interface ITextLink {
	title: string;
	url: string;
}

export default function HomePanel() {
	const links: ITextLink[] = [
		{
			title: "GitHub",
			url: "https://github.com/Delgado-tech/",
		},
		{
			title: "Repositório",
			url: "https://github.com/Delgado-tech/dncommerce/",
		},
		{
			title: "Linkedin",
			url: "https://www.linkedin.com/in/leonardo-delgado-1808891b7/",
		},
	];

	const developTools = [
		"Next (React)",
		"Tailwind",
		"Express",
		"Typescript",
		"MySQL",
		"Figma",
		"Vercel",
	];

	return (
		<section className="h-screen w-full bg-zinc-200">
			<main className="h-screen max-w-[1400px] divide-y-2 bg-zinc-50 p-16 text-zinc-800 sm:px-8 sm:py-16">
				<article className="flex flex-col gap-2 pb-4">
					<h2>
						Desenvolvido por: <b>Leonardo Delgado</b>
					</h2>
					<nav>
						<ul className="flex flex-col gap-2">
							{links.map((link, index) => (
								<li key={index}>
									<span>{link.title}</span>
									{" - "}
									<a
										href={link.url}
										className="break-words text-sky-600 transition-colors hover:text-sky-400"
										target="_blank"
									>
										{link.url}
									</a>
								</li>
							))}
						</ul>
					</nav>
				</article>
				<article className="flex flex-col gap-8 pt-4">
					<div>
						<h3 className="pb-4 font-bold">Resumo</h3>
						<p>
							Este projeto foi desenvolvido como um estudo de caso para aplicar meus
							conhecimentos na prática. Um banco de dados em <b>MySQL</b> foi criado, e
							uma API utilizando o <b>Express</b> foi desenvolvida para realizar o
							tratamento de dados, resultando no frontend que você está visualizando
							agora que utiliza do framework para React.js o <b>Next</b> e do framework
							de estilização <b>Tailwind</b>.
						</p>
					</div>
					<p>
						Importante ressaltar que os dados apresentados nas seções "<b>Produtos</b>
						" e "<b>Usuários</b>" são fictícios. Você está convidado a testar a
						interação do projeto, incluindo a inserção e exclusão de dados. No
						entanto, é estritamente <u>PROIBIDA</u> a inserção de informações reais,
						seja suas próprias ou de qualquer outra pessoa, uma vez que o projeto é
						público e não é possível assegurar que essas informações sejam protegidas.
					</p>
					<div className="flex flex-col gap-2">
						<h3>Ferramentas utilizadas:</h3>
						<ul className="grid grid-cols-[repeat(auto-fit,_minmax(150px,_1fr))] gap-4 sm:pb-16">
							{developTools.map((tool, index) => (
								<li
									key={index}
									className="flex items-center justify-center rounded bg-zinc-200 px-4 font-medium"
								>
									{tool}
								</li>
							))}
						</ul>
					</div>
				</article>
			</main>
		</section>
	);
}

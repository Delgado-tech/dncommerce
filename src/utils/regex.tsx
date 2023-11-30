export class RegexTemplate {
	static Numbers(value: string): string {
		value = value.replace(/\D/g, "");

		return value;
	}

	static Decimal(value: string): string {
		value = value.replace(/\D/g, "");
		value = value.replace(/^(\d+)(\d{2})$/, "$1.$2");
		return value;
	}

	static MoneyBrl(value: string): string {
		value = value.replace(/\D/g, "");
		value = value.replace(/^(\d+)(\d{2})$/, "$1.$2");
		value = value.length > 0 ? "R$ " + value : value;
		return value;
	}

	static Letters(value: string): string {
		value = value.replace(/[^A-z ]/g, "");
		value = value.replace("  ", " ");
		value = value.trimStart();
		return value;
	}

	static LettersAccent(value: string): string {
		value = value.replace(/[^A-záàâãéèêíïóôõöúçÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇ ]/g, "");
		value = value.replace("  ", " ");
		value = value.trimStart();
		return value;
	}

	static Cpf(value: string): string {
		value = value.substring(0, 14);
		value = value.replace(/\D/g, "");
		value = value.replace(/(\d{3})(\d)/, "$1.$2");
		value = value.replace(/(\d{3})(\d)/, "$1.$2");
		value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");

		return value;
	}

	static Cel(value: string): string {
		value = value.substring(0, 15);
		value = value.replace(/\D/g, "");
		value = value.replace(/(\d{2})(\d)/, "($1) $2");
		value = value.replace(/(\d{5})(\d)/, "$1-$2");

		return value;
	}
}

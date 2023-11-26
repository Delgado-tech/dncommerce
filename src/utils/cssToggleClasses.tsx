export interface IToggleClass {
	firstClass: string;
	secondClass?: string;
	/** @description if true causes the cssToggleClasses function to have the "toggleConditional" parameter active to perform class inversion */
	conditional?: boolean;
}

export function cssToggleClasses(
	htmlElement: HTMLElement,
	toggleClasses: IToggleClass[],
	toggleConditional: boolean = false,
): void {
	toggleClasses.map((tc) => {
		if (tc.conditional && !toggleConditional) return;

		tc.secondClass = tc.secondClass ?? "";

		if (htmlElement.classList.contains(tc.secondClass)) {
			[tc.firstClass, tc.secondClass] = [tc.secondClass, tc.firstClass];
		}

		htmlElement.classList.replace(tc.firstClass, tc.secondClass);
	});
}

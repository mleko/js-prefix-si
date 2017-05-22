import {merge} from "typescript-object-utils";

const standards = {
	si: {
		minPrefix: -8,
		prefixes: ["y", "z", "a", "f", "p", "n", "μ", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"],
		base: 1000
	},
	iec: {
		minPrefix: 0,
		prefixes: ["", "Ki", "Mi", "Gi", "Ti", "Pi", "Ei", "Zi", "Yi"],
		base: 1024
	},
	bs1852_R: {
		minPrefix: 0,
		prefixes: ["R", "K", "M", "G", "T"],
		base: 1000
	},
	bs1852_F: {
		minPrefix: -4,
		prefixes: ["p", "n", "μ", "m", "F"],
		base: 1000
	}
};

const defaults: PrefixOptions = {
	binary: false,
	round: 2,
	spacer: "",
	decimalMark: "."
};

export function prefix(value: number, unit?: string, options?: PrefixOptions): string {

	options = merge(defaults, options || {});
	let standard;
	if (options.bs1852) {
		if (unit === "R") {
			standard = standards.bs1852_R;
		} else if (unit === "F") {
			standard = standards.bs1852_F;
		} else {
			standard = standards.si;
		}
	} else {
		standard = options.binary ? standards.iec : standards.si;
	}

	let minPrefix = standard.minPrefix;
	let prefixes = standard.prefixes;
	let maxPrefix = prefixes.length + minPrefix - 1;
	let base = standard.base;

	let absValue = Math.abs(value);
	let exponent = absValue ? Math.floor(Math.log(absValue) / Math.log(base)) : 0;
	exponent = Math.min(maxPrefix, Math.max(minPrefix, exponent));

	let prefix = prefixes[exponent - minPrefix];
	let prefixBase = Math.pow(base, exponent);

	let val = value / prefixBase;
	let valString = String(val);

	unit = unit ? unit : "";

	if (options.fixed) {
		valString = val.toFixed(options.fixed);
	} else if (options.precision) {
		valString = val.toPrecision(options.precision);
	} else {
		let roundPow = Math.pow(10, +options.round);
		valString = String(Math.round(val * roundPow) / roundPow);
	}
	if (options.bs1852) {
		const parts = valString.split(".");
		if (parts.length == 2) {
			return (parts[0] == "0" ? "" : parts[0]) + (prefix ? prefix : (unit ? unit : options.decimalMark)) + (parts[1]);
		} else {
			return valString + (prefix ? prefix : unit) + (valString.length == 1 ? "0" : "");
		}
	}
	return valString.replace(".", options.decimalMark) + options.spacer + prefix + unit;
}

export interface PrefixOptions {
	binary?: boolean;
	fixed?: number;
	precision?: number;
	round?: number;
	spacer?: string;
	decimalMark?: string;
	bs1852?: boolean;
}

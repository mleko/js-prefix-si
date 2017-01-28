// @todo add engineering notation 3k3, 1V4, 4p2, http://mathforum.org/library/drmath/view/64553.html, BS 1852
export function prefix(value: number, unit?: string, options?: any): string {
	let merge = function (a, b) {
		let m = {};
		for (let key in a) {
			if (a.hasOwnProperty(key)) m[key] = a[key];
		}
		for (let key in b) {
			if (b.hasOwnProperty(key)) m[key] = b[key];
		}
		return m;
	};
	let defaults = {
		binary: false,
		fixed: undefined,
		precision: undefined,
		round: 2,
		spacer: ""
	};
	let standards = {
		si: {
			minPrefix: -8,
			prefixes: ["y", "z", "a", "f", "p", "n", "μ", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"],
			base: 1000
		},
		iec: {
			minPrefix: 0,
			prefixes: ["", "Ki", "Mi", "Gi", "Ti", "Pi", "Ei", "Zi", "Yi"],
			base: 1024
		}
	};

	options = merge(defaults, options || {});
	let standard = options.binary ? standards.iec : standards.si;

	let minPrefix = standard.minPrefix;
	let prefixes = standard.prefixes;
	let maxPrefix = prefixes.length + minPrefix - 1;
	let base = standard.base;

	let exponent = value ? Math.floor(Math.log(value) / Math.log(base)) : 0;
	exponent = Math.min(maxPrefix, Math.max(minPrefix, exponent));

	let prefix = prefixes[exponent - minPrefix];
	let prefixBase = Math.pow(base, exponent);

	let val = value / prefixBase;
	let valString = String(val);
	if (options.fixed) {
		valString = val.toFixed(options.fixed);
	} else if (options.precision) {
		valString = val.toPrecision(options.precision);
	} else {
		let roundPow = Math.pow(10, +options.round);
		valString = String(Math.round(val * roundPow) / roundPow);
	}
	return valString + options.spacer + prefix + (unit ? unit : "");
}

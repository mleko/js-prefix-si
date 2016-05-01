if (typeof module !== 'undefined') {
    module.exports = prefix;
}

// @todo add engineering notation 3k3, 1V4, 4p2, http://mathforum.org/library/drmath/view/64553.html
function prefix(value, unit, options) {
    var merge = function(a, b){
        var m = {};
        for (var key in a) { if(a.hasOwnProperty(key)) m[key] = a[key]; }
        for (var key in b) { if(b.hasOwnProperty(key)) m[key] = b[key]; }
        return m;
    }
    var defaults = {
        binary: false,
        fixed: undefined,
        precision: undefined,
        round: 2,
        spacer: ''
    };
    var standards = {
        si: {
            minPrefix: -8,
            prefixes: ['y', 'z', 'a', 'f', 'p', 'n', 'μ', 'm', '', 'k', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y'],
            base: 1000
        },
        iec: {
            minPrefix: 0,
            prefixes: ['', 'Ki', 'Mi', 'Gi', 'Ti', 'Pi', 'Ei', 'Zi', 'Yi'],
            base: 1024
        }
    }

    options = merge(defaults, options || {});
    var standard = options.binary ? standards.iec : standards.si;

	var minPrefix = standard.minPrefix;
	var prefixes = standard.prefixes;
	var maxPrefix = prefixes.length + minPrefix - 1;
	var base = standard.base;

	var exponent = value ? Math.floor(Math.log(value) / Math.log(base)) : 0;
	exponent = Math.min(maxPrefix, Math.max(minPrefix, exponent))

	var prefix = prefixes[exponent - minPrefix];
	var prefixBase = Math.pow(base, exponent);

	var val = value / prefixBase;
	if(options.fixed){
		val = val.toFixed(options.fixed);
	} else if (options.precision){
		val = val.toPrecision(options.precision);
	} else {
		var roundPow = Math.pow(10,+options.round);
		val = Math.round(val * roundPow) / roundPow;
	}
	return "" + val + options.spacer + prefix + (unit ? unit : "");
}

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
	options = merge(defaults, options || {});
	var minPrefix = -8;
	var prefixes = [
		'y', 'z', 'a', 'f', 'p', 'n', 'μ', 'm', '', 'k', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y'
	];
	var maxPrefix = prefixes.length + minPrefix - 1;
	var base = options.binary ? 1024 : 1000;

	var exponent = value ? Math.floor(Math.log(value) / Math.log(base)) : 0;
	exponent = Math.min(maxPrefix, Math.max(minPrefix, exponent))

	var prefixId = exponent - minPrefix;
	var prefix = prefixes[prefixId] + (options.binary && exponent ? "i" : "");

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

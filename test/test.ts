import * as test from "tape";
import {prefix} from "./../";

test("unit-less value, defaults", (t) => {
	t.equal(prefix(5), "5");
	t.equal(prefix(-5), "-5");
	t.equal(prefix(50), "50");
	t.equal(prefix(500), "500");
	t.equal(prefix(1), "1");
	t.equal(prefix(10), "10");
	t.equal(prefix(1000), "1k");
	t.equal(prefix(1020), "1.02k");
	t.equal(prefix(-1020), "-1.02k");
	t.equal(prefix(1020100), "1.02M");
	t.equal(prefix(0.1), "100m");
	t.equal(prefix(0.1111), "111.1m");
	t.equal(prefix(0.001), "1m");
	t.equal(prefix(0.0001), "100μ");
	t.equal(prefix(-0.0001), "-100μ");

	t.end();
});

test("Bytes, binary", (t) => {
	t.equal(prefix(5, "B", {binary: true}), "5B");
	t.equal(prefix(50, "B", {binary: true}), "50B");
	t.equal(prefix(-50, "B", {binary: true}), "-50B");

	t.equal(prefix(1024, "B", {binary: true}), "1KiB");
	t.equal(prefix(1.5 * 1024, "B", {binary: true}), "1.5KiB");
	t.equal(prefix(1024 * 1024, "B", {binary: true}), "1MiB");
	t.equal(prefix(2 * 1024 * 1024, "B", {binary: true}), "2MiB");
	t.equal(prefix(-2 * 1024 * 1024, "B", {binary: true}), "-2MiB");

	t.equal(prefix(1000, "B", {binary: true}), "1000B");
	t.equal(prefix(1.5 * 1000, "B", {binary: true}), "1.46KiB");
	t.equal(prefix(1000 * 1000, "B", {binary: true}), "976.56KiB");
	t.equal(prefix(2 * 1000 * 1000, "B", {binary: true}), "1.91MiB");
	t.equal(prefix(-2 * 1000 * 1000, "B", {binary: true}), "-1.91MiB");

	t.end();
});

test("Bytes, decimal", (t) => {
	t.equal(prefix(5, "B", {binary: false}), "5B");
	t.equal(prefix(50, "B", {binary: false}), "50B");

	t.equal(prefix(1024, "B", {binary: false}), "1.02kB");
	t.equal(prefix(1.5 * 1024, "B", {binary: false}), "1.54kB");
	t.equal(prefix(1024 * 1024, "B", {binary: false}), "1.05MB");
	t.equal(prefix(2 * 1024 * 1024, "B", {binary: false}), "2.1MB");
	t.equal(prefix(-2 * 1024 * 1024, "B", {binary: false}), "-2.1MB");

	t.equal(prefix(1000, "B", {binary: false}), "1kB");
	t.equal(prefix(1.5 * 1000, "B", {binary: false}), "1.5kB");
	t.equal(prefix(1000 * 1000, "B", {binary: false}), "1MB");
	t.equal(prefix(2 * 1000 * 1000, "B", {binary: false}), "2MB");
	t.equal(prefix(-2 * 1000 * 1000, "B", {binary: false}), "-2MB");

	t.end();
});

test("Spacer", (t) => {
	t.equal(prefix(1, "g", {spacer: " "}), "1 g");
	t.equal(prefix(1000, "g", {spacer: " "}), "1 kg");
	t.equal(prefix(1200, "g", {spacer: "-"}), "1.2-kg");

	t.end();
});

test("Fixed", (t) => {
	t.equal(prefix(1, "A", {fixed: 2}), "1.00A");
	t.equal(prefix(1.2, "A", {fixed: 2}), "1.20A");
	t.equal(prefix(1234.2, "A", {fixed: 2}), "1.23kA");
	t.equal(prefix(-1234.2, "A", {fixed: 2}), "-1.23kA");

	t.end();
});

test("Decimal mark", (t) => {
	t.equal(prefix(1, "g", {decimalMark: ","}), "1g");
	t.equal(prefix(1000, "g", {decimalMark: ","}), "1kg");
	t.equal(prefix(1200, "g", {decimalMark: ","}), "1,2kg");

	t.end();
});

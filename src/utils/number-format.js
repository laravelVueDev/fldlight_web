// TODO: turn into a mixin/cleanup
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NumberFormat

const baseFormats = {
  currency: new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }),

  currency2: new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  }),

  currencyMax2: new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }),

  integer: new Intl.NumberFormat("en-US", {
    style: "decimal",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }),

  integer2: new Intl.NumberFormat("en-US", {
    style: "decimal",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }),

  percent: new Intl.NumberFormat("en-US", {
    style: "percent"
  })
};

function ordinalNumber(val) {
  const num = Number(val)
    .toFixed(0)
    .substr(-1);
  let suffix = "th";

  if (num === 1) {
    suffix = "st";
  } else if (num === 2) {
    suffix = "nd";
  } else if (num === 3) {
    suffix = "rd";
  }

  return Number(val).toFixed(0) + suffix;
}

const magsShort = ["", "K", "M", "B", "T", "Q"];
const magsFull = [
  "",
  "thousand",
  "million",
  "billion",
  "trillion",
  "gazillion"
];

function magnitude(val, magStyle, baseFormat) {
  let formatted = "";

  const labels = magStyle === "full" ? magsFull : magsShort;

  // must be in the 1000s
  if (val >= 10 ** 5) {
    labels.some((mag, idx) => {
      if (idx > 0 && val < 10 ** (idx * 3)) {
        formatted = `${baseFormat.format(val / 10 ** ((idx - 1) * 3))} ${
          labels[idx - 1]
        }`;
        return true;
      }

      return false;
    });
  }

  if (!formatted) {
    // do you always want to rip off the fraction digits here?
    // I think yes because this are numbers < 100k
    formatted = baseFormat.format(Number(val).toFixed(0));
  }

  return formatted;
}

export default (val, style, magStyle) => {
  if (undefined === val || val === null || val === "") {
    return "--";
  }

  if (style === "ordinalNumber") {
    return ordinalNumber(val);
  }

  if (magStyle) {
    return magnitude(val, magStyle, baseFormats[style]);
  }

  if (style) {
    return baseFormats[style].format(val);
  } else {
    return val;
  }
};

// console.log(format("percent", 0.1245456, true));

// console.log(format("currency2", 0.12, true));
// console.log(format("currency2", 1.23, true));
// console.log(format("currency2", 12.34, true));
// console.log(format("currency2", 123.45, true));
// console.log(format("currency2", 1234.56, true));
// console.log(format("currency2", 12345.67, true));
// console.log(format("currency2", 123456.78, true));
// console.log(format("currency2", 1234567.89, true));
// console.log(format("currency2", 12345678.9, true));
// console.log(format("currency2", 123456789.01, true));
// console.log(format("currency2", 1234567890.12, true));
// console.log(format("currency2", 12345678901.23, true));
// console.log(format("currency2", 123456789012.34, true));
// console.log(format("currency2", 1234567890123.45, true));

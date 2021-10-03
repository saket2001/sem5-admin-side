import ns from "number-string";

export default function MoneyFormatter(value) {
  return ns.toMoney(value, {
    thousandSeparator: ",",
    lakhSeparator: ",",
    maxPrecision: 0,
    minPrecision: 0,
    symbol: "₹",
    symbolBehind: true,
    useParens: true,
  });
}

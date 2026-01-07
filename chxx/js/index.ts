const eurosES = Intl.NumberFormat("es", { style: "currency", currency: "EUR" });
const eurosESCode = Intl.NumberFormat("es", { style: "currency", currency: "EUR", currencyDisplay: "code" });
const eurosGB = Intl.NumberFormat("en", { style: "currency", currency: "GBP" });
const eurosGBNonGrouping = Intl.NumberFormat("en", { style: "currency", currency: "GBP", useGrouping: false, minimumIntegerDigits: 3 });
console.log(eurosES.format(10000));
console.log(eurosESCode.format(10000));
console.log(eurosGB.format(10000));
console.log(eurosGBNonGrouping.format(10000));

const hindi = Intl.NumberFormat("hi-IN-u-nu-deva").format;
const arabic = Intl.NumberFormat("ar", { useGrouping: false }).format;
console.log(hindi(123456789));
console.log(arabic(123456789));
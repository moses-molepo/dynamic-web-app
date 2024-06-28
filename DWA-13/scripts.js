/* eslint-disable linebreak-style */
/* eslint-disable no-else-return */
/* eslint-disable no-param-reassign */

const provinces = [
  'Western Cape',
  'Gauteng',
  'Northern Cape',
  'Eastern Cape',
  'KwaZulu-Natal',
  'Free State',
];

const names = [
  'Ashwin',
  'Sibongile',
  'Jan-Hendrik',
  'Sifso',
  'Shailen',
  'Frikkie',
];

provinces.forEach((province) => {
  console.log('province is:', province);
});

names.forEach((firstName) => {
  console.log('name is:', firstName);
});

names.forEach((name, index) => {
  console.log(`${name} (${provinces[index]})`);
});

const provincesUpperCase = provinces.map((province) => province.toUpperCase());
console.log(provincesUpperCase);

const characterCounts = names.map((name) => name.length);
console.log(characterCounts);

const containsS = names.map((name) => name.split('').some((char) => char === 'S'));
console.log(containsS);

const provinceMapping = names.reduce((result, name, index) => {
  result[name] = provinces[index];
  return result;
}, {});
console.log(provinceMapping);

// Challenge 2

/**
 * Perform various operations on the products array and log the results.
 *
 * @returns {Object} An object containing the results of the operations.
 */
console.log(
  (() => {
    const products = [
      { product: 'banana', price: '2' },
      { product: 'mango', price: 6 },
      { product: 'potato', price: ' ' },
      { product: 'avocado', price: '8' },
      { product: 'coffee', price: 10 },
      { product: 'tea', price: '' },
    ];

    const filteredProducts = products
      .filter((item) => item.price !== '' && !Number.isNaN(item.price))
      .map((item) => ({ ...item, price: Number(item.price) }));

    const combinedPrice = filteredProducts.reduce((total, product) => total + product.price, 0);

    const productNames = filteredProducts.reduce((result, product, index, array) => {
      if (index === array.length - 1) {
        return `${result} and ${product.product}`;
      } else {
        return `${result}, ${product.product}`;
      }
    }, '');

    const priceComparator = (a, b) => a.price - b.price;

    const highestAndLowest = filteredProducts
      .slice()
      .sort(priceComparator)
      .reduce((result, product, index, array) => {
        if (index === 0) {
          result.lowest = product;
        }
        if (index === array.length - 1) {
          result.highest = product;
        }
        return result;
      }, {});

    const recreatedProducts = filteredProducts.map((item) =>
      Object.entries(item).reduce((acc, [key, value]) => {
        if (key === 'product') {
          acc.name = value;
        } else if (key === 'price') {
          acc.cost = value;
        } else {
          acc[key] = value;
        }
        return acc;
      }, {}));

    return {
      'Combined Price': combinedPrice,
      'Product Names': productNames,
      'Highest and Lowest': `Highest: ${highestAndLowest.highest.product}. Lowest: ${highestAndLowest.lowest.product}`,
      'Recreated Products': recreatedProducts,
    };
  })(),
);

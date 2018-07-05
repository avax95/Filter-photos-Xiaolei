const faker = require('faker');
const fs = require('fs');

const roomTypes = ['Entire House', 'Entire Apartment', 'Entire Guest Suite', 'Entire Guest House', 'Private Room', 'Shared Room'];
const trueFalse = ['T', 'F'];
const total = 5000000;

let roomname;
let price;
let numberOfBedrooms;
let rating;
let numberOfReviews;
let roomType;
let instantBook;
let process = 0;
let desStorage = [];


const mock = () => {
  for (let i = 1; i <= total; i++) {
    roomname = faker.lorem.word();
    price = faker.random.number({ min: 100, max: 600 });
    numberOfBedrooms = faker.random.number({ min: 1, max: 5 });
    rating = faker.random.number({ min: 2, max: 5 });
    numberOfReviews = faker.random.number({ min: 20, max: 500 });
    roomType = roomTypes[faker.random.number({ min: 0, max: 5 })];
    instantBook = trueFalse[faker.random.number({ min: 0, max: 1 })];

    const descriptions = `${roomname},${price},${numberOfBedrooms},${rating},${numberOfReviews},${roomType},${instantBook}`;
    desStorage.push(descriptions);

    if (i % 500000 === 0) {
      fs.appendFileSync('./descriptions.csv', `${desStorage.join('\n')}\n`);
      desStorage = [];
    }

    if (i % 100000 === 0) {
      process += 1;
      console.log(process);
    }
  }
};

console.time('Seeding---------');
mock();
console.timeEnd('Seeding---------');

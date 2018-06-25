const faker = require('faker');
const fs = require('fs');

const photos = ['https://pix10.agoda.net/hotelImages/115/1157073/1157073_16062412150044053329.jpg?s=1024x768', 'https://media-cdn.tripadvisor.com/media/photo-s/0f/72/3e/04/the-grand-hotel-excelsior.jpg', 'https://www.theplancollection.com/Upload/Designers/161/1049/Plan1611049Image_15_5_2013_713_37_891_593.jpg', 'https://www.colonialmc.com/wp-content/uploads/2018/01/fdsafdsafdsafdsafdsafdsaf.jpg', 'https://cdn.freshome.com/wp-content/uploads/2013/05/House-Front-View.jpg', 'https://kafgw.com/wp-content/uploads/kerala-home-design-new_337540.jpg'];
const roomTypes = ['Entire House', 'Entire Apartment', 'Entire Guest Suite', 'Entire Guest House', 'Private Room', 'Shared Room'];
const trueFalse = ['T', 'F'];
const total = 10000000;

let images = [];
let number;
let url;
let roomname;
let price;
let numberOfBedrooms;
let rating;
let numberOfReviews;
let roomType;
let instantBook;
let process = 0;
let storage = [];

const mock = () => {
  for (let i = 1; i <= total; i++) {
    roomname = faker.lorem.word();
    price = faker.random.number({ min: 100, max: 600 });
    numberOfBedrooms = faker.random.number({ min: 1, max: 5 });
    rating = faker.random.number({ min: 2, max: 5 });
    numberOfReviews = faker.random.number({ min: 20, max: 500 });
    roomType = roomTypes[faker.random.number({ min: 0, max: 5 })];
    instantBook = trueFalse[faker.random.number({ min: 0, max: 1 })];

    for (let k = 1; k < 7; k++) {
      number = faker.random.number({ min: 0, max: 5 });
      url = photos[number];
      images.push(url);
    }

    const descriptions = `${i},${i},${roomname},${price},${numberOfBedrooms},${rating},${numberOfReviews},${roomType},${instantBook},"${images.join(',')}"`;
    storage.push(descriptions);
    images = [];

    if (i % 50000 === 0) {
      fs.appendFileSync('./mongoDescriptions.txt', `${storage.join('\n')}\n`);
      storage = [];
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

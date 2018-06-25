const fs = require('fs');
const faker = require('faker');

const photos = ['https://pix10.agoda.net/hotelImages/115/1157073/1157073_16062412150044053329.jpg?s=1024x768', 'https://media-cdn.tripadvisor.com/media/photo-s/0f/72/3e/04/the-grand-hotel-excelsior.jpg', 'https://www.theplancollection.com/Upload/Designers/161/1049/Plan1611049Image_15_5_2013_713_37_891_593.jpg', 'https://www.colonialmc.com/wp-content/uploads/2018/01/fdsafdsafdsafdsafdsafdsaf.jpg', 'https://cdn.freshome.com/wp-content/uploads/2013/05/House-Front-View.jpg', 'https://kafgw.com/wp-content/uploads/kerala-home-design-new_337540.jpg'];
let number;

const mock = () => {
  let url;
  let process = 0;
  let imgStorage = [];
  for (let i = 1; i <= 10000000; i++) {
    for (let k = 1; k < 7; k++) {
      number = faker.random.number({ min: 0, max: 5 });
      url = photos[number];
      const images = `${url},${i}`;
      imgStorage.push(images);
      if (i % 100000 === 0) {
        fs.appendFileSync('./images.csv', `${imgStorage.join('\n')}\n`);
        imgStorage = [];
      }
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

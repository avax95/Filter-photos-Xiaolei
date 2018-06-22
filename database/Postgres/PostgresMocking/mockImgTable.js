const fs = require('fs');

const mock = () => {
  let url;
  let process = 0;
  let imgStorage = [];
  for (let i = 1; i <= 10000000; i++) {
    for (let k = 1; k < 7; k++) {
      url = `https://loremflickr.com/1024/512?random=${k}`;
      const images = `${i},${url}`;
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

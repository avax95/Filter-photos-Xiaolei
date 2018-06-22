const faker = require('faker');
const fs = require('fs');

const mock = () => {
  let roomID;
  let process = 0;
  let roomStorage = [];
  for (let i = 1; i <= 10000000; i++) {
    for (let j = 1; j < 61; j++) {
      roomID = faker.random.number({ min: 1, max: 10000000 });
      const room = `${i},${roomID}`;
      roomStorage.push(room);
      if (i % 100000 === 0) {
        fs.appendFileSync('./room.csv', `${roomStorage.join('\n')}\n`);
        roomStorage = [];
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

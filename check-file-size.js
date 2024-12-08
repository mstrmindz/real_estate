const fs = require('fs');

const filePath = 'assets/images/house.jpg';

fs.stat(filePath, (err, stats) => {
  if (err) {
    console.error(`Error reading file: ${err.message}`);
    return;
  }

  console.log(`File size: ${stats.size} bytes`);
});

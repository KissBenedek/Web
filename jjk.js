const fs = require('fs')

fs.writeFile('jjk.txt', 'I love you, baby\nUtai tsuzuke mashou\nDonna shiremono mo\nDonna yosomono mo\nKokoro moeru\nIkkyoshu ittousoku\nHashiridashitara ankontorooru\nYou are my special', () => {
    console.log('file was written');
  });

fs.readFile('jjk.txt', (err, data) => {
    if (err) {
      console.log(err);
    }  
    console.log(data.toString());
  });
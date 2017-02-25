const sharp = require('sharp');

/*
let promises = [
    sharp('sprite.png').resize(450, 400),
    sharp('sprite.png').overlayWith('test/fixtures/black-20x20.png', {
        top: 10,
        left: 20
    })
];

Promise.all(promises).then(function(data) {
    data.toFile('222.png', function (error) {
       error && console.log('SAVE error: ', error);
    });
});

sharp('sprite.png').resize(450, 400)
    .overlayWith('test/fixtures/black-20x20.png', {
        top: 10,
        left: 20
    })
    .toFile(function(data) {
        console.log('SAVE: ', data);
    });

// works
sharp('sprite.png').resize(450, 400)
    .overlayWith('test/fixtures/black-20x20.png', { top: 10, left: 20 })
    .toFile('output.png', function (error) {
       sharp('output.png')
           .overlayWith('test/fixtures/green-10x10.png', { top: 100, left: 100 })
           .toFile('output2.png', function (error) {
              error && console.log('SAVE error: ', error);
           });
    });
*/

// does not
const base = sharp('sprite.png').resize(450, 400).raw().toBuffer();

const options = {
    raw: {
        width: 20,
        height: 20,
        channels: 4
    }
};

const composite = [
    'test/fixtures/black-20x20.png',
    'test/fixtures/green-10x10.png'
].reduce(function(input, overlay) {
    return input.then(function(data) {
        return sharp(data, options).overlayWith(overlay).raw().toBuffer();
    });
}, base);

composite.then(function(data) {
    var fs = require('fs');
    fs.writeFile('sprited.png', data);
});

let Product = require('../models/product');

let mongoose = require('mongoose');

var mongoUri = 'mongodb+srv://mohitlal:Ms0ST9vavfhZ2mJ1@cluster0-p3frq.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(mongoUri, { useNewUrlParser: true });

let products = [
    new Product({
        imagePath: "https://bit.ly/2KINjqN",
        title: "Avengers: Infinity War",
        description: "Awesome movie",
        price: 20
    }),
    new Product({
        imagePath: "http://tiny.cc/pp26az",
        title: "Star Wars: Rogue One",
        description: "Nice",
        price: 15
    }),
    new Product({
        imagePath: "http://tiny.cc/xs26az",
        title: "Blade Runner",
        description: "Superb",
        price: 15
    }),
];

let count = 0;
for (let i = 0; i < products.length; ++i) {
    products[i].save(function (err, result) {
        ++count;
        if (count === products.length) {
            exit();
        }
    })
}

function exit() {
    mongoose.disconnect();
}
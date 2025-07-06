const mongoose = require('mongoose');
const Component = require('../backend/models/Component');

const components = [
    {
        type: 'CPU',
        name: 'Intel Core i7-12700K',
        manufacturer: 'Intel',
        specs: { cores: 12, threads: 20, speed: '3.6GHz' },
        price: 399.99,
        imageUrl: '/images/cpu-intel.jpg'
    },
];

async function seedDB() {
    await mongoose.connect('mongodb://localhost:27017/proyecto-final');
    await Component.deleteMany({});
    await Component.insertMany(components);
    console.log('Database seeded!');
    mongoose.connection.close();
}

seedDB();
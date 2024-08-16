import faker from 'https://cdnjs.cloudflare.com/ajax/libs/Faker/3.1.0/faker.min.js';

export const userAdmGenerate = () => ({
    "nome": faker.name.firstName(),
    "email": faker.internet.email(),
    "password": "senha123",
    "administrador": "true"
});
export const userGenerate = () => ({
    "nome": faker.name.firstName(),
    "email": faker.internet.email(),
    "password": "senha123",
    "administrador": "false"
});
export const userRandomGenerate = () => ({
    "nome": faker.name.findName(),
    "email": faker.internet.email(),
    "password": faker.internet.password(10, true), 
    "administrador": faker.random.boolean().toString() 
});
export const productGenerate = () => ({
    "nome": faker.commerce.productName(),
    "preco": faker.commerce.price(10, 1000, 2, 'R$ '), 
    "descricao": faker.lorem.sentence(),  
    "quantidade": faker.random.number({ min: 1, max: 100 })
});
/* eslint-disable no-console */
const faker = require('faker');
const boom = require('@hapi/boom');
/* const { pool } = require('../libs/postgres.pool'); */
const sequelize = require('../libs/sequelize');

class ProductsService {

    constructor(){
        this.products = []; 
        this.generate();
    }

    generate(){
        let limit = 100;
    
        for (let index = 0; index < limit; index++) {
            this.products.push({
                id: faker.datatype.uuid(),
                name: faker.commerce.productName(),
                price: parseInt( faker.commerce.price(), 10),
                image: faker.image.imageUrl(),
                isBlock: faker.datatype.boolean(),
            })
        }
    }

    async find(){
        const query = 'SELECT * FROM tasks';
        const [data] = await sequelize.query(query);
        return data;

        /* return new Promise((resolve) => {
            setTimeout(() => {
                resolve(this.products);
            }, 1000);
        }) */
        
    }

    async findOne(id){
        const product = this.products.find(item => item.id === id);
        if (!product) {
            throw boom.notFound('Product not found');
        }

        if (product.isBlock) {
            throw boom.conflict('Product is block');
        }

        return product;
    }

    async create(data){
        const newProduct = {
            id: faker.datatype.uuid(),
            ...data
        }
        this.products.push(newProduct);
        return newProduct;
    }

    async update(id, changes){
        const index = this.products.findIndex(item => item.id === id);
        if (index === -1) {
            throw boom.notFound('Product not found');
        }
        const product = this.products[index];
        this.products[index] = {
            ...product,
            ...changes,
        };
        return this.products[index];

    }

    async delete(id){
        const index = this.products.findIndex(item => item.id === id);
        if (index === -1) {
            throw boom.notFound('Product not found');
        }
        this.products.splice(index, 1);
        return { id }
    }

}

module.exports = ProductsService;
/* eslint-disable no-console */
const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');

class ProductsService {

    constructor(){
        /* this.generate(); */
    }

    /* generate(){
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
    } */

    async find(){
        const products = await models.Product.findAll({
            include: ['category']
        });
        return products;
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
        const newProduct = await models.Product.create(data);
        return newProduct;
    }

    async update(id, changes) {
        return {
          id,
          changes,
        };
    }
    
    async delete(id) {
    return { id };
    }

}

module.exports = ProductsService;
/* eslint-disable no-console */
const faker = require('faker');
/* const { getConnection } = require('../libs/postgres'); */
/* const { pool } = require('../libs/postgres.pool'); */
const { models } = require('../libs/sequelize');
const boom = require('@hapi/boom');


class UsersServices{
    constructor(){
        this.users = []
        this.generate();
    }

    generate(){
        let limit = 100;
    
        for (let index = 0; index < limit; index++) {
            this.users.push({
                id: faker.datatype.uuid(),
                email: faker.internet.email(),
                name: faker.name.firstName(),
                lastName: faker.name.lastName(),
                phone: faker.phone.phoneNumber()
            })
        }
    }

    async find(){
        const rta = await models.User.findAll();
        return rta;
    }

    async findOne(id){
        const user = await models.User.findByPk(id);
        if (!user) {
           throw boom.notFound('User not found'); 
        }
        return user;
    }

    async create(data){
        const newUser = await models.User.create(data);
        return newUser;
    }

    async update(id, changes) {
        const user = await this.findOne(id);
        const rta = await user.update(changes);
        return rta;
    }

    async delete(id){
        const user = await models.User.findByPk(id);
        await user.destroy();
        return { id };
    }


}

module.exports = UsersServices; 
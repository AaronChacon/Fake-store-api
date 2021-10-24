/* eslint-disable no-console */
const faker = require('faker');
/* const { getConnection } = require('../libs/postgres'); */
const { pool } = require('../libs/postgres.pool');



class UsersServices{
    constructor(){
        this.users = []
        this.generate();
        this.pool = pool;
        this.pool.on('error', (err) => console.log(err));
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
        const query = 'SELECT * FROM tasks'
        const rta = await this.pool.query(query);
        return rta.rows;
        /* const client = await getConnection()
        const rta = await client.query('SELECT * FROM tasks');
        return rta.rows; */
    }

    findOne(id){
        return this.users.find(item => item.id === id);
    }

    create(data){
        const newUser = {
            id: faker.datatype.uuid(),
            ...data
        }
        this.users.push(newUser);
        return newUser;
    }

    update(id, changes){
        const index = this.users.findIndex(item => item.id === id);
        if (index === -1) {
            throw new Error('User not found');
        }
        const user = this.users[index];
        this.users[index] = {
            ...user,
            ...changes,
        };
        return this.users[index];

    }

    delete(id){
        const index = this.users.findIndex(item => item.id === id);
        if (index === -1) {
            throw new Error('User not found');
        }
        this.users.splice(index, 1);
        return { id }
    }


}

module.exports = UsersServices; 
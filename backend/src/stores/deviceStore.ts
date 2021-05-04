import { IDevice } from '../interfaces/interfaces';
const _ = require('lodash');
// const moment = require('moment');
var config = require('../../../backend/knexfile');
var knex = require('knex')(config[process.env.NODE_ENV]);


export default class DeviceStore {
    constructor() { }

    async create(device: IDevice) {
        return await knex('devices').insert(device).returning('*');
    }

    async update(mac_address: string, current_name: string) {
        return await knex('devices').where({ mac_address }).update({ current_name });
    }

    async delete(id: number) {
        return await knex('devices').where({ id }).del();
    }

    async findById(id: number) {
        return await knex('devices').select('*').where({ id });
    }

    async getAllElements() {
        return await knex('devices').select('*');
    }

    async findByMac(mac_address: string) {
        return await knex('devices').where({ mac_address }).select('*');
    }
}
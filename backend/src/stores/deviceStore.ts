import { IDevice } from '../interfaces/interfaces';
const _ = require('lodash');
// const moment = require('moment');
var config = require('../../../backend/knexfile');
var knex = require('knex')(config[process.env.NODE_ENV]);


export default class DeviceStore {
    constructor() { }

    create(device: IDevice) {
        return knex('devices').insert(device).returning('*');
    }

    update(mac_address: string, current_name: string) {
        return knex('devices').where({ mac_address }).update({ current_name });
    }

    updateIP(mac_address: string, ip: string) {
        return knex('devices').where({ mac_address }).update({ ip, is_active: true });
    }

    batchDisable(ids: number[]) {
        return knex('devices').whereIn("device_id", ids).update({ is_active: true })
    }

    delete(id: number) {
        return knex('devices').where({ id }).del();
    }

    batchDelete(ids: number[]) {
        return knex('devices').whereIn("device_id", ids).del();
    }

    findById(id: number): any {
        return knex('devices').select('*').where({ id });
    }

    getAllElements(show_not_active: boolean) {
        if(show_not_active)
            return knex('devices').select('*');
        else
            return knex('devices').select('*').where({ is_active: true });
    }

    findByMac(mac_address: string) {
        return knex('devices').where({ mac_address }).select('*');
    }
}
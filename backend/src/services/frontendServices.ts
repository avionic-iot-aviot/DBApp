const arp1 = require('arp-a');
const cfg = require('config');
const equal = require('deep-equal');
const fs = require('fs');
import { Utilities } from '../shared/utilities';
import _ = require('lodash');
import { random } from 'lodash';
import { ILeases, IDevice } from "../interfaces/interfaces";

import TenantStore from '../stores/tenantStore';
const tenantStore = new TenantStore();

import DeviceStore from '../stores/deviceStore';
import { raw } from 'express';
const deviceStore = new DeviceStore();

export default class FrontendServices {

    // async GetAllElements() {
    //     let rowdata = await deviceStore.getAllElements();
    //     await this.SendPostAllElements(rowdata);
    // }

    // async SendPostAllElements(data: any) {
    //     let request_data = {
    //         url: `http://${cfg.general.ipFrontend}:5000/frontend/allElements`,
    //         method: 'POST',
    //         body: {
    //             params: {
    //                 elements: data
    //             }
    //         },
    //         json: true
    //     };
    //     await Utilities.request(request_data);
    //     console.log("DnsService - SendPostResponse: Post send! " + `(http://${cfg.general.ipFrontend}:5000/frontend/allElements)`)
    // }


    async NewElements(data: any) {

        try {


            let temp: IDevice;
            let rowdata = await deviceStore.findByMac(data.Mac);
            temp = { device_id: rowdata[0].device_id, mac_address: rowdata[0].mac_address, default_name: rowdata[0].default_name, current_name: rowdata[0].current_name, is_drone: rowdata[0].is_drone, is_static: rowdata[0].is_static, created_at: rowdata[0].created_at, updated_at: rowdata[0].updated_at }
            if (data.Mac == temp.mac_address) {
                console.log("Dispositivo già presente, Aggiorno l'hostname")
                await deviceStore.update(data.Mac, data.NewHostName)
                await this.SendNewRolesAtDnsServerApp(data.Mac, data.NewHostName)
                console.log("hostname aggiornato")
            }
            else {
                console.log("FrontendServices: Dispositivo non Trovato, controlla il Mac Address")
                return "Dispositivo non Trovato, controlla il Mac Address"
                // console.log("Il Dispositivo ha un nuovo indirizzo ip, prendo il vecchio hostname e lo metto in quello nuovo")
                // await this.UpdateIpDevice(temp, leases.ip)
            }
        } catch (error) {
            console.log("FrontendServices: Dispositivo non Trovato, controlla il Mac Address")
            return "Dispositivo non Trovato, controlla il Mac Address"
        }
    }

    async SendNewRolesAtDnsServerApp(mac: string, hostName: string) {
        let request_data = {
            url: `http://${cfg.general.ipDnsServerApp}:${cfg.general.portDnsServerApp}/host/refresh`,
            method: 'POST',
            body: {
                params: {
                    Mac: mac,
                    HostName: hostName
                }
            },
            json: true
        };
        await Utilities.request(request_data);
        await console.log("FrontendServices - SendNewRolesAtDnsServerApp: Post send! " + `(http://${cfg.general.ipDnsServerApp}:${cfg.general.portDnsServerApp}/host/refresh)`)
    }



}
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

    async renameDevice(data: any) {
        try {

            let rowdata = await deviceStore.findByMac(data.mac_address);
            if (rowdata.length > 0) {
                if(!_.endsWith(data.current_name, `-${data.mac_address.replace(/:/g, "").toLowerCase()}`))
                    data.current_name = `${data.current_name}-${data.mac_address.replace(/:/g, "").toLowerCase()}`;
                console.log("Dispositivo già presente, Aggiorno l'hostname")
                await deviceStore.update(data.mac_address, data.current_name)
                await this.SendNewRolesAtDnsServerApp(data.mac_address, data.current_name)
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
        console.log("FrontendServices - SendNewRolesAtDnsServerApp: Post send! " + `(http://${cfg.general.ipDnsServerApp}:${cfg.general.portDnsServerApp}/host/refresh)`)
    }



}
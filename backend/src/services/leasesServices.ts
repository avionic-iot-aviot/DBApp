const arp1 = require('arp-a');
const cfg = require('config');
const equal = require('deep-equal');
const fs = require('fs');
import { Utilities } from '../shared/utilities';
import _ = require('lodash');
import { ILeases, IDevice } from "../interfaces/interfaces";

import TenantStore from '../stores/tenantStore';
const tenantStore = new TenantStore();

import DeviceStore from '../stores/deviceStore';
import FrontendServices from './frontendServices';
const deviceStore = new DeviceStore();
const frontendServices = new FrontendServices();

export default class LeasesServices {

    async NewLeasesReceiver(data: any) {
        //Utilities.log('leasesServices received from ' + data.TenantId + ' leases: '+ this.GetLeasesFromRawData(data.leases))
        //console.log('leasesServices received from ' + data.TenantId + ' leases: '+ this.GetLeasesFromRawData(data.leases))


        //console.log('Ok Esiste il tenent');
        const leases: ILeases[] = await this.RawDataToArrayLeases(data.leases)
        const leases_mac = _.map(leases, (lease: any) => lease.mac);
        const all_connected_devices: IDevice[] = await deviceStore.getAllElements(false);

        // We delete from devices all the devices that don't figure in the leases.
        const ids_to_delete: number[] = _.map(
            _.filter(all_connected_devices, (device: IDevice) => !_.includes(leases_mac, device.mac_address)), (device: IDevice) => device.device_id as number
        );
        //const result_delete = await deviceStore.batchDelete(ids_to_delete);
        const result_disable = await deviceStore.batchDisable(ids_to_delete);

        for (let i = 0; i < leases.length; i++) {
            if (await this.ExistsDevices(leases[i]) == 0) {
                try{
                    console.log("Device " + leases[i].host + " doesn't exist")
                    const result = await this.InsertDevice(leases[i]);
                    console.log("Create device query: ", result);
                    await frontendServices.SendNewRolesAtDnsServerApp(leases[i].mac, leases[i].host);
                    console.log("Inserted a new device")
                } catch(error) {
                    console.log("Error InsertDevice: ", error);
                }
            } else {
                console.log("Device " + leases[i].host + " already exists");
                const result = await this.UpdateDevice(leases[i]);
                if(result) {
                    const devices: IDevice[] = await deviceStore.findByMac(leases[i].mac);
                    if(devices.length > 0) {
                        await frontendServices.SendNewRolesAtDnsServerApp(devices[0].mac_address, devices[0].current_name);
                    }
                }
                //this.CheckMacDevices(leases[i])
            }
        }
        return { "data": leases, "state": "success" };
    }

    async RawDataToArrayLeases(raw: any) {
        let temp: ILeases[] = raw;
        return temp;
    }

    async ExistsDevices(leases: ILeases) {
        const device = await deviceStore.findByMac(leases.mac);
        if (device) {
            return device;
        } else {
            return 0
        }
    }

    async InsertDevice(leases: ILeases) {
        let temp: IDevice;
        temp = { device_id: null, mac_address: leases.mac, default_name: leases.host, current_name: !leases.isADevice ? leases.host :`${leases.host}-${leases.mac.replace(/:/g, "").toLowerCase()}`, is_static: leases.isStatic, is_device: leases.isADevice,  is_drone: leases.isADevice, ip: leases.ip, is_active: leases.isActive, copter_id: `${leases.isADevice ? "gw_" : ""}${leases.copterID.replace(/:/g, "").toLowerCase()}`};
        await deviceStore.create(temp);
    }

    async UpdateDevice(lease: ILeases) {
        try {
            let result = await deviceStore.updateDevice(lease);
            console.log("Device " + lease.host + " has been updated.");
            return result;
        } catch(error) {
            console.log("Device " + lease.host + " couldn't be updated.");
            return undefined;
        }
    }

    async refreshCopterIDs(mac_addresses: any) {
        for(let mac in mac_addresses) {
            if(mac_addresses[mac].length > 1) {
                for(let ip of mac_addresses[mac]){
                    try {
                        await deviceStore.updateCopterId(ip, `gw_${mac.replace(/:/g, "").toLowerCase()}`);
                    } catch(error) {
                        console.log("refreshCopterIDs ERROR", mac, error);
                    }
                }
            }
        }
        return mac_addresses;
    }
}
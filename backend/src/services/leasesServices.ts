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
                console.log("Device " + leases[i].host + " doesn't exist")
                const result = await this.InsertDevice(leases[i]);
                console.log("Create device query: ", result);
                await frontendServices.SendNewRolesAtDnsServerApp(leases[i].mac, leases[i].host);
                console.log("Inserted a new device")
            } else {
                console.log("Device " + leases[i].host + " already exists");
                await this.UpdateDevice(leases[i]);
                //console.log ( await deviceStore.findByMac(leases[i].mac) )
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
        temp = { device_id: null, mac_address: leases.mac, default_name: leases.host, current_name: leases.host, is_static: leases.isStatic, is_drone: leases.isADrone, ip: leases.ip, is_active: leases.isActive };
        await deviceStore.create(temp);
    }

    async UpdateDevice(lease: ILeases) {
        try {
            let result = await deviceStore.updateDevice(lease);
            console.log("Device " + lease.host + " has been updated.");
        } catch(error) {
            console.log("Device " + lease.host + " couldn't be updated.");
        }
    }

    // async UpdateIpDevice(dev: IDevice, newip: string) {
    //     let temp: IDevice
    //     temp={Device_id: 0, Mac: leases.mac, Default_Name: leases.host, Current_Name: "", Created_at: "---", Updated_at: "---"}
    //     temp={Device_id: 0, Tenant_id: dev.Device_id, Nome: dev.Nome, Ip: newip, Mac: dev.Mac}
    //     await deviceStore.update(temp)
    // }

    // async CheckMacDevices(leases: ILeases) {

    //     let temp: IDevice
    //     let rowdata = await deviceStore.findByMac(leases.mac)
    //     temp={Device_id: rowdata[0].Device_id, Mac: rowdata[0].Mac, Default_Name: rowdata[0].Default_Name, Current_Name: rowdata[0].Current_Name, Created_at: rowdata[0].Created_at, Updated_at:rowdata[0].Updated_at}
    //     // temp = { Device_id: rowdata[0].Device_id , Tenant_id: rowdata[0].Tenant_id , Nome: rowdata[0].Nome , Ip: rowdata[0].Ip, Mac: rowdata[0].Mac}
    //     if (leases. == temp.Ip){
    //         console.log("Dispositivo già presente, passo oltre")
    //     }
    //     else{
    //         console.log("Il Dispositivo ha un nuovo indirizzo ip, prendo il vecchio hostname e lo metto in quello nuovo")
    //         await this.UpdateIpDevice(temp,leases.ip)
    //     }
    // }




}
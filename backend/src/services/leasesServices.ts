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
const deviceStore = new DeviceStore();

export default class LeasesServices {

    async NewLeasesReceiver(data: any) {
        //Utilities.log('leasesServices received from ' + data.TenantId + ' leases: '+ this.GetLeasesFromRawData(data.leases))
        //console.log('leasesServices received from ' + data.TenantId + ' leases: '+ this.GetLeasesFromRawData(data.leases))


            //console.log('Ok Esiste il tenent');
            let leases: ILeases[] = await this.RawDataToArrayLeases(data.leases)

            for (let i = 0; i < leases.length; i++) {
                if ( await this.ExistsDevices(leases[i]) == 0 ){
                        console.log ("Device " + leases[i].host + " doesn't exist")
                        await this.InsertDevice(leases[i])
                        console.log("Inserted a new device")
                    }else{
                        console.log ("Device " + leases[i].host + " already exists")
                        //console.log ( await deviceStore.findByMac(leases[i].mac) )
                        //this.CheckMacDevices(leases[i])
                    }

                }


    }

    async RawDataToArrayLeases(raw: any) {
        let temp: ILeases[] = raw
        return temp
    }

    async ExistsDevices(leases: ILeases) {
        if (await deviceStore.findByMac(leases.mac)) {
            return await deviceStore.findByMac(leases.mac)
        } else {
            return 0
        }
    }

    async InsertDevice(leases: ILeases) {
        let temp: IDevice
        temp={device_id: null, mac_address: leases.mac, default_name: leases.host, current_name: leases.host};
        await deviceStore.create(temp);
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
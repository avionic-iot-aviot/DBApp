const config = require('config');
import * as express from 'express';
const _ = require('lodash');
const router = express.Router();
import * as HttpStatus from 'http-status-codes';
const delay = require('delay');

import { Utilities } from '../shared/utilities';
import FrontendService from '../services/frontendServices';
const frontendService = new FrontendService();


import DeviceStore from '../stores/deviceStore';
const deviceStore = new DeviceStore();

var cors = require('cors');
router.use(cors());
router.options('*', cors());

router.get('/getAllDevices', async (req, res) => {
    //const body = req.body;
    var ip = req.connection.remoteAddress.split(":")[((req.connection.remoteAddress.split(":")).length)-1]
    try {
        //const params = body && body.params ? body.params : null;
        console.log("frontendRoutes received("+ip+") ");
        Utilities.log("frontendRoutes received("+ip+") ");
        
        //frontendService.GetAllElements();
        let rowdata = await deviceStore.getAllElements();
        res.status(HttpStatus.OK).send(rowdata);
    } catch (error) {
        res.status(HttpStatus.OK).send(error);
    }
});

router.post('/configureDevice', async (req, res) => {
    const body = req.body;
    var ip = req.connection.remoteAddress.split(":")[((req.connection.remoteAddress.split(":")).length)-1]
    try {
        const params = body && body.params ? body.params : null;
        console.log("frontendRoutes received("+ip+"): ","PARAMS", params);
        Utilities.log("frontendRoutes received("+ip+"): " + "PARAMS " + params);
        const result = await delay(1000);
        frontendService.NewElements(params.device);
        res.status(HttpStatus.OK).send();
    } catch (error) {
        res.status(HttpStatus.OK).send(error);
    }
});

module.exports = router;
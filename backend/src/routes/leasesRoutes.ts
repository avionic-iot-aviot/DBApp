const config = require('config');
import * as express from 'express';
const _ = require('lodash');
const router = express.Router();
import * as HttpStatus from 'http-status-codes';
const delay = require('delay');

import { Utilities } from '../shared/utilities';
import LeasesService from '../services/leasesServices';
const leasesService = new LeasesService();

router.post('/refresh', async (req, res) => {
    const body = req.body;
    var ip = req.connection.remoteAddress.split(":")[((req.connection.remoteAddress.split(":")).length)-1]
    try {
        const params = body && body.params ? body.params : null;
        console.log("leasesRoutes received("+ip+"): ","PARAMS", params);
        Utilities.log("leasesRoutes received("+ip+"): " + "PARAMS " + params);
        const result = await leasesService.NewLeasesReceiver(params);
        res.status(HttpStatus.OK).send(result);
    } catch (error) {
        res.status(HttpStatus.OK).send(error);
    }
});

router.post('/refreshCopterIDs', async (req, res) => {
    const body = req.body;
    var ip = req.connection.remoteAddress.split(":")[((req.connection.remoteAddress.split(":")).length)-1]
    try {
        const params = body && body.params ? body.params : null;
        console.log("refreshCopterIDs received("+ip+"): ","PARAMS", params);
        Utilities.log("refreshCopterIDs received("+ip+"): " + "PARAMS " + params);
        const result = await leasesService.refreshCopterIDs(params);
        res.status(HttpStatus.OK).send(result);
    } catch (error) {
        console.log("refreshCopterIDs error:", error);
        res.status(HttpStatus.OK).send(error);
    }
});

module.exports = router;
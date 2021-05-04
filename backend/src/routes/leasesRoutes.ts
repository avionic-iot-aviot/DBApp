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
        await leasesService.NewLeasesReceiver(params);
        res.status(HttpStatus.OK).send();
    } catch (error) {
        res.status(HttpStatus.OK).send(error);
    }
});

module.exports = router;
const HealthRouter = require('./health.ts');
const RidesRouter = require('./rides.ts');

const {Router} = require('express');

const routers = new Router();

routers.use('/health', HealthRouter);
routers.use('/rides', RidesRouter);

module.exports = routers;

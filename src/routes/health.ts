export {};
const {Router} = require('express');

const healthRouter = new Router();

healthRouter.get('/', async (req, res) => {
  res.send('Healthy');
});

module.exports = healthRouter;

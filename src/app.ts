'use strict';

const express = require('express');
const app = express();

const AppRouters = require('./routes/index.ts');

app.use(AppRouters);

module.exports = app;

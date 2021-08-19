'use strict';

const port = 8010;

const application = require('./src/app.ts');

application.listen(port, () => console.log(`App started and listening on port ${port}`));


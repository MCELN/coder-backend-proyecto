const app = require('./server');
const { port } = require('./configs/index');
const realTimeServer = require('./realTimeServer');

const httpServer = app.listen(port, () => {
    console.log(`Server running at port ${port}`);
});

realTimeServer(httpServer);
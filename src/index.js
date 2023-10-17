const app = require('./server');
const { port } = require('./configs/index');

app.listen(port, () => {
    console.log(`Server running at port ${port}`);
});
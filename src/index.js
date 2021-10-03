require("dotenv/config");
const { Logger } = require('@lo-agency/logger');

const app = require("express")();

const port = process.env.PORT || 3000;

require('./middlewares/middlewares').forEach(middleware => {
    app.use(middleware);
})

app.listen(port, () => Logger.info(`Server is Runing: http://localhost:${port}`));
const fs = require('fs');
const debug = require('debug')('app:startup');
const config = require('config');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const express = require('express');
const nunjucks = require('nunjucks');
const app = express();

nunjucks.configure('views', {
    autoescape: true,
    express: app,
    watch: true
});

app.engine('.njk', nunjucks.render);
app.set('view engine', '.njk');

app.use(cors({credentials: true}));

app.use(cookieParser());
app.use(express.json());

app.use('/public', express.static('public'));

app.use(helmet());

fs.readdir("./routes", (err, files) => {
    files.forEach(file => {
        app.use("/", require("./routes/" + file))
    });
});

if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    debug('Morgan enabled...');
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

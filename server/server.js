const express = require("express"),
      path    = require("path");


const app = express();

app.use(express.static(path.join(__dirname, '../public')));

app.listen(process.env.PORT, process.env.IP, () => {
    console.log('Server is running');
});

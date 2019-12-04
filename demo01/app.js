const express = require('express');
const app =  express();

app.get('/', (req, res) => {
    res.end('Hello World!')
});

app.listen(3000, () => console.log('app start with port 3000.'))
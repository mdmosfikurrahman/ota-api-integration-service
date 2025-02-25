const express = require('express');
const sabreRoute = require('./routes/sabreRoute');

const app = express();
const PORT = 3000;

app.use(express.json());

app.use('/api', sabreRoute);


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

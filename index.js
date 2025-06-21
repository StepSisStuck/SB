const express = require('express');
const app = express();
const errorHandler = require('./middleware/errorHandler');

app.use(express.json());

app.use('/users', require('./routes/users'));
app.use('/vulnerabilities', require('./routes/vulnerabilities'));
app.use('/reports', require('./routes/reports'));

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

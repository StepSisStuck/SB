const pool = require('../services/db');


module.exports.insertSingle = (data, callback) =>
{
    const SQLSTATMENT = `
    INSERT INTO gameuser (username)
    VALUES (?);
    `;
  const VALUES = [data.username];

  pool.query(SQLSTATMENT, VALUES, callback);
}


module.exports.selectAll = (callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM gameuser;
    `;

pool.query(SQLSTATMENT, callback);
}


module.exports.selectById = (data, callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM gameuser
    WHERE id = ?;
    `;
const VALUES = [data.id];

pool.query(SQLSTATMENT, VALUES, callback);
}


module.exports.updateById = (data, callback) =>
{
    const SQLSTATMENT = `
    UPDATE gameuser
    SET username = ?
    WHERE id = ?;
    `;
const VALUES = [data.username, data.id];

pool.query(SQLSTATMENT, VALUES, callback);
}

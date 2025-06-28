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


module.exports.challengePlayers = (data, callback) =>
{
// Get both players, ordered by rank strength, So rank S is index 0, hence highest
    const SQLSTATEMENT = `
    SELECT id, user_rank
    FROM  gameuser
    WHERE id IN (?, ?)
    ORDER BY FIELD(
        user_rank,
        'S-Rank Hunter',
        'A-Rank Hunter',
        'B-Rank Hunter',
        'C-Rank Hunter',
        'D-Rank Hunter',
        'E-Rank Hunter'
    );
    `;
    const VALUES = [ data.challenger_id, data.opponent_id ];

    pool.query(SQLSTATEMENT, VALUES, (error, results) =>
    {
        if (results.length < 2)
            return callback({ code: "USER_NOT_FOUND" });

// First row = winner, second row = loser
        const winner = results[0];
        const loser  = results[1];

        callback(null, {
            challenger_id: data.challenger_id,
            opponent_id:   data.opponent_id,
            winner_id:     winner.id,
            winner_rank:   winner.user_rank,
            loser_id:      loser.id,
            loser_rank:    loser.user_rank,
            message:       "Player " + results.winner_id + " wins!"
        });
    });
};
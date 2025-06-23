const pool = require('../services/db');

module.exports.insertQuest = (data, callback) => {
    const SQLSTATEMENT = `
    INSERT INTO Quests (title, description, xp_reward, required_rank)
    Values (?, ?, ?, ?)
    `;

    const VALUES = [data.title, data.description, data.xp_reward, data.required_rank]

    pool.query(SQLSTATEMENT, VALUES, callback)
}


module.exports.selectAll = (callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM quests;
    `;

pool.query(SQLSTATMENT, callback);
}


module.exports.removeCompletion = (data, callback) => {
  const SQLSTATEMENT = `
    DELETE FROM QuestCompletion
    WHERE user_id  = ?
    AND quest_id = ?
  `;

  const VALUES = [data.user_id, data.id]
  pool.query(SQLSTATEMENT, VALUES, callback);
};


module.exports.StartingQuest = (data, callback) => {
    const SQLSTATEMENT = `
    INSERT INTO QuestStart (user_id, quest_id)
    VALUES (?, ?)
    `;

    const VALUES = [data.user_id, data.id];
    pool.query(SQLSTATEMENT, VALUES, callback)
}


module.exports.completeQuest = (data, callback) => {
  const SQLSTATEMENT = `
    INSERT INTO QuestCompletion (user_id, quest_id)
    VALUES (?, ?)
  `;

  const VALUES = [data.user_id, data.id]
  pool.query(SQLSTATEMENT, VALUES, callback);
};


// Remove the start record to allow restarting
module.exports.removeStart = (data, callback) => {
  const SQLSTATEMENT = `
    DELETE FROM QuestStart
     WHERE user_id = ?
       AND quest_id = ?
  `;

  const VALUES = [data.user_id, data.id]
  pool.query(SQLSTATEMENT, VALUES, callback);
};

// module.exports.getAvailableForUser = (data, callback) => {
//     const sql = `
//       SELECT *
//         FROM Quests
//        WHERE required_rank IN (?)
//        ORDER BY xp_reward
//     `;
//     pool.query(sql, [data.unlockedRanks], callback);
// };
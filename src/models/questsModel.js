const pool = require('../services/db');
const levels = require("../configs/levels.js")

module.exports.insertQuest = (data, callback) => {
  const SQLSTATEMENT = `
  INSERT INTO quests (title, description, xp_reward, recommended_rank)
  Values (?, ?, ?, ?)
  `;

  const VALUES = [data.title, data.description, data.xp_reward, data.recommended_rank]
  pool.query(SQLSTATEMENT, VALUES, callback)
}


module.exports.selectAll = (callback) =>
{
  const SQLSTATMENT = `
  SELECT * FROM quests;
  `;

pool.query(SQLSTATMENT, callback);
}

module.exports.selectById = (data, callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM quests
    WHERE id = ?;
    `;
const VALUES = [data.id];

pool.query(SQLSTATMENT, VALUES, callback);
}

module.exports.updateById = (data, callback) =>
{
    const SQLSTATMENT = `
    UPDATE quests
    SET title = ?, 
    description = ?, 
    xp_reward = ?, 
    recommended_rank = ?
    WHERE id = ?;
    `;
const VALUES = [data.title, data.description, data.xp_reward, data.recommended_rank, data.id];

pool.query(SQLSTATMENT, VALUES, callback);
}


module.exports.GetXpReward = (data, callback) => 
{
  const SQLSTATEMENT = `
  SELECT q.xp_reward, gu.username
  FROM quests q
  JOIN gameuser gu
  ON q.id = ?
  WHERE gu.id = ?
  `;

  const VALUES = [data.quest_id, data.user_id]
  pool.query(SQLSTATEMENT, VALUES, callback)
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


module.exports.finishQuest = (data, callback) =>
{
// remove the starting quest so that you can create a new quest
  const SQLSTATEMENT_REMOVE_START = `
  DELETE FROM QuestStart
  WHERE user_id = ? 
  AND quest_id = ?;
  `;
  const VALUES_REMOVE = [ data.user_id, data.id ];
  pool.query(SQLSTATEMENT_REMOVE_START, VALUES_REMOVE, (error1) => {
    if (error1) return callback(error1);


// Create the logs to put info into questcompletion
  const SQLSTATEMENT_LOG = `
    INSERT INTO QuestCompletion (user_id, quest_id)
    VALUES (?, ?);
  `;
  const VALUES_LOG = [ data.user_id, data.id ];
  pool.query(SQLSTATEMENT_LOG, VALUES_LOG, (error2) => {
    if (error2) return callback(error2);


// Give the quest xp to the player
  const SQLSTATEMENT_AWARD = `
    UPDATE GameUser
    SET xp = xp + (
    SELECT xp_reward
    FROM Quests
    WHERE id = ?)
    WHERE id = ?;
    `;
  const VALUES_AWARD = [ data.id, data.user_id ];
  pool.query(SQLSTATEMENT_AWARD, VALUES_AWARD, (error3) => {
    if (error3) return callback(error3);


// Get the XP from gameuser
  const SQLSTATEMENT_FETCH_XP = `
    SELECT xp
    FROM GameUser
    WHERE id = ?;
    `;
  const VALUES_FETCHXP = [data.user_id]
  pool.query(SQLSTATEMENT_FETCH_XP, VALUES_FETCHXP, (error4, rows) => {
    if (error4) return callback(error4);
      const newXp = rows[0].xp;


// calculate the new xp and how much xp player needs for next level
    let newLevel = levels[0].name;
    let xpToNext = 0;
    for (let i = 0; i < levels.length; i++)
    {
      if (newXp >= levels[i].xp)
      {
        newLevel = levels[i].name;
        if (i < levels.length - 1)
          xpToNext = levels[i + 1].xp - newXp;
      } else {
        break;
      }
    }

// Update the user_rank with the new rank
  const SQLSTATEMENT_UPDATE_RANK = `
    UPDATE GameUser
    SET user_rank = ?
    WHERE id = ?;
    `;
  const VALUES_UPDATERANK = [newLevel, data.user_id]
  pool.query(SQLSTATEMENT_UPDATE_RANK, VALUES_UPDATERANK, (error5) => {
    if (error5) return callback(error5);
  
  callback(null, {xp: newXp, level: newLevel, nextXp: xpToNext
            });
          });
        });
      });
    });
  });
};

const pool = require('../config/db');

async function getEligibleBadges(reputation, user_id) {
  const [rows] = await pool.query(
    `SELECT * FROM Badge WHERE min_points <= ? AND id NOT IN (
       SELECT badge_id FROM UserBadge WHERE user_id = ?
     )`,
    [reputation, user_id]
  );
  return rows;
}

async function awardBadge(user_id, badge_id) {
  await pool.query('INSERT INTO UserBadge (user_id, badge_id) VALUES (?, ?)', [user_id, badge_id]);
}

async function assignBadges(user_id, reputation) {
  const badges = await getEligibleBadges(reputation, user_id);
  for (const badge of badges) {
    await awardBadge(user_id, badge.id);
  }
  return badges;
}

module.exports = {
  assignBadges,
};

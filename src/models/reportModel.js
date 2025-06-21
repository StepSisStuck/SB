const pool = require('../services/db');


// Question 7



module.exports.GetUserById = (user_id, callback) =>
{
    const SQLSTATEMENT = `
    SELECT id, reputation
    FROM user
    WHERE id = ?
    `

    pool.query(SQLSTATEMENT, [user_id], callback)
}


module.exports.GetVulnerabilityById = (vulnerability_id, callback) =>
{
    const SQLSTATEMENT = `
    SELECT id, points
    FROM vulnerability
    WHERE id = ?
    `

    pool.query(SQLSTATEMENT, [vulnerability_id], callback)
}


module.exports.CreateNewReport = (user_id, vulnerability_id, callback) => 
{
    const SQLSTATEMENT = `
    INSERT INTO report (user_id, vulnerability_id)
    VALUES (?, ?);
    `;

    pool.query(SQLSTATEMENT, [user_id, vulnerability_id], callback)
}

module.exports.UpdateReputation = (user, newRep, callback) =>
{
    const SQLSTATEMENT = `
    UPDATE user
    SET reputation = ?
    WHERE id = ?
    `;

    pool.query(SQLSTATEMENT, [user, newRep], callback)
}




// Question 8
// module.exports.GetReportById = (data, callback) => {
//     const SQLSTATEMENT = `
//     SELECT id
//     FROM report
//     WHERE id = ?;
//     `;
//     const VALUES = [data.id];
// 
//     pool.query(SQLSTATEMENT, VALUES, callback);
// }
// 
// module.exports.GetUserById = (data, callback) => {
//     const SQLSTATEMENT = `
//     SELECT id 
//     FROM user
//     WHERE id = ?
//     `;
//     const VALUES = [data.id];
// 
//     pool.query(SQLSTATEMENT, VALUES, callback);
// }
// 
// module.exports.UpdateReportAndReputation = (data, callback) =>
// {
//     // const SQLSTATEMENT = `
//     //     /* update report and user rep */
//     //     UPDATE report AS r
//     //     JOIN vulnerability AS v ON v.id = r.vulnerability_id
//     //     JOIN user AS u ON u.id = ?
//     //     SET r.status     = ?,
//     //     r.user_id = ?,
//     //            u.reputation = CASE
//     //                            WHEN r.status <> ?
//     //                            THEN u.reputation + v.points
//     //                            ELSE u.reputation
//     //                           END
//     //     WHERE r.id = ?;
//     //     SELECT u.reputation AS user_reputation
//     //     FROM user u
//     //     WHERE u.id = ?;
//     // `;
//     const SQLSTATEMENT = `
//     UPDATE report
//     JOIN vulnerability ON vulnerability.id = report.vulnerability_id
//     JOIN user ON user.id = ?
//     SET
//     report.status = ?,
//     report.user_id = ?,
//     user.reputation = CASE
//         WHEN report.status <> ? 
//         THEN user.reputation + vulnerability.points
//         ELSE user.reputation
//     END
//     Where report.id = ?;
//     
//     SELECT reputation AS user_reputation 
//     FROM user
//     WHERE id = ?;
//     `;
//     // Update the report status and user's reputation
// 
//     const VALUES = [data.user_id, data.status, data.user_id, data.status, data.id, data.user_id];
// 
//     pool.query(SQLSTATEMENT, VALUES, (error, results) =>
//     {
//         if (error) {
//             return callback(error);
//         }
// 
//         // results[0] is UPDATE OkPacket, results[1] is SELECT rows
//         const newRep = results[1][0].user_reputation;
//         callback(null, { affectedRows: results[0].affectedRows, newRep });
//     });
// };
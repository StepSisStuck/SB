const pool = require('../services/db');


// Question 7
module.exports.InsertReport = (data, callback) => {
    const SQLSTATEMENT = `
    SELECT user.id, vulnerability.id
    FROM user, vulnerability
    WHERE user_id = ?, vulnerability_id = ?
    `;
}


// module.exports.GetUserById = (data, callback) =>
// {
//     const SQLSTATEMENT = `
//     SELECT id, reputation
//     FROM user
//     WHERE id = ?
//     `
//     const VALUES = [data.id]
// 
//     pool.query(SQLSTATEMENT, VALUES, callback)
// }
// 
// 
// module.exports.GetVulnerabilityById = (data, callback) =>
// {
//     const SQLSTATEMENT = `
//     SELECT id, points
//     FROM vulnerability
//     WHERE id = ?
//     `
//     const VALUES = [data.id]
// 
//     pool.query(SQLSTATEMENT, VALUES, callback)
// }
// 
// module.exports.CheckReportExists = (data, callback) =>
// {
//     const SQL = `
//         SELECT id, status
//         FROM report
//         WHERE user_id = ?
//         AND vulnerability_id = ?
//     `
//     const VALUES = [ data.user_id, data.vulnerability_id ]
//     pool.query(SQL, VALUES, callback)
// }
// 
// 
// module.exports.CreateReport = (data, callback) =>
// {
//     const SQLSTATEMENT = `
//     INSERT INTO report (user_id, vulnerability_id)
//     VALUES (?, ?)
//     `
//     const VALUES = [data.user_id, data.vulnerability_id]
// 
//     pool.query(SQLSTATEMENT, VALUES, callback)
// }
// 
// 
// module.exports.UpdateReputation = (data, callback) =>
// {
//     const SQLSTATEMENT = `
//     UPDATE user
//     SET reputation = ?
//     WHERE id = ?
//     `
//     const VALUES = [data.reputation, data.id]
// 
//     pool.query(SQLSTATEMENT, VALUES, callback)
// }



// Question 8
module.exports.GetReportById = (data, callback) => {
    const SQLSTATEMENT = `
    SELECT id
    FROM report
    WHERE id = ?;
    `;
    const VALUES = [data.id];

    pool.query(SQLSTATEMENT, VALUES, callback);
}

module.exports.GetUserById = (data, callback) => {
    const SQLSTATEMENT = `
    SELECT id 
    FROM user
    WHERE id = ?
    `;
    const VALUES = [data.id];

    pool.query(SQLSTATEMENT, VALUES, callback);
}

module.exports.UpdateReportAndReputation = (data, callback) =>
{
    // const SQLSTATEMENT = `
    //     /* update report and user rep */
    //     UPDATE report AS r
    //     JOIN vulnerability AS v ON v.id = r.vulnerability_id
    //     JOIN user AS u ON u.id = ?
    //     SET r.status     = ?,
    //     r.user_id = ?,
    //            u.reputation = CASE
    //                            WHEN r.status <> ?
    //                            THEN u.reputation + v.points
    //                            ELSE u.reputation
    //                           END
    //     WHERE r.id = ?;
    //     SELECT u.reputation AS user_reputation
    //     FROM user u
    //     WHERE u.id = ?;
    // `;
    const SQLSTATEMENT = `
    UPDATE report
    JOIN vulnerability ON vulnerability.id = report.vulnerability_id
    JOIN user ON user.id = ?
    SET
    report.status = ?,
    report.user_id = ?,
    user.reputation = CASE
        WHEN report.status <> ? 
        THEN user.reputation + vulnerability.points
        ELSE user.reputation
    END
    Where report.id = ?;
    
    SELECT reputation AS user_reputation 
    FROM user
    WHERE id = ?;
    `;
    // Update the report status and user's reputation

    const VALUES = [data.user_id, data.status, data.user_id, data.status, data.id, data.user_id];

    pool.query(SQLSTATEMENT, VALUES, (error, results) =>
    {
        if (error) {
            return callback(error);
        }

        // results[0] is UPDATE OkPacket, results[1] is SELECT rows
        const newRep = results[1][0].user_reputation;
        callback(null, { affectedRows: results[0].affectedRows, newRep });
    });
};
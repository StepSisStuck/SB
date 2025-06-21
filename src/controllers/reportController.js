const model = require("../models/reportModel.js");
const { report } = require("../routes/userRoutes.js");


// Question 7


module.exports.CreateReport = (req, res, next) => {
    const { user_id, vulnerability_id } = req.body;

    if (!user_id || !vulnerability_id) {
        return res.status(400).send("User_id and Vulnerability_id is required.");
    }

// Verify that the userId exists
    model.GetUserById(user_id, (error, results) => {
        if (error) {
            console.error("Error CheckUserId:", error);
            return res.status(500).json(error);
        } else {
            if (results.length === 0) {
                return res.status(404).json({ message: "User not found" });
            }
        }
        const user = results[0];

// Verify that the Vulnerability exists
    model.GetVulnerabilityById(vulnerability_id, (error, results) => {
        if (error) {
            console.error("Error CheckVulnerabilityId:", error);
            return res.status(500).json(error);
        } else {
            if (results.length === 0) {
                return res.status(404).json({ message: "Vulnerability not found" });
            }
        }
        const vuln = results[0];

// Setting up the requirement to key in to the report
    model.CreateNewReport(user_id, vulnerability_id, (error, results) => {
        if (error) {
            console.error("Error CheckReportExists:", error);
            return res.status(500).json(error);
            }
            const reportId = results.insertId;
            const newRep = user.reputation + vuln.points;

// Add the reputation and display the final output
        model.UpdateReputation(user, newRep, (error, results) => {
            if (error) {
                console.error("Error CheckReportExists:", error);
                return res.status(500).json(error);
                }
                res.status(201).json({
                    id: reportId, 
                    user_id,
                    vulnerability_id,
                    status: 0,
                    user_reputation: newRep
                });
                });
            });
        });
    });
}


// Question 8



// Verify that the report exists
module.exports.CheckReport = (req, res, next) => {
    if (req.body.status === undefined || req.body.user_id == undefined) {
        return res.status(400).json({message: "Error: Status or User_id is undefined"})
    }

    const data = {
        id: req.params.id,
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error CheckReport:", error);
            return res.status(500).json(error);
        }
        if (results.length === 0) {
            return res.status(404).json({message: "Report not found"})     
        }
        res.locals.report = results[0]
        next()
    }

    model.CheckReportById(data, callback)
}


// Verify the user_id(Closer) exists
module.exports.CheckCloser = (req, res, next) => {
    const data = {
        id: req.body.user_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error fetching user:", error)
            return res.status(500).json(error);
        }
        if (results.length === 0) {
            return res.status(404).json({message: "User not found"})
        }

        res.locals.user = results[0]
        next()
    }

    model.CheckUserById(data, callback)
}


// Update report
module.exports.FinishReport = (req, res, next) => {
    
    const data = {
        id: req.params.id,
        status: req.body.status,
        user_id: req.body.user_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error UpdateReport:", error);
            return res.status(500).json(error);
        }

        res.status(200).json({
            id: Number(data.id), // Number makes it int
            status: data.status,
            closer_id: data.user_id,
            user_reputation: results.newRep
        });
    }

    model.UpdateReportAndReputation(data, callback);
}




module.exports.UpdateReport = (req, res, next) => {
    const { id } = req.params;
    const { status, user_id } = req.body;

    if (!status || !user_id) {
        return res.status(400).send("Status and User_id is required.");
    }

    model.CheckReportById(id, (error, results) => {
        if (error) {
            console.error("Error CheckReportById:", error);
            return res.status(500).json(error);
        }  else {
            if (results.length === 0) {
            return res.status(404).json({ message: "Report not found" });
        }
        }
    })


    model.CheckUserById(user_id, (error, results) => {
        if (error) {
            console.error("Error CheckUserById:", error)
            return res.status(500).json(error);
        } else {
            if (results.length === 0) {
            return res.status(404).json({message: "User not found"})
        }
        }

    })


    model.UpdateReportAndReputation(id, status, user_id, (error, results) => {
        if (error) {
            console.error("Error UpdateReport:", error);
            return res.status(500).json(error);
        }
        res.status(200).json({
            id: Number(id), // Number makes it int
            status: data.status,
            closer_id: data.user_id,
            user_reputation: results.newRep
        })

    })

}


    


const reportModel = require('../models/reportModel');
const userModel = require('../models/userModel');
const vulnModel = require('../models/vulnerabilityModel');
const badgeModel = require('../models/badgeModel');

async function createReport(req, res, next) {
  try {
    const { user_id, vulnerability_id } = req.body;
    const user = await userModel.getUserById(user_id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    const vuln = await vulnModel.getVulnerabilityById(vulnerability_id);
    if (!vuln) return res.status(404).json({ error: 'Vulnerability not found' });

    const reportId = await reportModel.createReport(user_id, vulnerability_id);
    const newReputation = user.reputation + vuln.points;
    await userModel.updateUser(user_id, user.username, newReputation);
    await badgeModel.assignBadges(user_id, newReputation);

    res.status(201).json({
      id: reportId,
      user_id,
      vulnerability_id,
      status: 0,
      user_reputation: newReputation,
    });
  } catch (err) {
    next(err);
  }
}

async function updateReport(req, res, next) {
  try {
    const { status, user_id } = req.body;
    const report_id = req.params.report_id;
    const report = await reportModel.getReportById(report_id);
    if (!report) return res.status(404).json({ error: 'Report not found' });

    const user = await userModel.getUserById(user_id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    await reportModel.updateReport(report_id, status, user_id);

    let newReputation = user.reputation;
    if (status == 1) {
      const vuln = await vulnModel.getVulnerabilityById(report.vulnerability_id);
      newReputation += vuln.points;
      await userModel.updateUser(user_id, user.username, newReputation);
      await badgeModel.assignBadges(user_id, newReputation);
    }

    res.json({
      id: Number(report_id),
      status,
      closer_id: user_id,
      user_reputation: newReputation,
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  createReport,
  updateReport,
};

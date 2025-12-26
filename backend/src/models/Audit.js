async function saveAudit(db, record) {
  return db.collection("audit_logs").insertOne(record);
}

module.exports = { saveAudit };

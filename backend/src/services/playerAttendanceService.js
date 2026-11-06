// Use the same marked-entry rule and rounding as session attendance.
function summarizePlayerAttendance(sessions, playerIds) {
  const summaries = new Map(playerIds.map(id => [String(id), {
    attended: 0, late: 0, absent: 0, excused: 0, notMarked: 0,
    total: 0, markedCount: 0, rate: null
  }]));

  for (const session of sessions) {
    for (const entry of session.rollCall || []) {
      const playerId = String(entry.player?._id ?? entry.player);
      const stats = summaries.get(playerId);
      if (!stats) continue;

      stats.total++;
      switch (entry.status) {
        case 'Attended': stats.attended++; break;
        case 'Late': stats.late++; break;
        case 'Absent': stats.absent++; break;
        case 'Excused': stats.excused++; break;
        default: stats.notMarked++; break;
      }
    }
  }

  for (const stats of summaries.values()) {
    stats.markedCount = stats.attended + stats.late + stats.absent + stats.excused;
    if (stats.markedCount > 0) {
      stats.rate = Math.round((stats.attended + stats.late) / stats.markedCount * 1000) / 10;
    }
  }
  return summaries;
}

module.exports = { summarizePlayerAttendance };

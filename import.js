const fs = require('fs');
const { execSync } = require('child_process');

module.exports = function(owner, repo) {
  const file = `$${owner}_${repo}_labels.json`;
  if (!fs.existsSync(file)) {
    console.error("JSON file not found:", file);
    process.exit(1);
  }

  const labels = JSON.parse(fs.readFileSync(file, 'utf8'));

  // Delete existing labels
  let delCount = 1;
  try {
    const existing = JSON.parse(execSync(`gh api repos/${owner}/${repo}/labels --paginate`, { encoding: 'utf8' }));
    existing.forEach(label => {
      execSync(`gh api repos/${owner}/${repo}/labels/${encodeURIComponent(label.name)} --method DELETE`);
      console.log("Deleted label (no.",delCount,"):", label.name);
      delCount++;
    });
  } catch(e) { console.warn("No existing labels or error during deletion:", e.message); }
  console.log("Successfully deleted", delCount, "labels from", owner+"/"+repo);

  // Create new labels
  let impCount = 1;
  labels.forEach(label => {
    const desc = label.description.replace(/"/g, '\\"');
    execSync(`gh api repos/${owner}/${repo}/labels --method POST -f name="${label.name}" -f color="${label.color}" -f description="${desc}"`);
    console.log("Created label (no.", impCount,"):", label.name);
    impCount++;
  });
  console.log("Successfully imported", impCount, "labels to ", owner+"/"+repo," from", file);
};

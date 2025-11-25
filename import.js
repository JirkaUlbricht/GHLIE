const fs = require('fs');
const { execSync } = require('child_process');

module.exports = function(owner, repo, inputFile) {
  const file = inputFile || `${owner}_${repo}_labels.json`;
  
  if (!fs.existsSync(file)) {
    console.error("JSON file not found:", file);
    process.exit(1);
  }

  const labels = JSON.parse(fs.readFileSync(file, 'utf8'));

  let delCount = 0;
  try {
    const existing = JSON.parse(execSync(`gh api repos/${owner}/${repo}/labels --paginate`, { encoding: 'utf8' }));
    existing.forEach(label => {
      execSync(`gh api repos/${owner}/${repo}/labels/${encodeURIComponent(label.name)} --method DELETE`);
      delCount++;
      console.log("Deleted label (no.",delCount,"):", label.name);
    });
  } catch(e) { console.warn("No existing labels or error during deletion:", e.message); }
  console.log("Successfully deleted", delCount, "labels from", owner+"/"+repo);
  console.log("Starting import from file:", file);

  let impCount = 0;
  labels.forEach(label => {
    const desc = label.description.replace(/"/g, '\\"');
    execSync(`gh api repos/${owner}/${repo}/labels --method POST -f name="${label.name}" -f color="${label.color}" -f description="${desc}"`);
    impCount++;
    console.log("Created label (no.",impCount,"):", label.name);
  });
  console.log("Successfully imported", impCount, "labels to", owner+"/"+repo, "from", file);
};
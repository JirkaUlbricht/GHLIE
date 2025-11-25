const fs = require('fs');
const { execSync } = require('child_process');

module.exports = function(owner, repo) {
  try {
    const output = execSync(`gh api repos/${owner}/${repo}/labels --paginate`, { encoding: 'utf8' });
    const ghLabels = JSON.parse(output);

    const labels = ghLabels.map(l => ({
      name: l.name,
      description: l.description || "",
      color: l.color
    }));

    fs.writeFileSync(`${owner}_${repo}_labels.json`, JSON.stringify(labels, null, 2));
    console.log("Exported labels to", `${owner}_${repo}_labels.json`);
  } catch(e) {
    console.error("Error occured while exporting labels: ", e.message);
  }
};

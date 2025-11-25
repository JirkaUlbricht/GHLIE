const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

module.exports = function(owner, repo, outputPath) {
  try {
    const output = execSync(`gh api repos/${owner}/${repo}/labels --paginate`, { encoding: 'utf8' });
    const ghLabels = JSON.parse(output);

    const labels = ghLabels.map(l => ({
      name: l.name,
      description: l.description || "",
      color: l.color
    }));

    const fileName = `${owner}_${repo}_labels.json`;
    let filePath;

    if (outputPath) {
      if (!fs.existsSync(outputPath)) {
        console.error(`Invalid path: ${outputPath}`);
        process.exit(1);
      }
      const stats = fs.statSync(outputPath);
      if (stats.isDirectory()) {
        filePath = path.join(outputPath, fileName);
      } else {
        console.error(`Path is not a directory: ${outputPath}`);
        process.exit(1);
      }
    } else {
      filePath = fileName;
    }

    fs.writeFileSync(filePath, JSON.stringify(labels, null, 2));
    console.log("Exported labels to", filePath);
  } catch(e) {
    console.error("Error occured while exporting labels: ", e.message);
  }
};
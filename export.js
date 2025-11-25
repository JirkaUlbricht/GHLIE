/*
function rgbToHex(r, g, b) {
  return [r, g, b]
    .map(x => Number(x).toString(16).padStart(2, "0"))
    .join("");
}

const labels = [];

document.querySelectorAll("li.ListItem-module__listItem--k4eMk").forEach(li => {
  const nameEl = li.querySelector(".prc-Text-Text-0ima0");
  const name = nameEl?.textContent.trim();

  const descEl = li.querySelector(".RepositoryLabel-module__labelRowDescriptionItemDescription--M5zXu");
  const description = descEl?.textContent.trim() || "";

  const colorEl = li.querySelector(".pNtSM");
  let color = null;

  if (colorEl) {
    const styles = getComputedStyle(colorEl);
    const rgb = styles.color.match(/\d+/g);
    if (rgb) {
      color = rgbToHex(rgb[0], rgb[1], rgb[2]);
    }
  }

  if (name && color) {
    labels.push({ name, description, color });
  }
});

console.log(JSON.stringify(labels, null, 2));

*/

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
    console.error("Error occured while exporting labels:", e.message);
  }
};

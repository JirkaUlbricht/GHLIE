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

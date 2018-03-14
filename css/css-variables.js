const root = document.querySelector(":root");
const styles = getComputedStyle(root);
const textStyle = styles.getPropertyValue("--text");
console.log(textStyle);

function nighttime() {
  root.style.setProperty("--text", "#F6F6F6");
  root.style.setProperty("--headlines", "#FF0213");
  root.style.setProperty("--main", "#040404");
}


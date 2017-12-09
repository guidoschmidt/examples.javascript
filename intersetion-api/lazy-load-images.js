// https://www.darrenlester.com/blog/lazy-loading

const options = {
  root: null,
  rootMargin: "0px 0px",
  threshold: 0
}

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.intersectionRatio > observer.thresholds[0]) {
      load(entry.target, observer)
    }
  })
}, options)

document.querySelectorAll("img[data-src]").forEach(img => {
  observer.observe(img)
})

function load(img, observer) {
  if (observer) {
    img.addEventListener('load', () => {
      observer.unobserve(img)
    })
  }
  const dataSrc = img.getAttribute("data-src")
  if (dataSrc) {
    const w = Math.round(Math.random() * 200) + 400
    const h = Math.round(Math.random() * 200) + 400
    img.setAttribute("src", `http://www.rand-img.com/${w}/${h}`)
  }
}

// document.querySelectorAll("img[data-src]").forEach(img => {
//   load(img)
// })

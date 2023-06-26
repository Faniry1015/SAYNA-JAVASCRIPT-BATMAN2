//smooth scrolling with the side Arrows
  const scrollArrow = document.querySelectorAll(".scrollArrow")
  scrollArrow[0].addEventListener("click", () => window.scrollTo({top: 0, behavior: "smooth"}))
  
  scrollArrow[1].addEventListener("click", () => window.scrollTo({top: document.body.scrollHeight, behavior: "smooth"}))

//Effet de transition au défilement
const ratio = .1
const options = {
    root: null,
    rootMargin: "0px",
    threshold: ratio
}

const handleIntersect = function (entries, observer) {
    entries.forEach(function (entry) {
        if (entry.intersectionRatio > ratio) {
            entry.target.classList.add("reveal-visible")
            observer.unobserve(entry.target)
        }
    });
}

const observer = new IntersectionObserver(handleIntersect, options)
document.querySelectorAll(".reveal").forEach(function(r){
    observer.observe(r)
})



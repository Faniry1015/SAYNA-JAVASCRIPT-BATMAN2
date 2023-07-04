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

/**Image qui suit la souris */
document.onmousemove = suitsouris;

function suitsouris(evenement) {
  if (navigator.appName == "Microsoft Internet Explorer") {
    var x = event.x + document.body.scrollLeft;
    var y = event.y + document.body.scrollTop;
  } else {
    var x = evenement.pageX;
    var y = evenement.pageY;
  }
  document.getElementById("mouseImg").style.left = (x + 1) + 'px';
  document.getElementById("mouseImg").style.top = (y + 1) + 'px';
}


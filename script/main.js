//smooth scrolling with the side Arrows
  const scrollArrow = document.querySelectorAll(".scrollArrow")
  scrollArrow[0].addEventListener("click", () => window.scrollTo({top: 0, behavior: "smooth"}))
  
  scrollArrow[1].addEventListener("click", () => window.scrollTo({top: document.body.scrollHeight, behavior: "smooth"}))



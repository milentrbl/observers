const findLastSection = () => {
    const number = localStorage.getItem("numberOfSection") || 1;// if there's no set number then 1
  
    const section = document.getElementById(number);
  
    const position = Math.round(section.offsetTop);
  
    scrollTo({
      top: position,
      behavior: "smooth"
    });
};
  
findLastSection();// at first it will be first
  
const createObserver = () => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) { // isIntersecting means is in viewport
            localStorage.setItem("numberOfSection", entry.target.id);
          }
        });
      },
      {
        threshold: 0.1
      }
    );
  
    const sections = main.querySelectorAll("section");
    sections.forEach((section) => observer.observe(section));
};
createObserver();
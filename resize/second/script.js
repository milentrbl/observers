let box = document.querySelector('.box')
const observer = new ResizeObserver(entries=>{
    console.log(entries);
    const boxElement = entries[0];
    const isSmall = boxElement.contentRect.width < 300;
    boxElement.target.style.backgroundColor = isSmall ? 'blue' : 'red'
})
observer.observe(box)
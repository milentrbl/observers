const h1Elem = document.querySelector('h1');
const pElem = document.querySelector('p');
const divElem = document.querySelector('body > div');
const slider = document.querySelector('input[type="range"]');
const checkbox = document.querySelector('input[type="checkbox"]');

divElem.style.width = '600px';

slider.addEventListener('input', () => {
  divElem.style.width = `${slider.value}px`;
})

const resizeObserver = new ResizeObserver((entries) => {
  for (const entry of entries) {
    if (entry.contentBoxSize) {
      // Firefox implements `contentBoxSize` as a single content rect, rather than an array
      const contentBoxSize = Array.isArray(entry.contentBoxSize) ? entry.contentBoxSize[0] : entry.contentBoxSize;

      h1Elem.style.fontSize = `${Math.max(1.5, contentBoxSize.inlineSize / 200)}rem`;
      pElem.style.fontSize = `${Math.max(1, contentBoxSize.inlineSize / 600)}rem`;
    } else {
      h1Elem.style.fontSize = `${Math.max(1.5, entry.contentRect.width / 200)}rem`;
      pElem.style.fontSize = `${Math.max(1, entry.contentRect.width / 600)}rem`;
    }
  }

  console.log('Size changed');
});
resizeObserver.observe(divElem);

checkbox.addEventListener('change', () => {
  if (checkbox.checked) {
    resizeObserver.observe(divElem);
  } else {
    resizeObserver.unobserve(divElem);
  }
});
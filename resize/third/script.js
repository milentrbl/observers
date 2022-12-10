const changeStyles = (elements, properties, values) =>
  elements.forEach((element, index) => {
    element.style[properties[index]] = values[index];
  });

const observer = new ResizeObserver((entries) => {
  for (const entry of entries) {
    const width = entry.contentRect.width;

    if (width > 768) {
      changeStyles(
        [box, title, text, info],
        ["filter", "fontSize", "fontSize", "opacity"],
        ["invert(0%)", "2rem", "1.25rem", "1"]
      );
    } else {
      changeStyles(
        [box, title, text, info],
        ["filter", "fontSize", "fontSize", "opacity"],
        ["invert(100%)", "1.5rem", "1rem", "0"]
      );
    }
  }
});

observer.observe(box);

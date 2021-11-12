const loadImage = (url, alt = "") => {
  return new Promise((resolve) => {
    const image = new Image();
    image.addEventListener("load", () => {
      resolve(image);
    });
    image.src = url;
    image.alt = alt;
  });
};

export { loadImage };

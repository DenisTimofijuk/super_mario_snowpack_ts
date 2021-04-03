export function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve) => {
    const image = new Image();
    image.addEventListener('load', () => {
      resolve(image);
    });
    image.src = url;
  });
}

export async function loadJSON<T extends JSON_object>(url: string): Promise<T> {
  const r = await fetch(url);
  return await r.json();
}

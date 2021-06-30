export function uuid() {
  return Math.random().toString().slice(2);
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[-]+/g, "-")
    .replace(/[^\w-]+/g, "");
}

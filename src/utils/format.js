export function money(value) {
  return `Rs ${Number(value).toLocaleString("en-LK")}`;
}

export function slugText(value) {
  return value.toLowerCase().trim();
}

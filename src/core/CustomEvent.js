export function EmitEvent(name, data) {
  const event = new CustomEvent(name, { detail: data });
  document.dispatchEvent(event);
}

export function EventOutput(name, callback) {
  document.addEventListener(name, callback);
}
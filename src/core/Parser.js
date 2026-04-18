export const createElement = (template, componentInstance) => {
  if (template === null || template === undefined) return document.createTextNode('');
  if (typeof template === 'string' || typeof template === 'number') return document.createTextNode(template);
  if (typeof template === 'function') return createElement(template(), componentInstance);

  const tagName = Object.keys(template)[0];
  const props = template[tagName];
  const element = document.createElement(tagName);

  Object.entries(props).forEach(([key, value]) => {
    if (key === 'content') {
      const children = Array.isArray(value) ? value : [value];
      children.forEach(child => {
        if (child !== null && child !== undefined) {
            element.appendChild(createElement(child, componentInstance));
        }
      });
    } 
    else if (key.startsWith('on') && typeof value === 'function') {
      element.addEventListener(key.toLowerCase().substring(2), value.bind(componentInstance));
    } 
    else {
      element.setAttribute(key, value);
    }
  });
  return element;
};
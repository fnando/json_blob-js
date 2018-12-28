export function dump(data, jsonEngine = JSON) {
  return btoa(jsonEngine.stringify(data));
}

export function parse(data, jsonEngine = JSON) {
  return jsonEngine.parse(atob(data));
}

export function load(name, options = {}) {
  const jsonEngine = options.jsonEngine || JSON;
  const defaultValue = options.defaultValue || null;
  const element = document.querySelector(`[type="application/json;base64"][data-name="${name}"]`);

  if (!element) {
    return defaultValue;
  }

  return parse(element.innerHTML, jsonEngine);
}

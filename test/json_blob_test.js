import assert from "assert";
import { JSDOM } from "jsdom";

import jsonBlob, { load, dump, parse } from "../src/json_blob";

suite("json_blob", () => {
  setup(() => {
    global.window = (new JSDOM("")).window;
    global.document = global.window.document;

    global.btoa = content => {
      return Buffer.from(content).toString("base64");
    };

    global.atob = content => {
      return Buffer.from(content, "base64").toString();
    };
  });

  test("dumps data", () => {
    const encoded = dump({a: 1});
    const decoded = JSON.parse(atob(encoded));

    assert.equal(encoded, "eyJhIjoxfQ==");
    assert.equal(decoded.a, 1);
  });

  test("parses data", () => {
    const encoded = "eyJhIjoxfQ==";
    const decoded = parse(encoded);

    assert.equal(decoded.a, 1);
  });

  test("uses custom JSON engine", () => {
    const engine = {
      stringify(data) {
        return JSON.stringify(Object.assign({stringify: true}, data));
      },

      parse(data) {
        return Object.assign(JSON.parse(data), {parse: true});
      }
    };

    const encoded = dump({a: 1}, engine);
    const decoded = parse(encoded, engine);

    assert(decoded.parse);
    assert(decoded.stringify);
    assert.equal(decoded.a, 1);
  });

  test("loads data from DOM", () => {
    const script = document.createElement("script");
    script.type = "application/json;base64";
    script.dataset.name = "sample";
    script.innerHTML = dump({message: "loaded from DOM"});
    document.body.appendChild(script);

    assert.equal(load("sample").message, "loaded from DOM");
  });

  test("loads data from DOM using custom JSON engine", () => {
    const engine = {
      stringify(data) {
        return JSON.stringify(Object.assign({stringify: true}, data));
      },

      parse(data) {
        return Object.assign(JSON.parse(data), {parse: true});
      }
    };

    const script = document.createElement("script");
    script.type = "application/json;base64";
    script.dataset.name = "sample";
    script.innerHTML = dump({message: "loaded from DOM"}, engine);
    document.body.appendChild(script);

    const decoded = load("sample", {jsonEngine: engine});

    assert.equal(decoded.message, "loaded from DOM");
    assert(decoded.parse);
    assert(decoded.stringify);
  });

  test("returns default value when DOM doesn't exist", () => {
    assert.equal(load("missing"), null);
    assert.equal(load("missing", {defaultValue: "DEFAULT"}), "DEFAULT");
  });

  test("exports default module", () => {
    assert.equal(jsonBlob.dump, dump);
    assert.equal(jsonBlob.load, load);
    assert.equal(jsonBlob.parse, parse);
  });
});

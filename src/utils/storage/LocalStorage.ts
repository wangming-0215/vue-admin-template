export default class LocalStorage {
  name: string;

  #driver: Storage = window.localStorage;

  constructor(options: { name: string }) {
    this.name = options.name;
  }

  set<T>(key: string, value: T) {
    const json = JSON.stringify(value);
    this.#driver.setItem(`${this.name}/${key}`, json);
  }

  get<T>(key: string): T | null {
    const json = this.#driver.getItem(`${this.name}/${key}`);
    if (!json) {
      this.remove(key);
      return null;
    }

    let parsed: T | null = null;
    try {
      parsed = JSON.parse(json);
    } catch {}

    if (parsed) {
      return parsed as T;
    }

    return null;
  }

  remove(key: string) {
    this.#driver.removeItem(`${this.name}/${key}`);
  }

  clear() {
    this.#driver.clear();
  }
}

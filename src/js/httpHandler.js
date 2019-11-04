export class HttpHandler{
  constructor() {}

  async get(url) {
    const data = await fetch(url);
    return await data.json();
  }
}
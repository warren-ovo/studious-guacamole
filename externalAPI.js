const axios = require("axios");
const logger = require("./logger");
const asyncLocalStorage = require("./asyncContext");

class ExternalAPIClient {
  constructor(baseURL, defaultHeaders = {}) {
    this.baseURL = baseURL;
    this.defaultHeaders = defaultHeaders;
  }

  async post(url, data = {}, headers = {}) {
    try {
      const { traceToken } = asyncLocalStorage.getStore();
      const response = await axios.post(`${this.baseURL}${url}`, data, {
        headers: {
          "x-trace-token": traceToken,
          ...this.defaultHeaders,
          ...headers,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(`Error sending POST request to ${url}: ${error.message}`);
    }
  }

  async get(url, headers = {}) {
    try {
      const { traceToken } = asyncLocalStorage.getStore();
      const response = await axios.get(`${this.baseURL}${url}`, {
        headers: {
          "x-trace-token": traceToken,
          ...this.defaultHeaders,
          ...headers,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(`Error sending POST request to ${url}: ${error.message}`);
    }
  }

  async topUp(data) {
    const url = "/topUp"; // Replace with the appropriate route on the external API
    const headers = { "Content-Type": "application/json" };
    return this.post(url, data, headers);
  }

  async getPets(id) {
    const url = "/pets";
    try {
      if (id !== undefined) {
        const pet = await this.get(`${url}/${id}`);
        const owner = await this.get(`/owners/${pet.ownerId}`);
        const breed = await this.get(`/breeds/${pet.breedId}`);
        return { name: pet.name, owner: owner.name, breed: breed.name };
      } else {
        return this.get(url);
      }
    } catch (error) {
      console.log(error);
      if (error.response?.status === 404) {
        throw new HTTPError(404);
      } else {
        throw error;
      }
    }
  }
}

const PETS_URL = "https://b7d2cba3-23e4-4881-bf8d-a58d9776eb94.mock.pstmn.io"
// "http://localhost:3030"


module.exports = {
  ExternalAPIClient,
  petService: new ExternalAPIClient(PETS_URL),
};

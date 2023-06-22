const axios = require("axios");
const logger = require("./logger");
const { specialSubRoutine } = require("./helpers");

class ExternalAPIClient {
  constructor(baseURL, defaultHeaders = {}) {
    this.baseURL = baseURL;
    this.defaultHeaders = defaultHeaders;
  }

  async post(url, data = {}, headers = {}) {
    try {
      const response = await axios.post(`${this.baseURL}${url}`, data, {
        headers: { ...this.defaultHeaders, ...headers },
      });
      return response.data;
    } catch (error) {
      throw new Error(`Error sending POST request to ${url}: ${error.message}`);
    }
  }

  async funRoute() {
    // Generate a random number between 1 and 10
    const randomNumber = Math.floor(Math.random() * 10) + 1;

    // Simulate HTTP responses based on the random number
    if (randomNumber <= 4) {
      // Simulate a successful response (2xx status code)
      logger.info("Simulating a successful response...");
      return { status: 200, data: "Success" };
    } else if (randomNumber <= 7) {
      // Simulate a client error response (4xx status code)
      logger.info("Simulating a client error response...");
      specialSubRoutine();
      return { status: 404, data: "Not Found" };
    } else {
      // Simulate a server error response (5xx status code)
      logger.info("Simulating a server error response...");
      return { status: 500, data: "Internal Server Error" };
    }
  }

  async sendRequest1(data) {
    const url = "/route1"; // Replace with the appropriate route on the external API
    const headers = { "Content-Type": "application/json" };
    return this.post(url, data, headers);
  }

  async sendRequest2(data) {
    const url = "/route2"; // Replace with the appropriate route on the external API
    const headers = { "Content-Type": "application/json" };
    return this.post(url, data, headers);
  }
}

module.exports = {
  ExternalAPIClient,
  smets2Service: new ExternalAPIClient("http://localhost:3000"),
};

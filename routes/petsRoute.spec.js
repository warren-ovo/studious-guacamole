const nock = require("nock");
const axios = require("axios");


describe("pets route - start to finish", () => {
  it("return pet list", async () => {
    const response = await fetch("http://localhost:3000/pets");
    const body = await response.json();
    expect(await response.status).toBe(200);
    expect(body).toHaveLength(2);
  });
  it("return individual pet", async () => {
    const response = await fetch("http://localhost:3000/pets/1");
    expect(await response.status).toBe(200);
    const body = await response.json();
    expect(body).toHaveProperty("name");
    expect(body).toHaveProperty("owner");
  });
});

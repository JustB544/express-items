process.env.NODE_ENV = "test";

const request = require("supertest");

const app = require("./app");
let items = require("./fakeDb");

let item = { name: "popsicle", price: 1.45 };

beforeEach(function() {
  items.push(item);
});

afterEach(function() {
  items.length = 0;
});

describe("GET /items", function() {
    test("Gets a list of items", async function() {
      const resp = await request(app).get(`/items`);
      expect(resp.statusCode).toBe(200);
  
      expect(resp.body).toEqual([item]);
    });

    test("Gets a specific item", async function() {
      const resp = await request(app).get(`/items/popsicle`);
      expect(resp.statusCode).toBe(200);
  
      expect(resp.body).toEqual(item);
    });
});

describe("POST /items", function() {
  test("Adds a new item", async function() {
    const resp = await request(app)
    .post(`/items`)
    .send({name: "chocolate", price: 2.00});
    expect(resp.statusCode).toBe(201);
    expect(items[1]).toEqual({name: "chocolate", price: 2.00});

    expect(resp.body).toEqual({added: {name: "chocolate", price: 2.00}});
  });
});

describe("PATCH /items/:name", function() {
  test("Updates an existing item", async function() {
    const resp = await request(app)
    .patch(`/items/popsicle`)
    .send({name: "popsicle", price: 1.25});
    expect(resp.statusCode).toBe(200);
    expect(items[0]).toEqual({name: "popsicle", price: 1.25});

    expect(resp.body).toEqual({updated: {name: "popsicle", price: 1.25}});
  });
});

describe("DELETE /items/:name", function() {
  test("Deletes an existing item", async function() {
    const resp = await request(app).delete(`/items/popsicle`);
    expect(resp.statusCode).toBe(200);
    expect(items).toEqual([]);

    expect(resp.body).toEqual({message: "Deleted"});
  });
});
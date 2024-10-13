const request = require("supertest");
const server = require("../index");

describe("Operaciones CRUD de cafes", () => {

  // GET /cafes
  it("debería devolver un status 200 y un arreglo con al menos un objeto", async () => {
    const response = await request(server).get("/cafes");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });

  // DELETE /cafes con un id inexistente
  it("debería devolver un status 404 al intentar eliminar un café con un id que no existe", async () => {
    const jwt = "Bearer token_valido";
    const response = await request(server)
      .delete("/cafes/999")
      .set("Authorization", jwt); 
    expect(response.status).toBe(404);
  });

  // POST /cafes
  it("debería agregar un nuevo café y devolver un status 201", async () => {
    const nuevoCafe = { id: 5, nombre: "Latte" };
    const response = await request(server).post("/cafes").send(nuevoCafe);
    expect(response.status).toBe(201);
    expect(response.body).toContainEqual(nuevoCafe);
  });

  // PUT /cafes con IDs diferentes
  it("debería devolver un status 400 si los IDs no coinciden entre parámetros y payload", async () => {
    const cafeActualizado = { id: 3, nombre: "Café actualizado" };
    const response = await request(server).put("/cafes/2").send(cafeActualizado);
    expect(response.status).toBe(400);
  });
});

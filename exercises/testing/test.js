const users = require("./users");

// write some tests
describe("users", () => {
  test("findUser", (done) => {
    users
      .findUser(1)
      .then((res) => {
        expect(res.id).toBe(1);
        done();
      })
      .catch((err) => {
        expect(err.message).toEqual(`No user with id "${id}"`);
        done();
      });
  });
  test("deleteUser", () => {
    users
    .deleteUser(1)
    .then((res) => {
      expect(res.id).toBe(1);
      done();
    })
    .catch((err) => {
      expect(err.message).toEqual(`No user with id "${id}"`);
      done();
    });
  })
});

import { assert } from "chai";
import { sayHello, addNumber, parentFunction } from "../app.js";

describe("App", () => {
  describe("sayHello", () => {
    it("should return hello", () => {
      const result = sayHello();
      assert.equal(result, "hello");
    });
  });

  describe("addNumber", () => {
    it("should return 25 when multiplying 5 and 5", () => {
      const result = addNumber(5, 5);
      assert.equal(result, 25);
    });
    it("should return 25 when multiplying 5 and 5", () => {
      const result = addNumber(5, 5);
      assert.isNumber(result, "this should return a number");
    });
  });

  describe("parentFunction", () => {
    describe("Return Type", () => {
      it("should return an object", () => {
        const result = parentFunction();
        assert.isObject(result, "Expected result to be an object");
      });
    });

    describe("Properties", () => {
      it("should have a 'hello' property of type string", () => {
        const result = parentFunction();
        assert.property(
          result,
          "hello",
          "Expected result to have a 'hello' property"
        );
        assert.isString(
          result.hello,
          "Expected 'hello' property to be a string"
        );
      });

      it("should have an 'addResult' property of type number", () => {
        const result = parentFunction();
        assert.property(
          result,
          "addResult",
          "Expected result to have an 'addResult' property"
        );
        assert.isNumber(
          result.addResult,
          "Expected 'addResult' property to be a number"
        );
      });
    });

    describe("Property Values", () => {
      it("should have 'hello' property with value 'hello'", () => {
        const result = parentFunction();
        assert.propertyVal(
          result,
          "hello",
          "hello",
          "Expected 'hello' property to be 'hello'"
        );
      });

      it("should have 'addResult' property with value 25", () => {
        const result = parentFunction();
        assert.propertyVal(
          result,
          "addResult",
          25,
          "Expected 'addResult' property to be 25"
        );
      });
    });
  });
});

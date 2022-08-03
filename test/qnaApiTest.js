var chakram = require('chakram');
  expect = chakram.expect;


  describe("Questions API", () => {
    var questionsResponse;

    before(async () => {
      questionsResponse = await chakram.get('http://localhost:3001/qa/questions/?product_id=1')
      console.log(questionsResponse.body)
      return questionsResponse
    });

    it("should return 200 on success", () => {
      expect(questionsResponse).to.have.status(200);
    });

    it("should return product_id 1", () => {
      expect(questionsResponse.body.product_id).to.equal(1);
    });

    // it("should return ")
  });

  describe("Answers API", () => {
    var response;

    before(async() => {
      response = await chakram.get('http://localhost:3001/qa/questions/1/answers');
      console.log(response.body);
      return response;
    });

    it("should return 200 on success", () => {
      expect(response).to.have.status(200);
    })

    it("should return question 1", () => {
      expect(response.body.question).to.equal(1);
    })

    it("should return result array", () => {
      expect(response.body.result.length > 0).to.equal(true);
    })
  })
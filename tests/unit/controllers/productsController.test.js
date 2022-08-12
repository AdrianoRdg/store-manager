const { expect } = require('chai');
const sinon = require('sinon');

const productsController = require('../../../controllers/productsController');

describe('Tesa camada de controllers', () => {
  describe('Testa função getProducts', () => {
    it('Testa se a função retorna um codigo e os produtos da db', async () => {
      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      const expectResponse = {};
      sinon.stub(productsController, 'getProducts').resolves(expectResponse);


      await productsController.getProducts(req, res);

      expect(res.status.calledWith(200)).to.be.eq(true);
    });
  });
});
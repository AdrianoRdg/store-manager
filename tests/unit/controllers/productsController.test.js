const { expect } = require('chai');
const sinon = require('sinon');

const productsController = require('../../../controllers/productsController');
const productsService = require('../../../services/productsService');

describe('Tesa camada de controllers', () => {
  describe('Testa função getProducts', () => {
    it('Testa se a função retorna um codigo e os produtos da db', async () => {
      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      const expectResponse = { code:200, data: [] };
      sinon.stub(productsService, 'getProducts').resolves(expectResponse);


      await productsController.getProducts(req, res);

      expect(res.status.calledWith(200)).to.be.true;
    });

    afterEach(() => {
      sinon.restore();
    })
  });

  describe('Testa a função getProductById', () => {
    it('Testa se a função retorna um objeto com o codigo e outro com produto do id especificado', async () => {
      const req = {};
      const res = {};
      req.params = { id: 1 };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns({ id: 1, name: 'nome' });

      const aa = { code: 200, data: {} };
      sinon.stub(productsService, 'getProductById').resolves(aa);

      await productsController.getProductById(req, res);

      expect(res.status.calledWith(200)).to.be.equal(true);
    });
  });
});
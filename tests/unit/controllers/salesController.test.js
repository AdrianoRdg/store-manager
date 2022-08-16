const { expect } = require('chai');
const sinon = require('sinon');

const salesController = require('../../../controllers/salesController');
const salesService = require('../../../services/salesService');


describe('Testes da camda de sales controllers', () => {
  describe('Testa a dunção getAllSales', () => {
    it('Testa a requisição da gota de getAllSales', async () => {
      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns({ data: '' });

      const expectResponse = { code: 200, data: {} }
      sinon.stub(salesService, 'getAllSales').resolves(expectResponse);

      await salesController.getAllSales(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith({})).to.be.true;
    });

    afterEach(() => {
      sinon.restore();
    });
  });

  describe('Testa a dunção getSalesById', () => {
    it('Testa a requisição da gota de getSalesById', async () => {
      const req = {};
      const res = {};
      req.params = { id: 1 }

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns({ data: '' });

      const expectResponse = { code: 200, data: {} }
      sinon.stub(salesService, 'getSalesById').resolves(expectResponse);

      await salesController.getSalesById(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith({})).to.be.true;
    });

    afterEach(() => {
      sinon.restore();
    });
  });
});
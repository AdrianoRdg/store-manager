const { expect } = require('chai');
const sinon = require('sinon');

const salesController = require('../../../controllers/salesController');
const salesService = require('../../../services/salesService');


describe('Testes da camda de sales controllers', () => {
  const req = {};
  const res = {};

  describe('Testa a dunção getAllSales', () => {
    it('Verifica se a função retorna todos os produtos', async () => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      const expectResponse = { code: 200, data: [] }
      sinon.stub(salesService, 'getAllSales').resolves(expectResponse);

      await salesController.getAllSales(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith([])).to.be.true;
    });
  });

  describe('Testes da função getSalesById', () => {
    it('Verifica falha na requisião com mensagem de compra não encontrada', async () => {
      req.params = { id: 1 };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns({ message: 'Sale not found' });

      const expectResponse = { code: 404, message: 'Sale not found' }
      sinon.stub(salesService, 'getSalesById').resolves(expectResponse);

      await salesController.getSalesById(req, res);

      expect(res.status.calledWith(404)).to.be.true;
      expect(res.json.calledWith({ message: 'Sale not found' })).to.be.true;
    });

    it('Verifica sucesso na requisição, retornando o código e a sale', async () => {
      req.params = { id: 1 }

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns({ data: {} });

      const expectResponse = { code: 200, data: {} }
      sinon.stub(salesService, 'getSalesById').resolves(expectResponse);

      await salesController.getSalesById(req, res);
     
      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith({})).to.be.true;
    });
  });

  describe(('Testes da função addSales'), () => {
    it('Verifica sucesso na requisição, retornando código e a sale adicionada', async () => {
      req.body = [{ productId: 1, quantity: 1 }];

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns({ data: {}});

      const expectResponse = { code: 201, data: {} }

      sinon.stub(salesService, 'addSales').resolves(expectResponse);

      await salesController.addSales(req, res);

      expect(res.status.calledWith(201)).to.be.true;
      expect(res.json.calledWith({})).to.be.true;
    });
  });

  describe('Testes da função deleteSale', () => {
    it('Verifica caso de falha da requisição com mensagem de compra não encontrada', async () => {
      req.params = { id: 50 };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns({});

      const expectResponse = { code: 404, message: 'Sale not found' }

      sinon.stub(salesService, 'deleteSale').resolves(expectResponse);

      await salesController.deleteSale(req, res);

      expect(res.status.calledWith(404)).to.be.true;
      expect(res.json.calledWith({ message: 'Sale not found'})).to.be.true;
    });
  
    it('Verifica sucesso na requisição retornando apenas o código de sale deletada', async () => {
      req.params = { id: 1 };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      const expectResponse = { code: 204 }

      sinon.stub(salesService, 'deleteSale').resolves(expectResponse);

      await salesController.deleteSale(req, res);

      expect(res.status.calledWith(204)).to.be.true;
      expect(res.json.calledWith({})).to.be.false;
    });
  });

  describe('Testes da função updateSales', () => {
    it('Verifica caso de falha na requisição com mensagem de compra não encontrada', async () => {
      req.params = { id: 50 };
      req.body = [{ productId: 1, quantity: 10 }];

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns({});

      const expectResponse = { code: 404, message: 'Sale not found' }

      sinon.stub(salesService, 'updateSales').resolves(expectResponse);

      await salesController.updateSales(req, res);

      expect(res.status.calledWith(404)).to.be.true;
      expect(res.json.calledWith({ message: 'Sale not found'})).to.be.true;
    });

    it('Verifica sucesso na requisição, retornando o código e produto atualizado', async () => {
      req.params = { id: 1 };
      req.body = [{ productId: 1, quantity: 10 }];

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns({});

      const expectResponse = { code: 200, data: {} }

      sinon.stub(salesService, 'updateSales').resolves(expectResponse);

      await salesController.updateSales(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith({})).to.be.true;
    });
  });

  afterEach(() => {
    sinon.restore();
  });
});
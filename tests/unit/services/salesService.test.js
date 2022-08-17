const { expect } = require('chai');
const sinon = require('sinon');

const salesService = require('../../../services/salesService');
const salesModel = require('../../../models/salesModel');


describe('Testes da camada de services ', () => {
  describe('Testa retorno da função getAllSales ', () => {
    it('A função deve retornar um array com code e um array com todas as sales em camel case', async () => {
      const expectResponse = [{ sale_id: 1, date: '', product_id: '', quantity: '' }]
      sinon.stub(salesModel, 'getAllSales').resolves(expectResponse);
      const response = await salesService.getAllSales();

      expect(response).to.be.an('object');
      expect(response).to.have.property('data').to.be.an('array');
      expect(response.data[0]).to.have.keys('saleId', 'date', 'productId', 'quantity');
    });
  });

  describe("Testes do retorno da função getSalesById", () => {
    it('Verifica se a função retorna um objeto com code e dados convertidos em camel case', async () => {
      const expectResponse = [{ sale_id: 1, date: '', product_id: '', quantity: '' }]
      sinon.stub(salesModel, 'getSalesById').resolves(expectResponse);

      const id = 1
      const response = await salesService.getSalesById(id);

      expect(response).to.be.an('object');
      expect(response).to.have.keys('code', 'data');
      expect(response).to.have.property('code').to.eq(200);
      expect(response.data[0]).to.have.keys('date', 'productId', 'quantity');
    });
  });

  afterEach(() => {
    sinon.restore();
  });
});
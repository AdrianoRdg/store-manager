const { expect } = require('chai');
const sinon = require('sinon');

const salesService = require('../../../services/salesService');
const salesModel = require('../../../models/salesModel');


describe('Testes da camada de services ', () => {
  describe('Testa retorno da função getAllSales ', () => {
    it('A função deve retornar as informações de maneira correta', async () => {

      sinon.stub(salesModel, 'getAllSales').resolves([]);

      const response = await salesService.getAllSales();

      expect(response).to.be.an('object');
      expect(response).to.have.property('data').to.be.an('array');
    });

    afterEach(() => {
      sinon.restore();
    });
  });
});
const { expect } = require('chai');
const sinon = require('sinon');
const salesModel = require('../../../models/salesModel');
const connection = require('../../../models/connection');

describe('Testes da camada model de sales', () => {
  describe('Testa o funcionamento da função getAllSales', () => {
    it('A função getAllSales deve retornar as sales', async () => {
      const expectResponse = [{ date: '' }, { date: '' }];
      sinon.stub(connection, 'execute').resolves([expectResponse]);

      const response = await salesModel.getAllSales();

      expect(response).to.be.an('array');
      expect(response[0]).to.have.property('date').to.eq(expectResponse[0].date);
    });
    
    afterEach(() => {
      sinon.restore();
    })
  });
});
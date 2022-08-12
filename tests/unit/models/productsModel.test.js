const { expect } = require('chai');
const sinon = require('sinon');
const productModel = require('../../../models/productsModel');
const connection = require('../../../models/connection');

describe('Testes da camada model', () => {
  describe('Testa a resposta das funções da camada models', () => {
    it('A função getAll deve retornar todos os produtos da db', async () => {
      const response = await productModel.getAll();
      expect(response).to.be.an('array');
    });

    it('Testa se a função getOneById retorna apenas um produto', async () => {
      const id = 1;
      const expectResponse = { name: 'produto', id: 5 };

      sinon.stub(connection, 'execute').resolves([[expectResponse]]);

      const response = await productModel.getOneById(id);
      expect(response).to.be.an('object');
      expect(response).to.have.property('id').to.eq(expectResponse.id);
    });

    afterEach(() => {
      sinon.restore();
    });
  });
});
const { expect } = require('chai');
const sinon = require('sinon');

const productsService = require('../../../services/productsService');
const productsModel = require('../../../models/productsModel');

describe('Testes da camada de services', () => {
  describe('Testa as funções da getProducts', () => {
    it('Testa se a função getProducts retorna um objeto com o codigo e um array com todos os produtos', async () => {
      
      sinon.stub(productsModel, 'getAll').resolves([]);

      const response = await productsService.getProducts();
      expect(response).to.be.a('object');
      expect(response.data).to.be.an('array');
    });

    afterEach(() => {
      sinon.restore();
    });
  });

  describe('Testa a função getProductById', () => {
    it('Testa sucesso da requisição retornando um codigo e um objeto com o produto', async () => {
      sinon.stub(productsModel, 'getAll').resolves([]);
      const id = 1;

      const response = await productsService.getProductById(id);
      expect(response).to.be.a('object');
    })
  });

  it('Testa caso de falha em que a requisição não encontra o produto e retorna um codigo e uma menssagem de erro', async () => {
    const expectResponse = { code: 404, message: 'Product not found' };
    const id = 57;
    sinon.stub(productsService, 'getProductById').resolves(expectResponse);

    const response = await productsService.getProductById(id);
    expect(response).to.have.keys('code', 'message');
  });

  afterEach(() => {
    sinon.restore();
  });
});
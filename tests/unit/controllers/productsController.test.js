const { expect } = require('chai');
const sinon = require('sinon');

const productsController = require('../../../controllers/productsController');
const productsService = require('../../../services/productsService');

describe('Tesa camada de controllers', () => {
  const req = {};
  const res = {};

  describe('Testa função getProducts', () => {
    it('Verifica se a função retorna um codigo e todos os produtos', async () => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      const expectResponse = { code:200, data: [] };
      sinon.stub(productsService, 'getProducts').resolves(expectResponse);


      await productsController.getProducts(req, res);

      expect(res.status.calledWith(200)).to.be.true;
    });
  });

  describe('Testa a função getProductById', () => {
    it('Verifica falha caso não encontre o produto, retornando códido e mensagem de erro', async () => {
      req.params = { id: 1 };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      const expectResponse = { code: 404, message: 'Product not found' };
      sinon.stub(productsService, 'getProductById').resolves(expectResponse);

      await productsController.getProductById(req, res);

      expect(res.status.calledWith(404)).to.be.true;
      expect(res.json.calledWith({ message: 'Product not found' })).to.be.true;
    });

    it('verifica sucesso retornando codigo e o produto', async () => {
      req.params = { id: 1 };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns({ id: 1, name: 'nome' });

      const aa = { code: 200, data: {} };
      sinon.stub(productsService, 'getProductById').resolves(aa);

      await productsController.getProductById(req, res);

      expect(res.status.calledWith(200)).to.be.equal(true);
      expect(res.json.calledWith({})).to.be.equal(true);
    });
  });

  describe('Testa a função updateProduct', () => {
    it('Verifica falha caso não encontre o produto', async () => {
      req.params = { id: 1 };
      req.body = { name: 'nome' };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      const expectResponse = { code: 404, message: 'Product not found' };
      sinon.stub(productsService, 'updateProduct').resolves(expectResponse);

      await productsController.updateProduct(req, res);

      expect(res.status.calledWith(404)).to.be.true;
      expect(res.json.calledWith({ message: 'Product not found' })).to.be.true;
    });

    it('Verifica se a função retorna um objeto com codigo e nome e id do produto alterado', async () => {
      req.params = { id: 1 };
      req.body = { name: 'product' };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      const stubResponse = { code: 200, data: { name: 'product', id: 1 } };
      sinon.stub(productsService, 'updateProduct').resolves(stubResponse);

      await productsController.updateProduct(req, res);
      
      expect(res.status.calledWith(200)).to.be.equal(true);
      expect(res.json.calledWith(stubResponse.data)).to.be.equal(true);
    });
  });

  describe('Testa a função addProduct', () => {
    it('Verifica se a função retorna um objeto com codigo e nome do produto adicionado', async () => {
      req.body = { name: 'product' };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      const stubResponse = { code: 201, data: { id: 1, name: 'product' } };
      sinon.stub(productsService, 'addProduct').resolves(stubResponse);

      await productsController.addProduct(req, res);

      expect(res.status.calledWith(201)).to.be.equal(true);
      expect(res.json.calledWith({ id: 1, name: 'product' })).to.be.equal(true);
    });
  });

  describe('Testa a função deleteProduct', () => {
    it('Verifica falha caso não encontre o produto', async () => {
      req.params = { id: 1 };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      const expectResponse = { code: 404, message: 'Product not found' };
      sinon.stub(productsService, 'deleteProduct').resolves(expectResponse);

      await productsController.deleteProduct(req, res);

      expect(res.status.calledWith(404)).to.be.true;
      expect(res.json.calledWith({ message: 'Product not found' })).to.be.true;
    });

    it('Verifica se a função retorna um objeto com codigo e nome do produto deletado', async () => {
      req.params = { id: 1 };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      const stubResponse = { code: 204 };
      sinon.stub(productsService, 'deleteProduct').resolves(stubResponse);

      await productsController.deleteProduct(req, res);

      expect(res.status.calledWith(204)).to.be.equal(true);
      expect(res.json.calledWith()).to.be.equal(true);
    });
  });

  describe('Testa a função getProductByQuery', () => {
    it('Verifica caso de retorno de todos os produtos caso não seja passado uma query', async () => {
      req.query = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      const stubResponse = { code: 200, data: [] };
      sinon.stub(productsService, 'getProducts').resolves(stubResponse);

      await productsController.getProductByQuery(req, res);

      expect(res.status.calledWith(200)).to.be.equal(true);
      expect(res.json.calledWith([])).to.be.equal(true);
    });

    it('Verifica se a função retorna um objeto com codigo de sucesso de produto deletado sem o retornar nada ao usuario', async () => {
      req.query = { q: 'product' };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      const stubResponse = { code: 200, data: [] };
      sinon.stub(productsService, 'getProductByQuery').resolves(stubResponse);

      await productsController.getProductByQuery(req, res);

      expect(res.status.calledWith(200)).to.be.equal(true);
      expect(res.json.calledWith([])).to.be.equal(true);
    });
  });

  afterEach(() => {
    sinon.restore();
  });
});
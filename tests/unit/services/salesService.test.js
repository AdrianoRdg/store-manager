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

    it('Verifica se a função retorna um objeto com code e mensagem de erro caso não encontre a sale', async () => {
      const expectResponse = []
      sinon.stub(salesModel, 'getSalesById').resolves(expectResponse);

      const id = 1
      const response = await salesService.getSalesById(id);

      expect(response).to.be.an('object');
      expect(response).to.have.keys('code', 'message');
      expect(response).to.have.property('code').to.eq(404);
      expect(response).to.have.property('message').to.eq('Sale not found');
    });
  });

  describe('Testes do retorno da função addSales', () => {
    it('Verifica se a função retorna um objeto com code e dados convertidos em camel case', async () => {
      const expectResponse = {
        saleId: 1,
        itemsUpdated: [
          {
            productId: 1,
            quantity: 10
          },
          {
            productId: 2,
            quantity: 50
          }
        ]
      };

      const bodyData = [
        {
          productId: 1,
          quantity: 10
        },
        {
          productId: 2,
          quantity: 50
        }
      ];

      sinon.stub(salesModel, 'addSale').resolves(1);
      sinon.stub(salesModel, 'addSaleProducts').resolves(expectResponse);

      const response = await salesService.addSales(bodyData);

      expect(response).to.be.an('object');
      expect(response).to.have.keys('code', 'data');
      expect(response).to.have.property('code').to.eq(201);
      expect(response.data).to.have.keys('saleId', 'itemsUpdated');
    });
  });

  describe('Testes do retorno da função deleteSale', () => {
    it('Verifica se a função retorna um objeto com code e mensagem de erro caso não encontre a sale', async () => {
      const expectResponse = [];
      sinon.stub(salesModel, 'getSalesById').resolves(expectResponse);

      const id = 50;
      const response = await salesService.deleteSale(id);

      expect(response).to.be.an('object');
      expect(response).to.have.keys('code', 'message');
      expect(response).to.have.property('code').to.eq(404);
      expect(response).to.have.property('message').to.eq('Sale not found');
    });

    it('Verifica se a função retorna um objeto com code caso encontre a sale', async () => {
      const expectResponse = { code: 204 };
      sinon.stub(salesModel, 'deleteSale').resolves(expectResponse);
      
      const id = 1;
      const response = await salesService.deleteSale(id);

      expect(response).to.be.an('object');
      expect(response).to.have.keys('code');
      expect(response).to.have.property('code').to.eq(204);
    });
  });

  describe('Testes do retorno da função updateSale', () => {
    it('Verifica se a função retorna um objeto com code e mensagem de erro caso não encontre a sale', async () => {
      const expectResponse = [];
      sinon.stub(salesModel, 'getSalesById').resolves(expectResponse);

      const id = 50;
      const bodyData = [
        {
          "productId": 1,
          "quantity": 10
        },
      ];
      const response = await salesService.updateSales(id, bodyData);

      expect(response).to.be.an('object');
      expect(response).to.have.keys('code', 'message');
      expect(response).to.have.property('code').to.eq(404);
      expect(response).to.have.property('message').to.eq('Sale not found');
    });

    it('Verifica se a função retorna um objeto com code caso encontre a sale', async () => {
      const expectResponse = { saleId: 1, itemsUpdated: [] };
      sinon.stub(salesModel, 'updateSales').resolves(expectResponse);
      
      const id = 1;
      const bodyData = [
        {
          "productId": 1,
          "quantity": 10
        },
      ];
      const response = await salesService.updateSales(id, bodyData);

      expect(response).to.be.an('object');
      expect(response).to.have.keys('code', 'data');
      expect(response).to.have.property('code').to.eq(200);
    });
  });

  afterEach(() => {
    sinon.restore();
  });
});
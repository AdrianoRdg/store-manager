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
  });

  describe('Testa o funcionamento da função getSaleById', () => {
    it('verfica se não existe a sale', async () => {
      sinon.stub(connection, 'execute').resolves([]);
      const response = await salesModel.getSalesById(1);

      expect(response).to.be.undefined;
    });

    it('A função getSaleById deve retornar uma sale', async () => {
      const expectResponse = [
        {
          date: "2021-09-09T04:54:29.000Z",
          productId: 1,
          quantity: 2
        },
        {
          date: "2021-09-09T04:54:54.000Z",
          productId: 2,
          quantity: 2
        }
      ];

      sinon.stub(connection, 'execute').resolves([expectResponse]);

      const response = await salesModel.getSalesById(1);

      expect(response).to.be.an('array');
      expect(response).to.eq(expectResponse);
    });
  });

  describe('Testa o funcionamento da função addSales', () => {
    it('A função addSale deve retornar o id da sale adicionada', async () => {
      const expectResponse = [{ insertId: 1 }];
      
      sinon.stub(connection, 'execute').resolves(expectResponse);

      const response = await salesModel.addSale();

      expect(response).to.be.a('number');
    });


    it('A função addSaleProducts deve retornar um obkjeto com as sales cadastradas', async () => {
      const expectResponse = {
        productId: 1,
        quantity: 2
      };

      const data = [
        {
          productId: 1,
          quantity: 1
        },
        {
          productId: 2,
          quantity: 5
        }
      ]

      const id = 1;
      
      sinon.stub(connection, 'execute').resolves([expectResponse]);

      const response = await salesModel.addSaleProducts(id, data);

      expect(response).to.be.an('object');
    });
  });

  describe('Testa o funcionamento da função updateSales', () => {
    it('A função updateSales deve retornar uma sale', async () => {
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

      const sales = [
        {
          productId: 1,
          quantity: 10
        },
        {
          productId: 2,
          quantity: 50
        }
      ];

      const id = 1;

      sinon.stub(connection, 'execute').resolves(expectResponse);

      const response = await salesModel.updateSales(id, sales);
      
      expect(response).to.be.an('object');
      expect(response).to.have.keys('saleId', 'itemsUpdated');
    });
  });

  describe('Testa o funcionamento da função deleteSale', () => {
    it('A função não retorna nada apos deletar uma sale', async () => {
      const id = 1;

      sinon.stub(connection, 'execute').resolves([]);

      const response = await salesModel.deleteSale(id);

      expect(response).to.be.an('undefined');
    });
  });


  afterEach(() => {
    sinon.restore();
  });
});
# Store Manager Project

Projeto de uma API de controle de vendas de uma loja, nele temos as rotas de controle de produtos e vendas, o mesmo foi feito como uma forma de avaliação de conhecimentos sobre node, express e testes com chai e mocka na Trybe.  

## Tecnologias utilizadas

- Docker
- Node
- Express
- Chai
- Mocka

## Orientações

- Clone o projeto
    - `git clone git@github.com:AdrianoRdg/sotre-manager.git`.

Existem duas maneiras de rodar o projeto, via docker e localmente na maquina.

1. Docker
    Suba o container
    
    - `docker-compose up -d`

    Abra o terminal do container
    
    - `docker exec -it store_manager bash`
    
    Instale as dependências
    
    - `npm install`  
    
2. Localmente
    Instale as dependências
  
    - `npm install`

## Utilização de variáveis de ambiente
Na raiz do projeto existe um arquivo chamado .env.exemple, renomeie-o para .env e configure as variáveis de amebiente
 
   
    MYSQL_HOST=localhost
    MYSQL_USER=root
    MYSQL_PASSWORD=password
    MYSQL_DATABASE=StoreManager
    PORT=3000

## Comandos importantes

Após a configuração de variáveis de ambiente, temos os seguintes comandos

- `npm run migration`    // Cria as tabelas no banco de dados  
     
- `npm run seed`    // Popula as tabelas  

- `npm start`    // Inicia o servidor  
    

## Rotas da API

Após iniciar o servidor, a API deve rodar em uma url parecida com a seguinte: 


    http://localhost:3000



- Rotas de produtos
    
    ### [GET] /products
    
    A requisição nessa rota retorna a lista com todos os produtos disponíveis.
    
    ```
    [
        {
          "id": 1,
          "name": "Martelo de Thor",
        },
        {
          "id": 2,
          "name": "Traje de encolhimento",
        }
     ]
    ```
    
    ### [GET] /products/:id
    
    A rota retorna apenas um produto pelo seu respectivo id.
    
    ```
     {
        "id": 1,
        "name": "Martelo de Thor",
     }
    ```
    
    ### [POST] /products
    
    Rota para a inserção de um produto no banco de dados, ela espera o seguinte body:
    
    ```
    {
       "name": "ProdutoX"
    }
    ```
    
    Em caso de sucesso, retorna o seguinte body:
    
    ```
      {
        "id": 4,
        "name": "ProdutoX"
      }
    ```
    
    ### [PUT] /products/:id
    
    Rota para atualizar um produto, ela espera um id passado na rota e o seguinte body:
    
    ```
      {
        "name": "Martelo do Batman"
      }
    ```
    
    E retorna o body:
    
    ```
     {
        "id": 1,
        "name": "Martelo do Batman"
     }
    ```
    
    ### [DELETE] /products/:id
    
    Rota para deletar um produto do banco de dados, ela apenas espera um id e não tem retorno.
    
- Rotas de vendas
    
    ### [GET]  /sales
    
    Rota que lista todas as vendas do banco de dados
    
    ```
      [
        {
          "saleId": 1,
          "date": "2021-09-09T04:54:29.000Z",
          "productId": 1,
          "quantity": 2
        },
        {
          "saleId": 1,
          "date": "2021-09-09T04:54:54.000Z",
          "productId": 2,
          "quantity": 2
        }
      ]
    ```
    
    ### [GET]  /sales/id
    
    Rota que busca uma venda por um id especifico
    
    ```
    {
          "saleId": 1,
          "date": "2021-09-09T04:54:29.000Z",
          "productId": 1,
          "quantity": 2
    }
    ```
    
    ### [POST] /sales
    
    Rota que adiciona vendas ao banco, ela pode receber mais de uma em um array no seguinte formato:
    
    ```
      [
        {
          "productId": 1,
          "quantity":1
        },
        {
          "productId": 2,
          "quantity":5
        }
      ]
    ```
    
    E retorna:
    
    ```
      {
        "id": 3,
        "itemsSold": [
          {
            "productId": 1,
            "quantity":1
          },
          {
            "productId": 2,
            "quantity":5
          }
        ]
      }
    ```
    
    ## [PUT] /sales/id
    
    Rota para atualizar uma venda
    
    ```
    [
        {
          "productId": 1,
          "quantity":10
        },
        {
          "productId": 2,
          "quantity":50
        }
      ]
    ```
    
    Retornando
    
    ```
    "saleId": 1,
        "itemsUpdated": [
          {
            "productId": 1,
            "quantity":10
          },
          {
            "productId": 2,
            "quantity":50
          }
        ]
    ```
    
    ## [DELETE] /sales/id
    
    Rota para deletar uma venda por um id especifico, ela não possui retorno.

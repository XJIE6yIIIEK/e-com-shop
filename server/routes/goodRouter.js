var Router = require('express');
var router = new Router();
var GoodController = require('../controllers/goodController');
var RoleMiddleware = require('../middleware/roleMiddleware');
var RoleMiddleware = require('../middleware/roleMiddleware');

/**
 * @swagger
 * tags:
 *      name: Goods
 *      description: API для управления товарами.
 */

/**
 * @swagger
 * components:
 *      schemas:
 *          GoodType:
 *              type: object
 *              require:
 *                  - s_id
 *                  - s_name
 *              properties:
 *                  s_id:
 *                      type: string
 *                      description: ID типа.
 *                  s_name:
 *                      type: string
 *                      description: Имя типа.
 *              example:
 *                  s_id: assemb_model
 *                  s_name: Сборная модель                
 */

/**
 * @swagger
 * components:
 *      schemas:
 *          Good:
 *              type: object
 *              require:
 *                  - id
 *                  - s_type
 *                  - f_price
 *              properties:
 *                  id:
 *                      type: integer
 *                      description: Артикул товара.
 *                  s_type:
 *                      type: string
 *                      description: ID типа товара.
 *                  f_price:
 *                      type: number
 *                      description: Цена товара за штуку.
 *              example:
 *                  id: 1
 *                  s_type: assemb_model
 *                  f_price: 199.99                     
 */

/**
 * @swagger
 * /good/types:
 *      post:
 *          summary: Создание типа товара.
 *          tags: [Goods]
 *          parameters:
 *              - in: header
 *                name: Authorization
 *                schema:
 *                      type: string
 *                      format: Bearer <token>
 *                required: true
 *                description: JWT токен
 *          requestBody:
 *              description: Объект, содержащий информацию о типе.
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#/components/schemas/GoodType'
 *          responses:
 *              200:
 *                  description: Тип успешно создан.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              $ref: '#/components/schemas/GoodType'
 *              401:
 *                  description: Пользователь не авторизован или имеет недостаточно прав.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              $ref: '#/components/schemas/InternalError'
 *              402:
 *                  description: Произошла ошибка при создании типа.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              $ref: '#/components/schemas/InternalError'
 *              500:
 *                  description: Произошла ошибка сервера.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              $ref: '#/components/schemas/InternalError' 
 *                              
 */
//router.post('/types', RoleMiddleware(['admin']), GoodController.addType);
router.post('/types', RoleMiddleware(['admin']), GoodController.addType);

/**
 * @swagger
 * /good/types/{s_id}:
 *      delete:
 *          summary: Удаление типа товара.
 *          tags: [Goods]
 *          parameters:
 *              - in: header
 *                name: Authorization
 *                schema:
 *                      type: string
 *                      format: Bearer <token>
 *                required: true
 *                description: JWT токен
 *              - in: path
 *                name: s_id
 *                schema:
 *                      type: integer
 *                required: true
 *                description: ID типа
 *          responses:
 *              200:
 *                  description: Тип успешно удалён.
 *              401:
 *                  description: Пользователь не авторизован или имеет недостаточно прав.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              $ref: '#/components/schemas/InternalError'
 *              402:
 *                  description: Произошла ошибка при удалении типа.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              $ref: '#/components/schemas/InternalError'
 *              500:
 *                  description: Произошла ошибка сервера.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              $ref: '#/components/schemas/InternalError' 
 *                              
 */
//router.delete('/types/:s_name', RoleMiddleware(['admin']), GoodController.deleteType);
router.delete('/types/:s_id', RoleMiddleware(['admin']), GoodController.deleteType);

/**
 * @swagger
 * /good/types:
 *      get:
 *          summary: Получение типов товаров.
 *          tags: [Goods]
 *          parameters:
 *          responses:
 *              200:
 *                  description: Возврат списка типов товаров.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  type: object
 *                                  $ref: '#/components/schemas/GoodType'
 *              401:
 *                  description: Пользователь не авторизован или имеет недостаточно прав.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              $ref: '#/components/schemas/InternalError'
 *              402:
 *                  description: Произошла ошибка при возврате типов товаров.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              $ref: '#/components/schemas/InternalError'
 *              500:
 *                  description: Произошла ошибка сервера.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              $ref: '#/components/schemas/InternalError' 
 *                              
 */
router.get('/types', GoodController.getAllTypes);

/**
 * @swagger
 * /good:
 *      post:
 *          summary: Создание товара.
 *          tags: [Goods]
 *          parameters:
 *              - in: header
 *                name: Authorization
 *                schema:
 *                      type: string
 *                      format: Bearer <token>
 *                required: true
 *                description: JWT токен
 *          requestBody:
 *              description: Объект, содержащий информацию о товаре.
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          require:
 *                              - s_type
 *                              - f_price
 *                          properties:
 *                              s_type:
 *                                  type: string
 *                                  description: ID типа товара.
 *                              f_price:
 *                                  type: number
 *                                  description: Цена товара за штуку.
 *                          example:
 *                              s_type: assemb_model
 *                              f_price: 199.99
 *          responses:
 *              200:
 *                  description: Товар успешно создан.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              $ref: '#/components/schemas/Good'
 *              401:
 *                  description: Пользователь не авторизован или имеет недостаточно прав.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              $ref: '#/components/schemas/InternalError'
 *              402:
 *                  description: Произошла ошибка при создании товара.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              $ref: '#/components/schemas/InternalError'
 *              500:
 *                  description: Произошла ошибка сервера.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              $ref: '#/components/schemas/InternalError' 
 *                              
 */
router.post('/', RoleMiddleware(['admin']), GoodController.create);

/**
 * @swagger
 * /good:
 *      get:
 *          summary: Получение списка товаров.
 *          tags: [Goods]
 *          parameters:
 *              - in: query
 *                name: curPage
 *                schema:
 *                      type: integer
 *                required: false
 *                description: Текущая страница
 *              - in: query
 *                name: lim
 *                schema:
 *                      type: integer
 *                required: false
 *                description: Количество выводимых элементов
 *              - in: query
 *                name: type
 *                schema:
 *                      type: integer
 *                required: false
 *                description: Фильтр типа товара
 *                example: assemb_toys 
 *              - in: query
 *                name: gr_th
 *                schema:
 *                      type: integer
 *                required: false
 *                description: Фильтр товаров по стоимости (больше, чем указанное значение)
 *              - in: query
 *                name: sm_th
 *                schema:
 *                      type: integer
 *                required: false
 *                description: Фильтр товаров по стоимости (Меньше, чем указанное значение)
 *              - in: query
 *                name: ordr
 *                schema:
 *                      type: integer
 *                required: false
 *                description: Сортировать по столбцу. Используются наименования столбцов таблицы t_goods.
 *                examples:
 *                  Сортировка по стоимости:
 *                      value: f_price
 *                      summary: Столбец цены
 *                  Сортировка по типу:
 *                      value: s_type
 *                      summary: Столбец типа
 *              - in: query
 *                name: asc
 *                schema:
 *                      type: boolean
 *                required: false
 *                description: Сортировать по убыванию или по возрастанию.
 *                examples:
 *                  Сортировка по возрастанию:
 *                      value: true
 *                  Сортировка по убыванию:
 *                      value: false
 *          responses:
 *              200:
 *                  description: Возврат списка товаров.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  type: object
 *                                  $ref: '#/components/schemas/Good'
 *              401:
 *                  description: Пользователь не авторизован или имеет недостаточно прав.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              $ref: '#/components/schemas/InternalError'
 *              402:
 *                  description: Произошла ошибка при создании товара.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              $ref: '#/components/schemas/InternalError'
 *              500:
 *                  description: Произошла ошибка сервера.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              $ref: '#/components/schemas/InternalError' 
 *                              
 */
router.get('/', GoodController.getAll);

/**
 * @swagger
 * /good/{id}:
 *      patch:
 *          summary: Изменение информации о товаре.
 *          tags: [Goods]
 *          parameters:
 *              - in: header
 *                name: Authorization
 *                schema:
 *                      type: string
 *                      format: Bearer <token>
 *                required: true
 *                description: JWT токен
 *              - in: path
 *                name: id
 *                schema:
 *                      type: integer
 *                required: true
 *                description: Артикул товара
 *          requestBody:
 *              description: Объект, содержащий информацию о товаре.
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              s_type:
 *                                  type: integer
 *                                  description: Тип товара.
 *                              f_price:
 *                                  type: number
 *                                  description: Цена товара
 *                          examples:
 *                              s_type: Настольная игра
 *                              f_price: 199.99
 *          responses:
 *              200:
 *                  description: Товар успешно изменён.
 *              401:
 *                  description: Пользователь не авторизован или имеет недостаточно прав.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              $ref: '#/components/schemas/InternalError'
 *              402:
 *                  description: Произошла ошибка при изменении товара.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              $ref: '#/components/schemas/InternalError'
 *              500:
 *                  description: Произошла ошибка сервера.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              $ref: '#/components/schemas/InternalError' 
 *                              
 */
router.patch('/:id', RoleMiddleware(['admin']), GoodController.patch);

/**
 * @swagger
 * /good/{id}:
 *      get:
 *          summary: Получение информации о товару.
 *          tags: [Goods]
 *          parameters:
 *              - in: path
 *                name: id
 *                schema:
 *                      type: integer
 *                required: true
 *                description: Артикул товара
 *          responses:
 *              200:
 *                  description: Возврат информации о товаре.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              $ref: '#/components/schemas/Good'
 *              401:
 *                  description: Пользователь не авторизован или имеет недостаточно прав.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              $ref: '#/components/schemas/InternalError'
 *              402:
 *                  description: Произошла ошибка при получении информации о товаре.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              $ref: '#/components/schemas/InternalError'
 *              500:
 *                  description: Произошла ошибка сервера.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              $ref: '#/components/schemas/InternalError' 
 *                              
 */
router.get('/:id', GoodController.get);

/**
 * @swagger
 * /good/{id}:
 *      delete:
 *          summary: Удаление товара.
 *          tags: [Goods]
 *          parameters:
 *              - in: header
 *                name: Authorization
 *                schema:
 *                      type: string
 *                      format: Bearer <token>
 *                required: true
 *                description: JWT токен
 *              - in: path
 *                name: id
 *                schema:
 *                      type: integer
 *                required: true
 *                description: Артикул товара
 *          responses:
 *              200:
 *                  description: Товар успешно удалён.
 *              401:
 *                  description: Пользователь не авторизован или имеет недостаточно прав.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              $ref: '#/components/schemas/InternalError'
 *              402:
 *                  description: Произошла ошибка при удалении товара.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              $ref: '#/components/schemas/InternalError'
 *              500:
 *                  description: Произошла ошибка сервера.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              $ref: '#/components/schemas/InternalError' 
 *                              
 */
router.delete('/:id', RoleMiddleware(['admin']), GoodController.delete);

/**
 * @swagger
 * /good/{id}/stockpile/{n_stockpile}:
 *      post:
 *          summary: Добавление товара на склад.
 *          tags: [Goods]
 *          parameters:
 *              - in: header
 *                name: Authorization
 *                schema:
 *                      type: string
 *                      format: Bearer <token>
 *                required: true
 *                description: JWT токен
 *              - in: path
 *                name: id
 *                schema:
 *                      type: integer
 *                required: true
 *                description: Артикул товара
 *              - in: path
 *                name: n_stockpile
 *                schema:
 *                      type: integer
 *                required: true
 *                description: ID склада
 *          requestBody:
 *              description: Объект, содержащий информацию о складе и количество товара, которое содержиться на складе.
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          require:
 *                              - n_amount
 *                          properties:
 *                              n_amount:
 *                                  type: number
 *                                  description: Количество товара.
 *                          example:
 *                              n_amount: 100
 *          responses:
 *              200:
 *                  description: Товар успешно добавлен на склад.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  n_good:
 *                                      type: integer
 *                                      description: Артикул товара
 *                                  n_stockpile:
 *                                      type: string
 *                                      description: Имя склада
 *                                  n_amount:
 *                                      type: integer
 *                                      description: Количество товара
 *                              example:
 *                                  n_good: 1
 *                                  s_stockpile: Склад 1
 *                                  n_amount: 100
 *              401:
 *                  description: Пользователь не авторизован или имеет недостаточно прав.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              $ref: '#/components/schemas/InternalError'
 *              402:
 *                  description: Произошла ошибка при добавлении товара на склад.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              $ref: '#/components/schemas/InternalError'
 *              500:
 *                  description: Произошла ошибка сервера.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              $ref: '#/components/schemas/InternalError' 
 *                              
 */
router.post('/:id/stockpile/:n_stockpile', RoleMiddleware(['admin']), GoodController.addToStockpile);

/**
 * @swagger
 * /good/{id}/stockpile/{n_stockpile}:
 *      patch:
 *          summary: Изменение товара на складе.
 *          tags: [Goods]
 *          parameters:
 *              - in: header
 *                name: Authorization
 *                schema:
 *                      type: string
 *                      format: Bearer <token>
 *                required: true
 *                description: JWT токен
 *              - in: path
 *                name: id
 *                schema:
 *                      type: integer
 *                required: true
 *                description: Артикул товара
 *              - in: path
 *                name: n_stockpile
 *                schema:
 *                      type: integer
 *                required: true
 *                description: ID склада
 *          requestBody:
 *              description: Объект, содержащий информацию о складе и количество товара, которое содержиться на складе.
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          require:
 *                              - n_amount
 *                          properties:
 *                              n_amount:
 *                                  type: number
 *                                  description: Количество товара.
 *                          example:
 *                              n_amount: 100
 *          responses:
 *              200:
 *                  description: Товар успешно изменён на складе.
 *              401:
 *                  description: Пользователь не авторизован или имеет недостаточно прав.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              $ref: '#/components/schemas/InternalError'
 *              402:
 *                  description: Произошла ошибка при изменении товара на складе.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              $ref: '#/components/schemas/InternalError'
 *              500:
 *                  description: Произошла ошибка сервера.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              $ref: '#/components/schemas/InternalError' 
 *                              
 */
router.patch('/:id/stockpile/:n_stockpile', RoleMiddleware(['admin']), GoodController.patchInStockpile);

/**
 * @swagger
 * /good/{id}/stockpile/{n_stockpile}:
 *      delete:
 *          summary: Удаление товара со склада.
 *          tags: [Goods]
 *          parameters:
 *              - in: header
 *                name: Authorization
 *                schema:
 *                      type: string
 *                      format: Bearer <token>
 *                required: true
 *                description: JWT токен
 *              - in: path
 *                name: id
 *                schema:
 *                      type: integer
 *                required: true
 *                description: Артикул товара
 *              - in: path
 *                name: n_stockpile
 *                schema:
 *                      type: integer
 *                required: true
 *                description: ID склада
 *          responses:
 *              200:
 *                  description: Товар успешно удалён со склада.
 *              401:
 *                  description: Пользователь не авторизован или имеет недостаточно прав.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              $ref: '#/components/schemas/InternalError'
 *              402:
 *                  description: Произошла ошибка при удалении товара со склада.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              $ref: '#/components/schemas/InternalError'
 *              500:
 *                  description: Произошла ошибка сервера.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              $ref: '#/components/schemas/InternalError' 
 *                              
 */
router.delete('/:id/stockpile/:n_stockpile', RoleMiddleware(['admin']), GoodController.deleteFromStockpile);

module.exports = router;
var Router = require('express');
var router = new Router();
var StockpileController = require('../controllers/stockpileController');
var RoleMiddleware = require('../middleware/roleMiddleware');

/**
 * @swagger
 * tags:
 *      name: Stockpiles
 *      description: API для управления складами.
 */

/**
 * @swagger
 * components:
 *      schemas:
 *          Stockpile:
 *              type: object
 *              require:                  
 *                  - s_name
 *              properties:
 *                  id:
 *                      type: integer
 *                      description: ID склада
 *                  s_name:
 *                      type: string
 *                      description: Имя склада.
 *                  s_address:
 *                      type: string
 *                      description: Адрес склада
 *                  s_phone_number:
 *                      type: string
 *                      description: Телефон склада
 *              example:
 *                  Все данные известны:
 *                      id: 1
 *                      s_name: Склад настольных игр
 *                      s_address: г. Пермь, ул. Ленина, д. 1
 *                      s_phone_number: 2130000
 *                  Неизвестен телефон и адрес:
 *                      id: 1
 *                      s_name: Склад настольных игр
 *                      s_address: null
 *                      s_phone_number: null
 *                  Неизвестен адрес или отсутствует адрес:
 *                      id: 1
 *                      s_name: Склад настольных игр
 *                      s_address: null
 *                      s_phone_number: 2130000
 *                      
 */

/**
 * @swagger
 * components:
 *      schemas:
 *          ExtendedStockpile:
 *              type: object
 *              properties:
 *                  id:
 *                      type: integer
 *                      description: ID склада
 *                  s_name:
 *                      type: string
 *                      description: Имя склада.
 *                  s_address:
 *                      type: string
 *                      description: Адрес склада
 *                  s_phone_number:
 *                      type: string
 *                      description: Телефон склада
 *                  goods:
 *                      type: array
 *                      items:
 *                          type: object
 *                          properties:
 *                              n_good:
 *                                  type: integer
 *                                  description: Артикул товара
 *                              n_amount:
 *                                  type: integer
 *                                  description: Количество товара на складе
 *              example:
 *                  id: 1
 *                  s_name: Склад настольных игр
 *                  s_address: г. Пермь, ул. Ленина, д. 1
 *                  s_phone_number: 2130000
 *                  goods:
 *                      - n_good: 1
 *                        n_amount: 1
 *                      - n_good: 4
 *                        n_amount: 50
 *                      
 */

/**
 * @swagger
 * /stockpile:
 *      post:
 *          summary: Создание склада.
 *          tags: [Stockpiles]
 *          parameters:
 *              - in: header
 *                name: Authorization
 *                schema:
 *                      type: string
 *                      format: Bearer <token>
 *                required: true
 *                description: JWT токен
 *          requestBody:
 *              description: Объект, содержащий информацию о складе.
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                         $ref: '#/components/schemas/Stockpile'
 *          responses:
 *              200:
 *                  description: Склад успешно создан.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              $ref: '#/components/schemas/Stockpile'
 *              401:
 *                  description: Пользователь не авторизован или имеет недостаточно прав.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              $ref: '#/components/schemas/InternalError'
 *              402:
 *                  description: Произошла ошибка при создании склада.
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
router.post('/', RoleMiddleware(['admin']), StockpileController.create);

/**
 * @swagger
 * /stockpile/{id}:
 *      patch:
 *          summary: Изменение данных склада.
 *          tags: [Stockpiles]
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
 *                description: ID склада
 *          requestBody:
 *              description: Объект, содержащий информацию о складе.
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              s_name:
 *                                  type: string
 *                                  description: Имя склада
 *                              s_address:
 *                                  type: string
 *                                  description: Адрес склада
 *                              s_phone_number:
 *                                  type: string
 *                                  description: Телефон склада
 *                          example:
 *                              s_name: Склад плюшевых игрушек
 *                              s_address: г. Пермь, ул. Ленина, д. 1
 *                              s_phone_number: 2130000
 *          responses:
 *              200:
 *                  description: Склад успешно изменён.
 *              401:
 *                  description: Пользователь не авторизован или имеет недостаточно прав.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              $ref: '#/components/schemas/InternalError'
 *              402:
 *                  description: Произошла ошибка при изменении склада.
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
router.patch('/:id', RoleMiddleware(['admin']), StockpileController.patch);

/**
 * @swagger
 * /stockpile/{id}:
 *      delete:
 *          summary: Удаление склада.
 *          tags: [Stockpiles]
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
 *                description: ID склада
 *          responses:
 *              200:
 *                  description: Склад успешно удалён.
 *              401:
 *                  description: Пользователь не авторизован или имеет недостаточно прав.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              $ref: '#/components/schemas/InternalError'
 *              402:
 *                  description: Произошла ошибка при удалении склада.
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
router.delete('/:id', RoleMiddleware(['admin']), StockpileController.delete);

/**
 * @swagger
 * /stockpile:
 *      get:
 *          summary: Получение списка складов.
 *          tags: [Stockpiles]
 *          parameters:
 *              - in: header
 *                name: Authorization
 *                schema:
 *                      type: string
 *                      format: Bearer <token>
 *                required: true
 *                description: JWT токен
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
 *          responses:
 *              200:
 *                  description: Возврат списка складов.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              $ref: '#/components/schemas/Stockpile'
 *              401:
 *                  description: Пользователь не авторизован или имеет недостаточно прав.
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
router.get('/', RoleMiddleware(['admin']), StockpileController.getAll);

/**
 * @swagger
 * /stockpile/{id}:
 *      get:
 *          summary: Получение данных о складе, в том числе какие товары находятся на складе и в каком количестве.
 *          tags: [Stockpiles]
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
 *                description: ID склада
 *          responses:
 *              200:
 *                  description: Возврат информации о складе.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              $ref: '#/components/schemas/ExtendedStockpile' 
 *              401:
 *                  description: Пользователь не авторизован или имеет недостаточно прав.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              $ref: '#/components/schemas/InternalError'
 *              402:
 *                  description: Произошла ошибка при возврате склада.
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
router.get('/:id', RoleMiddleware(['admin']), StockpileController.get);

module.exports = router;
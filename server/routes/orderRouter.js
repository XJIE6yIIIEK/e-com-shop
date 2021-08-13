var Router = require('express');
var router = new Router();
var OrderController = require('../controllers/orderController');
var AuthMiddleware = require('../middleware/authMiddleware');
var RoleMiddleware = require('../middleware/roleMiddleware');

/**
 * @swagger
 * tags:
 *      name: Orders
 *      description: API для управления заказами.
 */

/**
 * @swagger
 * components:
 *      schemas:
 *          Order:
 *              type: object
 *              require:
 *                  - id
 *                  - n_user
 *                  - d_ordering_date
 *                  - d_receipt_date
 *              properties:
 *                  id:
 *                      type: integer
 *                      description: Номер заказа.
 *                  n_user:
 *                      type: integer
 *                      description: ID пользователя.
 *                  d_ordering_date:
 *                      type: string
 *                      format: date-time
 *                      description: Дата заказа.
 *                  d_receipt_date:
 *                      type: string
 *                      format: date-time
 *                      description: Дата получения заказа.
 *                      nullable: true
 *              example:
 *                  id: 1
 *                  n_user: 1
 *                  d_ordering_date: 2021-07-18 15:20:01.412+00
 *                  d_receipt_date: 2021-07-18 15:20:07.57+00                      
 */

/**
 * @swagger
 * components:
 *      schemas:
 *          ExtendedOrder:
 *              type: object
 *              require:
 *                  - id
 *                  - n_user
 *                  - d_ordering_date
 *                  - d_receipt_date
 *              properties:
 *                  id:
 *                      type: integer
 *                      description: Номер заказа.
 *                  n_user:
 *                      type: integer
 *                      description: ID пользователя.
 *                  d_ordering_date:
 *                      type: string
 *                      format: date-time
 *                      description: Дата заказа.
 *                  d_receipt_date:
 *                      type: string
 *                      format: date-time
 *                      description: Дата получения заказа.
 *                      nullable: true
 *                  goods:
 *                      type: array
 *                      items:
 *                          type: object
 *                          properties:
 *                              n_good:
 *                                  type: integer
 *                                  description: Артикул товара.
 *                              n_amount:
 *                                  type: integer
 *                                  description: Количество товара на складе
 *              example:
 *                  id: 1
 *                  n_user: 1
 *                  d_ordering_date: 2021-07-18 15:20:01.412+00
 *                  d_receipt_date: 2021-07-18 15:20:07.57+00
 *                  goods:
 *                      - n_good: 1
 *                        n_amount: 1
 *                      - n_good: 4
 *                        n_amount: 50
 */

/**
 * @swagger
 * /order:
 *      post:
 *          summary: Создание заказа.
 *          tags: [Orders]
 *          parameters:
 *              - in: header
 *                name: Authorization
 *                schema:
 *                      type: string
 *                      format: Bearer <token>
 *                required: true
 *                description: JWT токен
 *          requestBody:
 *              description: Объект, содержащий информацию о пользователе.
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              n_user:
 *                                  type: integer
 *                                  description: ID пользователя.
 *                          examples:
 *                              n_user: 1
 *          responses:
 *              200:
 *                  description: Заказ успешно создан.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              $ref: '#/components/schemas/Order'
 *              401:
 *                  description: Пользователь не авторизован или имеет недостаточно прав.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              $ref: '#/components/schemas/InternalError'
 *              402:
 *                  description: Произошла ошибка при создании заказа.
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
router.post('/', AuthMiddleware, OrderController.create.bind(OrderController));

/**
 * @swagger
 * /order/{n_order}:
 *      patch:
 *          summary: Закрытие заказа. Добавляет дату и время получения.
 *          tags: [Orders]
 *          parameters:
 *              - in: header
 *                name: Authorization
 *                schema:
 *                      type: string
 *                      format: Bearer <token>
 *                required: true
 *                description: JWT токен
 *              - in: path
 *                name: n_order
 *                schema:
 *                      type: integer
 *                required: true
 *                description: Номер заказа
 *          responses:
 *              200:
 *                  description: Заказ успешно закрыт.
 *              401:
 *                  description: Пользователь не авторизован или имеет недостаточно прав.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              $ref: '#/components/schemas/InternalError'
 *              402:
 *                  description: Произошла ошибка при закрытии заказа.
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
router.patch('/:n_order', RoleMiddleware(['admin']), OrderController.patch);

/**
 * @swagger
 * /order/{n_order}:
 *      delete:
 *          summary: Удаление заказа.
 *          tags: [Orders]
 *          parameters:
 *              - in: header
 *                name: Authorization
 *                schema:
 *                      type: string
 *                      format: Bearer <token>
 *                required: true
 *                description: JWT токен
 *              - in: path
 *                name: n_order
 *                schema:
 *                      type: integer
 *                required: true
 *                description: Номер заказа
 *          responses:
 *              200:
 *                  description: Заказ успешно удалён.
 *              401:
 *                  description: Пользователь не авторизован или имеет недостаточно прав.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              $ref: '#/components/schemas/InternalError'
 *              402:
 *                  description: Произошла ошибка при удалении заказа.
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
router.delete('/:n_order', RoleMiddleware(['admin']), OrderController.delete);

/**
 * @swagger
 * /order/{n_order}}:
 *      get:
 *          summary: Получение информации о заданном заказе.
 *          tags: [Orders]
 *          parameters:
 *              - in: header
 *                name: Authorization
 *                schema:
 *                      type: string
 *                      format: Bearer <token>
 *                required: true
 *                description: JWT токен
 *              - in: path
 *                name: n_order
 *                schema:
 *                      type: integer
 *                required: true
 *                description: Номер заказа
 *          responses:
 *              200:
 *                  description: Возврат заказа.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  type: object
 *                                  $ref: '#/components/schemas/ExtendedOrder'
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
router.get('/:n_order', AuthMiddleware, OrderController.get.bind(OrderController));

module.exports = router;
var Router = require('express');
var router = new Router();
var BascketController = require('../controllers/bascketController');
var AuthMiddleware = require('../middleware/authMiddleware');

/**
 * @swagger
 * tags:
 *      name: Backets
 *      description: API для управления корзиной.
 */

/**
 * @swagger
 * components:
 *      schemas:
 *          Bascket:
 *              type: object
 *              require:
 *                  - n_user
 *                  - n_good
 *                  - n_amount
 *              properties:
 *                  n_user:
 *                      type: integer
 *                      description: ID пользователя.
 *                  n_good:
 *                      type: integer
 *                      description: Артикул товара.
 *                  n_amount:
 *                      type: integer
 *                      description: Количество.
 *              example:
 *                  n_user: 1
 *                  n_good: 10
 *                  n_amount: 100                    
 */

/**
 * @swagger
 * /bascket:
 *      post:
 *          summary: Добавление товар в корзину пользователя.
 *          tags: [Backets]
 *          parameters:
 *              - in: header
 *                name: Authorization
 *                schema:
 *                      type: string
 *                      format: Bearer <token>
 *                required: true
 *                description: JWT токен
 *          requestBody:
 *              description: Объект, содержащий информацию о пользователе и добавляемом товаре.
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#/components/schemas/Bascket'
 *          responses:
 *              200:
 *                  description: Товар успешно добавлен в корзину.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              $ref: '#/components/schemas/Bascket'
 *              401:
 *                  description: Пользователь не авторизован или имеет недостаточно прав.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              $ref: '#/components/schemas/InternalError'
 *              402:
 *                  description: Произошла ошибка при добавлении товара в корзину.
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
router.post('/', AuthMiddleware, BascketController.add);

/**
 * @swagger
 * /order/{n_user}:
 *      patch:
 *          summary: Изменения корзины пользователя.
 *          tags: [Backets]
 *          parameters:
 *              - in: header
 *                name: Authorization
 *                schema:
 *                      type: string
 *                      format: Bearer <token>
 *                required: true
 *                description: JWT токен
 *              - in: path
 *                name: n_user
 *                schema:
 *                      type: integer
 *                required: true
 *                description: ID пользователя.
 *          requestBody:
 *              description: Объект, содержащий информацию о изменяемом в корзине товаре.
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              n_good:
 *                                  type: integer
 *                                  description: Артикул товара.
 *                              n_amount:
 *                                  type: integer
 *                                  description: Количество товара.
 *                          examples:
 *                              n_good: 3
 *                              n_amount: 12
 *          responses:
 *              200:
 *                  description: Товар в корзине успешно изменён.
 *              401:
 *                  description: Пользователь не авторизован или имеет недостаточно прав.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              $ref: '#/components/schemas/InternalError'
 *              402:
 *                  description: Произошла ошибка при изменении товара в корзине.
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
router.patch('/:n_user', AuthMiddleware, BascketController.patch);

/**
 * @swagger
 * /order/{n_user}:
 *      delete:
 *          summary: Удаление товара из корзины пользователя.
 *          tags: [Backets]
 *          parameters:
 *              - in: header
 *                name: Authorization
 *                schema:
 *                      type: string
 *                      format: Bearer <token>
 *                required: true
 *                description: JWT токен
 *              - in: path
 *                name: n_user
 *                schema:
 *                      type: integer
 *                required: true
 *                description: ID пользователя.
 *              - in: path
 *                name: n_good
 *                schema:
 *                      type: integer
 *                required: true
 *                description: ID товара.
 *          responses:
 *              200:
 *                  description: Товар успешно удалён из корзины.
 *              401:
 *                  description: Пользователь не авторизован или имеет недостаточно прав.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              $ref: '#/components/schemas/InternalError'
 *              402:
 *                  description: Произошла ошибка при удаления товара из корзины.
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
router.delete('/:n_user/:n_good', AuthMiddleware, BascketController.delete);

/**
 * @swagger
 * /order/{n_user}:
 *      get:
 *          summary: Получение корзины пользователя.
 *          tags: [Backets]
 *          parameters:
 *              - in: header
 *                name: Authorization
 *                schema:
 *                      type: string
 *                      format: Bearer <token>
 *                required: true
 *                description: JWT токен
 *              - in: path
 *                name: n_user
 *                schema:
 *                      type: integer
 *                required: true
 *                description: ID пользователя.
 *          responses:
 *              200:
 *                  description: Возврат корзины пользователя.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  sum:
 *                                      type: number
 *                                      description: Сумма корзины
 *                                  goods:
 *                                      type: array
 *                                      items:
 *                                          type: object
 *                                          properties:
 *                                              n_good:
 *                                                  type: integer
 *                                                  description: Артикул товара
 *                                              n_amount:
 *                                                  type: integer
 *                                                  description: Количество товара
 *                              example:
 *                                  sum: 15000
 *                                  goods:
 *                                      - n_good: 2
 *                                        n_amount: 1
 *                                      - n_good: 3
 *                                        n_amount: 10
 *              401:
 *                  description: Пользователь не авторизован или имеет недостаточно прав.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              $ref: '#/components/schemas/InternalError'
 *              402:
 *                  description: Произошла ошибка при возврате корзины.
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
router.get('/:n_user', AuthMiddleware, BascketController.get);

module.exports = router;
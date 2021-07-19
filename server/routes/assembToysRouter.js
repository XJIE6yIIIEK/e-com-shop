var Router = require('express');
var router = new Router();
var AssembToysController = require('../controllers/assembToysController');
var AssembToysManufacturController = require('../controllers/assembToysManufacturController');

/**
 * @swagger
 * tags:
 *      name: AssembToys
 *      description: API для управления товарами типа "Сборная модель".
 */

/**
 * @swagger
 * components:
 *      schemas:
 *          AssembToysSize:
 *              type: object
 *              require:
 *                  - s_name
 *              properties:
 *                  s_name:
 *                      type: string
 *                      description: Размер моедли.
 *              example:
 *                  s_name: 1:1                     
 */

/**
 * @swagger
 * components:
 *      schemas:
 *          AssembToysManufactur:
 *              type: object
 *              require:
 *                  - s_name
 *                  - s_address
 *                  - s_phone_number
 *              properties:
 *                  s_name:
 *                      type: string
 *                      description: Имя производителя.
 *                  s_address:
 *                      type: string
 *                      description: Адрес производителя
 *                  s_phone_number:
 *                      type: string
 *                      description: Телефон производителя
 *              example:
 *                  s_name: Hasbro
 *                  s_address: г. Пермь, ул. Ленина, д. 1
 *                  s_phone_number: 2130000
 *                      
 */

/**
 * @swagger
 * components:
 *      schemas:
 *          AssembToy:
 *              type: object
 *              require:
 *                  - n_articul
 *                  - s_size
 *                  - n_pieces
 *                  - s_manufactur
 *                  - s_model
 *              properties:
 *                  n_articul:
 *                      type: integer
 *                      description: Артикул товара.
 *                  s_size:
 *                      type: string
 *                      description: Размер сборной модели.
 *                  n_pieces:
 *                      type: integer
 *                      description: Количество элементов сборной модели.
 *                  s_manufactur:
 *                      type: string
 *                      description: Производитель.
 *                  s_model:
 *                      type: string
 *                      description: Модель.
 *              example:
 *                  n_articul: 1
 *                  s_size: 2:1
 *                  n_pieces: 150
 *                  s_manufactur: Zvezda
 *                  s_model: Сборная модель истребителя Су-37
 */

/**
 * @swagger
 * /assemb_toys:
 *      post:
 *          summary: Создание типа товара.
 *          tags: [AssembToys]
 *          parameters:
 *              - in: header
 *                name: Authorization
 *                schema:
 *                      type: string
 *                      format: Bearer <token>
 *                required: true
 *                description: JWT токен
 *          requestBody:
 *              description: Объект, содержащий информацию о сборной модели.
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#/components/schemas/AssembToy'
 *          responses:
 *              200:
 *                  description: Сборная модель успешно создана.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              $ref: '#/components/schemas/AssembToy'
 *              401:
 *                  description: Пользователь не авторизован или имеет недостаточно прав.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              $ref: '#/components/schemas/InternalError'
 *              402:
 *                  description: Произошла ошибка при создании сборной модели.
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
router.post('/', AssembToysController.create);

/**
 * @swagger
 * /assemb_toys/{n_articul}:
 *      patch:
 *          summary: Изменение сборной модели.
 *          tags: [AssembToys]
 *          parameters:
 *              - in: header
 *                name: Authorization
 *                schema:
 *                      type: string
 *                      format: Bearer <token>
 *                required: true
 *                description: JWT токен
 *              - in: path
 *                name: n_articul
 *                schema:
 *                      type: integer
 *                required: true
 *                description: Артикул товара
 *          requestBody:
 *              description: Объект, содержащий информацию о сборной модели.
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              s_size:
 *                                  type: string
 *                                  description: Размер сборной модели.
 *                              n_pieces:
 *                                  type: integer
 *                                  description: Количество элементов сборной модели.
 *                              s_manufactur:
 *                                  type: string
 *                                  description: Производитель.
 *                              s_model:
 *                                  type: string
 *                                  description: Модель.
 *                          examples:
 *                              s_size: 2:1
 *                              n_pieces: 150
 *                              s_manufactur: Zvezda
 *                              s_model: Сборная модель истребителя Су-37
 *          responses:
 *              200:
 *                  description: Сборная модель успешно изменена.
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
router.patch('/:n_articul', AssembToysController.patch);

/**
 * @swagger
 * /assemb_toys/{n_articul}:
 *      delete:
 *          summary: Удаление сборной модели.
 *          tags: [AssembToys]
 *          parameters:
 *              - in: header
 *                name: Authorization
 *                schema:
 *                      type: string
 *                      format: Bearer <token>
 *                required: true
 *                description: JWT токен
 *              - in: path
 *                name: n_articul
 *                schema:
 *                      type: integer
 *                required: true
 *                description: Артикул товара
 *          responses:
 *              200:
 *                  description: Сборная модель успешно удалена.
 *              401:
 *                  description: Пользователь не авторизован или имеет недостаточно прав.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              $ref: '#/components/schemas/InternalError'
 *              402:
 *                  description: Произошла ошибка при удалении сборной модели.
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
router.delete('/:n_articul', AssembToysController.delete);

/**
 * @swagger
 * /assemb_toys/{n_articul}:
 *      get:
 *          summary: Получение информации о сборной модели.
 *          tags: [AssembToys]
 *          parameters:
 *              - in: header
 *                name: Authorization
 *                schema:
 *                      type: string
 *                      format: Bearer <token>
 *                required: true
 *                description: JWT токен
 *              - in: path
 *                name: n_articul
 *                schema:
 *                      type: integer
 *                required: true
 *                description: Артикул товара
 *          responses:
 *              200:
 *                  description: Возврат информации о сборной модели.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              $ref: '#/components/schemas/AssembToy'
 *              401:
 *                  description: Пользователь не авторизован или имеет недостаточно прав.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              $ref: '#/components/schemas/InternalError'
 *              402:
 *                  description: Произошла ошибка при получении информации о сборной модели.
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
router.get('/:n_articul', AssembToysController.get);

/**
 * @swagger
 * /assemb_toys:
 *      get:
 *          summary: Получение списка сборных моделей.
 *          tags: [AssembToys]
 *          parameters:
 *              - in: header
 *                name: Authorization
 *                schema:
 *                      type: string
 *                      format: Bearer <token>
 *                required: true
 *                description: JWT токен
 *          responses:
 *              200:
 *                  description: Возврат списка сборных моделей.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  type: object
 *                                  $ref: '#/components/schemas/AssembToy'
 *              401:
 *                  description: Пользователь не авторизован или имеет недостаточно прав.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              $ref: '#/components/schemas/InternalError'
 *              402:
 *                  description: Произошла ошибка при возврате списка сборных моделей.
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
router.get('/', AssembToysController.getAll);

/**
 * @swagger
 * /assemb_toys/sizes:
 *      post:
 *          summary: Создание варианта размера сборной модели.
 *          tags: [AssembToys]
 *          parameters:
 *              - in: header
 *                name: Authorization
 *                schema:
 *                      type: string
 *                      format: Bearer <token>
 *                required: true
 *                description: JWT токен
 *          requestBody:
 *              description: Объект, содержащий информацию о размере.
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#/components/schemas/AssembToysSize'
 *          responses:
 *              200:
 *                  description: Размер сборной модели успешно создан.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              $ref: '#/components/schemas/AssembToysSize'
 *              401:
 *                  description: Пользователь не авторизован или имеет недостаточно прав.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              $ref: '#/components/schemas/InternalError'
 *              402:
 *                  description: Произошла ошибка при создании размера сборной модели.
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
router.post('/sizes', AssembToysController.createSize);

/**
 * @swagger
 * /assemb_toys/sizes/{s_name}:
 *      delete:
 *          summary: Удаление размера сборной модели.
 *          tags: [AssembToys]
 *          parameters:
 *              - in: header
 *                name: Authorization
 *                schema:
 *                      type: string
 *                      format: Bearer <token>
 *                required: true
 *                description: JWT токен
 *              - in: path
 *                name: s_name
 *                schema:
 *                      type: integer
 *                required: true
 *                description: Размер сборной модели
 *          responses:
 *              200:
 *                  description: Размер сборной модели успешно удалён.
 *              401:
 *                  description: Пользователь не авторизован или имеет недостаточно прав.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              $ref: '#/components/schemas/InternalError'
 *              402:
 *                  description: Произошла ошибка при удалении размера сборной модели.
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
router.delete('/sizes/:s_name', AssembToysController.deleteSize);

/**
 * @swagger
 * /assemb_toys/sizes:
 *      get:
 *          summary: Получение вариантов размеров сборных моделей.
 *          tags: [AssembToys]
 *          parameters:
 *              - in: header
 *                name: Authorization
 *                schema:
 *                      type: string
 *                      format: Bearer <token>
 *                required: true
 *                description: JWT токен
 *          responses:
 *              200:
 *                  description: Возврат списка размеров сборных моделей.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  type: object
 *                                  $ref: '#/components/schemas/AssembToysSize'
 *              401:
 *                  description: Пользователь не авторизован или имеет недостаточно прав.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              $ref: '#/components/schemas/InternalError'
 *              402:
 *                  description: Произошла ошибка при возврату списка размеров сборных моделей.
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
router.get('/sizes', AssembToysController.getAllSizes);

/**
 * @swagger
 * /assemb_toys/manufacturs:
 *      post:
 *          summary: Создание производителя товара.
 *          tags: [AssembToys]
 *          parameters:
 *              - in: header
 *                name: Authorization
 *                schema:
 *                      type: string
 *                      format: Bearer <token>
 *                required: true
 *                description: JWT токен
 *          requestBody:
 *              description: Объект, содержащий информацию о производителе.
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                         $ref: '#/components/schemas/AssembToysManufactur'
 *          responses:
 *              200:
 *                  description: Производитель успешно создан.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              $ref: '#/components/schemas/AssembToysManufactur'
 *              401:
 *                  description: Пользователь не авторизован или имеет недостаточно прав.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              $ref: '#/components/schemas/InternalError'
 *              402:
 *                  description: Произошла ошибка при создании производителя.
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
router.post('/manufacturs', AssembToysManufacturController.create);

/**
 * @swagger
 * /assemb_toys/manufacturs/{s_name}:
 *      patch:
 *          summary: Изменение информации о производителе.
 *          tags: [AssembToys]
 *          parameters:
 *              - in: header
 *                name: Authorization
 *                schema:
 *                      type: string
 *                      format: Bearer <token>
 *                required: true
 *                description: JWT токен
 *              - in: path
 *                name: s_name
 *                schema:
 *                      type: string
 *                required: true
 *                description: Имя производителя
 *          requestBody:
 *              description: Объект, содержащий информацию о производителе.
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          require:
 *                              - s_address
 *                              - s_phone_number
 *                          properties:
 *                              s_address:
 *                                  type: string
 *                                  description: Новый адрес производителя
 *                              s_phone_number:
 *                                  type: string
 *                                  description: Новый телефон производителя
 *                          example:
 *                              s_address: г. Пермь, ул. Ленина, д. 1
 *                              s_phone_number: 2130000
 *          responses:
 *              200:
 *                  description: Информация о производителе успешно изменена.
 *              401:
 *                  description: Пользователь не авторизован или имеет недостаточно прав.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              $ref: '#/components/schemas/InternalError'
 *              402:
 *                  description: Произошла ошибка при изменении информации о производителе.
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
router.patch('/manufacturs/:s_name', AssembToysManufacturController.patch);

/**
 * @swagger
 * /assemb_toys/manufacturs/{s_name}:
 *      delete:
 *          summary: Удаление производителя.
 *          tags: [AssembToys]
 *          parameters:
 *              - in: header
 *                name: Authorization
 *                schema:
 *                      type: string
 *                      format: Bearer <token>
 *                required: true
 *                description: JWT токен
 *              - in: path
 *                name: s_name
 *                schema:
 *                      type: string
 *                required: true
 *                description: Имя производителя
 *          responses:
 *              200:
 *                  description: Производитель успешно удалён.
 *              401:
 *                  description: Пользователь не авторизован или имеет недостаточно прав.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              $ref: '#/components/schemas/InternalError'
 *              402:
 *                  description: Произошла ошибка при удалении производителя.
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
router.delete('/manufacturs/:s_name', AssembToysManufacturController.delete);

/**
 * @swagger
 * /assemb_toys/manufacturs/{s_name}:
 *      get:
 *          summary: Получение данных о производителе.
 *          tags: [AssembToys]
 *          parameters:
 *              - in: header
 *                name: Authorization
 *                schema:
 *                      type: string
 *                      format: Bearer <token>
 *                required: true
 *                description: JWT токен
 *              - in: path
 *                name: s_name
 *                schema:
 *                      type: string
 *                required: true
 *                description: Имя производителя
 *          responses:
 *              200:
 *                  description: Возврат информации о производителе.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              $ref: '#/components/schemas/AssembToysManufactur' 
 *              401:
 *                  description: Пользователь не авторизован или имеет недостаточно прав.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              $ref: '#/components/schemas/InternalError'
 *              402:
 *                  description: Произошла ошибка при получении информации о производителе.
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
router.get('/manufacturs/:s_name', AssembToysManufacturController.get);

/**
 * @swagger
 * /assemb_toys/manufacturs:
 *      get:
 *          summary: Получение списка всех производителей.
 *          tags: [AssembToys]
 *          parameters:
 *              - in: header
 *                name: Authorization
 *                schema:
 *                      type: string
 *                      format: Bearer <token>
 *                required: true
 *                description: JWT токен
 *          responses:
 *              200:
 *                  description: Возврат списка производителей.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  type: object
 *                                  $ref: '#/components/schemas/AssembToysManufactur'
 *                              
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
router.get('/manufacturs', AssembToysManufacturController.getAll);

module.exports = router;
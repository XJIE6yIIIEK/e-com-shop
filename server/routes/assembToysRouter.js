var Router = require('express');
var router = new Router();
var AssembToysController = require('../controllers/assembToysController');
var AssembToysManufacturController = require('../controllers/assembToysManufacturController');
var RoleMiddleware = require('../middleware/roleMiddleware');

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
 *                  - s_id
 *                  - s_name
 *              properties:
 *                  s_id:
 *                      type: string
 *                      description: ID модели.
 *                  s_name:
 *                      type: string
 *                      description: Размер модели.
 *              example:
 *                  s_id: 1_1
 *                  s_name: 1:1                     
 */

/**
 * @swagger
 * components:
 *      schemas:
 *          AssembToysManufactur:
 *              type: object
 *              require:
 *                  - id
 *                  - s_name
 *                  - s_address
 *                  - s_phone_number
 *              properties:
 *                  id:
 *                      type: integer
 *                      description: ID производителя.
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
 *                  id: 1
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
 *                  - n_manufactur
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
 *                  n_manufactur:
 *                      type: integer
 *                      description: ID производителя.
 *                  s_model:
 *                      type: string
 *                      description: Модель.
 *              example:
 *                  n_articul: 1
 *                  s_size: 2_1
 *                  n_pieces: 150
 *                  n_manufactur: 1
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
router.post('/', RoleMiddleware(['admin']), AssembToysController.create);

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
 *                              n_manufactur:
 *                                  type: integer
 *                                  description: ID производителя.
 *                              s_model:
 *                                  type: string
 *                                  description: Модель.
 *                          examples:
 *                              s_size: 2_1
 *                              n_pieces: 150
 *                              n_manufactur: 1
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
 *                  description: Произошла ошибка при изменении сборной модели.
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
router.patch('/:n_articul', RoleMiddleware(['admin']), AssembToysController.patch);

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
router.delete('/:n_articul', RoleMiddleware(['admin']), AssembToysController.delete);

/**
 * @swagger
 * /assemb_toys/{n_articul}:
 *      get:
 *          summary: Получение информации о сборной модели.
 *          tags: [AssembToys]
 *          parameters:
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
 *                name: manuf
 *                schema:
 *                      type: integer
 *                required: false
 *                description: Фильтр сборных моделей по ID производителя
 *                example: 1
 *              - in: query
 *                name: size
 *                schema:
 *                      type: integer
 *                required: false
 *                description: Фильтр сборных моделей по размеру
 *                example: 1_1
 *              - in: query
 *                name: gr_th
 *                schema:
 *                      type: integer
 *                required: false
 *                description: Фильтр сборных моделей по количеству деталей (больше, чем указанное значение)
 *              - in: query
 *                name: sm_th
 *                schema:
 *                      type: integer
 *                required: false
 *                description: Фильтр сборных моделей по количеству деталей (Меньше, чем указанное значение)
 *              - in: query
 *                name: ordr
 *                schema:
 *                      type: integer
 *                required: false
 *                description: Сортировать по столбцу. Используются наименования столбцов таблицы t_assemb_toys.
 *                examples:
 *                  Сортировка по количеству деталей:
 *                      value: n_pieces
 *                      summary: Столбец количества деталей
 *                  Сортировка по размеру:
 *                      value: s_size
 *                      summary: Столбец размеров
 *              - in: query
 *                name: asc
 *                schema:
 *                      type: integer
 *                required: false
 *                description: Сортировать по убыванию или по возрастанию.
 *                examples:
 *                  Сортировка по возрастанию:
 *                      value: true
 *                  Сортировка по убыванию:
 *                      value: false
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
router.post('/sizes', RoleMiddleware(['admin']), AssembToysController.createSize);

/**
 * @swagger
 * /assemb_toys/sizes/{s_id}:
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
 *                name: s_id
 *                schema:
 *                      type: integer
 *                required: true
 *                description: ID размера сборной модели
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
router.delete('/sizes/:s_id', RoleMiddleware(['admin']), AssembToysController.deleteSize);

/**
 * @swagger
 * /assemb_toys/sizes:
 *      get:
 *          summary: Получение вариантов размеров сборных моделей.
 *          tags: [AssembToys]
 *          parameters:
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
 *          summary: Создание производителя сборных моделей.
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
router.post('/manufacturs', RoleMiddleware(['admin']), AssembToysManufacturController.create);

/**
 * @swagger
 * /assemb_toys/manufacturs/{id}:
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
 *                name: id
 *                schema:
 *                      type: integer
 *                required: true
 *                description: ID производителя
 *          requestBody:
 *              description: Объект, содержащий информацию о производителе.
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          require:
 *                              - s_name
 *                              - s_address
 *                              - s_phone_number
 *                          properties:
 *                              s_name:
 *                                  type: string
 *                                  description: Имя производителя
 *                              s_address:
 *                                  type: string
 *                                  description: Адрес производителя
 *                              s_phone_number:
 *                                  type: string
 *                                  description: Телефон производителя
 *                          example:
 *                              s_name: Hasbro
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
router.patch('/manufacturs/:id', RoleMiddleware(['admin']), AssembToysManufacturController.patch);

/**
 * @swagger
 * /assemb_toys/manufacturs/{id}:
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
 *                name: id
 *                schema:
 *                      type: string
 *                required: true
 *                description: ID производителя
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
router.delete('/manufacturs/:id', RoleMiddleware(['admin']), AssembToysManufacturController.delete);

/**
 * @swagger
 * /assemb_toys/manufacturs/{id}:
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
 *                name: id
 *                schema:
 *                      type: integer
 *                required: true
 *                description: ID производителя
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
router.get('/manufacturs/:id', RoleMiddleware(['admin']), AssembToysManufacturController.get);

/**
 * @swagger
 * /assemb_toys/manufacturs:
 *      get:
 *          summary: Получение списка всех производителей.
 *          tags: [AssembToys]
 *          parameters:
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
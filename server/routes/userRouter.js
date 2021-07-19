var Router = require('express');
var {body} = require('express-validator');
var router = new Router();
var UserController = require('../controllers/userController');
var RoleController = require('../controllers/roleController');
var AuthMiddleware = require('../middleware/authMiddleware');
var RoleMiddleware = require('../middleware/roleMiddleware');



/**
 * @swagger
 * tags:
 *      name: Users
 *      description: API для управления учетными записями.
 */

/**
 * @swagger
 * tags:
 *      name: UsersAuthentication
 *      description: API для авторизации учётных записей.
 */

/**
 * @swagger
 * components:
 *      schemas:
 *          Token:
 *              type: object
 *              require:
 *                  - token
 *              properties:
 *                  token:
 *                      type: string
 *                      description: JWT токен пользователя.
 *              example:
 *                  token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
 *     
 */

 /**
 * @swagger
 * components:
 *      schemas:
 *          InternalError:
 *              type: object
 *              require:
 *                  - message
 *              properties:
 *                  message:
 *                      type: string
 *                      description: Описание ошибки.
 *              example:
 *                  message: Ошибка сервера
 *                      
 */

  /**
 * @swagger
 * components:
 *      schemas:
 *          Role:
 *              type: object
 *              require:
 *                  - s_id
 *                  - s_name
 *              properties:
 *                  s_id:
 *                      type: string
 *                      description: ID роли.
 *                  s_name:
 *                      type: string
 *                      description: Название роли.
 *              example:
 *                  s_id: admin
 *                  s_name: Администратор
 *                      
 */

/**
 * @swagger
 * components:
 *      schemas:
 *          Error:
 *              type: object
 *              require:
 *                  - message
 *                  - errors
 *              properties:
 *                  message:
 *                      type: string
 *                      description: Описание ошибки.
 *                  errors:
 *                      type: array
 *                      items:
 *                          type: object
 *                          properties:
 *                              value:
 *                                  type: string
 *                                  description: Значение, которое привело к ошибке.
 *                              msg:
 *                                  type: string
 *                                  description: Сообщение ошибки.
 *                              param:
 *                                  type: string
 *                                  description: Параметр, вызвавший ошибку.
 *                              location:
 *                                  type: string
 *                                  description: Место, где была вызвана ошибка
 *                      nullable: true
 *              example:
 *                  message: Ошибка при валидации
 *                  errors:
 *                      - value: 12
 *                        msg: Invalid value
 *                        param: e_mail
 *                        location: body
 *                      
 */

/**
 * @swagger
 * components:
 *      schemas:
 *          RoleToUser:
 *              type: object
 *              require:
 *                  - n_user
 *                  - s_role
 *              properties:
 *                  n_user:
 *                      type: integer
 *                      description: ID пользователя.
 *                  s_role:
 *                      type: string
 *                      description: Имя роли
 *              example:
 *                  n_user: 1 
 *                  s_role: admin
 *                      
 */

/**
 * @swagger
 * /user/registration:
 *      post:
 *          summary: Регистрация пользователя в системе.
 *          tags: [UsersAuthentication]
 *          requestBody:
 *              description: Объект, содержащий никнейм, email и пароль пользователя
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          require:
 *                              - s_name
 *                              - e_mail
 *                              - s_password
 *                          properties:
 *                              s_name:
 *                                  type: string
 *                                  description: Никнейм пользователя.
 *                                  nullable: false
 *                              e_mail:
 *                                  type: string
 *                                  description: Email пользователя.
 *                                  nullable: false
 *                              s_password:
 *                                  type: string
 *                                  description: Пароль пользователя.
 *                                  nullable: false
 *                          example:
 *                              s_name: Spearhead
 *                              e_mail: tank@post.com
 *                              s_password: abrams                              
 *          responses:
 *              200:
 *                  description: Пользователь успешно зарегистрирован в системе.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              $ref: '#/components/schemas/Token'
 *              402:
 *                  description: Произошла ошибка при регистрации пользователя.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              $ref: '#/components/schemas/Error'
 *              
 *              500:
 *                  description: Произошла ошибка сервера.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              $ref: '#/components/schemas/InternalError'                
 */
router.post('/registration', body('e_mail').isEmail(), 
                             body('s_password').isLength({min: 6, max: 24}), 
                             body('s_name').isLength({min: 6, max: 32}), UserController.registration);

/**
 * @swagger
 * /user/login:
 *      post:
 *          summary: Авторизация пользователя в системе.
 *          tags: [UsersAuthentication]
 *          requestBody:
 *              description: Объект, содержащий email и пароль пользователя
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          require:
 *                              - e_mail
 *                              - s_password
 *                          properties:
 *                              e_mail:
 *                                  type: string
 *                                  description: Email пользователя.
 *                                  nullable: false
 *                              s_password:
 *                                  type: string
 *                                  description: Пароль пользователя.
 *                                  nullable: false
 *                          example:
 *                              e_mail: tank@post.com
 *                              s_password: abrams
 *          responses:
 *              200:
 *                  description: Пользователь успешно авторизован в системе.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              $ref: '#/components/schemas/Token'
 *              402:
 *                  description: Произошла ошибка при авторизации пользователя.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              $ref: '#/components/schemas/Error'
 *              500:
 *                  description: Произошла ошибка сервера.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              $ref: '#/components/schemas/InternalError' 
 *                              
 */
router.post('/login', UserController.login);

/**
 * @swagger
 * /user/auth:
 *      get:
 *          summary: Запрос нового JWT токена для пользователя.
 *          tags: [UsersAuthentication]
 *          parameters:
 *              - in: header
 *                name: Authorization
 *                schema:
 *                      type: string
 *                      format: Bearer <token>
 *                required: true
 *                description: JWT токен
 *          requestBody:
 *              description: Объект, содержащий email и пароль пользователя
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          require:
 *                              - e_mail
 *                              - s_password
 *                          properties:
 *                              e_mail:
 *                                  type: string
 *                                  description: Email пользователя.
 *                                  nullable: false
 *                              s_password:
 *                                  type: string
 *                                  description: Пароль пользователя.
 *                                  nullable: false
 *                          example:
 *                              e_mail: tank@post.com
 *                              s_password: abrams
 *          responses:
 *              200:
 *                  description: Пользователь повторно авторизован в системе.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              $ref: '#/components/schemas/Token'
 *              401:
 *                  description: Пользователь не авторизован.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              $ref: '#/components/schemas/InternalError'
 *              402:
 *                  description: Произошла ошибка при повторной авторизации пользователя.
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
router.get('/auth', AuthMiddleware, UserController.auth);

/**
 * @swagger
 * /user/role:
 *      post:
 *          summary: Создание роли.
 *          tags: [Users]
 *          parameters:
 *              - in: header
 *                name: Authorization
 *                schema:
 *                      type: string
 *                      format: Bearer <token>
 *                required: true
 *                description: JWT токен
 *          requestBody:
 *              description: Объект, содержащий информацию о роли
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#/components/schemas/Role'
 *          responses:
 *              200:
 *                  description: Роль успешно создана.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              $ref: '#/components/schemas/Role'
 *              401:
 *                  description: Пользователь не авторизован или имеет недостаточно прав.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              $ref: '#/components/schemas/InternalError'
 *              402:
 *                  description: Произошла ошибка при создании роли.
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
router.post('/role', RoleMiddleware(['admin']), RoleController.create);

/**
 * @swagger
 * /user/role/{s_id}:
 *      delete:
 *          summary: Удаление роли.
 *          tags: [Users]
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
 *                      type: string
 *                required: true
 *                description: Имя роли
 *          responses:
 *              200:
 *                  description: Роль успешно удалена.
 *              401:
 *                  description: Пользователь не авторизован или имеет недостаточно прав.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              $ref: '#/components/schemas/InternalError'
 *              402:
 *                  description: Произошла ошибка при удалении роли.
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
router.delete('/role/:s_name', RoleMiddleware(['admin']), RoleController.delete);

/**
 * @swagger
 * /user/role/{s_id}:
 *      patch:
 *          summary: Изменение параметров роли.
 *          tags: [Users]
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
 *                      type: string
 *                required: true
 *                description: Имя роли
 *          responses:
 *              200:
 *                  description: Роль успешно изменена.
 *              401:
 *                  description: Пользователь не авторизован или имеет недостаточно прав.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              $ref: '#/components/schemas/InternalError'
 *              402:
 *                  description: Произошла ошибка при изменении роли.
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
router.patch('/role/:s_id', RoleMiddleware(['admin']), RoleController.patch);

/**
 * @swagger
 * /{n_user}/role/{s_id}:
 *      post:
 *          summary: Добавление роли указанному пользователю.
 *          tags: [Users]
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
 *                description: ID пользователя
 *              - in: path
 *                name: s_id
 *                schema:
 *                      type: string
 *                required: true
 *                description: ID роли
 *          responses:
 *              200:
 *                  description: Роль успешно задана для указанного пользователя.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              $ref: '#/components/schemas/RoleToUser'
 *              401:
 *                  description: Пользователь не авторизован или имеет недостаточно прав.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              $ref: '#/components/schemas/InternalError'
 *              402:
 *                  description: Произошла ошибка при добавлении пользователю роли.
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
router.post('/:n_user/role/:s_id', RoleMiddleware(['admin']), RoleController.addToUser);

/**
 * @swagger
 * /{n_user}/role/{s_id}:
 *      delete:
 *          summary: Удаление роли у указанного пользователя.
 *          tags: [Users]
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
 *                description: ID пользователя
 *              - in: path
 *                name: s_id
 *                schema:
 *                      type: string
 *                required: true
 *                description: ID роли
 *          responses:
 *              200:
 *                  description: Роль успешно удалена у указанного пользователя.
 *              401:
 *                  description: Пользователь не авторизован или имеет недостаточно прав.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              $ref: '#/components/schemas/InternalError'
 *              402:
 *                  description: Произошла ошибка при удалении роли у пользователя.
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
router.delete('/:n_user/role/:s_id', RoleMiddleware(['admin']), RoleController.deleteFromUser);

module.exports = router;
#e-com-shop
Магазин игровой дистрибьюции, реализованный на платформе Node.js.

#ТРЕБОВАНИЯ
Для запуска приложения необходимы:
* **Платформа Node.js 16.5.0**
* **СУБД PostgreSQL 12.2**

#УСТАНОВКА
**1.** Распаковать папку server в любое место на машине.
**2.** Создать БД в СУБД PostgreSQL, которая будет использоваться магазином.
**3.** Настроить конфиг сервера в файле .env.
	   Параметры:
	   *PORT* - порт, на котором будет запущен сервер. Если не указан, то по умолчанию используется порт 5000.
	   *DB_NAME* - имя БД, которая будет использоваться магазином.
	   *DB_IP* - адрес БД.
	   *DB_PORT* - порт, которые используется БД.
	   *DB_USER* - пользователь БД.
	   *DB_PASSWORD* - пароль пользователя БД.
	   *JWT_SECRET_KEY* - секретный ключ для авторизации пользователя с использованием JWT-токена.
	   *ADMIN_PASSWORD* - пароль администратора сервера.
	   *ADMIN_EMAIL* - e-mail (логин) администратора сервера.
**4.** Запустить сервер из командной строки командой "node <путь к файлу server.js>".

После запуска, сервер автоматически добавит все нужные таблицы в БД, а также создаст профиль администратора, роль пользователя и администратора.

#Схема БД
Схему БД (Все таблицы, атрибуты и отношения между таблицами) можно посмотреть открыв файл **db_relations.drawio** на сайте https://app.diagrams.net/.
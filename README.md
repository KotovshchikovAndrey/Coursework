# ITMO-Donuts-backend


# Auth-Service
Чтобы запустить проект нужно:
1. Интерпритатор Python 3.1.0 +
2. Postgresql клиент (база данных)

Инструкция:
1. В корневой папке (где app и requirements.txt) прописать pip install -r requirements.txt
2. В файле .env в папке app изменить url для подключения к базе данных в формате:
DEV_DB_URL="postgres://postgres:ВАШ ПАРОЛЬ@ХОСТ:ПОРТ/НАЗВАНИЕ ВАШЕЙ БАЗЫ ДАННЫХ"
3. перейти в папку app и прописать uvicorn index:app --host 127.0.0.1 --port 80 --reload

Тестировать запросы нужно по адресу http://127.0.0.1/api/v1/auth/ЭНДПОИНТ ДЛЯ ТЕСТА

# Примеры Запросов/Ответов

Список Эндпоинтов (registration, login, logout, refresh)

1. РЕГИСТРАЦИЯ

![image](https://user-images.githubusercontent.com/91110557/201499400-94c81009-c529-4267-84cb-a7646aeb5259.png)

Данные зароса:

  1. Метод: POST
  2. Формат: Json
  3. Обязательные параметры: name, surname, email, password, confirm_password
  4. Необязательные параметры: patronymic

Возможные ответы:
  1. Успех: 
  status = 201, content = access_token, refresh_token, user
  ![image](https://user-images.githubusercontent.com/91110557/201499625-236f91cc-eae3-4c7a-a8aa-84f1996950e0.png)
  
  2. Ошибка со стороны пользователя (Bad Request):
  status = 400, content = message, details
  ![image](https://user-images.githubusercontent.com/91110557/201499687-513564ec-b815-4121-851f-9a31f4e3b9ff.png)
  
  3. Ошибка сервера (БАГ):
  status = 500, content = message, details
  ![image](https://user-images.githubusercontent.com/91110557/201499766-f890debc-8945-4abb-9a24-71b5a811d3c6.png)

  Доп информация:
    1. Устанавливает cookie файл refresh token со значением токена


2. АВТОРИЗАЦИЯ

![image](https://user-images.githubusercontent.com/91110557/201499882-909b26ff-9747-49a6-8209-d61d9059acc9.png)

  1. Метод: POST
  2. Формат: Json
  3. Обязательные параметры: email, password
  4. Необязательные параметры: patronymic, name, surname

Возможные ответы:
  1. Успех:
  status = 201, content = access_token, refresh_token
  ![image](https://user-images.githubusercontent.com/91110557/201499961-c64c5bd6-d0fb-4193-862e-f86a9cb5abe3.png)
  
  2. Ошибка со стороны пользователя (Bad Request):
  3. status = 401, content = message, details
  ![image](https://user-images.githubusercontent.com/91110557/201499978-da1bf25c-eaa6-4b82-af98-26c74a6a88d3.png)
  
  3. Ошибка сервера (БАГ):
  status = 500, content = message, details
  ![image](https://user-images.githubusercontent.com/91110557/201499990-c02129fc-82ed-4526-81de-6c4de1684755.png)

  Доп информация:
    1. Устанавливает cookie файл refresh token со значением токена


3. REFRESH

![image](https://user-images.githubusercontent.com/91110557/201500163-964a864d-7d53-4ef6-8583-f0b4f4972be3.png)

  1. Метод: GET
  2. Обязательные параметры: Установленный refresh токен в куки файлах (устанавливается автоматически при регистации, авторизации) и header Authorization со значением access токена

Возможные ответы:
  1. Успех:
  status = 200, content = access_token, refresh_token
  ![image](https://user-images.githubusercontent.com/91110557/201500181-69fb2507-5070-428e-a8d1-41db888cae95.png)
  
  2. Ошибка со стороны пользователя (Bad Request):
  status = 401 (Не передан access token в header) или 403 (Невалидный refresh token или он не был получен из cookie), content = message, details
  ![image](https://user-images.githubusercontent.com/91110557/201500233-a54a0a92-a476-45ae-bd8b-a1858ad02800.png)

  3. Ошибка сервера (БАГ):
  status = 500, content = message, details
  ![image](https://user-images.githubusercontent.com/91110557/201499990-c02129fc-82ed-4526-81de-6c4de1684755.png)
  
  Доп информация:
    1. Устанавливает cookie файл refresh token со значением токена

4. LOGOUT

![image](https://user-images.githubusercontent.com/91110557/201500429-f8a6e78f-5c1f-418c-9983-c86c6629b314.png)

  1. Метод: DELETE
  2. Обязательные параметры: Установленный refresh токен в куки файлах (устанавливается автоматически при регистации, авторизации) и header Authorization со значением access токена

Возможные ответы:
  1. Успех:
  status = 204
  ![image](https://user-images.githubusercontent.com/91110557/201500430-425f6ff6-0e6b-40b9-9e15-2bb231a76ba6.png)

  2. Ошибка со стороны пользователя (Bad Request):
  status = 401 (Не передан access token в header) или 403 (Невалидный refresh token или он не был получен из cookie), content = message, details 
  ![image](https://user-images.githubusercontent.com/91110557/201500464-15f5c124-521b-4f4d-a293-8b2b0b54bd7e.png)

  3. Ошибка сервера (БАГ):
  status = 500, content = message, details
  ![image](https://user-images.githubusercontent.com/91110557/201499990-c02129fc-82ed-4526-81de-6c4de1684755.png)
   

# ITMO-Donuts-backend


# Auth-Service
Чтобы запустить проект нужно:
1. Интерпритатор Python 3.1.0 +
2. Postgresql клиент (база данных)

Инструкция:
1. В корневой папке (где app и requirements.txt) прописать pip install -r requirements.txt
2. В папке /app прописать aerich init-db
3. перейти в папку app и прописать uvicorn index:app --host 127.0.0.1 --port 80 --reload

Тестировать запросы нужно по адресу http://127.0.0.1/api/v1/auth/ЭНДПОИНТ ДЛЯ ТЕСТА

# Примеры Запросов/Ответов

Список Эндпоинтов (registration, login, logout, refresh)

1. РЕГИСТРАЦИЯ

![image](https://user-images.githubusercontent.com/91110557/201499400-94c81009-c529-4267-84cb-a7646aeb5259.png)

Данные зароса:

  1. Метод: POST
  2. Формат: Json
  3. Обязательные параметры: name, surname, email, password, confirm_password (AUTH_SERVICE 2.0 - name, password, confirm_password)
  4. Необязательные параметры: patronymic (AUTH_SERVICE 2.0 - нет)

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
  3. Обязательные параметры: email, password (AUTH_SERVICE 2.0 - name, password)
  4. Необязательные параметры: patronymic, name, surname (AUTH_SERVICE 2.0 - нет) 

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
  
  
  
  
  # Admin-Service
  
 Чтобы запустить проект нужно:
 1. установленный Node js
 2. База данных PostgreSql
 
 Чтобы развернуть проект:
 1. В корневой папке (где папка /app и файлы .json) запустить команду npm install
 2. Запустить сервер при помощи команды npm run dev (в этой же папке)
 
 Тестировать запросы нужно по адресу http(s):{HOST}:3000/api/v1/admin/{ROOT ENDPOINT}/{CHILD ENDPOINT}
 
 ROOT ENDPOINT - donut (для пончиков) или ingredient (для ингедиентов к пончикам)
 CHILD ENDPOINT - для donut (full, all, ingredients.remove), для ingredient (только all)
 
Пример Некорректного ответа (бага, ошибки сервера)
![image](https://user-images.githubusercontent.com/91110557/204155218-c40d968b-a6a7-4137-97bb-cba43adc080b.png)

1. ПОЛУЧЕНИЕ ВСЕХ ПОНЧИКОВ
 
Пример корректного запроса/ответа
![image](https://user-images.githubusercontent.com/91110557/204153576-093ca721-9ea7-4017-b8c4-119589d8ec6c.png)

2. ПОЛУЧЕНИЕ 1 ПОНЧИКА ПО ID

![image](https://user-images.githubusercontent.com/91110557/204155323-7f8408d0-7908-4314-b354-ee0d6f40678d.png)

В случае некорректного запроса (если запись с таким id не найдена)
![image](https://user-images.githubusercontent.com/91110557/204155395-17d1c674-cfba-4d10-bce5-487e25e8c176.png)

Если id некорректный
![image](https://user-images.githubusercontent.com/91110557/204155419-f4181c06-820e-409a-9c7d-3813d2187d4b.png)

3. ПОЛУЧЕНИЕ НЕСКОЛЬКИХ ПОНЧИКОВ (В ДАННЫЙ МОМЕНТ УСТАНОВЛЕН ЛИМИТ 2 ЗАПИСИ)

![image](https://user-images.githubusercontent.com/91110557/204155568-d06fb14b-9d5d-44d6-864e-d1e5c59d5a94.png)

page_count - количество станиц (Количество всех записей / лимит (2 записи), округленное в большую сторону)

Можно передать параметр page (текущую страницу)
![image](https://user-images.githubusercontent.com/91110557/204155691-115100a6-4e07-4d92-a7dc-09eb3805c4e8.png)

4. СОЗДАНИЕ ПОНЧИКА
![image](https://user-images.githubusercontent.com/91110557/204155712-2639ab89-ceb6-4aa5-9047-376bc57e96da.png)

description - необязательное поле
ingredientsNames - уникальные имена ингредиентов пончика (если из нет в базе данных, то они не будут добавлены к пончику (ошибки не будет)) 

5. ОБНОВЛЕНИЕ ПОНЧИКА
![image](https://user-images.githubusercontent.com/91110557/204155863-8127a960-aec7-4637-80e2-8355b3a7a02f.png)

все тоже самое, что у create, только все поля необязательны.

если запись не найдена
![image](https://user-images.githubusercontent.com/91110557/204155894-3a6644bf-43a2-4a27-a354-138f46057ed2.png)

6. УДАЛЕНИЕ ПОНЧИКА
![image](https://user-images.githubusercontent.com/91110557/204156119-cad58e6c-2a2c-4796-bf6c-695b25560ee3.png)

7. ПОЛУЧЕНИЕ ВСЕХ ИНГРЕДИЕНТОВ

![image](https://user-images.githubusercontent.com/91110557/204156297-a6a9ddb3-467e-43b8-a7ee-dba1d838dec0.png)

все аналогично получению пончиков

8. СОЗДАНИЕ ИНГЕДИЕНТА
![image](https://user-images.githubusercontent.com/91110557/204156360-704b53c0-ef9b-4939-8447-b7bd5ab8b515.png)

ВНИМАНИЕ! на этот endpoint нужно отправлять НЕ json, а fotm-data с media файломи!

image - необязательное поле
name - должен быть уникальным (2 одинаковых ингредиентов быть не должно)
![image](https://user-images.githubusercontent.com/91110557/204156539-f6d97d26-dee4-48d7-8f2c-55b8688531a1.png)

9. УДАЛЕНИЕ ИНГРЕДИЕНТА
![image](https://user-images.githubusercontent.com/91110557/204156576-f298da8c-95ce-4816-baf6-b7c3f8f6214e.png)

10. УДАЛЕНИЕ ИНГРЕДИЕНТА У ПОНЧИКА
![image](https://user-images.githubusercontent.com/91110557/204156860-b83b8434-0f0b-4e82-926d-cddaf31f419b.png)


до
![image](https://user-images.githubusercontent.com/91110557/204156789-b0fe7d99-d977-4041-8d57-8d80ca7e1ff5.png)

после
![image](https://user-images.githubusercontent.com/91110557/204156872-ff5ca3c7-7fec-4945-8303-d4a13f356c68.png)











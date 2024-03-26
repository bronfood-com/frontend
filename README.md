[https://bronfood-com.github.io/front/](https://bronfood-com.github.io/front/) - Превью-билд из main бранча

# Бронфут.ком - фронтенд

# Требования

Node 18+  
npm 7+

# Установка

1.  Склонировать репозиторий
2.  Установить зависимоcти командой:

    `npm install` или `yarn install`

# Скрипты

- Дев сервер  
  `npm run dev`

- Превью  
  `npm run preview`

- Билд  
  `npm run build`

- Форматирование prettier.
  `npm run prettier`

- Запуск eslint  
  `npm run lint`

Также это выполняется перед каждым коммитом при помощи pre-commit хуков. Чтобы проверить, работают ли пре-коммит хуки, нужно открыть любой ts/tsx файл, оставить там `;;` на последней строке, запустить `git commit`. Должен сработать хук, и преттиер должен убрать эти `;;`. Если не работает, то это важно пофиксить, а не то мы погрязнем в мерж-конфликтах.

## editorconfig

Нужно установить плагин editorconfig для IDE. Чтобы проверить работает он или нет: в любом файле удалить последнюю пустую строку и нажать Ctrl+S. Если editorconfig работает, то пустая строка должна появиться опять. Если не появилась, то это значит, что editorconfig не работает, и надо его чинить. Это важно чинить, иначе будет много мерж-конфликтов.

# Установка докер контейнера с бекендом

1.  Склонировать репозиторий
    `git clone https://github.com/bronfood-com/backend `

2.  Для запуска необходимо изменить .env: В поле DB_HOST нужно установить значение db
3.  `docker-compose -f infra/docker-compose.django_db.yml up -d`

# Styleguide

- Названия функций, классов, комменты, коммиты - только на английском
- Если нужно отключить еслинт над какой-нибудь строчкой, надо написать коммент почему, и отключать его именно над этой строчкой
- Если хочется оставить туду (TODO) коммент в коде, то надо сделать тикет, и оставить ссылку на тикет, и запланировать время когда его делать. Если нельзя запланировать время, то туду убираем.
- Идентация пробелами. Проверить работает ли editorconfig: в любом файле убрать пустую строчку в конце файла и нажать Ctrl+S, пустая строка должна появиться опять.
- Публичные интерфейсы документируем с помощью jsdoc
- Нельзя оставлять закомменченный код

# Процесс

Делаем фичи максимально е2е, и потом мержим их. Например, на главной у нас есть две ссылки "зарегаться как заведение" и как "покупатель". Начнем с экранов для покупателя, и пока не будет экранов для заведения, то не будем добавлять ссылку "зарегаться как заведение".

Делаем ПР, ждем одного апрува, и тогда мержим. Соответственно, чужие ПРы тоже надо смотреть, и если не против, что этот код попадет в мастер, то апрувать.

Каждый ПР должен билдиться без ошибок на CI.

Чтобы процесс ревью проходел быстрее, стоит делать ПРы удобными для ревью. Этому способствует:

- в описании указать намерение этого ПРа, чтобы было понятно, чего автор хочет добиться этими изменениями;
- посмотреть свой код еще раз, часто можно увидеть много штук, оставленных по невнимательности;
- убедиться, что нет мерж-конфликтов, что сиай проходит, и что появилась ссылка на превью-билд;
- и вообще, что ПР готов к мержу;
- каждый коммент должен быть отвечен. Даже если это ответы "да-да-пофиксил-пофиксил", выглядит тупо, но это очень сильно помогает понимать что сделано, а что нет.

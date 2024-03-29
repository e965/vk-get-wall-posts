### И что мне с этим делать?

Скрипт собирает и систематизирует все посты со стены сообщества, что при её открытости позволяет гораздо легче найти посты какого-нибудь нужного вам пользователя.

* Установи [Node.js](https://nodejs.org/en/download/) и [Git](https://git-scm.com/downloads)
* Создай директорию проекта и зайди в неё через терминал
* Введи `git clone https://github.com/e965/vk-get-wall-posts .`, подожди окончания загрузки
* Введи `npm install` для установки зависимостей проекта
* После окончания установки, открой файл `index.js` в любом удобном текстовом редакторе (рекомендую Notepad++)
* Авторизуйся [здесь](https://e965.github.io/vk-feed/) на сутки, и вставь полный URL (будет что-то вроде `https://oauth.vk.com/blank.html#access_token=...`) внутрь кавычек в строке `10` (переменная `URL_WITH_TOKEN`)
* Задай переменной `GROUP_ID` на строке `8` ID нужного сообщества, без минуса (например, `148053521` - ID сообщества [Apple](https://vk.com/club148053521))
* Введи `npm start`

После окончания работы, скрипт выдаст в директорию `db/` файл следующего содержания:

```js
{
	"1": [
		1, 2, 3, ...
	],
	"4": [
		5, 6, 7, ...
	],
	...
}
```

`1` и `4` здесь - ID пользователей, `1`/`2`/`3` - массив ID записей пользователя с ID `1`, `5`/`6`/`7` - массив ID записей пользователя с ID `4`.  y
Соответственно, используя `Ctrl+F` мы можем найти пользователя по его ID, а затем подставив нужные значения в ссылку `https://vk.com/wall-%ID_группы%_%поста%` (например `https://vk.com/wall-1_7`) - получим ссылку на его пост.

Учитывай, что лимит запросов со стороны ВК на используемый скриптом API-метод `wall.get` - 5000 в сутки, и за один запрос можно получить только 100 постов. То есть максимум записей, которые можно получить за сутки - 500000.

Также, у пользователя, от имени которого выполнена авторизация, должен быть доступ к группе.

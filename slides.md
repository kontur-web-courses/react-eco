title: React Ecosystem course
style: styles.css
output: index.html

---

# **React Ecosystem**

https://kontur-web-courses.github.io/react-eco/

---

# О блоке

Современная frontend разработка использует большое количество инструментов, которые:

- позволяют оптимизировать приложения
- помогают писать более качественный код
- упрощают его поддержку

---

# Node.js

- Node.js — среда выполнения JavaScript с движком V8 от Google
- Она позволяет запускать JavaScript вне браузера
- Множество инструментов разработки написано именно на Node.js
- А некоторые современные на [Go](https://github.com/evanw/esbuild) или [Rust](https://github.com/swc-project/swc)

---

# Богатая стандартная библиотека

- [process](https://nodejs.org/api/process.html) — информация и контроль текущего процесса Node.js
- [console](https://nodejs.org/api/console.html) — работа с консолью
- [fs](https://nodejs.org/api/fs.html) — файловая система
- [path](https://nodejs.org/api/path.html) — построение путей в разных ОС
- [os](https://nodejs.org/api/os.html) — особенности ОС
- [http](https://nodejs.org/api/http.html) — http клиент и сервер
- и [другие](https://nodejs.org/api/)

---

# Модули

Модули на уровне языка появились только в стандарте **ES2015**

Поэтому программисты выкручивались разными способами:

- Шаблон [Модуль](https://learn.javascript.ru/closures-module), использующий замыкание
- _AMD_ (Asynchronous Module Definition) — шаблон модуля, позволяющий загружать модули асинхронно. Использует функцию require
- _CommonJS_ — шаблон модуля с синхронной загрузкой модулей. Стал популярен благодаря Node.js
- _UMD_ — модуль в таком формате можно подключить и в CommonJS-модуле, и в AMD-модуле

[Обзор](https://habrahabr.ru/company/yandex/blog/192874/#es2015-modules-2015) эволюции модулей в JavaScript

---

# CommonJS в Node.js

- изучи файлы `lib.cjs` и `main.cjs` в папке `part-01`
- обрати внимание на расширение — `.cjs`, [подробнее о выборе системы модулей](https://nodejs.org/api/packages.html#determining-module-system)

---

# Модули ES2015

А так выглядят модули согласно стандарту ES2015

```js
// calc.js
let notExported = "whatever";
export function square(x) {
  return x * x;
}
export const MY_CONSTANT = 123;
export default function () {
  /* noop */
}

// main.js
import noop from "calc";
import { square } from "calc";
console.log(square(3));
noop();
```

---

# Node Package Manager

- Пакетный менеджер для Node.js
- Содержит [более](https://blog.npmjs.org/post/615388323067854848/so-long-and-thanks-for-all-the-packages.html) 1 000 000 пакетов
- Устанавливается вместе с Node.js

![Логотип npm](assets/npm.png)

---

# Semantic Versioning

Пакетам в npm принято ставить версию, согласно [семантическому версионированию](http://semver.org/)  
Пример версии — `2.11.165-beta`  
В номере версии `MAJOR.MINOR.PATCH` увеличивается

- MAJOR-версия, при добавлении несовместимых изменений API
- MINOR-версия, при добавлении функциональности с сохранением обратной совместимости
- PATCH-версию, при исправлении багов

Можно добавлять теги для пред-релизов, экспериментов, и другой метаинформации

---

1. в папке `part-02` выполни `npm init`, соглашайся на все значения по умолчанию. В результате npm создаст файл с конфигурацией пакета — `package.json`
2. Установи пакет с указанием версии: `npm install --save-dev uvu@0.5.2` — эта библиотека вскоре понадобится
3. Загляни в папку `node_modules` — там установленные модули
4. Список зависимостей от других пакетов хранится в `package.json`. Убедись, что `package.json` зафиксирована зависимость от установленных пакетов
5. Можно указывать не только конкретные версии пакетов, но также теги или диапазоны, список зафиксированных версий на момент установки хранится в файле `package-lock.json`

---

Разделы `package.json`, отвечающие за зависимости

- `dependencies` — пакеты, которые нужны всегда. При установке добавляем флаг `--save`. по умолчанию добавляется для всех пакетов.
- `devDependencies` — пакеты, которые нужны только для разработки. При установке добавляем флаг `--save-dev`
- `peerDependencies` — требования к другим зависимостям. Так пакет с плагином для jQuery может потребовать, чтобы его устанавливали только вместе с jQuery 3.0 и выше

---

Пакеты можно устанавливать в папку с проектом

```sh
npm install prettier
```

или глобально в систему — они попадут в [специальную папку](https://docs.npmjs.com/cli/v7/configuring-npm/folders#node-modules)

```sh
npm install -g prettier
```

---

В реальной разработке, если проект не новый, то все нужные пакеты уже записаны в `package.json`.

Остается только запустить команду `npm i` (это краткая запись для `npm install`) и все зависимости из `package.json`
установятся с указанными версиями библиотек

[Подробности](https://docs.npmjs.com/) про npm и package.json

---

# Unit тестирование

Минималистичная библиотека [uvu](https://github.com/lukeed/uvu) уже установлена

Популярные альтернативы: [Mocha](https://github.com/mochajs/mocha) и [Jest](https://github.com/facebook/jest)

---

# Запуск тестов

- Изучи файл `part-02/tests/example.mjs`
- Запусти тесты из него с помощью `node tests/example.mjs`

---

# Быстрый запуск

1. Настрой запуск тестов через npm, чтобы не писать каждый раз длинную команду

```json
//Поправь в package.json
"scripts": { "test": "uvu tests" }
```

2. А теперь запусти тесты из консоли командой `npm test`
3. Заметь, что в скриптах npm можно не указывать путь до uvu:
   - npm догадается, что uvu — это пакет из `node_modules`
   - в `package.json` пакета uvu указано какой из скриптов выполнять по умолчанию

---

# Больше тестов

1. В файле `tests/add.mjs` создай тест, проверяющий, что `add('2', '2')` это `4`
2. Запусти `npm test`
3. Тест должен упасть
4. Почини тест (исправь код функции в файле`src/math.mjs`)

---

# Статический анализ

---

# Prettier

- [prettier](https://github.com/prettier/prettier) автоматически форматирует код
- перейди в `part-03`
- выполни `npm install --save-dev prettier`
- создай конфигурацию по умолчанию с помощью `echo {} > .prettierrc.json`

---

# Упражнение

- посмотри на файл `src/game.mjs`
- выполни `npx prettier --write src`
- попробуй изменить [настройки](https://prettier.io/docs/en/options.html) из `.prettierrc.json`
- используй каждый раз когда пишешь код на JavaScript

---

# ESLint

[eslint](https://github.com/eslint/eslint) нужен для проверки кода на соответствие набору (обычно семантических правил)

---

# Упражнение

- в `part-03` выполни `npm install eslint --save-dev`
- создай конфигурацию по умолчанию с помощью `npx eslint --init`:
  <ul style="font-size: 75%"> 
  <li>How would you like to use ESLint? > To check syntax, find problems, and enforce code style</li>
  <li>What type of modules does your project use? > JavaScript modules (import/export)</li>
  <li>Which framework does your project use? > None of these</li>
  <li>Does your project use TypeScript? > No</li>
  <li>Where does your code run? > сними галочку с Browser и поставь на Node</li>
  <li>How would you like to define a style for your project? > Use a popular style guide</li>
  <li>Which style guide do you want to follow? > Airbnb: https://github.com/airbnb/javascript</li>
  <li>What format do you want your config file to be in? > JSON</li>
  </ul>
- попробуй выполнить проверку на файле `game.mjs`, опции для запуска ищи [здесь](https://eslint.org/docs/user-guide/command-line-interface)
- найди какой-нибудь популярный JS проект на гитхаб, и попробуй проверить с текущей конфигурацией какой-нибудь файл из него

---

# Игнорирование

Возможный источник ошибок – проверка ненужных файлов:

- чужого кода в node_modules
- результатов сборки
- специфичных файлов

Для этого существует специальный файл настроек — `.eslintignore` – в нем описываются правила игнорирования при проверке

---

# Проверки при написании кода

Чтобы ошибки проверялись при написании кода надо подключить ESLint к твоей любимой IDE:

- В Visual Studio Code нужно просто скачать расширение ESLint и все заработает.
- Чтобы включить ESLint в WebStorm, поищи в Settings по фразе ESLint и поставь галочку

---

# Сборка и транспиляция

Современный фронтенд код не всегда можно использовать прямо в браузере пользователя, да и браузеры бывают разные, скачивать много мелких модулей долго, к тому же jsx и typescript браузер тоже не понимает. Такого рода проблемы решаются различными сборщиками и компиляторами

---

# Webpack

![процесс сборки webpack](assets/webpack.png)

---

# Точки расширения Webpack

- _loaders_ позволяют подавать на вход файлы различных форматов:
  - написаны для популярных форматов
  - e.g. компиляция в JavaScript
  - e.g. компиляция less, sass, stylus в css
- _plugins_ управляют дальнейшими преобразованиями:
  - минимизация
  - объединение множества файлов в один
  - разделение на бандлы ("куски кода", например, бандл со всеми библиотеками или бандл с кодом для какой-то одной
    страницы)
- _конфигурирование_ для разных окружений:
  - разработки
  - тестирования
  - продакшн

---

# Использование Webpack

- в `part-04` выполни `npm install`
- найди файл `webpack.config.js` и замени в нем строки на нужные, чтобы из файла `src/index.js` получился `dist/main.js`
- после этого выполни в папке команду `npx webpack --config webpack.config.js` и открой в браузере файл `index.html`
- обычно полезные команды выносят в раздел `scripts` в `package.json`, добавь туда: `"build": "webpack"`
- теперь запускать сборку можно с помощью `npm run build`

---

# Отладка

Сейчас в коде есть ошибка, но отлаживать непонятный main.js в браузере неприятно. Поэтому сгенерируй [sourcemap](https://webpack.js.org/guides/development/#using-source-maps):

- если кликнуть на ссылку с названием файла и номером строки, то браузер покажет эту строку на вкладке Source
- для этого добавь поле `mode` со значением `development`
- и поле `devtool` со значением `source-map`
- в браузере на вкладке Sources в Dev Tools должны появиться отдельные js модули.
- теперь из ошибки в консоли можно попасть прямо в код исходного файла. Попробуй!
- теперь можно пофиксить ошибку

---

# Dev server

В разработке часто полезно иметь возможность автоматически пересобирать бандл, когда происходит изменение исходного кода  
Для этого в webpack есть несколько [вариантов](https://webpack.js.org/guides/development/#choosing-a-development-tool), самый простой из них — наблюдение:

- добавь скрипт `"watch": "webpack --watch"`
- теперь при запуске `npm run watch` webpack будет следить за файлами
- попробуй изменить что-то в `primes.js` и перезагрузить страницу
- для автоматической перезагрузки, можно отдельно настроить [dev-server](https://webpack.js.org/guides/development/#using-webpack-dev-server)

---

# Babel

Браузеры и даже Node.js часто не знают новомодных фич стандарта. Можно ли их использовать?

Можно с помощью [Babel](https://babeljs.io/), превращающего новый JS в старый

Babel – это транспайлер, как компилятор, только структура программы не меняется

---

# Babel

- установи Babel и набор настроек к нему: `npm install -D babel-loader @babel/core @babel/preset-env`
- добавь специальные правила в `webpack.config.js` как написано [здесь](https://webpack.js.org/loaders/babel-loader/#usage)
- `preset-env` умеет выбирать набор трансформаций по базе поддержки фич в браузерах с [помощью browserslist](https://babeljs.io/docs/en/babel-preset-env#browserslist-integration)
- добавь в `package.json` поле `browserslist` со значением `IE 11`
- в реальной разработке не достаточно транспилировать код, чтобы он заработал в IE 11, приходится еще помогать браузеру в реализации некоторых фич с помощью полифиллов, например [core-js](https://github.com/zloirock/core-js)

---

# create react app

Обычно в командах уже настроено всё что нужно, будь то webpack, rollup или vite, а для новых проектов выбирают шаблон, например create-react-app

Перейди в папку part-05 и выполни в ней команду `npx create-react-app my-app --template typescript`

---

# create react app

CRA создает окружение в котором есть много полезных вещей:

- скрипты для разработки `npm start`, тестирования `npm test` и сборки в прод `npm run build`
- настроенный webpack и babel с поддержкой react, typescript\*, [современных фич](https://create-react-app.dev/docs/supported-browsers-features) и набор полифиллов
- настроенный ESLint, но prettier нужно [добавлять отдельно](https://create-react-app.dev/docs/setting-up-your-editor#formatting-code-automatically)
- поддержка CSS и SASS для [стилизации компонентов](https://create-react-app.dev/docs/adding-a-stylesheet)
- поддержка postcss и autoprefixer [для обработки css](https://create-react-app.dev/docs/post-processing-css)
- поддержка загрузки картинок, шрифтов и [других файлов](https://create-react-app.dev/docs/adding-images-fonts-and-files)
- [документация по этим и другим фичам живет здесь](https://create-react-app.dev/)

---

# create react app

По умолчанию большая часть конфигурации скрыта от пользователя, чтобы увидеть внутренности можно выполнить `npm run eject`

---

# CSS Modules

[Хитрая спецификация](https://github.com/css-modules/css-modules), которая позволяет гарантировать уникальность стилей не прибегая к BEM

CRA [поддерживает эту возможность](https://create-react-app.dev/docs/adding-a-css-modules-stylesheet) для файлов с расширением `.module.css`

Благодаря этой, можно использовать понятные названия стилей в файлах, а при сборке они автоматически преобразуются во что-то вида `Button_error_ax7yz`

---

# Routing

Не смотря на то, что на React мы обычно делаем SPA, нам всё равно нужны "виртуальные" страницы

Для реализации роутинга есть много библиотек, но мы посмотрим на [react-router](https://reactrouter.com/)

Перейди на https://reactrouter.com/docs/en/v6/getting-started/tutorial продолжать будем там

---

# Время большой практики

Перейди в `part-06` и следуй инструкциям из `README.md`

---

# Итоги

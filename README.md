## Обзор проекта

Проект electronic представляет из себя несколько частей
- Сайт [electronic-ssr.frontend](https://github.com/Timer4ik/electronic-ssr.frontend) next js + typescript + redux tookit 
- Админ панель [electronic-admin.frontend](https://github.com/Timer4ik/electronic-admin) для добавления контента на сайт react js + typescript + redux tookit,rtk query
- Бэкэнд [electronic.backend](https://github.com/Timer4ik/electronic.backend) написанный на node js + express + sequelizу (postgresSQL)

Проект electronic-admin.frontend представляет из себя несколько модулей для работы с контентом на сайте [electronic-ssr.frontend](https://github.com/Timer4ik/electronic-ssr.frontend)

```bash
Приложение предоставляет возможность выполнения crud операций над следующими сущностями:

- Категории
- Характеристики
- Прозводители
- Магазины
- Слайдеры
- Товары

В приложении также присутствует простая авторизация через jwt токены

```

## Использованные технологии

В приложении использовались следующие технологии
- ReactJS + Typescript + Redux toolkit, Rtk query
- Formik js + yup
- Yandex map api

Также для разработки использовался самописный очень простой ui kit

## Как запустить проект

Для начала необходимо создать в postgreSQL бд под названием "electronic" и загрузить туда дамб базы данных, который находится в проекте [electronic.backend](https://github.com/Timer4ik/electronic.backend)

После нужно сконфигурировать бэк в файле db.js под свою субд

После чего можно запустить проекты
- Сайт [electronic-ssr.frontend](https://github.com/Timer4ik/electronic-ssr.frontend)
- Админ [electronic-admin.frontend](https://github.com/Timer4ik/electronic-admin)
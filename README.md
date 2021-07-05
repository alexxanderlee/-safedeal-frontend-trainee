# Адаптивное React-приложение со списком фотографий

При клике на фотографию открывается модальное окно с фотографией, списком комментариев и формой добавления комментария.

### Используемое API

- GET `https://boiling-refuge-66454.herokuapp.com/images` - получение списка фотографий.
- GET `https://boiling-refuge-66454.herokuapp.com/images/:imageId` - получения большого изображения и списка комментариев.
- POST `https://boiling-refuge-66454.herokuapp.com/images/:imageId/comments` - добавление комментария (204 – OK, комментарий не сохраняется).

### Основные скрипты

- `npm start` - запуск приложения в режиме разработки.
- `npm run build` - сборка приложения в папку `build`.

Оригинальное задание - https://github.com/avito-tech/safedeal-frontend-trainee

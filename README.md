# China Dao

Сайт China Dao — помощь с поступлением в вузы Китая. Переписан на Vite + React с модульной архитектурой.

## Структура

```
src/
├── components/
│   ├── Header/       # Шапка и навигация
│   ├── Hero/         # Главный экран
│   ├── Offers/       # Блок «130 офферов»
│   ├── About/        # Обо мне
│   ├── Services/     # Услуги
│   ├── Process/      # Этапы работы
│   ├── Pricing/      # Цены
│   ├── Testimonials/ # Отзывы
│   ├── Faq/          # FAQ
│   ├── Contact/      # Форма заявки
│   └── Footer/       # Подвал
├── data/content.js   # Весь текстовый контент
└── styles/global.css # Глобальные стили
```

Каждая секция — отдельный компонент (`.jsx`) со своим CSS-файлом.

## Запуск

```bash
npm install
npm run dev
```

Откройте [http://localhost:5173](http://localhost:5173).

## Сборка

```bash
npm run build
npm run preview
```

## Деплой

Собранный сайт в папке `dist/` — загрузите на Vercel, Netlify или любой статический хостинг.

# Используем официальный образ Node.js в качестве базового
FROM node:18 AS build

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json (если есть)
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем все остальные файлы проекта в контейнер
COPY . .

# Собираем проект для продакшн
RUN npm run build

# Устанавливаем сервер для продакшн-версии
FROM node:18 AS production

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем только необходимые файлы из предыдущего этапа
COPY --from=build /app/package*.json ./
COPY --from=build /app/.nuxt ./
COPY --from=build /app/static ./static

# Устанавливаем только производственные зависимости
RUN npm install --only=production

# Открываем порт для сервера
EXPOSE 3000

# Команда для запуска Nuxt.js в продакшн-режиме
CMD ["npm", "run", "start"]

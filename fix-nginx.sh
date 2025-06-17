#!/bin/bash

echo "🌐 Исправление конфигурации Nginx"
echo "================================="

# Создание правильной конфигурации
echo "📝 Создание конфигурации Nginx..."
sudo cp nginx-config-fixed.conf /etc/nginx/sites-available/intoclouds

# Активация сайта
echo "🔗 Активация сайта..."
sudo ln -sf /etc/nginx/sites-available/intoclouds /etc/nginx/sites-enabled/

# Удаление дефолтного сайта
echo "🗑️ Удаление дефолтного сайта..."
sudo rm -f /etc/nginx/sites-enabled/default

# Проверка конфигурации
echo "✅ Проверка конфигурации..."
sudo nginx -t

if [ $? -eq 0 ]; then
    echo "✅ Конфигурация корректна"
    
    # Перезапуск Nginx
    echo "🔄 Перезапуск Nginx..."
    sudo systemctl restart nginx
    
    echo "✅ Nginx перезапущен!"
else
    echo "❌ Ошибка в конфигурации Nginx"
    exit 1
fi

#!/bin/bash

echo "🚀 ПОЛНОЕ ИСПРАВЛЕНИЕ INTOCLOUDS"
echo "==============================="

# Переход в директорию проекта
cd /var/www/intoclouds

# Диагностика
echo "🔍 Диагностика..."
./debug-deployment.sh

echo ""
echo "🔧 Исправление деплоя..."
./fix-deployment.sh

echo ""
echo "🌐 Исправление Nginx..."
./fix-nginx.sh

echo ""
echo "✅ ИСПРАВЛЕНИЕ ЗАВЕРШЕНО!"
echo ""
echo "🧪 Финальная проверка:"
sleep 3

echo "PM2 статус:"
pm2 status

echo ""
echo "Nginx статус:"
sudo systemctl status nginx --no-pager -l

echo ""
echo "Тест сайта:"
curl -s http://localhost | head -20

echo ""
echo "🌐 Ваш сайт: http://$(curl -s ifconfig.me)"

#!/bin/bash

echo "🔍 Диагностика деплоя IntoClouds"
echo "==============================="

echo "1. 📁 Структура проекта:"
ls -la /var/www/intoclouds/

echo ""
echo "2. 📦 package.json существует?"
if [ -f "/var/www/intoclouds/package.json" ]; then
    echo "✅ package.json найден"
    head -10 /var/www/intoclouds/package.json
else
    echo "❌ package.json НЕ найден"
fi

echo ""
echo "3. 🔨 .next директория существует?"
if [ -d "/var/www/intoclouds/.next" ]; then
    echo "✅ .next найдена"
    ls -la /var/www/intoclouds/.next/
else
    echo "❌ .next НЕ найдена - проект не собран"
fi

echo ""
echo "4. ⚙️ PM2 процессы:"
pm2 status

echo ""
echo "5. 🌐 Nginx конфигурация:"
sudo nginx -t
echo "Активные сайты:"
ls -la /etc/nginx/sites-enabled/

echo ""
echo "6. 🔌 Порты:"
sudo netstat -tlnp | grep -E ':(80|443|3000)'

echo ""
echo "7. 📋 Логи PM2:"
pm2 logs --lines 10

echo ""
echo "8. 📋 Логи Nginx:"
sudo tail -10 /var/log/nginx/error.log

echo ""
echo "9. 🧪 Тест локального подключения:"
curl -I http://localhost:3000 2>/dev/null || echo "❌ Next.js не отвечает на порту 3000"

echo ""
echo "10. 🧪 Тест через Nginx:"
curl -I http://localhost 2>/dev/null || echo "❌ Nginx не отвечает"

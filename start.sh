#!/bin/bash

# Lion Media Quote System - Quick Start Script
# הפעלה מהירה של מערכת הצעות המחיר

echo "🦁 Lion Media - מערכת הצעות מחיר"
echo "=================================="
echo ""

# בדיקה אם קיים קובץ .env.local
if [ ! -f ".env.local" ]; then
    echo "⚠️  קובץ .env.local לא נמצא. יוצר עותק מ-.env.example..."
    cp .env.example .env.local
    echo "✅ נוצר קובץ .env.local"
    echo ""
    echo "🔧 אנא ערוך את הקובץ .env.local עם הפרטים האמיתיים:"
    echo "   - EMAIL_USER: המייל שלך מ-Gmail"
    echo "   - EMAIL_PASS: App Password מ-Gmail"
    echo ""
    echo "📚 להסבר מפורט, ראה את הקובץ SETUP.md"
    echo ""
fi

# בדיקה אם node_modules קיים
if [ ! -d "node_modules" ]; then
    echo "📦 מתקין חבילות..."
    npm install
    echo "✅ התקנה הושלמה"
    echo ""
fi

echo "🚀 מפעיל את שרת הפיתוח..."
echo "   הכתובת: http://localhost:3001"
echo ""
echo "להפסקה: Ctrl+C"
echo "=================================="
echo ""

# הפעלת השרת
npm run dev
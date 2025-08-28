import puppeteer from 'puppeteer';

export async function generateQuotePDF(): Promise<Buffer> {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  
  // סט את הדף לגודל A4
  await page.setViewport({ width: 794, height: 1123 });
  
  // לטען את הדף עם ההצעה
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3002';
  await page.goto(`${baseUrl}?pdf=true`, { 
    waitUntil: 'networkidle0',
    timeout: 30000
  });

  // יצירת PDF
  const pdf = await page.pdf({
    format: 'A4',
    printBackground: true,
    margin: {
      top: '1cm',
      right: '1cm',
      bottom: '1cm',
      left: '1cm'
    },
    displayHeaderFooter: true,
    headerTemplate: `
      <div style="font-size: 10px; width: 100%; text-align: center; color: #666; font-family: Arial;">
        הצעת מחיר - Lion Media
      </div>
    `,
    footerTemplate: `
      <div style="font-size: 10px; width: 100%; text-align: center; color: #666; font-family: Arial;">
        <span>עמוד <span class="pageNumber"></span> מתוך <span class="totalPages"></span></span>
        <span style="float: right;">יוצר: ${new Date().toLocaleDateString('he-IL')}</span>
      </div>
    `
  });

  await browser.close();
  return pdf as Buffer;
}

// פונקציה ליצירת HTML מותאם להדפסה
export function generatePrintHTML(customerEmail: string): string {
  const currentDate = new Date().toLocaleDateString('he-IL');
  
  return `
<!DOCTYPE html>
<html dir="rtl" lang="he">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>הצעת מחיר - Jules וילונות | Lion Media</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Heebo:wght@300;400;500;600;700&display=swap');
    
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    
    body {
      font-family: 'Heebo', Arial, sans-serif;
      background: linear-gradient(135deg, #f0f9ff 0%, #f0fdf4 100%);
      padding: 20px;
      line-height: 1.6;
    }
    
    .container {
      max-width: 800px;
      margin: 0 auto;
      background: white;
      padding: 30px;
      border-radius: 15px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.1);
    }
    
    .header {
      text-align: center;
      border-bottom: 3px solid #0597F2;
      padding-bottom: 20px;
      margin-bottom: 30px;
    }
    
    .logo {
      width: 120px;
      height: auto;
      margin-bottom: 15px;
    }
    
    .title {
      color: #0597F2;
      font-size: 28px;
      font-weight: 700;
      margin-bottom: 10px;
    }
    
    .subtitle {
      color: #618C03;
      font-size: 18px;
      font-weight: 500;
    }
    
    .section {
      margin-bottom: 25px;
      padding: 20px;
      border-radius: 10px;
      border: 1px solid #e5e7eb;
    }
    
    .section-title {
      color: #0597F2;
      font-size: 20px;
      font-weight: 600;
      margin-bottom: 15px;
      border-bottom: 2px solid #618C03;
      padding-bottom: 5px;
    }
    
    .feature-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 15px;
      margin-top: 15px;
    }
    
    .feature-item {
      background: #f8f9fa;
      padding: 15px;
      border-radius: 8px;
      border-right: 4px solid #0597F2;
    }
    
    .feature-icon {
      font-size: 24px;
      margin-left: 10px;
    }
    
    .feature-title {
      font-weight: 600;
      color: #1f2937;
      margin-bottom: 5px;
    }
    
    .feature-desc {
      color: #6b7280;
      font-size: 14px;
    }
    
    .price-highlight {
      background: linear-gradient(135deg, #0597F2, #618C03);
      color: white;
      padding: 15px 25px;
      border-radius: 10px;
      text-align: center;
      font-size: 24px;
      font-weight: 700;
      margin: 15px 0;
    }
    
    .cost-table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 15px;
    }
    
    .cost-table th,
    .cost-table td {
      padding: 12px;
      text-align: right;
      border-bottom: 1px solid #e5e7eb;
    }
    
    .cost-table th {
      background: #f3f4f6;
      font-weight: 600;
      color: #0597F2;
    }
    
    .signature-area {
      margin-top: 30px;
      padding: 25px;
      border: 2px dashed #0597F2;
      border-radius: 10px;
      background: #f8fafc;
    }
    
    .signature-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 30px;
      margin-top: 20px;
    }
    
    .signature-box {
      text-align: center;
    }
    
    .signature-line {
      border-bottom: 2px solid #374151;
      height: 80px;
      margin: 15px 0;
      position: relative;
    }
    
    .signature-label {
      font-weight: 600;
      color: #0597F2;
      margin-bottom: 10px;
    }
    
    .date-info {
      background: #e0f2fe;
      padding: 15px;
      border-radius: 8px;
      text-align: center;
      margin-top: 20px;
    }
    
    .footer {
      margin-top: 30px;
      text-align: center;
      padding-top: 20px;
      border-top: 2px solid #e5e7eb;
      color: #6b7280;
    }
    
    .contact-info {
      background: #f0f9ff;
      padding: 20px;
      border-radius: 10px;
      text-align: center;
      margin-top: 20px;
    }
    
    @media print {
      body {
        background: white;
        padding: 0;
      }
      
      .container {
        box-shadow: none;
        border: none;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- Header -->
    <div class="header">
      <div class="title">הצעת מחיר</div>
      <div class="subtitle">Jules וילונות | מערכת הזמנת פגישות</div>
      <div style="margin-top: 15px; color: #6b7280;">
        תאריך: ${currentDate} | למייל: ${customerEmail}
      </div>
    </div>

    <!-- Introduction -->
    <div class="section">
      <h2 class="section-title">🎯 תיאור הפרויקט</h2>
      <p>
        לאחר בחינה של הצרכים העסקיים שלכם, אנו מציעים לפתח עבורכם מערכת מתקדמת להזמנת פגישות, 
        שתאפשר לכם לייעל את תהליך העבודה ולשדר ללקוחות חווית שירות חדשנית ומסודרת.
      </p>
    </div>

    <!-- Features -->
    <div class="section">
      <h2 class="section-title">🚀 תכונות המערכת</h2>
      <div class="feature-grid">
        <div class="feature-item">
          <div class="feature-title">
            <span class="feature-icon">📅</span>
            אינטגרציה מלאה עם יומן Google
          </div>
          <div class="feature-desc">סנכרון אוטומטי להצגת מועדים פנויים</div>
        </div>
        
        <div class="feature-item">
          <div class="feature-title">
            <span class="feature-icon">🧠</span>
            חישוב חכם של מרווחים
          </div>
          <div class="feature-desc">התחשבות בזמני נסיעה ולוח זמנים הגיוני</div>
        </div>
        
        <div class="feature-item">
          <div class="feature-title">
            <span class="feature-icon">💬</span>
            תזכורות WhatsApp ללקוחות
          </div>
          <div class="feature-desc">הודעות מותאמות אישית עם פרטי הפגישה</div>
        </div>
        
        <div class="feature-item">
          <div class="feature-title">
            <span class="feature-icon">📱</span>
            הוספה ליומן הלקוח
          </div>
          <div class="feature-desc">שמירה בלחיצת כפתור ביומן האישי</div>
        </div>
        
        <div class="feature-item">
          <div class="feature-title">
            <span class="feature-icon">💳</span>
            סליקת תשלומים
          </div>
          <div class="feature-desc">תשלום עבור ייעוץ ישירות מהמערכת</div>
        </div>
        
        <div class="feature-item">
          <div class="feature-title">
            <span class="feature-icon">📊</span>
            חישוב הצעת מחיר ראשונית
          </div>
          <div class="feature-desc">אומדן מחיר על בסיס מידות וסוג בד</div>
        </div>
      </div>
    </div>

    <!-- Pricing -->
    <div class="section">
      <h2 class="section-title">💰 עלויות הפרויקט</h2>
      
      <div class="price-highlight">
        עלות פיתוח: 5,900 ₪ (לא כולל מע״מ)
      </div>
      
      <table class="cost-table">
        <thead>
          <tr>
            <th>פריט</th>
            <th>תיאור</th>
            <th>עלות</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>🌐 דומיין</td>
            <td>חיבור לדומיין הקיים</td>
            <td>ללא עלות נוספת</td>
          </tr>
          <tr>
            <td>🔧 תחזוקה חודשית</td>
            <td>אחסון, שרת ותפעול תקלות</td>
            <td>150 ₪ לחודש</td>
          </tr>
          <tr>
            <td>💬 תזכורות WhatsApp</td>
            <td>שירות אופציונלי (GreenAPI)</td>
            <td>$12 לחודש</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Terms -->
    <div class="section">
      <h2 class="section-title">📋 תנאי ההצעה</h2>
      <ul style="padding-right: 20px; space-y: 8px;">
        <li><strong>תוקף ההצעה:</strong> 30 יום מתאריך ההצעה</li>
        <li><strong>תשלום:</strong> 50% מקדמה, 50% עם מסירת המערכת</li>
        <li><strong>זמן פיתוח:</strong> 2-3 שבועות עבודה</li>
        <li><strong>תחזוקה ותמיכה:</strong> 150 ₪ לחודש (לא כולל מע״מ)</li>
        <li><strong>אחריות:</strong> 3 חודשי אחריות מלאה על המערכת</li>
      </ul>
    </div>

    <!-- Signature -->
    <div class="signature-area">
      <h2 style="text-align: center; color: #0597F2; margin-bottom: 20px;">✍️ אישור ההצעה</h2>
      
      <div class="signature-grid">
        <div class="signature-box">
          <div class="signature-label">Jules וילונות</div>
          <div class="signature-line"></div>
          <div style="font-size: 12px; color: #6b7280;">
            שם: _________________ תאריך: _____________
          </div>
        </div>
        
        <div class="signature-box">
          <div class="signature-label">Lion Media</div>
          <div class="signature-line"></div>
          <div style="font-size: 12px; color: #6b7280;">
            שם: _________________ תאריך: _____________
          </div>
        </div>
      </div>
    </div>

    <!-- Contact -->
    <div class="contact-info">
      <h3 style="color: #0597F2; margin-bottom: 10px;">📞 פרטי התקשרות</h3>
      <div><strong>Lion Media</strong></div>
      <div>📧 triroars@gmail.com</div>
      <div>🌐 www.lionmedia.co.il</div>
      <div style="margin-top: 10px; font-size: 14px; color: #6b7280;">
        נשמח לענות על כל שאלה ולהתחיל בפיתוח המערכת שלכם!
      </div>
    </div>

    <div class="date-info">
      <strong>הצעה זו נוצרה אוטומטית בתאריך: ${currentDate}</strong>
    </div>
  </div>
</body>
</html>
  `;
}
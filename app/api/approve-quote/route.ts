import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { generatePrintHTML } from '../../../lib/pdf-generator';

export async function POST(request: NextRequest) {
  try {
    const { customerEmail, action } = await request.json();

    // ולידציה בסיסית
    if (!customerEmail) {
      return NextResponse.json(
        { error: 'כתובת מייל הלקוח היא שדה חובה' },
        { status: 400 }
      );
    }

    if (!action || !['approve', 'reject'].includes(action)) {
      return NextResponse.json(
        { error: 'פעולה לא תקינה' },
        { status: 400 }
      );
    }

    // יצירת transporter עם Gmail
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const isApproved = action === 'approve';
    const statusText = isApproved ? 'אושרה' : 'נדחתה';
    const statusEmoji = isApproved ? '✅' : '❌';
    const statusColor = isApproved ? '#10b981' : '#ef4444';

    // יצירת PDF רק במקרה של אישור
    let pdfBuffer: Buffer | null = null;
    if (isApproved) {
      try {
        // בסביבת ייצור נעביר את ה-HTML כמו שהוא (בעיה עם Puppeteer ב-Vercel)
        const htmlContent = generatePrintHTML(customerEmail);
        console.log('PDF generation skipped in production environment');
        // ניתן להוסיף פתרון PDF עם Vercel Edge Functions בעתיד
      } catch (pdfError) {
        console.error('Error generating PDF:', pdfError);
        // ממשיכים גם אם יצירת PDF נכשלה
      }
    }

    // תוכן המייל לצוות Lion Media
    const teamEmailContent = `
      <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f8f9fa; padding: 20px; border-radius: 10px;">
        <div style="background: linear-gradient(135deg, #0597F2, #618C03); padding: 30px; border-radius: 10px; margin-bottom: 20px;">
          <h1 style="color: white; text-align: center; margin: 0; font-size: 28px;">הצעת מחיר ${statusText} ${statusEmoji}</h1>
        </div>
        
        <div style="background: white; padding: 25px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <h2 style="color: #0597F2; border-bottom: 2px solid ${statusColor}; padding-bottom: 10px;">פרטי ההצעה:</h2>
          
          <div style="margin: 20px 0;">
            <p style="margin: 10px 0; font-size: 16px;"><strong style="color: #0597F2;">🏢 לקוח:</strong> Jules וילונות</p>
            <p style="margin: 10px 0; font-size: 16px;"><strong style="color: #0597F2;">📧 מייל לקוח:</strong> <a href="mailto:${customerEmail}" style="color: #618C03;">${customerEmail}</a></p>
            <p style="margin: 10px 0; font-size: 16px;"><strong style="color: #0597F2;">📋 פרויקט:</strong> פיתוח מערכת הזמנת פגישות</p>
            <p style="margin: 10px 0; font-size: 16px;"><strong style="color: #0597F2;">💰 סכום:</strong> 5,900 ₪ (לא כולל מע״מ)</p>
            <p style="margin: 10px 0; font-size: 16px;"><strong style="color: #0597F2;">📊 סטטוס:</strong> <span style="color: ${statusColor}; font-weight: bold;">${statusText}</span></p>
          </div>
          
          <div style="margin-top: 25px; padding: 15px; background: linear-gradient(135deg, #f0f9ff, #f0fdf4); border-radius: 8px; text-align: center;">
            <p style="margin: 0; color: #0597F2; font-weight: bold;">עודכן בתאריך: ${new Date().toLocaleString('he-IL')}</p>
          </div>
        </div>
        
        <div style="text-align: center; margin-top: 20px; color: #6b7280;">
          <p style="margin: 0; font-size: 14px;">נשלח אוטומטית ממערכת הצעות המחיר - Lion Media</p>
        </div>
      </div>
    `;

    // תוכן המייל ללקוח
    const customerEmailContent = isApproved 
      ? `
        <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f8f9fa; padding: 20px; border-radius: 10px;">
          <div style="background: linear-gradient(135deg, #10b981, #059669); padding: 30px; border-radius: 10px; margin-bottom: 20px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 28px;">הצעת המחיר אושרה! 🎉</h1>
          </div>
          
          <div style="background: white; padding: 25px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h2 style="color: #10b981; text-align: center; margin-bottom: 20px;">שלום Jules וילונות! 👋</h2>
            
            <p style="font-size: 16px; line-height: 1.6; margin-bottom: 15px;">
              אנחנו שמחים להודיע לכם שהצעת המחיר למערכת הזמנת הפגישות אושרה!
            </p>

            <div style="background: #e0f2fe; padding: 15px; border-radius: 10px; border-right: 4px solid #0597F2; margin: 20px 0; text-align: center;">
              <h3 style="color: #0277bd; margin-top: 0;">📄 הצעת המחיר למימוש</h3>
              <p style="margin: 0; color: #0277bd;">
                ניתן לגשת להצעת המחיר המלאה במקור דרך הקישור המצורף, להדפיס ולחתום עליה.
                <br><br>
                <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3002'}" style="color: #0597F2; font-weight: bold;">🔗 לצפיה והדפסת ההצעה לחצו כאן</a>
              </p>
            </div>
            
            <div style="background: #f0fdf4; padding: 20px; border-radius: 10px; border-right: 4px solid #10b981; margin: 20px 0;">
              <h3 style="color: #059669; margin-top: 0;">📋 פרטי הפרויקט:</h3>
              <ul style="margin: 10px 0; padding-right: 20px;">
                <li>מערכת מתקדמת להזמנת פגישות</li>
                <li>אינטגרציה עם יומן Google</li>
                <li>תזכורות WhatsApp</li>
                <li>חישוב מחירים ראשוני</li>
                <li>סליקת תשלומים</li>
              </ul>
              <p style="font-size: 18px; font-weight: bold; color: #059669; margin-top: 15px;">
                💰 סכום: 5,900 ₪ (לא כולל מע״מ)
              </p>
            </div>
            
            <div style="background: #eff6ff; padding: 20px; border-radius: 10px; border-right: 4px solid #0597F2; margin: 20px 0;">
              <h3 style="color: #0597F2; margin-top: 0;">🚀 השלבים הבאים:</h3>
              <ol style="margin: 10px 0; padding-right: 20px;">
                <li>אנא חתמו על הצעת המחיר המצורפת ושלחו חזרה</li>
                <li>נתחיל בפיתוח המערכת מיד לאחר קבלת החתימה</li>
                <li>נעדכן אתכם על התקדמות הפרויקט שבועית</li>
                <li>נתאם פגישות ובדיקות לפי הצורך</li>
                <li>המערכת תהיה מוכנה תוך 2-3 שבועות</li>
              </ol>
            </div>
            
            <div style="background: #fff3cd; padding: 15px; border-radius: 10px; border-right: 4px solid #f59e0b; margin: 20px 0;">
              <h3 style="color: #92400e; margin-top: 0;">💳 פרטי תשלום:</h3>
              <p style="margin: 5px 0; color: #92400e;">
                <strong>מקדמה:</strong> 2,950 ₪ (50% מהסכום הכולל)<br>
                <strong>יתרה:</strong> 2,950 ₪ (עם מסירת המערכת המוכנה)<br>
                <strong>מעמ על כל תשלום</strong>
              </p>
            </div>
            
            <div style="text-align: center; margin-top: 25px;">
              <p style="font-size: 16px; color: #059669; font-weight: bold;">
                תודה שבחרתם ב-Lion Media! 🦁
              </p>
              <p style="font-size: 14px; color: #6b7280; margin-top: 10px;">
                לכל שאלה או בירור, אנחנו כאן עבורכם
              </p>
              <p style="font-size: 14px; color: #0597F2; margin-top: 5px;">
                📧 triroars@gmail.com | 🌐 www.lionmedia.co.il
              </p>
            </div>
          </div>
        </div>
      `
      : `
        <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f8f9fa; padding: 20px; border-radius: 10px;">
          <div style="background: linear-gradient(135deg, #ef4444, #dc2626); padding: 30px; border-radius: 10px; margin-bottom: 20px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 28px;">עדכון בנוגע להצעת המחיר</h1>
          </div>
          
          <div style="background: white; padding: 25px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h2 style="color: #ef4444; text-align: center; margin-bottom: 20px;">שלום Jules וילונות</h2>
            
            <p style="font-size: 16px; line-height: 1.6; margin-bottom: 15px;">
              תודה על הזדמנות להציע עבורכם את שירותינו.
            </p>
            
            <p style="font-size: 16px; line-height: 1.6; margin-bottom: 15px;">
              למרות שההצעה הנוכחית לא התקבלה, אנחנו נשמח לעבוד איתכם על פתרונות חלופיים 
              שיתאימו טוב יותר לצרכים ולתקציב שלכם.
            </p>
            
            <div style="background: #fff7ed; padding: 20px; border-radius: 10px; border-right: 4px solid #f59e0b; margin: 20px 0; text-align: center;">
              <p style="font-size: 16px; color: #92400e; font-weight: bold; margin: 0;">
                נשמח לשמוע ממכם ולמצוא פתרון שיעבוד עבורכם 🤝
              </p>
            </div>
            
            <div style="text-align: center; margin-top: 25px;">
              <p style="font-size: 16px; color: #0597F2; font-weight: bold;">
                Lion Media - תמיד כאן עבורכם 🦁
              </p>
            </div>
          </div>
        </div>
      `;

    // הכנת קבצי PDF לצירוף
    const attachments = [];
    if (isApproved && pdfBuffer) {
      attachments.push({
        filename: `הצעת_מחיר_Jules_וילונות_${new Date().toLocaleDateString('he-IL').replace(/\//g, '-')}.pdf`,
        content: pdfBuffer,
        contentType: 'application/pdf'
      });
    }

    // שליחת מייל לצוות Lion Media
    await transporter.sendMail({
      from: process.env.MAIL_FROM || '"Lion Media Quote System" <quotes@lionmedia.com>',
      to: 'triroars@gmail.com',
      subject: `${statusEmoji} הצעת מחיר ${statusText} - Jules וילונות | Lion Media`,
      html: teamEmailContent,
      attachments: attachments
    });

    // שליחת מייל ללקוח
    await transporter.sendMail({
      from: process.env.MAIL_FROM || '"Lion Media" <quotes@lionmedia.com>',
      to: customerEmail,
      subject: isApproved 
        ? '🎉 הצעת המחיר אושרה! | Lion Media' 
        : 'עדכון בנוגע להצעת המחיר | Lion Media',
      html: customerEmailContent,
      attachments: attachments
    });

    return NextResponse.json(
      { 
        success: true, 
        message: isApproved 
          ? `הצעת המחיר אושרה בהצלחה! נשלחו מיילים ללקוח (${customerEmail}) ולצוות Lion Media עם קישור להצעה להדפסה וחתימה.`
          : `הצעת המחיר נדחתה. נשלחו הודעות מנומסות ללקוח (${customerEmail}) ולצוות Lion Media.`,
        status: action
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error processing quote approval:', error);
    return NextResponse.json(
      { 
        error: 'שגיאה בעיבוד הבקשה. אנא נסה שוב.',
        details: process.env.NODE_ENV === 'development' ? error : undefined
      },
      { status: 500 }
    );
  }
}
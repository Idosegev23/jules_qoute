export default function QuoteContent() {
  const features = [
    {
      icon: "📅",
      title: "אינטגרציה מלאה עם יומן Google",
      description: "סנכרון אוטומטי להצגת מועדים פנויים."
    },
    {
      icon: "🧠",
      title: "חישוב חכם של מרווחים",
      description: "המערכת תתחשב בזמני נסיעה מאזורים שונים בארץ ותוודא לוח זמנים הגיוני ונוח."
    },
    {
      icon: "💬",
      title: "תזכורות WhatsApp ללקוחות",
      description: "שליחת הודעה מותאמת אישית עם פרטי הפגישה (מותנה בחיבור לשירות GreenAPI)."
    },
    {
      icon: "📱",
      title: "הוספה ליומן הלקוח",
      description: "הפגישה תישמר בלחיצת כפתור ביומן האישי של הלקוח."
    },
    {
      icon: "💳",
      title: "סליקת תשלומים",
      description: "אפשרות לתשלום עבור ייעוץ ישירות מתוך המערכת."
    },
    {
      icon: "📊",
      title: "חישוב הצעת מחיר ראשונית",
      description: "הלקוח יוכל להזין מידות ולבחור סוג בד, והמערכת תפיק עבורו אומדן ראשוני."
    }
  ];

  return (
    <div className="space-y-8">
      {/* Introduction */}
      <div className="neumorphic-card p-8 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-lm-ink mb-6">
          שלום רב! 👋
        </h2>
        <p className="text-lg text-lm-ink/80 leading-relaxed">
          לאחר בחינה של הצרכים העסקיים שלכם, אנו מציעים לפתח עבורכם מערכת מתקדמת להזמנת פגישות, 
          שתאפשר לכם לייעל את תהליך העבודה ולשדר ללקוחות חווית שירות חדשנית ומסודרת.
        </p>
      </div>

      {/* Features Section */}
      <div className="neumorphic-card p-8">
        <h2 className="text-2xl md:text-3xl font-bold text-lm-ink mb-8 text-center">
          🚀 מה כוללת המערכת
        </h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white/50 backdrop-blur-sm rounded-xl p-6 border border-lm-brand/10 hover:border-lm-brand/30 transition-all duration-300 hover:transform hover:scale-105"
            >
              <div className="flex items-start gap-4">
                <div className="text-3xl">{feature.icon}</div>
                <div>
                  <h3 className="font-bold text-lm-ink mb-2">{feature.title}</h3>
                  <p className="text-lm-ink/70 text-sm leading-relaxed">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pricing Section */}
      <div className="neumorphic-card p-8">
        <h2 className="text-2xl md:text-3xl font-bold text-lm-ink mb-8 text-center">
          💰 עלויות
        </h2>
        
        <div className="space-y-6">
          {/* Development Cost */}
          <div className="bg-gradient-to-r from-lm-brand/10 to-lm-green/10 rounded-xl p-6 border border-lm-brand/20">
            <div className="text-center">
              <h3 className="text-xl font-bold text-lm-ink mb-4">עלות פיתוח חד פעמית</h3>
              <div className="space-y-2">
                <div className="text-lg text-lm-ink/70">
                  <span className="line-through">7,000 ₪</span>
                </div>
                <div className="price-highlight text-3xl md:text-4xl font-bold text-white px-6 py-3 rounded-xl">
                  5,900 ₪
                </div>
                <div className="text-sm text-lm-ink/60">
                  (לא כולל מע״מ) - מחיר מיוחד ל-Jules וילונות
                </div>
              </div>
            </div>
          </div>

          {/* Ongoing Costs */}
          <div className="bg-white/50 rounded-xl p-6 border border-lm-brand/10">
            <h3 className="text-xl font-bold text-lm-ink mb-4 text-center">עלויות שוטפות</h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-white/60 rounded-lg">
                <div>
                  <div className="font-semibold text-lm-ink">🌐 דומיין</div>
                  <div className="text-sm text-lm-ink/70">המערכת תתחבר לדומיין הקיים שלכם</div>
                </div>
                <div className="text-lm-green font-bold">ללא עלות נוספת</div>
              </div>
              
              <div className="flex justify-between items-center p-4 bg-white/60 rounded-lg">
                <div>
                  <div className="font-semibold text-lm-ink">🔧 תחזוקה חודשית</div>
                  <div className="text-sm text-lm-ink/70">כולל אחסון, שרת ותפעול תקלות</div>
                </div>
                <div className="text-lm-brand font-bold">150 ₪ לחודש</div>
              </div>
              
              <div className="flex justify-between items-center p-4 bg-white/60 rounded-lg">
                <div>
                  <div className="font-semibold text-lm-ink">💬 תזכורות WhatsApp</div>
                  <div className="text-sm text-lm-ink/70">במידה ותבחרו בשירות זה (משולם ישירות ל-GreenAPI)</div>
                </div>
                <div className="text-lm-brand font-bold">$12 לחודש</div>
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="bg-gradient-to-r from-lm-green/20 to-lm-lime/20 rounded-xl p-6 border-2 border-lm-green/30">
            <h3 className="text-xl font-bold text-lm-ink mb-4 text-center">📋 סיכום עלויות</h3>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center text-lg">
                <span className="font-semibold">סה״כ פיתוח:</span>
                <span className="font-bold text-lm-brand">5,900 ₪ (לא כולל מע״מ)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-semibold">תחזוקה חודשית:</span>
                <span className="font-bold text-lm-green">150 ₪ (לא כולל מע״מ)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-semibold">תוספת אפשרית:</span>
                <span className="font-bold text-lm-lime">GreenAPI – $12 לחודש</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits */}
      <div className="neumorphic-card p-8 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-lm-ink mb-6">
          ✨ יתרונות המערכת
        </h2>
        <p className="text-lg text-lm-ink/80 leading-relaxed">
          המערכת תעניק ל-Jules וילונות פתרון מקצועי, יעיל וחדשני שיחסוך זמן, 
          ימנע טעויות, ויתרום לשירות לקוחות מצוין.
        </p>
      </div>

      {/* Contact Info */}
      <div className="neumorphic-card p-8 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-lm-ink mb-6">
          📞 פרטי התקשרות
        </h2>
        <div className="space-y-3 text-lm-ink/80">
          <p className="text-xl font-bold text-lm-brand">Lion Media</p>
          <p className="text-lg">📧 triroars@gmail.com</p>
          <p className="text-lg">🌐 www.lionmedia.co.il</p>
          <div className="mt-6 bg-lm-light/10 rounded-xl p-4">
            <p className="text-sm text-lm-ink/60">
              נשמח לענות על כל שאלה ולהתחיל בפיתוח המערכת שלכם!<br />
              לאישור ההצעה, אנא השתמשו בכפתורי הפעולות למטה.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
import Image from 'next/image';

export default function QuoteHeader() {
  return (
    <header className="text-center mb-12">
      <div className="flex justify-center items-center mb-8">
        <div className="relative">
          <div className="absolute -inset-3 bg-lm-brand/10 rounded-full blur-lg"></div>
          <Image 
            src="/logo.svg" 
            alt="Lion Media Logo" 
            width={80}
            height={80}
            className="relative z-10 h-20 w-20"
          />
        </div>
      </div>
      
      <h1 className="text-4xl md:text-5xl font-bold text-lm-ink mb-4">
        הצעת מחיר
      </h1>
      
      <div className="text-xl text-lm-ink/70 mb-2">
        פיתוח מערכת הזמנת פגישות
      </div>
      
      <div className="flex flex-col md:flex-row justify-center items-center gap-4 text-lg">
        <div className="flex items-center gap-2">
          <span className="font-bold text-lm-brand">מציע השירות:</span>
          <span className="font-semibold text-lm-ink">Lion Media</span>
        </div>
        <div className="hidden md:block w-2 h-2 bg-lm-brand rounded-full"></div>
        <div className="flex items-center gap-2">
          <span className="font-bold text-lm-green">לקוח:</span>
          <span className="font-semibold text-lm-ink">Jules וילונות</span>
        </div>
      </div>
      
      <div className="mt-8 text-center">
        <div className="inline-block bg-white/60 backdrop-blur-sm rounded-2xl px-6 py-3 neumorphic-card">
          <p className="text-lm-ink/80 text-sm font-medium">
            📅 תאריך הצעה: {new Date().toLocaleDateString('he-IL')}
          </p>
        </div>
      </div>
    </header>
  );
}
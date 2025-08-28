import { CheckIcon, XMarkIcon, PrinterIcon, EnvelopeIcon } from '@heroicons/react/24/outline';

interface QuoteActionsProps {
  customerEmail: string;
  setCustomerEmail: (email: string) => void;
  onApprove: () => void;
  onReject: () => void;
  isSubmitting: boolean;
  quoteStatus: 'pending' | 'approved' | 'rejected';
}

export default function QuoteActions({
  customerEmail,
  setCustomerEmail,
  onApprove,
  onReject,
  isSubmitting,
  quoteStatus
}: QuoteActionsProps) {
  const handlePrint = () => {
    window.print();
  };

  const getStatusDisplay = () => {
    switch (quoteStatus) {
      case 'approved':
        return {
          text: 'הצעה אושרה ✅',
          className: 'status-approved',
          icon: <CheckIcon className="h-6 w-6" />
        };
      case 'rejected':
        return {
          text: 'הצעה נדחתה ❌',
          className: 'status-rejected',
          icon: <XMarkIcon className="h-6 w-6" />
        };
      default:
        return {
          text: 'ממתינה לאישור ⏳',
          className: 'status-pending',
          icon: <EnvelopeIcon className="h-6 w-6" />
        };
    }
  };

  const statusDisplay = getStatusDisplay();

  return (
    <div className="mt-12 space-y-6">
      {/* Status Display */}
      <div className="text-center">
        <div className={`inline-flex items-center gap-3 px-6 py-3 rounded-xl font-bold text-lg ${statusDisplay.className}`}>
          {statusDisplay.icon}
          {statusDisplay.text}
        </div>
      </div>

      {/* Actions Card */}
      <div className="neumorphic-card p-8">
        <h3 className="text-xl font-bold text-lm-ink mb-6 text-center">
          פעולות הצעת מחיר
        </h3>

        {quoteStatus === 'pending' && (
          <div className="space-y-6">
            {/* Email Input */}
            <div>
              <label htmlFor="customerEmail" className="block text-sm font-medium text-lm-ink mb-2">
                📧 כתובת מייל הלקוח
              </label>
              <input
                type="email"
                id="customerEmail"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                placeholder="הזן את כתובת המייל של הלקוח..."
                className="w-full px-4 py-3 bg-white/60 border border-lm-brand/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-lm-brand/50 focus:border-lm-brand transition-all duration-300"
                required
              />
            </div>

            {/* Action Buttons */}
            <div className="grid md:grid-cols-2 gap-4">
              <button
                onClick={onApprove}
                disabled={isSubmitting || !customerEmail}
                className="neumorphic-button-primary w-full py-4 px-6 text-white font-bold rounded-xl flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <CheckIcon className="h-5 w-5" />
                {isSubmitting ? 'שולח...' : 'אשר הצעה ושלח למייל'}
              </button>

              <button
                onClick={onReject}
                disabled={isSubmitting || !customerEmail}
                className="neumorphic-button-secondary w-full py-4 px-6 font-bold rounded-xl flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <XMarkIcon className="h-5 w-5" />
                {isSubmitting ? 'שולח...' : 'דחה הצעה'}
              </button>
            </div>
          </div>
        )}

        {/* Print Button - Always Available */}
        <div className="mt-6 pt-6 border-t border-lm-brand/20">
          <button
            onClick={handlePrint}
            className="w-full neumorphic-button-secondary py-3 px-6 font-bold rounded-xl flex items-center justify-center gap-3 no-print"
          >
            <PrinterIcon className="h-5 w-5" />
            הדפס הצעת מחיר
          </button>
        </div>

        {/* Instructions */}
        <div className="mt-6 bg-lm-light/10 rounded-xl p-4">
          <h4 className="font-semibold text-lm-ink mb-2">📝 הוראות:</h4>
          <ul className="text-sm text-lm-ink/70 space-y-1">
            <li>• הזן את כתובת המייל של הלקוח</li>
            <li>• לחץ על "אשר הצעה" כדי לשלוח מייל אישור ללקוח ול-triroars@gmail.com</li>
            <li>• ניתן להדפיס את ההצעה בכל עת</li>
            <li>• המערכת תשלח סיכום מפורט של האישור</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
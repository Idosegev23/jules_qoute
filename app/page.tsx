'use client';

import { useState } from 'react';
import QuoteHeader from '@/components/QuoteHeader';
import QuoteContent from '@/components/QuoteContent';
import QuoteActions from '@/components/QuoteActions';
import StatusMessage from '@/components/StatusMessage';

export default function QuotePage() {
  const [quoteStatus, setQuoteStatus] = useState<'pending' | 'approved' | 'rejected'>('pending');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');

  const handleApprove = async () => {
    if (!customerEmail) {
      setStatusMessage('אנא הזן את כתובת המייל של הלקוח');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/approve-quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerEmail,
          action: 'approve'
        }),
      });

      const result = await response.json();
      
      if (response.ok) {
        setQuoteStatus('approved');
        setStatusMessage('הצעת המחיר אושרה ונשלחה למייל! 🎉');
      } else {
        setStatusMessage(`שגיאה: ${result.error}`);
      }
    } catch (error) {
      console.error('Error approving quote:', error);
      setStatusMessage('שגיאה בשליחת האישור. אנא נסה שוב.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReject = async () => {
    if (!customerEmail) {
      setStatusMessage('אנא הזן את כתובת המייל של הלקוח');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/approve-quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerEmail,
          action: 'reject'
        }),
      });

      const result = await response.json();
      
      if (response.ok) {
        setQuoteStatus('rejected');
        setStatusMessage('ההצעה נדחתה ונשלח עדכון למייל.');
      } else {
        setStatusMessage(`שגיאה: ${result.error}`);
      }
    } catch (error) {
      console.error('Error rejecting quote:', error);
      setStatusMessage('שגיאה בשליחת הדחייה. אנא נסה שוב.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-lm-bg to-white">
      <div className="container mx-auto px-4 py-8">
        <QuoteHeader />
        
        <div className="max-w-4xl mx-auto">
          <QuoteContent />
          
          {statusMessage && (
            <StatusMessage 
              message={statusMessage} 
              type={quoteStatus}
              onClose={() => setStatusMessage('')}
            />
          )}
          
          <QuoteActions
            customerEmail={customerEmail}
            setCustomerEmail={setCustomerEmail}
            onApprove={handleApprove}
            onReject={handleReject}
            isSubmitting={isSubmitting}
            quoteStatus={quoteStatus}
          />
        </div>
      </div>
    </div>
  );
}
import { XMarkIcon, CheckCircleIcon, ExclamationCircleIcon, ClockIcon } from '@heroicons/react/24/outline';

interface StatusMessageProps {
  message: string;
  type: 'pending' | 'approved' | 'rejected' | 'error';
  onClose: () => void;
}

export default function StatusMessage({ message, type, onClose }: StatusMessageProps) {
  const getMessageStyle = () => {
    switch (type) {
      case 'approved':
        return {
          bg: 'bg-green-50 border-green-200',
          text: 'text-green-800',
          icon: <CheckCircleIcon className="h-6 w-6 text-green-500" />
        };
      case 'rejected':
        return {
          bg: 'bg-red-50 border-red-200',
          text: 'text-red-800',
          icon: <ExclamationCircleIcon className="h-6 w-6 text-red-500" />
        };
      case 'pending':
        return {
          bg: 'bg-yellow-50 border-yellow-200',
          text: 'text-yellow-800',
          icon: <ClockIcon className="h-6 w-6 text-yellow-500" />
        };
      default:
        return {
          bg: 'bg-gray-50 border-gray-200',
          text: 'text-gray-800',
          icon: <ExclamationCircleIcon className="h-6 w-6 text-gray-500" />
        };
    }
  };

  const style = getMessageStyle();

  return (
    <div className={`relative rounded-xl border-2 p-4 my-6 ${style.bg}`}>
      <div className="flex items-start">
        <div className="flex-shrink-0">
          {style.icon}
        </div>
        <div className="mr-3 flex-1">
          <p className={`text-sm font-medium ${style.text}`}>
            {message}
          </p>
        </div>
        <div className="mr-auto pr-2">
          <button
            onClick={onClose}
            className={`rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2 ${style.text} hover:bg-white/50 transition-colors`}
          >
            <span className="sr-only">סגור</span>
            <XMarkIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
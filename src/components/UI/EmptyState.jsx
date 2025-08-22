import React from 'react';
import PropTypes from 'prop-types';

const EmptyState = ({ 
  icon = '📭',
  title = 'Sonuç Bulunamadı',
  description = 'Arama kriterlerinizi değiştirmeyi deneyin.',
  showFuzzySearchTip = false,
  actionButton,
  className = ''
}) => {
  return (
    <div className={`text-center py-16 ${className}`}>
      <div className="bg-gray-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
        {typeof icon === 'string' ? (
          <span className="text-4xl" role="img" aria-label="empty state icon">
            {icon}
          </span>
        ) : (
          icon
        )}
      </div>

      <h3 className="text-xl font-semibold text-gray-900 mb-3">
        {title}
      </h3>

      <div className="max-w-md mx-auto">
        <p className="text-gray-600 mb-4 leading-relaxed">
          {description}
        </p>

        {showFuzzySearchTip && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-center gap-2 text-blue-700 text-sm">
              <span className="text-lg" role="img" aria-label="tip">💡</span>
              <span className="font-medium">
                Fuzzy Search Aktif
              </span>
            </div>
            <p className="text-blue-600 text-xs mt-2">
              Yazım hatalarını tolere ediyoruz. "piza", "burgr", "tvuk" gibi yazabilirsiniz!
            </p>
          </div>
        )}

        {actionButton && (
          <div className="mt-6">
            {actionButton}
          </div>
        )}
      </div>

      {/* Suggestions */}
      <div className="mt-8 text-sm text-gray-500">
        <p className="mb-2">Öneriler:</p>
        <div className="flex flex-wrap justify-center gap-2">
          <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs">
            "pizza"
          </span>
          <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs">
            "burger"
          </span>
          <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs">
            "tavuk"
          </span>
          <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs">
            "döner"
          </span>
        </div>
      </div>
    </div>
  );
};

EmptyState.propTypes = {
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  title: PropTypes.string,
  description: PropTypes.string,
  showFuzzySearchTip: PropTypes.bool,
  actionButton: PropTypes.element,
  className: PropTypes.string
};

export default EmptyState;
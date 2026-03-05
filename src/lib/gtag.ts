// Google Ads Tracking Utilities
export const GA_ADS_ID = 'AW-17969504516';

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}

// Track page view
export const trackPageView = (url: string) => {
  if (typeof window.gtag === 'function') {
    window.gtag('config', GA_ADS_ID, { page_path: url });
  }
};

// Track conversion event
export const trackConversion = (conversionLabel: string, value?: number) => {
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'conversion', {
      send_to: `${GA_ADS_ID}/${conversionLabel}`,
      ...(value !== undefined && { value, currency: 'BRL' }),
    });
  }
};

// Track custom event
export const trackEvent = (eventName: string, params?: Record<string, unknown>) => {
  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, params);
  }
};

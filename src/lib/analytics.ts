import { getUTMParams } from './utils';

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
  }
}

export const trackEvent = (
  eventName: string,
  eventParams: Record<string, unknown> = {}
) => {
  try {
    const utmParams = getUTMParams();
    const payload = {
      event: eventName,
      timestamp: new Date().toISOString(),
      ...utmParams,
      ...eventParams,
    };

    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push(payload);

      if (typeof window.gtag === 'function') {
        window.gtag('event', eventName, payload);
      }

      if (import.meta.env.DEV) {
        console.log(`[LNTechLab Analytics: ${eventName}]`, payload);
      }
    }
  } catch (error) {
    console.error('Analytics tracking error:', error);
  }
};

export const analytics = {
  ctaClick: (ctaName: string, destination: string) => {
    trackEvent('cta_click', { cta_name: ctaName, destination });
  },
  formStart: (formName: string = 'contact_b2b') => {
    trackEvent('form_start', { form_name: formName });
  },
  formSubmit: (formName: string = 'contact_b2b', projectType: string) => {
    trackEvent('form_submit', { form_name: formName, project_type: projectType });
  },
  whatsappClick: (origin: string) => {
    trackEvent('whatsapp_click', { origin });
  },
  tabChange: (tabName: string) => {
    trackEvent('tab_change', { tab_name: tabName });
  },
};

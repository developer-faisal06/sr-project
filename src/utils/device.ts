export function getClientDeviceInfo(): string {
  if (typeof window === 'undefined' || !navigator) return 'Web / Desktop';
  const ua = navigator.userAgent || '';

  // Operating System Detection
  let os = 'Unknown OS';
  if (/windows phone/i.test(ua)) os = 'Windows Phone';
  else if (/android/i.test(ua)) os = 'Android';
  else if (/ipad/i.test(ua)) os = 'iPadOS';
  else if (/iphone|ipod/i.test(ua)) os = 'iOS';
  else if (/win/i.test(ua)) os = 'Windows';
  else if (/mac/i.test(ua)) os = 'macOS';
  else if (/linux/i.test(ua)) os = 'Linux';

  // Device Form Factor
  let deviceType = 'Desktop';
  if (/tablet|ipad|playbook|silk/i.test(ua) || (navigator.maxTouchPoints > 1 && /macintosh/i.test(ua))) {
    deviceType = 'Tablet';
  } else if (/mobile|iphone|ipod|android.*mobile|blackberry|iemobile|opera mini/i.test(ua)) {
    deviceType = 'Mobile';
  }

  // Browser Detection
  let browser = 'Browser';
  if (/edg/i.test(ua)) browser = 'Edge';
  else if (/chrome|crios/i.test(ua)) browser = 'Chrome';
  else if (/firefox|fxios/i.test(ua)) browser = 'Firefox';
  else if (/safari/i.test(ua) && !/chrome/i.test(ua)) browser = 'Safari';
  else if (/opr\//i.test(ua)) browser = 'Opera';

  return `${deviceType} (${os} · ${browser})`;
}

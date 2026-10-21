import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(<App />);

// One shared theme control works on the public site and inside the admin console.
const themeButton = document.createElement('button');
themeButton.type = 'button';
themeButton.className = 'theme-toggle';
themeButton.setAttribute('aria-label', 'Switch between dark and light theme');
themeButton.title = 'Switch theme';
Object.assign(themeButton.style, {
  position: 'fixed',
  right: '1rem',
  bottom: '6.5rem',
  zIndex: '9999',
  minWidth: '46px',
  height: '46px',
  borderRadius: '14px',
  border: '1px solid #8781ff',
  background: '#1e1f25',
  color: '#e2e2e9',
  boxShadow: '0 8px 24px rgba(0,0,0,.22)',
  cursor: 'pointer',
  fontSize: '20px',
  display: 'grid',
  placeItems: 'center'
});
const applyTheme = (theme: 'dark' | 'light') => {
  document.documentElement.dataset.theme = theme;
  themeButton.textContent = theme === 'dark' ? '☀️' : '🌙';
  themeButton.title = theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme';
  themeButton.setAttribute('aria-label', themeButton.title);
};
let savedTheme: 'dark' | 'light' = 'dark';
try {
  const stored = localStorage.getItem('skdev-theme');
  if (stored === 'light' || stored === 'dark') savedTheme = stored;
} catch { /* Private browsing may disable storage; the control still works. */ }
applyTheme(savedTheme);
themeButton.addEventListener('click', () => {
  const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  try { localStorage.setItem('skdev-theme', next); } catch { /* Optional persistence. */ }
});
document.body.appendChild(themeButton);

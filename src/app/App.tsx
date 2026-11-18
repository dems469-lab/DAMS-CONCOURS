import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './providers/ThemeProvider';
import { ToastProvider } from '@/components/ui/Toast';
import { AppRoutes } from './router';

/**
 * Point d'entrée applicatif : providers globaux puis routes.
 * Les trois espaces (public, candidat, administrateur) sont définis dans router.tsx
 * via leurs layouts respectifs.
 */
export function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </ToastProvider>
    </ThemeProvider>
  );
}

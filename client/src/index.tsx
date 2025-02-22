import '@/app/styles/index.scss';
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';

import { App } from '@/app/App';
import { StoreProvider } from '@/app/providers/StoreProvider';
import { ErrorBoundary } from '@/app/providers/ErrorBoundary';

const container = document.getElementById('root');
if (!container) {
    throw new Error('Контейнер root не найден. Не удалось вмонтировать приложение');
}

const root = createRoot(container);
root.render(
    <BrowserRouter>
        <StoreProvider>
            <ErrorBoundary>
                <App />
            </ErrorBoundary>
        </StoreProvider>
    </BrowserRouter>,
);

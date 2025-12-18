import './globals.css';
import { Providers } from './providers';

export const metadata = {
  title: 'OnePets',
  description: 'Essential care for pets made simple.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="op-body">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

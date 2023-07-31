import './globals.css';

import '@fontsource/material-icons';
import '@fontsource-variable/inter';
import '@fontsource-variable/quicksand';

import { ToastContainer } from 'react-toastify';

export const metadata = {
  title: 'Gerenciador de Contratos',
  description: 'Sistema desenvolvido pela FEG/Unesp para gerenciamento e administração de contratos',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ToastContainer />
        {children}
      </body>
    </html>
  )
}

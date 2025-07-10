import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
<<<<<<< HEAD
    include: [
      'firebase/app',
      'firebase/auth',
      'firebase/firestore',
      'firebase/analytics',
      'firebase/storage'
    ]
  },
  define: {
    global: 'globalThis'
  }
});
=======
    exclude: ['lucide-react'],
  },
}); 
>>>>>>> 4bc38f67797257713a4dfcd7c9a81e2e9f3225ad

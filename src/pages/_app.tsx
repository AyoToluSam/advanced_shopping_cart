import '@/styles/globals.scss'
import type { AppProps } from 'next/app'
import { ShoppingCartProvider } from '@/contexts/ShoppingCartContext'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ShoppingCartProvider>
      <div className='container'>
        <Component {...pageProps} />
      </div>
    </ShoppingCartProvider>
  )
}

import { RouterProvider } from '@tanstack/react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { router } from './routes';
import { ConfigProvider, theme } from 'antd';
import './global.css';

const queryClient = new QueryClient();

router.update({
  context: {
    queryClient,
  }
})

function App() {
  const isDarkMode = true;

  return (
    <ConfigProvider theme={{
      algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
    }}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ConfigProvider>
  )
}

export default App

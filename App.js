import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AppNavigation from "./src/navigation/app.navigation";

export default function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AppNavigation />
    </QueryClientProvider>
  );
}

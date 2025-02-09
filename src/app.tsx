import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router";
import { Header } from "./components/header/header";
import { Footer } from "./components/footer/footer";
import { Home } from "./pages/home/home";

const client = new QueryClient();

export function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={client}>
        <Header />
        <main>
          <Routes>
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
        <Footer />
      </QueryClientProvider>
    </BrowserRouter>
  );
}

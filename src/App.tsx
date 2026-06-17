import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useEffect } from "react";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import Photography from "./pages/Photography.tsx";
import StudioProfile from "./pages/StudioProfile.tsx";
import GetStarted from "./pages/GetStarted.tsx";
import PlanMyEvent from "./pages/PlanMyEvent.tsx";
import ListMyServices from "./pages/ListMyServices.tsx";
import ProviderType from "./pages/ProviderType.tsx";
import Register from "./pages/Register.tsx";
import Login from "./pages/Login.tsx";
import ServiceCategory from "./pages/ServiceCategory.tsx";
import FindMyPhotos from "./pages/FindMyPhotos.tsx";
import DownloadApp from "./pages/DownloadApp.tsx";
import FreelancerDownload from "./pages/FreelancerDownload.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/get-started" element={<GetStarted />} />
          <Route path="/service-category" element={<ServiceCategory />} />
          <Route path="/provider-type" element={<ProviderType />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/plan-my-event" element={<PlanMyEvent />} />
          <Route path="/list-my-services" element={<ListMyServices />} />
          <Route path="/photography" element={<Photography />} />
          <Route path="/photography/:userId" element={<StudioProfile />} />
          <Route path="/find-my-photos" element={<FindMyPhotos />} />
          <Route path="/download-app" element={<FreelancerDownload />} />
          <Route path="/freelancer-download" element={<FreelancerDownload />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

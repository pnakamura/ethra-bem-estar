import React, { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "@/contexts/AuthContext";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { SplashLoader } from "@/components/ui/SplashLoader";
import { OfflineBanner } from "@/components/ui/OfflineBanner";
import { AdminGuard } from "@/components/admin/AdminGuard";
import { initAccessibility } from "@/hooks/useAccessibility";

// Lazy load all pages for better initial bundle size
const Index = lazy(() => import("./pages/Index"));
const Home = lazy(() => import("./pages/Home"));
const Onboarding = lazy(() => import("./pages/Onboarding"));
const Landing = lazy(() => import("./pages/Landing"));
const Nutrition = lazy(() => import("./pages/Nutrition"));
const Journal = lazy(() => import("./pages/Journal"));
const Insights = lazy(() => import("./pages/Insights"));
const Profile = lazy(() => import("./pages/Profile"));
const Settings = lazy(() => import("./pages/Settings"));
const Privacy = lazy(() => import("./pages/Privacy"));
const EmotionResult = lazy(() => import("./pages/EmotionResult"));
const Auth = lazy(() => import("./pages/Auth"));
const Admin = lazy(() => import("./pages/Admin"));
const Journeys = lazy(() => import("./pages/Journeys"));
const JourneysExplore = lazy(() => import("./pages/JourneysExplore"));
const Favorites = lazy(() => import("./pages/Favorites"));
const WellnessReport = lazy(() => import("./pages/WellnessReport"));
const GuideChat = lazy(() => import("./pages/GuideChat"));
const GuideSelect = lazy(() => import("./pages/GuideSelect"));
const Plans = lazy(() => import("./pages/Plans"));
const AnimationStudio = lazy(() => import("./pages/AnimationStudio"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

// Initialize accessibility settings before React renders
initAccessibility();

const App: React.FC = () => (
  <ErrorBoundary>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <OfflineBanner />
            <BrowserRouter>
              <Suspense fallback={<SplashLoader />}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/onboarding" element={<Onboarding />} />
                  <Route path="/landing" element={<Landing />} />
                  <Route path="/nutrition" element={<Nutrition />} />
                  <Route path="/legacy" element={<Index />} />
                  <Route path="/journal" element={<Journal />} />
                  <Route path="/insights" element={<Insights />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/privacy" element={<Privacy />} />
                  <Route path="/emotion-result" element={<ErrorBoundary><EmotionResult /></ErrorBoundary>} />
                  <Route path="/auth" element={<Auth />} />
                  <Route path="/journeys" element={<ErrorBoundary><Journeys /></ErrorBoundary>} />
                  <Route path="/journeys/explore" element={<JourneysExplore />} />
                  <Route path="/favorites" element={<Favorites />} />
                  <Route path="/report" element={<WellnessReport />} />
                  <Route path="/guide" element={<ErrorBoundary><GuideChat /></ErrorBoundary>} />
                  <Route path="/guide/select" element={<GuideSelect />} />
                  <Route path="/plans" element={<Plans />} />
                  <Route path="/animation-studio" element={<AdminGuard><AnimationStudio /></AdminGuard>} />
                  <Route path="/admin/*" element={<Admin />} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </BrowserRouter>
          </TooltipProvider>
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  </ErrorBoundary>
);

export default App;

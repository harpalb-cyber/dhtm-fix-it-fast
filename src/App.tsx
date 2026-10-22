import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Seo from "@/components/customer/Seo";
import Index from "./pages/Index";
import Repairs from "./pages/Repairs";
import CustomerShop, { ProductDetail, OrderUnavailable } from "./pages/CustomerShop";
import CustomerContact from "./pages/CustomerContact";
import { PostalPage, TrackingPage, AboutPage, HelpPage, PolicyPage, PoliciesHub, CustomerNotFound } from "./pages/CustomerInfo";
const queryClient = new QueryClient();
export default function App() {
  return <QueryClientProvider client={queryClient}><TooltipProvider><Toaster /><Sonner /><BrowserRouter><Seo /><div className="min-h-screen flex flex-col"><Header /><main id="main-content" className="flex-1" tabIndex={-1}><Routes><Route path="/" element={<Index />} /><Route path="/repairs" element={<Repairs />} /><Route path="/shop" element={<CustomerShop />} /><Route path="/shop/:slug" element={<ProductDetail />} /><Route path="/cart" element={<OrderUnavailable />} /><Route path="/checkout" element={<OrderUnavailable checkout />} /><Route path="/postal-repairs" element={<PostalPage />} /><Route path="/track-repair" element={<TrackingPage />} /><Route path="/about" element={<AboutPage />} /><Route path="/contact" element={<CustomerContact />} /><Route path="/sell" element={<CustomerContact sell />} /><Route path="/sell-your-device" element={<Navigate to="/sell" replace />} /><Route path="/help" element={<HelpPage />} /><Route path="/terms" element={<PolicyPage />} /><Route path="/privacy" element={<PolicyPage privacy />} /><Route path="/policies" element={<PoliciesHub />} /><Route path="*" element={<CustomerNotFound />} /></Routes></main><Footer /></div></BrowserRouter></TooltipProvider></QueryClientProvider>;
}

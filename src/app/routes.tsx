import { Navigate, createBrowserRouter } from "react-router-dom";
import { AppShell } from "./AppShell";

import { HomePage } from "@/pages/Home/HomePage";
import { AboutPage } from "@/pages/About/AboutPage";
import { DestinationPage } from "@/pages/Destination/DestinationPage";
import { NewsPage } from "@/pages/News/NewsPage";
import { TrainPage } from "@/pages/Train/TrainPage";
import { ContactPage } from "@/pages/Contact/ContactPage";

export const router = createBrowserRouter([
  {
    element: <AppShell />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/about", element: <AboutPage /> },
      { path: "/destination", element: <DestinationPage /> },
      { path: "/news", element: <NewsPage /> },
      { path: "/train", element: <TrainPage /> },
      { path: "/contact", element: <ContactPage /> },
      { path: "/terms", element: <Navigate to="/" replace /> },
      { path: "/privacy", element: <Navigate to="/" replace /> },
      { path: "/legal", element: <Navigate to="/" replace /> },
      { path: "/cookies", element: <Navigate to="/" replace /> },
      { path: "/accessibility", element: <Navigate to="/" replace /> },
      { path: "/sitemap", element: <Navigate to="/" replace /> },
      { path: "*", element: <Navigate to="/" replace /> },
    ],
  },
]);
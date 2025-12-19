// components/layout/Shell.tsx
import { Header } from "./Header";

export function Shell({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={`min-h-screen flex flex-col ${className}`}>
      <Header />
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8 md:py-12 relative z-10">
        {children}
      </main>
    </div>
  );
}
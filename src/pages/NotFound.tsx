import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-6 animate-fade-in">
        <div className="space-y-2">
          <h1 className="text-8xl sm:text-9xl font-bold text-gradient">404</h1>
          <h2 className="text-2xl sm:text-3xl font-semibold">Página não encontrada</h2>
          <p className="text-muted-foreground text-sm sm:text-base max-w-md mx-auto px-4">
            A página que você está procurando não existe ou foi movida.
          </p>
        </div>
        <a href="/" className="inline-block">
          <button className="grok-button px-6 py-3">
            Voltar para o início
          </button>
        </a>
      </div>
    </div>
  );
};

export default NotFound;

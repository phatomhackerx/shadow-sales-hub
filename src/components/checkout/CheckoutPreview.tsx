
import { Clock, Shield, Gift, Check } from "lucide-react";

interface CheckoutPreviewProps {
  checkout: any;
  viewMode: "desktop" | "mobile";
}

const CheckoutPreview = ({ checkout, viewMode }: CheckoutPreviewProps) => {
  const { settings } = checkout;
  
  // Helper to render the countdown timer
  const renderTimer = () => {
    const endDate = new Date(settings.timerEndDate);
    const now = new Date();
    const timeLeft = Math.max(0, Math.floor((endDate.getTime() - now.getTime()) / 1000));
    
    const days = Math.floor(timeLeft / (24 * 60 * 60));
    const hours = Math.floor((timeLeft % (24 * 60 * 60)) / (60 * 60));
    const minutes = Math.floor((timeLeft % (60 * 60)) / 60);
    const seconds = timeLeft % 60;
    
    return (
      <div className="bg-red-50 border border-red-200 p-3 rounded-lg flex items-center mb-4">
        <Clock className="h-5 w-5 text-red-500 mr-3" />
        <div>
          <p className="text-red-600 text-sm font-medium">Esta oferta expira em:</p>
          <div className="flex space-x-2 mt-1">
            <div className="bg-red-600 text-white px-2 py-1 rounded text-xs font-medium w-10 text-center">
              {days.toString().padStart(2, "0")}
              <span className="block text-[10px] mt-0.5">dias</span>
            </div>
            <div className="bg-red-600 text-white px-2 py-1 rounded text-xs font-medium w-10 text-center">
              {hours.toString().padStart(2, "0")}
              <span className="block text-[10px] mt-0.5">horas</span>
            </div>
            <div className="bg-red-600 text-white px-2 py-1 rounded text-xs font-medium w-10 text-center">
              {minutes.toString().padStart(2, "0")}
              <span className="block text-[10px] mt-0.5">min</span>
            </div>
            <div className="bg-red-600 text-white px-2 py-1 rounded text-xs font-medium w-10 text-center">
              {seconds.toString().padStart(2, "0")}
              <span className="block text-[10px] mt-0.5">seg</span>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  return (
    <div 
      className="p-4 min-h-[400px]"
      style={{ 
        backgroundColor: settings.background,
        fontFamily: settings.font 
      }}
    >
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          {settings.logo && (
            <img 
              src={settings.logo} 
              alt="Logo" 
              className="h-10 mx-auto mb-4" 
            />
          )}
          <h1 
            className="text-xl font-bold mb-2"
            style={{ color: settings.primaryColor }}
          >
            {settings.headerText}
          </h1>
          <p className="text-gray-600">
            {settings.subheaderText}
          </p>
        </div>
        
        {/* Timer */}
        {settings.showTimer && renderTimer()}
        
        {/* Checkout Form */}
        <div className="bg-white rounded-lg shadow-md border p-4 mb-4">
          <div className="space-y-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-1">Nome completo</label>
              <input 
                type="text" 
                className="w-full p-2 border rounded-md"
                placeholder="Digite seu nome"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">E-mail</label>
              <input 
                type="email" 
                className="w-full p-2 border rounded-md"
                placeholder="Digite seu e-mail"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">CPF</label>
              <input 
                type="text" 
                className="w-full p-2 border rounded-md"
                placeholder="Digite seu CPF"
              />
            </div>
          </div>
          
          {/* Payment section */}
          <div className="border-t pt-4">
            <p className="font-medium mb-2">Selecione a forma de pagamento:</p>
            <div className="space-y-2">
              <label className="flex items-center p-2 border rounded-md cursor-pointer hover:bg-gray-50">
                <input type="radio" name="payment" checked className="mr-2" />
                <span>Cartão de Crédito</span>
              </label>
              <label className="flex items-center p-2 border rounded-md cursor-pointer hover:bg-gray-50">
                <input type="radio" name="payment" className="mr-2" />
                <span>PIX</span>
              </label>
            </div>
          </div>
        </div>
        
        {/* Order Bump */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
          <label className="flex items-start cursor-pointer">
            <input type="checkbox" className="mt-1 mr-3" />
            <div>
              <div className="flex items-center">
                <Gift className="h-4 w-4 text-yellow-600 mr-1" />
                <p className="text-sm font-medium text-yellow-800">Oferta Especial!</p>
              </div>
              <p className="text-xs text-gray-600 mt-1">
                Adicione o e-book "Estratégias Avançadas" por apenas <span className="font-bold">R$ 47,00</span>
              </p>
            </div>
          </label>
        </div>
        
        {/* Guarantee */}
        <div className="flex items-center text-sm text-gray-600 mb-4">
          <Shield className="h-4 w-4 mr-2 text-green-600" />
          <span>Garantia de 7 dias ou seu dinheiro de volta</span>
        </div>
        
        {/* Terms */}
        <div className="mb-4">
          <label className="flex items-start cursor-pointer">
            <input type="checkbox" className="mt-0.5 mr-2" />
            <span className="text-xs text-gray-600">
              Li e concordo com os <a href="#" className="text-blue-600 hover:underline">Termos de Uso</a> e <a href="#" className="text-blue-600 hover:underline">Política de Privacidade</a>
            </span>
          </label>
        </div>
        
        {/* Submit Button */}
        <button 
          className="w-full py-3 rounded-lg font-medium text-white"
          style={{ backgroundColor: settings.primaryColor }}
        >
          {settings.buttonText}
        </button>
        
        {/* Security badges */}
        <div className="flex justify-center space-x-3 mt-4">
          <div className="text-xs text-gray-500 flex items-center">
            <Shield className="h-3 w-3 mr-1" />
            Pagamento Seguro
          </div>
          <div className="text-xs text-gray-500 flex items-center">
            <Check className="h-3 w-3 mr-1" />
            Site Protegido
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPreview;

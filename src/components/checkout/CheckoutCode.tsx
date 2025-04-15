
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsContent, TabsTrigger } from "@/components/ui/tabs";
import { Check, ClipboardCopy } from "lucide-react";

interface CheckoutCodeProps {
  checkout: any;
}

const CheckoutCode = ({ checkout }: CheckoutCodeProps) => {
  const [activeTab, setActiveTab] = useState("html");
  const [copied, setCopied] = useState(false);
  
  // Sample HTML code for demo purposes
  const htmlCode = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Checkout - ${checkout.name}</title>
  <link href="https://fonts.googleapis.com/css2?family=${checkout.settings.font.replace(' ', '+')}:wght@400;500;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --primary-color: ${checkout.settings.primaryColor};
      --secondary-color: ${checkout.settings.secondaryColor};
      --background-color: ${checkout.settings.background};
    }
    body {
      font-family: '${checkout.settings.font}', sans-serif;
      background-color: var(--background-color);
      margin: 0;
      padding: 20px;
    }
    .checkout-container {
      max-width: 500px;
      margin: 0 auto;
    }
    .checkout-header {
      text-align: center;
      margin-bottom: 24px;
    }
    .checkout-header h1 {
      color: var(--primary-color);
      margin-bottom: 8px;
    }
    /* More CSS styling here... */
  </style>
</head>
<body>
  <div class="checkout-container">
    <div class="checkout-header">
      <h1>${checkout.settings.headerText}</h1>
      <p>${checkout.settings.subheaderText}</p>
    </div>
    
    <!-- Timer component -->
    ${checkout.settings.showTimer ? 
      `<div class="countdown-timer">
        <p>Esta oferta expira em:</p>
        <div class="timer-display">
          <span id="days">00</span>:
          <span id="hours">00</span>:
          <span id="minutes">00</span>:
          <span id="seconds">00</span>
        </div>
      </div>` : ''
    }
    
    <!-- Checkout form -->
    <form id="checkout-form">
      <!-- Form fields -->
      <div class="form-group">
        <label for="name">Nome completo</label>
        <input type="text" id="name" name="name" required>
      </div>
      
      <div class="form-group">
        <label for="email">E-mail</label>
        <input type="email" id="email" name="email" required>
      </div>
      
      <!-- More form fields... -->
      
      <!-- Payment section -->
      <div class="payment-section">
        <h3>Forma de pagamento</h3>
        <!-- Payment options -->
      </div>
      
      <!-- Submit button -->
      <button type="submit" class="checkout-button">${checkout.settings.buttonText}</button>
    </form>
  </div>
  
  <script>
    // Countdown timer logic
    ${checkout.settings.showTimer ? 
      `const endDate = new Date("${checkout.settings.timerEndDate}");
      
      function updateTimer() {
        const now = new Date();
        const timeLeft = Math.max(0, Math.floor((endDate.getTime() - now.getTime()) / 1000));
        
        const days = Math.floor(timeLeft / (24 * 60 * 60));
        const hours = Math.floor((timeLeft % (24 * 60 * 60)) / (60 * 60));
        const minutes = Math.floor((timeLeft % (60 * 60)) / 60);
        const seconds = timeLeft % 60;
        
        document.getElementById("days").textContent = days.toString().padStart(2, "0");
        document.getElementById("hours").textContent = hours.toString().padStart(2, "0");
        document.getElementById("minutes").textContent = minutes.toString().padStart(2, "0");
        document.getElementById("seconds").textContent = seconds.toString().padStart(2, "0");
      }
      
      // Update timer every second
      updateTimer();
      setInterval(updateTimer, 1000);` : ''
    }
    
    // Form submission logic
    document.getElementById("checkout-form").addEventListener("submit", function(e) {
      e.preventDefault();
      // Payment processing logic would go here
      console.log("Form submitted");
    });
  </script>
</body>
</html>
  `;
  
  // Sample CSS code
  const cssCode = `
/* Checkout Styles */
:root {
  --primary-color: ${checkout.settings.primaryColor};
  --secondary-color: ${checkout.settings.secondaryColor};
  --background-color: ${checkout.settings.background};
  --font-family: '${checkout.settings.font}', sans-serif;
}

body {
  font-family: var(--font-family);
  background-color: var(--background-color);
  margin: 0;
  padding: 20px;
}

.checkout-container {
  max-width: 500px;
  margin: 0 auto;
}

.checkout-header {
  text-align: center;
  margin-bottom: 24px;
}

.checkout-header h1 {
  color: var(--primary-color);
  margin-bottom: 8px;
}

.form-group {
  margin-bottom: 16px;
}

.form-group label {
  display: block;
  margin-bottom: 4px;
  font-weight: 500;
}

.form-group input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.checkout-button {
  display: block;
  width: 100%;
  padding: 12px;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
}

.checkout-button:hover {
  opacity: 0.9;
}

/* Timer styles */
.countdown-timer {
  background-color: #FFEBEE;
  border: 1px solid #FFCDD2;
  border-radius: 4px;
  padding: 12px;
  margin-bottom: 16px;
  text-align: center;
}

.timer-display {
  font-size: 24px;
  font-weight: 700;
  color: #D32F2F;
}

/* Mobile responsiveness */
@media (max-width: 600px) {
  .checkout-container {
    padding: 16px;
  }
}
  `;
  
  // Sample JS code
  const jsCode = `
// Countdown Timer
${checkout.settings.showTimer ? 
  `const endDate = new Date("${checkout.settings.timerEndDate}");

function updateTimer() {
  const now = new Date();
  const timeLeft = Math.max(0, Math.floor((endDate.getTime() - now.getTime()) / 1000));
  
  const days = Math.floor(timeLeft / (24 * 60 * 60));
  const hours = Math.floor((timeLeft % (24 * 60 * 60)) / (60 * 60));
  const minutes = Math.floor((timeLeft % (60 * 60)) / 60);
  const seconds = timeLeft % 60;
  
  document.getElementById("days").textContent = days.toString().padStart(2, "0");
  document.getElementById("hours").textContent = hours.toString().padStart(2, "0");
  document.getElementById("minutes").textContent = minutes.toString().padStart(2, "0");
  document.getElementById("seconds").textContent = seconds.toString().padStart(2, "0");
}

// Update timer every second
updateTimer();
setInterval(updateTimer, 1000);` : '// No timer enabled for this checkout'
}

// Form Validation
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('checkout-form');
  
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Basic validation
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    
    if (!name || !email) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Por favor, insira um e-mail válido.');
      return;
    }
    
    // Form submission - would connect to payment gateway
    console.log('Form is valid, processing payment...');
    
    // This is where you would integrate with Stripe, Mercado Pago, etc.
    // processPayment(formData);
  });
});

// Example payment processing function
function processPayment(formData) {
  // Integration with payment gateway would go here
  
  // On successful payment
  window.location.href = '/obrigado';
}
  `;
  
  const copyToClipboard = () => {
    let codeToCopy = '';
    
    switch (activeTab) {
      case 'html':
        codeToCopy = htmlCode;
        break;
      case 'css':
        codeToCopy = cssCode;
        break;
      case 'js':
        codeToCopy = jsCode;
        break;
      default:
        codeToCopy = htmlCode;
    }
    
    navigator.clipboard.writeText(codeToCopy);
    setCopied(true);
    
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium">Código do Checkout</p>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={copyToClipboard}
          className="flex items-center space-x-1"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-green-500" />
              <span className="text-green-500">Copiado!</span>
            </>
          ) : (
            <>
              <ClipboardCopy className="h-3.5 w-3.5" />
              <span>Copiar</span>
            </>
          )}
        </Button>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3">
          <TabsTrigger value="html">HTML</TabsTrigger>
          <TabsTrigger value="css">CSS</TabsTrigger>
          <TabsTrigger value="js">JavaScript</TabsTrigger>
        </TabsList>
        
        <TabsContent value="html">
          <pre className="bg-secondary p-3 rounded-md overflow-auto text-xs h-60">
            {htmlCode}
          </pre>
        </TabsContent>
        
        <TabsContent value="css">
          <pre className="bg-secondary p-3 rounded-md overflow-auto text-xs h-60">
            {cssCode}
          </pre>
        </TabsContent>
        
        <TabsContent value="js">
          <pre className="bg-secondary p-3 rounded-md overflow-auto text-xs h-60">
            {jsCode}
          </pre>
        </TabsContent>
      </Tabs>
      
      <p className="text-xs text-muted-foreground">
        Este código pode ser personalizado e integrado com gateways de pagamento como Stripe, 
        Mercado Pago ou outros serviços de processamento de pagamentos.
      </p>
    </div>
  );
};

export default CheckoutCode;

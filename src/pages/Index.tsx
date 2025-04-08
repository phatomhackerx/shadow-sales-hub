
import { Navigate } from "react-router-dom";

// No nosso caso, o Index só redireciona para o Dashboard que já é a rota principal
const Index = () => {
  return <Navigate to="/" replace />;
};

export default Index;

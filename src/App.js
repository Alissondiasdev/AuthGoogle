import  Rotas from "./Routes/rotas";
import AuthGoogleProvider from "./contexts/authProvider";





export const App = () => {
  return (
    <AuthGoogleProvider>
             
      <Rotas />
    </AuthGoogleProvider>
  );
}
 

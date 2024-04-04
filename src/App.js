import  Rotas from "./Routes/rotas";
import AuthGoogleProvider from "./contexts/authProvider";
import'../src/reset.css'




export const App = () => {
  return (
    <AuthGoogleProvider>
             
      <Rotas />
    </AuthGoogleProvider>
  );
}
 

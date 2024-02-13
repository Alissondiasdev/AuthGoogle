import  Rotas from "./Routes/rotas";
import AuthGoogleProvider from "./contexts/authGoogle";




export const App = () => {
  return (
    <AuthGoogleProvider>
             
      <Rotas />
    </AuthGoogleProvider>
  );
}
 

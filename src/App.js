// App.jsx
import Layout from "./components/Layout";
import './App.css';
import { ModuleRegistry,  AllCommunityModule } from "ag-grid-community";
ModuleRegistry.registerModules([AllCommunityModule]);

function App() {
  return (
    <div>
    <Layout/>  
    </div> 
  );
}

export default App;

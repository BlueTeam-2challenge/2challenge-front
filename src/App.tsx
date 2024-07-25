import CardPage from "./pages/dashboard/components/CardPage";

function App() {
  return (
    <>
      <CardPage icon="src\assets\images\icone-pata.png" title="Animals" quantity={236} />
      <CardPage icon="src\assets\images\cat-icon.png" title="Animals Without Owners" quantity={18} />
    </>
  );
}

export default App;

import Button from "./components/Button";
import Card from "./components/Card";
import PlusIcon from "./Icons/PlusIcon";
import ShareIcon from "./Icons/ShareIcon";

function App() {
  return (
    <div>
      <Button variant="secondary" text="Share Brain" startIcon={<ShareIcon />}/>
      <Button variant="primary" text="Add Content" startIcon={<PlusIcon />} />
      <Card/>
    </div>
  );
}

export default App;

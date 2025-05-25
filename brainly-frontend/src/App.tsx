import Button from "./components/Button";
import Card from "./components/Card";
import PlusIcon from "./Icons/PlusIcon";
import ShareIcon from "./Icons/ShareIcon";

function App() {
  return (
    <div className="p-4">
      <div className="flex justify-end gap-4">
        <Button
          variant="secondary"
          text="Share Brain"
          startIcon={<ShareIcon />}
        />
        <Button variant="primary" text="Add Content" startIcon={<PlusIcon />} />
      </div>

      <div className="flex gap-4">
        <Card
          type="twitter"
          link="https://twitter.com/pankaj_sgh/status/1921200837528850907"
          title="First Post"
        />
        <Card
          type="youtube"
          link="https://www.youtube.com/embed/qcucgNV7Cmc"
          title="Zor ka Jhatka"
        />
      </div>
    </div>
  );
}

export default App;

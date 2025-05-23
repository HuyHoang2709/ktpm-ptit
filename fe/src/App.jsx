import Button from "./components/Button";
import Card from "./components/Card";
import Input from "./components/Input";
import Select from "./components/Select";

const App = () => {
  return (
    <>
      <Card>Xin chào</Card>
      <Input type="password" />
      <Button variants="secondary">Click me</Button>
      <Select options={[1, 2, 3]} placeholder="Select" />
    </>
  );
};

export default App;

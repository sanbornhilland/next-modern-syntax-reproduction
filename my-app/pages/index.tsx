// This fails
import Main from "../../src/Main";

// This one does not
// import Main from "../Main";

const main = new Main();
main.printMessage();

export default function Home() {
  return <div></div>;
}

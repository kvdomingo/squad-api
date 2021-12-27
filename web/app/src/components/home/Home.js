import { MDBContainer as Container } from "mdbreact";
import Events from "./Events";

function Home() {
  return (
    <Container fluid className="p-5">
      <Events />
    </Container>
  );
}

export default Home;

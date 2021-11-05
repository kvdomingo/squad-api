import { MDBContainer as Container, MDBRow as Row, MDBCol as Col } from "mdbreact";
import { useGeneralContext } from "../../contexts/GeneralContext";
import Events from "./Events";
import Biases from "./Biases";

function Home() {
  const { generalState } = useGeneralContext();

  return (
    <Container className="py-5">
      <Row>
        <Col>
          <Events />
        </Col>
        {generalState.authId && (
          <Col>
            <Biases />
          </Col>
        )}
      </Row>
    </Container>
  );
}

export default Home;

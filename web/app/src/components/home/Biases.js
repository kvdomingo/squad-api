import { useEffect, useState } from "react";
import { MDBListGroup as ListGroup, MDBTypography as Type, MDBListGroupItem as ListGroupItem } from "mdbreact";
import api from "../../utils/Endpoints";
import { useGeneralContext } from "../../contexts/GeneralContext";

function Biases() {
  const [loading, setLoading] = useState(true);
  const [biases, setBiases] = useState([]);
  const { generalState } = useGeneralContext();

  useEffect(() => {
    if (!!generalState.discordId) {
      api.home
        .biases(generalState.discordId)
        .then(res => setBiases(res.data))
        .catch(err => console.error(err.message))
        .finally(() => setLoading(false));
    }
  }, [generalState.discordId]);

  return (
    <div>
      <div>
        <Type tag="h1" variant="h1-responsive">
          Your Biases
        </Type>
        <ListGroup className="my-5">
          {loading ? (
            <div className="my-5 spinner-border mx-auto" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          ) : biases.length > 0 ? (
            <>
              {biases
                .filter(
                  bias =>
                    bias.currentHolder.discordId === generalState.discordId && bias.currentHolder.id === bias.user.id,
                )
                .map((el, i) => (
                  <ListGroupItem key={i}>{el.name}</ListGroupItem>
                ))}
              {biases
                .filter(
                  bias =>
                    bias.currentHolder.discordId === generalState.discordId && bias.currentHolder.id !== bias.user.id,
                )
                .map((el, i) => (
                  <ListGroupItem key={i}>
                    {el.name} &mdash; won from{" "}
                    <span className="text-success">
                      {el.user.username}#{el.user.discriminator}
                    </span>
                  </ListGroupItem>
                ))}
            </>
          ) : (
            <ListGroupItem>You have none :(</ListGroupItem>
          )}
        </ListGroup>
      </div>
      <div>
        <Type tag="h1" variant="h1-responsive">
          Biases Lost
        </Type>
        <ListGroup className="my-5">
          {loading ? (
            <div className="my-5 spinner-border mx-auto" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          ) : biases.length > 0 ? (
            biases
              .filter(bias => bias.currentHolder.discordId !== generalState.discordId)
              .map((el, i) => (
                <ListGroupItem key={i}>
                  {el.name} &mdash; lost to{" "}
                  <span className="text-danger">
                    {el.currentHolder.username}#{el.currentHolder.discriminator}
                  </span>
                </ListGroupItem>
              ))
          ) : (
            <ListGroupItem>You have none :D</ListGroupItem>
          )}
        </ListGroup>
      </div>
    </div>
  );
}

export default Biases;

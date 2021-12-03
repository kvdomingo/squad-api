import {
  MDBListGroup as ListGroup,
  MDBListGroupItem as ListGroupItem,
  MDBTypography as Type,
  MDBRow as Row,
  MDBCol as Col,
} from "mdbreact";
import dateFormat from "dateformat";
import { useEffect, useState } from "react";
import api from "../../utils/Endpoints";

function Events() {
  const [events, setEvents] = useState([]);
  const [birthdays, setBirthdays] = useState([]);
  const [loading, setLoading] = useState({
    events: true,
    birthdays: true,
  });

  useEffect(() => {
    getEvents();
  }, []);

  function getEvents() {
    setLoading({ birthdays: true, events: true });
    api.home
      .events()
      .then(res => {
        let { data } = res;
        data.forEach(dat => (dat.birthday = false));
        setEvents(data);
      })
      .catch(err => console.error(err.message))
      .finally(() => setLoading(prevState => ({ ...prevState, events: false })));

    api.home
      .birthdays()
      .then(res => {
        let { data } = res;
        data.forEach(dat => (dat.birthday = true));
        setBirthdays(res.data);
      })
      .catch(err => console.error(err.message))
      .finally(() => setLoading(prevState => ({ ...prevState, birthdays: false })));
  }

  return (
    <div>
      <Row>
        <Col>
          <ListGroup>
            <ListGroupItem>
              <Type variant="h3-responsive" tag="h1">
                <b>Upcoming Events</b>
              </Type>
            </ListGroupItem>
            {loading.events ? (
              <div className="my-5 spinner-border mx-auto" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            ) : events.length > 0 ? (
              <>
                {events.map((el, i) => (
                  <ListGroupItem key={i}>
                    [{dateFormat(new Date(el.date), "mmm dd | HH:MM")}] <b>{el.group.toUpperCase()}</b> {el.name}
                  </ListGroupItem>
                ))}
                <small className="my-3 grey-text ">
                  <i>All times have been automatically converted to your local time.</i>
                </small>
              </>
            ) : (
              <ListGroupItem>No upcoming events</ListGroupItem>
            )}
          </ListGroup>
        </Col>
        <Col>
          <ListGroup>
            <ListGroupItem>
              <Type variant="h3-responsive" tag="h1">
                <b>{dateFormat(new Date(), "mmmm")} Birthdays</b>
              </Type>
            </ListGroupItem>
            {loading.birthdays ? (
              <div className="my-5 spinner-border mx-auto" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            ) : birthdays.length > 0 ? (
              <>
                {birthdays.map((el, i) => (
                  <ListGroupItem key={i}>
                    [{dateFormat(new Date(el.date), "dd")}] <b>{el.group}</b> {el.name} (
                    {new Date().getFullYear() - new Date(el.date).getFullYear()})
                  </ListGroupItem>
                ))}
              </>
            ) : (
              <ListGroupItem>No upcoming birthdays</ListGroupItem>
            )}
          </ListGroup>
        </Col>
      </Row>
    </div>
  );
}

const styles = {
  button: {
    boxShadow: "none",
  },
};

export default Events;

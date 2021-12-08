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
import { isToday } from "../../utils/date";

function Events() {
  const [events, setEvents] = useState([]);
  const [birthdays, setBirthdays] = useState({});
  const [loading, setLoading] = useState({
    events: true,
    birthdays: true,
  });

  useEffect(() => {
    setLoading({ birthdays: true, events: true });
    api.home
      .events()
      .then(res => {
        let { data } = res;
        setEvents(data);
      })
      .catch(err => console.error(err.message))
      .finally(() => setLoading(prevState => ({ ...prevState, events: false })));

    api.home
      .birthdays()
      .then(res => {
        let { data } = res;
        let days = [...new Set(data.map(dat => dateFormat(new Date(dat.date), "d")))];
        let birthdays = {};
        days.forEach(day => (birthdays[day] = []));
        data.forEach(dat => {
          let month = dateFormat(new Date(dat.date), "d");
          birthdays[month].push(dat);
        });
        setBirthdays(birthdays);
      })
      .catch(err => console.error(err.message))
      .finally(() => setLoading(prevState => ({ ...prevState, birthdays: false })));
  }, []);

  return (
    <div>
      <Row className="row-cols row-cols-1 row-cols-md-2">
        <Col className="mb-5 mb-md-1">
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
                  <ListGroupItem key={i} active={isToday(new Date(el.date))}>
                    {dateFormat(new Date(el.date), "mmm d | HH:MM")} | <b>{el.group.toUpperCase()}</b> {el.name}
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
            ) : Object.keys(birthdays).length > 0 ? (
              Object.keys(birthdays).map((day, i) => (
                <ListGroupItem key={i} active={parseInt(day) === new Date().getDate()}>
                  <Row>
                    <Col md="1" className="d-flex align-items-center justify-content-end">
                      {day}{" "}
                    </Col>
                    <Col md="11">
                      {birthdays[day].map((el, j) => (
                        <div key={j}>
                          <b>{el.group}</b> {el.name} ({new Date().getFullYear() - new Date(el.date).getFullYear()})
                        </div>
                      ))}
                    </Col>
                  </Row>
                </ListGroupItem>
              ))
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

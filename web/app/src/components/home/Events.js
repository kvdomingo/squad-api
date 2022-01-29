import { useEffect, useState } from "react";
import {
  MDBListGroup as ListGroup,
  MDBListGroupItem as ListGroupItem,
  MDBTypography as Type,
  MDBRow as Row,
  MDBCol as Col,
  MDBIcon as Icon,
} from "mdbreact";
import dateFormat from "dateformat";
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
    if (!events.length && !birthdays.length) setLoading({ birthdays: true, events: true });
    api.home
      .events()
      .then(res => setEvents(res.data))
      .catch(err => console.error(err.message))
      .finally(() => setLoading(prevState => ({ ...prevState, events: false })));

    api.home
      .birthdays()
      .then(res => setBirthdays(res.data))
      .catch(err => console.error(err.message))
      .finally(() => setLoading(prevState => ({ ...prevState, birthdays: false })));
  }, []);

  function RenderEvents() {
    let render = [];
    events.forEach(event => {
      let dateString = new Date(event.date).toLocaleDateString();
      let timeString = new Date(event.date).toLocaleTimeString();
      let indexOfDate = render.findIndex(ren => ren.dateString === dateString);
      if (indexOfDate === -1) {
        render.push({
          date: event.date,
          dateString,
          times: [
            {
              date: event.date,
              timeString,
              events: [event],
            },
          ],
        });
      } else {
        let indexOfTime = render[indexOfDate].times.findIndex(time => time.timeString === timeString);
        if (indexOfTime === -1) {
          render[indexOfDate].times.push({
            date: event.date,
            timeString,
            events: [event],
          });
        } else {
          render[indexOfDate].times[indexOfTime].events.push(event);
        }
      }
    });

    return render.map((dat, i) => (
      <ListGroupItem key={i} active={isToday(new Date(dat.date))}>
        <Row>
          <Col size="2" className="d-flex align-items-center justify-content-end px-0">
            {dateFormat(new Date(dat.date), "mmm d")}
          </Col>
          <Col size="2" className="d-flex align-items-center justify-content-center">
            {dateFormat(new Date(dat.times[0].date), "HH:MM")}
          </Col>
          <Col>
            {dat.times[0].events.map(event => (
              <div key={event.id} className="my-1 d-flex justify-content-between">
                <div>
                  <b>{event.group}</b> {event.name}
                </div>
                {!!event.source && (
                  <div>
                    <a href={event.source} target="_blank" rel="noopener noreferrer" className="white-text">
                      <Icon fas icon="external-link-alt" size="sm" />
                    </a>
                  </div>
                )}
              </div>
            ))}
          </Col>
        </Row>
      </ListGroupItem>
    ));
  }

  function RenderBirthdays() {
    let render = [];
    birthdays.forEach(birthday => {
      let monthDay = birthday.date.split("-").slice(1).join("-");
      let indexOfDay = render.findIndex(ren => ren.monthDay === monthDay);
      if (indexOfDay === -1) {
        render.push({
          date: birthday.date,
          monthDay,
          people: [birthday],
        });
      } else {
        render[indexOfDay].people.push(birthday);
      }
    });

    return render.map((dat, i) => (
      <ListGroupItem
        key={i}
        active={
          new Date(dat.date).getMonth() === new Date().getMonth() &&
          new Date(dat.date).getDate() === new Date().getDate()
        }
      >
        <Row>
          <Col size="2" className="d-flex align-items-center justify-content-end px-0">
            {dateFormat(new Date(dat.date), "mmm d")}
          </Col>
          <Col>
            {dat.people.map(p => (
              <div key={p.id}>
                <b>{p.group}</b> {p.name} ({new Date().getFullYear() - new Date(p.date).getFullYear()})
              </div>
            ))}
          </Col>
        </Row>
      </ListGroupItem>
    ));
  }

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
                <RenderEvents />
                <small className="my-3 grey-text">
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
                <b>Upcoming Birthdays</b>
              </Type>
            </ListGroupItem>
            {loading.birthdays ? (
              <div className="my-5 spinner-border mx-auto" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            ) : birthdays.length > 0 ? (
              <RenderBirthdays />
            ) : (
              <ListGroupItem>No upcoming birthdays</ListGroupItem>
            )}
          </ListGroup>
        </Col>
      </Row>
    </div>
  );
}

export default Events;

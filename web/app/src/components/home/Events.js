import { useEffect, useState } from "react";
import {
  MDBListGroup as ListGroup,
  MDBListGroupItem as ListGroupItem,
  MDBTypography as Type,
  MDBRow as Row,
  MDBCol as Col,
  MDBIcon as Icon,
  MDBTable as Table,
  MDBTableHead as TableHead,
  MDBTableBody as TableBody,
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

    return render.map((dat, i) =>
      dat.times.map((time, j) =>
        time.events.map((event, k) => (
          <tr key={`${i}-${j}-${k}`} bgcolor={isToday(new Date(dat.date)) ? "#4b515d" : undefined}>
            {j === 0 && k === 0 && (
              <td
                key={i}
                rowSpan={dat.times.map(t => t.events.length).reduce((prev, acc) => prev + acc, 0)}
                style={{
                  verticalAlign: "middle",
                  borderColor: "#363c47",
                }}
              >
                {dateFormat(new Date(dat.date), "mmm d")}
              </td>
            )}
            {k === 0 && (
              <td
                key={j}
                rowSpan={time.events.length}
                style={{
                  verticalAlign: "middle",
                  borderColor: "#363c47",
                }}
              >
                {dateFormat(new Date(time.date), "HH:MM")}
              </td>
            )}
            <td key={k} style={{ borderColor: "#363c47" }}>
              <b>{event.group}</b> {event.name}
            </td>
            <td key={k} align="right" style={{ borderColor: "#363c47" }}>
              {!!event.source && (
                <a href={event.source} target="_blank" rel="noopener noreferrer" className="white-text">
                  <Icon fas icon="external-link-alt" size="sm" />
                </a>
              )}
            </td>
          </tr>
        )),
      ),
    );
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
          <Table>
            <caption>
              <small>
                <i>All times have been automatically converted to your local time.</i>
              </small>
            </caption>
            <TableHead textWhite>
              <tr>
                <th colSpan={4} style={{ borderColor: "#363c47" }}>
                  <Type variant="h1-responsive" tag="h1">
                    <b>Upcoming Events</b>
                  </Type>
                </th>
              </tr>
            </TableHead>
            <TableBody textWhite>
              {loading.events ? (
                <div className="my-5 spinner-border mx-auto" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              ) : events.length > 0 ? (
                <RenderEvents />
              ) : (
                <tr>
                  <td>No upcoming events</td>
                </tr>
              )}
            </TableBody>
          </Table>
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

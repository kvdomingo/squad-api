import {
  MDBListGroup as ListGroup,
  MDBListGroupItem as ListGroupItem,
  MDBTypography as Type,
  MDBIcon as Icon,
  MDBRow as Row,
  MDBCol as Col,
} from "mdbreact";
import dateFormat from "dateformat";
import { Fragment, useEffect, useState } from "react";
import api from "../../utils/Endpoints";

const styles = {
  button: {
    boxShadow: "none",
  },
};

function Events() {
  const [events, setEvents] = useState([]);
  const [birthdays, setBirthdays] = useState([]);
  const [loading, setLoading] = useState({
    events: true,
    birthdays: true,
  });
  const [groupFilter, setGroupFilter] = useState("None");

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
          <Type tag="h1" variant="h1-responsive">
            Upcoming Events
          </Type>
        </Col>
        <Col className="my-auto text-right">
          <button
            className="btn btn-mdb-color rounded-pill"
            style={styles.button}
            onClick={getEvents}
            disabled={Object.values(loading).some(Boolean)}
          >
            {Object.values(loading).some(Boolean) ? (
              <div className="spinner-border spinner-border-sm mx-auto" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            ) : (
              <Icon icon="redo-alt" size="1x" />
            )}
          </button>
        </Col>
      </Row>
      <ListGroup className="my-5">
        <ListGroupItem>
          <Type tag="h2" variant="h4-responsive">
            <b>Filters</b>
          </Type>
          By group:
          <select
            className="browser-default custom-select w-50 mdb-color white-text mx-3"
            value={groupFilter}
            onChange={e => setGroupFilter(e.target.value)}
          >
            <option value="None" selected={groupFilter === "None"}>
              None
            </option>
            {[...new Set(events.map(el => el.group))]
              .sort((a, b) => a.localeCompare(b))
              .map((group, i) => (
                <option value={group} selected={groupFilter === group} key={i}>
                  {group}
                </option>
              ))}
          </select>
        </ListGroupItem>
      </ListGroup>
      <ListGroup>
        {loading.birthdays ? (
          <div className="my-5 spinner-border mx-auto" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        ) : birthdays.length > 0 ? (
          <>
            {birthdays.map((el, i) => (
              <ListGroupItem key={i}>
                [{dateFormat(new Date(el.date), "mmm dd")}] {el.name}
              </ListGroupItem>
            ))}
          </>
        ) : (
          <ListGroupItem>No upcoming birthdays</ListGroupItem>
        )}
      </ListGroup>
      <ListGroup className="my-5">
        {loading.events ? (
          <div className="my-5 spinner-border mx-auto" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        ) : events.length > 0 ? (
          <>
            {events
              .filter(el => (groupFilter === "None" ? el : el.group === groupFilter))
              .map((el, i) => (
                <ListGroupItem key={i}>
                  [{dateFormat(new Date(el.date), "mmm dd | HH:MM")}] <b>{el.group.toUpperCase()}</b> {el.name}
                </ListGroupItem>
              ))}
            <small className="my-3 grey-text">
              <i>All times have been automatically converted to your local time.</i>
            </small>
          </>
        ) : (
          <ListGroupItem>No upcoming events</ListGroupItem>
        )}
      </ListGroup>
    </div>
  );
}

export default Events;

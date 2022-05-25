import {
  MDBCol as Col,
  MDBContainer as Container,
  MDBListGroup as ListGroup,
  MDBListGroupItem as ListGroupItem,
  MDBRow as Row,
  MDBTable as Table,
  MDBTableBody as TableBody,
  MDBTableHead as TableHead,
  MDBTypography as Typography,
} from "mdbreact";
import { useEffect, useState } from "react";
import { Event } from "../api/types/event";
import { Birthday } from "../api/types/birthday";
import api from "../api";
import Events from "./Events";
import Birthdays from "./Birthdays";

function Home() {
  const [events, setEvents] = useState<Event[]>([]);
  const [birthdays, setBirthdays] = useState<Birthday[]>([]);
  const [loading, setLoading] = useState({
    events: true,
    birthdays: true,
  });
  const [groups, setGroups] = useState<string[]>([]);
  const [groupFilter, setGroupFilter] = useState("");

  useEffect(() => {
    if (!events.length && !birthdays.length) setLoading({ birthdays: true, events: true });

    Promise.all([api.home.events(), api.home.birthdays()])
      .then(([events, birthdays]) => {
        setEvents(events.data);
        setBirthdays(birthdays.data);
      })
      .catch(err => console.error(err.message))
      .finally(() => setLoading({ birthdays: false, events: false }));
  }, []);

  useEffect(() => {
    setGroups([...new Set(events.map(event => event.group))].sort((a, b) => a.localeCompare(b)));
  }, [events]);

  return (
    <Container fluid className="p-5">
      <Row className="row-cols row-cols-1 row-cols-md-2">
        <Col className="mb-5 mb-md-1">
          <Table>
            <caption>
              <small>
                <i>All times have been converted to your local time.</i>
              </small>
            </caption>
            <TableHead textWhite>
              <tr>
                <th colSpan={4} style={{ borderColor: "#363c47" }}>
                  {/* @ts-ignore */}
                  <Typography variant="h1-responsive" tag="h1">
                    <b>Upcoming Events</b>
                  </Typography>
                </th>
              </tr>
            </TableHead>
            <TableBody textWhite>
              <tr>
                <td colSpan={4}>
                  <select
                    className="browser-default custom-select stylish-color white-text"
                    value={groupFilter}
                    onChange={e => setGroupFilter(e.target.value)}
                  >
                    <option value="">No filter</option>
                    {groups.map(group => (
                      <option key={group} value={group}>
                        {group}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
              {loading.events ? (
                <div className="my-5 spinner-border mx-auto" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              ) : events.length > 0 ? (
                <Events events={events} groupFilter={groupFilter} />
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
              {/* @ts-ignore */}
              <Typography variant="h3-responsive" tag="h1">
                <b>Upcoming Birthdays</b>
              </Typography>
            </ListGroupItem>
            {loading.birthdays ? (
              <div className="my-5 spinner-border mx-auto" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            ) : birthdays.length > 0 ? (
              <Birthdays birthdays={birthdays} />
            ) : (
              <ListGroupItem>No upcoming birthdays</ListGroupItem>
            )}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;

import { MDBIcon as Icon } from "mdbreact";
import { memo } from "react";
import dateFormat from "dateformat";
import { Event } from "../api/types/event";
import { isToday } from "../utils/date";

interface Props {
  events: Event[];
  groupFilter: string;
}

interface EventTime {
  date: string;
  timeString: string;
  events: Event[];
}

interface EventRender {
  date: string;
  dateString: string;
  times: EventTime[];
}

function Events({ events, groupFilter }: Props) {
  function renderEvents() {
    let render: EventRender[] = [];
    let filteredEvents = !!groupFilter ? events.filter(event => event.group === groupFilter) : [...events];
    filteredEvents.forEach(event => {
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
          <tr
            key={`row-${i}-${j}-${k}`}
            style={{
              backgroundColor: isToday(new Date(dat.date)) ? "#4b515d" : undefined,
            }}
          >
            {j === 0 && k === 0 && (
              <td
                key={`date-${i}`}
                rowSpan={dat.times.map(t => t.events.length).reduce((prev, acc) => prev + acc, 0)}
                style={{ borderColor: "#363c47" }}
              >
                {dateFormat(new Date(dat.date), "mmm d")}
              </td>
            )}
            {k === 0 && (
              <td key={`time-${j}`} rowSpan={time.events.length} style={{ borderColor: "#363c47" }}>
                {dateFormat(new Date(time.date), "h:MM tt")}
              </td>
            )}
            <td key={`event-${k}`} style={{ borderColor: "#363c47" }}>
              <b>{event.group}</b> {event.name}
            </td>
            <td key={`source-${k}`} align="right" style={{ borderColor: "#363c47" }}>
              {!!event.source && (
                <a href={event.source} target="_blank" rel="noopener noreferrer" className="white-text">
                  <Icon fas icon="external-link-alt" size="1x" />
                </a>
              )}
            </td>
          </tr>
        )),
      ),
    );
  }

  return <>{renderEvents()}</>;
}

export default memo(Events);

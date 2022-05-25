import { memo } from "react";
import { MDBCol as Col, MDBListGroupItem as ListGroupItem, MDBRow as Row } from "mdbreact";
import { Birthday } from "../api/types/birthday";
import dateFormat from "dateformat";

interface Props {
  birthdays: Birthday[];
}

interface BirthdayRender {
  date: string;
  monthDay: string;
  people: Birthday[];
}

function Birthdays({ birthdays }: Props) {
  function renderBirthdays() {
    let render: BirthdayRender[] = [];
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
              <div key={`${i}-${p.id}`}>
                <b>{p.group}</b> {p.name} ({new Date().getFullYear() - new Date(p.date).getFullYear()})
              </div>
            ))}
          </Col>
        </Row>
      </ListGroupItem>
    ));
  }

  return <>{renderBirthdays()}</>;
}

export default memo(Birthdays);

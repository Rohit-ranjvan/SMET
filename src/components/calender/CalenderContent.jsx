import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button, Form, Card } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

// Function to generate the calendar grid
const generateCalendar = (currentMonth) => {
  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const firstDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();
  const weeks = [];
  let day = 1;

  for (let i = 0; i < 6; i++) {
    const week = [];
    for (let j = 0; j < 7; j++) {
      if (i === 0 && j < firstDay) {
        week.push(null);
      } else if (day <= daysInMonth) {
        week.push(day);
        day++;
      } else {
        week.push(null);
      }
    }
    weeks.push(week);
  }

  return weeks;
};

const CalendarContent = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const calendarDays = generateCalendar(currentDate);

  // Add event on a specific day or date range
  const handleAddEvent = () => {
    if (newEvent && startDate) {
      const event = {
        title: newEvent,
        startDate: startDate,
        endDate: endDate || startDate,
      };

      setEvents([...events, event]);
      setNewEvent('');
      setStartDate(null);
      setEndDate(null);
    }
  };

  // Highlight the days that have events
  const highlightEventDays = (day) => {
    const eventForDay = events.find((event) => {
      const eventDate = event.startDate.getDate() === day;
      return eventDate && event.startDate.getMonth() === currentDate.getMonth();
    });
    return eventForDay ? 'bg-warning text-dark' : '';
  };

  // Render event text for the day
  const renderEventText = (day) => {
    const eventForDay = events.find((event) => {
      const eventDate = event.startDate.getDate() === day;
      return eventDate && event.startDate.getMonth() === currentDate.getMonth();
    });

    return eventForDay ? eventForDay.title : '';
  };

  // Navigate to the previous month
  const handlePreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  // Navigate to the next month
  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  return (
    <Container fluid className="mt-5">
      <Row className="justify-content-center">
        <Col xs={12} md={8}>
          <Card className="shadow-sm">
            <Card.Body>
              <div className="text-center mb-3">
                <h2>{currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}</h2>
                <div className="d-flex justify-content-between">
                  <Button variant="secondary" onClick={handlePreviousMonth}>Previous Month</Button>
                  <Button variant="secondary" onClick={handleNextMonth}>Next Month</Button>
                </div>
              </div>

              <div className="d-grid gap-2 mb-3">
                <Row className="text-center">
                  {calendarDays.map((week, index) => (
                    <Col key={index} className="d-flex">
                      {week.map((day, idx) => (
                        <Col key={idx} className={`p-3 calendar-day ${highlightEventDays(day)} border`} onClick={() => day && setStartDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day))}>
                          {day && <span>{day}</span>}
                          {renderEventText(day) && <div>{renderEventText(day)}</div>}
                        </Col>
                      ))}
                    </Col>
                  ))}
                </Row>
              </div>

              <Form className="mt-4">
                <Form.Group>
                  <Form.Label>Add Event Description</Form.Label>
                  <Form.Control
                    type="text"
                    value={newEvent}
                    onChange={(e) => setNewEvent(e.target.value)}
                    placeholder="Event Description"
                  />
                </Form.Group>

                <Form.Group className="mt-3">
                  <Form.Label>Start Date</Form.Label>
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    placeholderText="Select Start Date"
                    className="form-control"
                  />
                </Form.Group>

                <Form.Group className="mt-3">
                  <Form.Label>End Date (optional)</Form.Label>
                  <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate}
                    placeholderText="Select End Date"
                    className="form-control"
                  />
                </Form.Group>

                <Button
                  variant="success"
                  className="w-100 mt-3"
                  onClick={handleAddEvent}
                  disabled={!newEvent || !startDate} // Disable the button if no event or start date
                >
                  Add Event
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CalendarContent;

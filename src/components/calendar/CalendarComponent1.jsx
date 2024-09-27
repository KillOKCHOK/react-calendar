// CalendarComponent.js
import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const CalendarComponent1 = () => {
  const [events, setEvents] = useState([
    {
      title: 'Sample Event',
      start: new Date(),
      end: new Date(moment().add(1, 'hour').toDate()),
    },
  ]);

  // Add new event on selecting a slot
  const handleSelect = ({ start, end }) => {
    const title = window.prompt('New Event Name');
    if (title) {
      setEvents([...events, { start, end, title }]);
    }
  };

  // Update or delete event
  const handleEventUpdateOrDelete = (event) => {
    const action = window.prompt(
      `Update or delete event? Enter 'update' to edit or 'delete' to remove it.`,
      'update'
    );
    
    if (action === 'update') {
      const newTitle = window.prompt('Update Event Name', event.title);
      if (newTitle) {
        setEvents(
          events.map((ev) => (ev === event ? { ...ev, title: newTitle } : ev))
        );
      }
    } else if (action === 'delete') {
      if (window.confirm('Are you sure you want to delete this event?')) {
        setEvents(events.filter((ev) => ev !== event));
      }
    }
  };

  return (
    <div style={{ height: 500 }}>
      <Calendar
        selectable
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        onSelectEvent={handleEventUpdateOrDelete}
        onSelectSlot={handleSelect}
        style={{ height: 500 }}
      />
    </div>
  );
};

export default CalendarComponent1;
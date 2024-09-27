import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Modal from 'react-modal';

const localizer = momentLocalizer(moment);

// Set Modal's root element
Modal.setAppElement('#root');

const CalendarComponent = () => {
  const [events, setEvents] = useState([
    {
      title: 'Sample Event',
      start: new Date(),
      end: new Date(moment().add(1, 'hour').toDate()),
    },
  ]);
  
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalType, setModalType] = useState('add'); // 'add', 'update', 'delete'
  const [currentEvent, setCurrentEvent] = useState(null);
  const [newTitle, setNewTitle] = useState('');
  const [selectedSlot, setSelectedSlot] = useState(null);

  const openModal = (type, event = null, slot = null) => {
    setModalType(type);
    setCurrentEvent(event);
    setSelectedSlot(slot);
    setNewTitle(event ? event.title : '');
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setCurrentEvent(null);
    setNewTitle('');
    setSelectedSlot(null);
  };

  const handleAddEvent = () => {
    if (newTitle && selectedSlot) {
      setEvents([...events, { start: selectedSlot.start, end: selectedSlot.end, title: newTitle }]);
      closeModal();
    }
  };

  const handleUpdateEvent = () => {
    if (newTitle && currentEvent) {
      setEvents(
        events.map((ev) => (ev === currentEvent ? { ...ev, title: newTitle } : ev))
      );
      closeModal();
    }
  };

  const handleDeleteEvent = () => {
    if (currentEvent) {
      setEvents(events.filter((ev) => ev !== currentEvent));
      closeModal();
    }
  };

  // Handle selecting a slot
  const handleSelect = ({ start, end }) => {
    openModal('add', null, { start, end });
  };

  // Handle selecting an event to update or delete
  const handleEventUpdateOrDelete = (event) => {
    openModal('update', event);
  };

  return (
    <div>
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

      {/* Modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Event Modal"
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
          },
        }}
      >
        {modalType === 'add' && (
          <>
            <h2>Add Event</h2>
            <input
              type="text"
              placeholder="Event Title"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
            <button onClick={handleAddEvent}>Add Event</button>
            <button onClick={closeModal}>Cancel</button>
          </>
        )}

        {modalType === 'update' && (
          <>
            <h2>Update or Delete Event</h2>
            <input
              type="text"
              placeholder="Event Title"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
            <button onClick={handleUpdateEvent}>Update Event</button>
            <button onClick={handleDeleteEvent}>Delete Event</button>
            <button onClick={closeModal}>Cancel</button>
          </>
        )}
      </Modal>
    </div>
  );
};

export default CalendarComponent;
import React, { useState } from 'react';

const KanbanBoard = () => {
  const [cards, setCards] = useState([
    {
      id: 1,
      title: 'To Do',
      tasks: [
        { id: 1, title: 'Task 1' },
        { id: 2, title: 'Task 2' },
        { id: 3, title: 'Task 3' },
      ],
    },
    {
      id: 2,
      title: 'In Progress',
      tasks: [
        { id: 4, title: 'Task 4' },
        { id: 5, title: 'Task 5' },
      ],
    },
    {
      id: 3,
      title: 'Done',
      tasks: [
        { id: 6, title: 'Task 6' },
      ],
    },
    {
        id: 4,
        title: 'Done',
        tasks: [
          { id: 4, title: 'Task 6' },
        ],
      },
  ]);

  const onDragStart = (event, cardId, taskId) => {
    event.dataTransfer.setData('cardId', cardId);
    event.dataTransfer.setData('taskId', taskId);
  };

  const onDrop = (event, cardId) => {
    const draggedCardId = event.dataTransfer.getData('cardId');
    const draggedTaskId = event.dataTransfer.getData('taskId');
    const updatedCards = cards.map(card => {
      if (card.id === parseInt(draggedCardId)) {
        const updatedTasks = card.tasks.filter(task => task.id !== parseInt(draggedTaskId));
        card.tasks = updatedTasks;
      }
      if (card.id === parseInt(cardId)) {
        const updatedTasks = card.tasks.slice();
        updatedTasks.push({ id: parseInt(draggedTaskId), title: `Task ${draggedTaskId}` });
        card.tasks = updatedTasks;
      }
      return card;
    });
    setCards(updatedCards);
  };

  return (
    <div style={{ display: 'flex' }}>
      {cards.map(card => (
        <div
          key={card.id}
          style={{ border: '1px solid black', padding: '10px', margin: '10px', minWidth: '200px' }}
          onDragOver={event => event.preventDefault()}
          onDrop={event => onDrop(event, card.id)}
        >
          <h3>{card.title}</h3>
          {card.tasks.map(task => (
            <div
              key={task.id}
              style={{ border: '1px solid gray', padding: '5px', margin: '5px' }}
              draggable
              onDragStart={event => onDragStart(event, card.id, task.id)}
            >
              {task.title}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default KanbanBoard;

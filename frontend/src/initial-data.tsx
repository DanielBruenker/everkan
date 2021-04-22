
const initialData = {
  columns: [
    {
      id: 1,
      title: 'Backlog',
      backgroundColor: 'blue',
      tasks: [
        {
          id: 1,
          title: 'KanbanCard 1',
          description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr,' +
            ' sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, ' +
            'sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. '
        },
        {
          id: 2,
          title: 'KanbanCard 2'
        },
        {
          id: 3,
          title: 'KanbanCard 3'
        },
        {
          id: 4,
          title: 'KanbanCard 4'
        }
      ]
    },
    {
      id: 2,
      title: 'To Do',
      backgroundColor: 'red',
      tasks: []
    },
    {
      id: 3,
      title: 'In Progress',
      backgroundColor: 'yellow',
      tasks: []
    },
    {
      id: 4,
      title: 'Done',
      backgroundColor: 'green',
      tasks: []
    }
  ],
  columnOrder: [1, 2, 3, 4]
};


export default initialData;
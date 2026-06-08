function TaskList({ tasks, onDelete, onEdit }) {
  return (
    <div>
      {tasks.map((task) => (
        <div
          key={task.id}
          style={{
            border: "1px solid gray",
            margin: "10px 0",
            padding: "10px",
          }}
        >
          <h3>{task.title}</h3>

          <p>{task.description}</p>

          <p>
            Status:
            {task.completed
              ? " Completed"
              : " Pending"}
          </p>

          <button onClick={() => onEdit(task)}>
            Edit
          </button>

          <button
            onClick={() => onDelete(task.id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default TaskList;
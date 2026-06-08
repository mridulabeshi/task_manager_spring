import { useEffect, useState } from "react";
import AddTask from "./components/AddTask";
import TaskList from "./components/TaskList";
import EditTask from "./components/EditTask";

function App() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8081/tasks")
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.error(err));
  }, []);

  const addTask = async (task) => {
    try {
      const response = await fetch("http://localhost:8081/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      });
      console.log("Status:", response.status);

      const newTask = await response.json();
      console.log("Response:", newTask);

      setTasks([...tasks, newTask]);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await fetch(`http://localhost:8081/tasks/${id}`, {
        method: "DELETE",
      });

      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const updateTask = async (updatedTask) => {
    try {
      const response = await fetch(
        `http://localhost:8081/tasks/${updatedTask.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedTask),
        }
      );

      const savedTask = await response.json();

      setTasks(
        tasks.map((task) =>
          task.id === savedTask.id ? savedTask : task
        )
      );

      setEditingTask(null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Task Manager</h1>

      <AddTask onAdd={addTask} />

      <TaskList
        tasks={tasks}
        onDelete={deleteTask}
        onEdit={setEditingTask}
      />

      {editingTask && (
        <EditTask
          task={editingTask}
          onUpdate={updateTask}
        />
      )}
    </div>
  );
}

export default App;
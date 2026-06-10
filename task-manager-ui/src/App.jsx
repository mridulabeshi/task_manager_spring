import { useEffect, useState } from "react";
import AddTask from "./components/AddTask";
import TaskList from "./components/TaskList";
import EditTask from "./components/EditTask";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8081/tasks")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch tasks");
        return res.json();
      })
      .then((data) => setTasks(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const addTask = async (task) => {
    try {
      const response = await fetch("http://localhost:8081/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task),
      });
      if (!response.ok) throw new Error("Failed to add task");
      const newTask = await response.json();
      setTasks((prev) => [...prev, newTask]);
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteTask = async (id) => {
    try {
      const response = await fetch(`http://localhost:8081/tasks/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete task");
      setTasks((prev) => prev.filter((task) => task.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  const updateTask = async (updatedTask) => {
    try {
      const response = await fetch(`http://localhost:8081/tasks/${updatedTask.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedTask),
      });
      if (!response.ok) throw new Error("Failed to update task");
      const savedTask = await response.json();
      setTasks((prev) =>
        prev.map((task) => (task.id === savedTask.id ? savedTask : task))
      );
      setEditingTask(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const toggleTask = async (task) => {
    const toggled = { ...task, completed: !task.completed };
    try {
      const response = await fetch(`http://localhost:8081/tasks/${task.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(toggled),
      });
      if (!response.ok) throw new Error("Failed to update task");
      const savedTask = await response.json();
      setTasks((prev) =>
        prev.map((t) => (t.id === savedTask.id ? savedTask : t))
      );
    } catch (err) {
      setError(err.message);
    }
  };

  const doneCount = tasks.filter((t) => t.completed).length;

  return (
    <div className="app">
      <div className="app-header">
        <h1>Task manager</h1>
        {tasks.length > 0 && (
          <span className="task-count">{doneCount}/{tasks.length} done</span>
        )}
      </div>

      {error && (
        <div className="error-banner">
          {error}
          <button onClick={() => setError(null)}>Dismiss</button>
        </div>
      )}

      <AddTask onAdd={addTask} />

      {loading ? (
        <p className="loading">Loading tasks…</p>
      ) : (
        <TaskList
          tasks={tasks}
          onDelete={deleteTask}
          onEdit={setEditingTask}
          onToggle={toggleTask}
          editingId={editingTask?.id}
        />
      )}

      {editingTask && (
        <EditTask
          task={editingTask}
          onUpdate={updateTask}
          onCancel={() => setEditingTask(null)}
        />
      )}
    </div>
  );
}

export default App;
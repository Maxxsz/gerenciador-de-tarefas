import express from "express";
import {
  getAllTasksByProject,
  getAllProjectsByUser,
  getAllTasksByUser,
  getHistoryByTask,
  getUsersByProject,
  createUser,
  createProject,
  createTask,
  updateTaskStatus,
  updateProjectName,
  deleteUser,
  deleteProject,
  getTasks,
} from "./taskModel.js";

const app = express();
const port = 3001;

app.use(express.json());

app.use(function (_req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Access-Control-Allow-Headers"
  );
  return next();
});
// READ
app.get("/getTasks", (_req, res) => {
  getTasks()
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.get("/getAllTasksByProject/:projectId", (req, res) => {
  const projectId = req.params.projectId;
  getAllTasksByProject(projectId)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.get("/getAllProjectsByUser/:userId", (req, res) => {
  const userId = req.params.userId;
  getAllProjectsByUser(userId)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.get("/getAllTasksByUser/:userId", (req, res) => {
  const userId = req.params.userId;
  getAllTasksByUser(userId)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.get("/getHistoryByTask/:taskId", (req, res) => {
  const taskId = req.params.taskId;
  getHistoryByTask(taskId)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.get("/getUsersByProject/:projectId", (req, res) => {
  const projectId = req.params.projectId;
  getUsersByProject(projectId)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

//CREATE
app.post("/createUser", (req, res) => {
  createUser(req.body)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.post("/createProject", (req, res) => {
  createProject(req.body)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      console.error("Error in /createProject route:", error);
      res.status(500).send(error.message || "Internal Server Error");
    });
});

app.post("/createTask", (req, res) => {
  createTask(req.body)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      console.error("Error in /createTask route:", error);
      res.status(500).send(error.message || "Internal Server Error");
    });
});

//UPDATE
app.put("/updateTaskStatus/:taskId", (req, res) => {
  const taskId = req.params.taskId;
  const body = req.body;
  updateTaskStatus(taskId, body)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.put("/updateProjectName/:projectId", (req, res) => {
  const projectId = req.params.projectId;
  const body = req.body;
  updateProjectName(projectId, body)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

//DELETE
app.delete("/deleteUser/:userId", (req, res) => {
  deleteUser(req.params.userId)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.delete("/deleteProject/:projectId", (req, res) => {
  deleteProject(req.params.projectId)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});

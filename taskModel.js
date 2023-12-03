import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  host: "127.0.0.1",
  port: 5432,
  database: "gerenciamento_de_tarefas",
  user: "postgres",
  password: "asd123456",
});

// Operações CRUD

//READ

//Selecionar todas as tarefas

const getTasks = async () => {
  try {
    return await new Promise(function (resolve, reject) {
      pool.query(
        `SELECT
      Tarefa.tarefa_nome,
      Usuario.usuario_nome,
      Projeto.projeto_nome,
      Status.status_nome
  FROM
      Tarefa
  JOIN
      Usuario ON Tarefa.Usuario_ID = Usuario.usuario_ID
  JOIN
      Projeto ON Tarefa.projeto_ID = Projeto.projeto_ID
  JOIN
      Status ON Tarefa.status_ID = Status.status_ID ORDER BY Tarefa.tarefa_ID`,
        (error, results) => {
          if (error) {
            reject(error);
          }
          if (results && results.rows) {
            resolve(results.rows);
          } else {
            reject(new Error("Nenhuma tarefa cadastrada."));
          }
        }
      );
    });
  } catch (error_1) {
    console.error(error_1);
    throw new Error("Internal server error");
  }
};

// Selecionar todas as tarefas de um projeto específico.

const getAllTasksByProject = async (projectId) => {
  try {
    return await new Promise(function (resolve, reject) {
      pool.query(
        `SELECT
        Tarefa.tarefa_nome,
        Projeto.projeto_nome,
        Usuario.usuario_nome,
        Historico.descricao
    FROM
        Tarefa
    JOIN
        Projeto ON Tarefa.projeto_ID = projeto.projeto_ID
    JOIN
        Usuario ON Tarefa.usuario_ID = Usuario.usuario_ID
    LEFT JOIN
        Historico ON Tarefa.tarefa_ID = Historico.tarefa_ID
    WHERE
        Tarefa.projeto_ID = $1`,
        [projectId],
        (error, results) => {
          if (error) {
            reject(error);
          }
          if (results && results.rows) {
            resolve(results.rows);
          } else {
            reject(new Error("Nenhuma tarefa encontrada."));
          }
        }
      );
    });
  } catch (error_1) {
    console.error(error_1);
    throw new Error("Internal server error");
  }
};

// Listar todos os projetos associados a um usuário

const getAllProjectsByUser = async (userId) => {
  try {
    return await new Promise(function (resolve, reject) {
      pool.query(
        `SELECT
        projeto_nome,
        usuario_nome
    FROM
        Projeto
    JOIN
        Usuario ON Projeto.usuario_ID = Usuario.usuario_ID
    WHERE
        Usuario.usuario_ID = $1
    `,
        [userId],
        (error, results) => {
          if (error) {
            reject(error);
          }
          if (results && results.rows) {
            resolve(results.rows);
          } else {
            reject(new Error("Nenhum projeto encontrado."));
          }
        }
      );
    });
  } catch (error_1) {
    console.error(error_1);
    throw new Error("Internal server error");
  }
};

// Listar todas as tarefas atirbuídas a um usuário
const getAllTasksByUser = async (userId) => {
  try {
    return await new Promise(function (resolve, reject) {
      pool.query(
        `SELECT
        Tarefa.tarefa_nome,
        Projeto.projeto_nome,
        Usuario.usuario_nome,
        Historico.descricao
    FROM
        Tarefa
    JOIN
        Projeto ON Tarefa.projeto_ID = projeto.projeto_ID
    JOIN
        Usuario ON Tarefa.usuario_ID = Usuario.usuario_ID
    LEFT JOIN
        Historico ON Tarefa.tarefa_ID = Historico.tarefa_ID
    WHERE
        Tarefa.usuario_ID = $1`,
        [userId],
        (error, results) => {
          if (error) {
            reject(error);
          }
          if (results && results.rows) {
            resolve(results.rows);
          } else {
            reject(new Error("Nenhuma tarefa encontrada."));
          }
        }
      );
    });
  } catch (error_1) {
    console.error(error_1);
    throw new Error("Internal server error");
  }
};

// Buscar o histórico de alterações de uma tarefa
const getHistoryByTask = async (taskId) => {
  try {
    return await new Promise(function (resolve, reject) {
      pool.query(
        `SELECT
        Tarefa.tarefa_nome,
        Usuario.usuario_nome,
        Historico.descricao
    FROM
        Historico
    JOIN
        Tarefa ON Historico.tarefa_ID = tarefa.tarefa_ID
    JOIN
        Usuario ON Historico.usuario_ID = Usuario.usuario_ID
    WHERE
        Historico.tarefa_ID = $1`,
        [taskId],
        (error, results) => {
          if (error) {
            reject(error);
          }
          if (results && results.rows) {
            resolve(results.rows);
          } else {
            reject(new Error("Nenhum histórico encontrado."));
          }
        }
      );
    });
  } catch (error_1) {
    console.error(error_1);
    throw new Error("Internal server error");
  }
};

// Encontrar todos os usuários associados a um projeto
const getUsersByProject = async (projectId) => {
  try {
    return await new Promise(function (resolve, reject) {
      pool.query(
        `SELECT
        U.usuario_nome,
        U.email,
        P.projeto_nome
    FROM
        Usuario AS U
    JOIN
        Projeto AS P ON U.usuario_ID = P.usuario_ID
    WHERE
        P.projeto_ID = $1`,
        [projectId],
        (error, results) => {
          if (error) {
            reject(error);
          }
          if (results && results.rows) {
            resolve(results.rows);
          } else {
            reject(new Error("Nenhum usuário encontrado."));
          }
        }
      );
    });
  } catch (error_1) {
    console.error(error_1);
    throw new Error("Internal server error");
  }
};

// CREATE
// Criar novo usuario
const createUser = (body) => {
  return new Promise(function (resolve, reject) {
    const { userName, email } = body;
    pool.query(
      "INSERT INTO Usuario (usuario_nome, email) VALUES ($1, $2) RETURNING *",
      [userName, email],
      (error, results) => {
        if (error) {
          reject(error);
        }
        if (results && results.rows) {
          resolve({ message: `Usuário criado: ${userName}` });
        } else {
          reject(new Error("Deu ruim"));
        }
      }
    );
  });
};

// Criar novo projeto
const createProject = (body) => {
  return new Promise(function (resolve, reject) {
    const { projectName, userId } = body;
    pool.query(
      "INSERT INTO Projeto (projeto_nome, usuario_ID) VALUES ($1, $2) RETURNING *",
      [projectName, userId],
      (error, results) => {
        if (error) {
          reject(error);
        }
        if (results && results.rows) {
          resolve({ message: `Projeto criado: ${projectName}` });
        } else {
          reject(new Error("Erro ao criar projeto"));
        }
      }
    );
  });
};

// Criar nova tarefa
const createTask = (body) => {
  return new Promise(function (resolve, reject) {
    const { taskName, projectId, userId } = body;
    pool.query(
      `INSERT INTO Tarefa (
        tarefa_nome, 
        projeto_ID, 
        usuario_ID, 
        status_ID
        ) VALUES ($1, $2, $3, 1) RETURNING *`,
      [taskName, projectId, userId],
      (error, results) => {
        if (error) {
          reject(error);
        }
        if (results && results.rows) {
          resolve({ message: `Tarefa criada: ${taskName}` });
        } else {
          reject(new Error("Deu ruim."));
        }
      }
    );
  });
};

//UPDATE
// Atualizar status da tarefa
const updateTaskStatus = (taskId, body) => {
  return new Promise(function (resolve, reject) {
    const { statusId } = body;
    pool.query(
      "UPDATE Tarefa SET status_ID = $1 WHERE tarefa_ID = $2 RETURNING *",
      [statusId, taskId],
      (error, results) => {
        if (error) {
          reject(error);
        }
        if (results && results.rows) {
          resolve({ message: `Status da tarefa atualizado. ID: ${taskId}` });
        } else {
          reject(new Error("Deu ruim"));
        }
      }
    );
  });
};

// Atualizar informações de um projeto
const updateProjectName = (projectId, body) => {
  return new Promise(function (resolve, reject) {
    const { projectName } = body;
    pool.query(
      "UPDATE Projeto SET projeto_nome = $1 WHERE projeto_ID = $2 RETURNING *",
      [projectName, projectId],
      (error, results) => {
        if (error) {
          reject(error);
        }
        if (results && results.rows) {
          resolve({ message: `Nome do projeto atualizado: ${projectName}` });
        } else {
          reject(new Error("Deu ruim"));
        }
      }
    );
  });
};

//DELETE
//Remover usuário
const deleteUser = (userId) => {
  return new Promise(function (resolve, reject) {
    pool.query(
      "DELETE FROM Usuario WHERE usuario_ID = $1",
      [userId],
      (error, _results) => {
        if (error) {
          reject(error);
        }
        resolve({ message: `Usuário removido. ID:${userId}` });
      }
    );
  });
};

//Remover Proejto
const deleteProject = (projectId) => {
  return new Promise(function (resolve, reject) {
    pool.query(
      "DELETE FROM Projeto WHERE projeto_ID = $1",
      [projectId],
      (error, _results) => {
        if (error) {
          reject(error);
        }
        resolve({ message: `Projeto deletado: ${projectId}` });
      }
    );
  });
};

export {
  getTasks,
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
};

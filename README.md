# gerenciador de tarefas

Criar o database no pgAdmin4

Em seguida executar o script para criação das tabelas e massa.

-- script DDL

CREATE TABLE Usuario (
usuario_ID SERIAL PRIMARY KEY,
usuario_nome VARCHAR(255) NOT NULL,
email VARCHAR(50) NOT NULL
);

CREATE TABLE Projeto (
projeto_ID SERIAL PRIMARY KEY,
projeto_nome VARCHAR(255) NOT NULL,
usuario_ID INT REFERENCES Usuario(usuario_ID) ON DELETE CASCADE
);

CREATE TABLE Status (
status_ID SERIAL PRIMARY KEY,
status_nome VARCHAR(50) NOT NULL
);

CREATE TABLE Tarefa (
tarefa_ID SERIAL PRIMARY KEY,
tarefa_nome VARCHAR(255) NOT NULL,
projeto_ID INT REFERENCES Projeto(projeto_ID) ON DELETE CASCADE,
usuario_ID INT REFERENCES Usuario(usuario_ID) ON DELETE CASCADE,
status_ID INT REFERENCES Status(status_ID) ON DELETE CASCADE
);

CREATE TABLE Historico (
historico_ID SERIAL PRIMARY KEY,
tarefa_ID INT REFERENCES Tarefa(tarefa_ID) ON DELETE CASCADE,
usuario_ID INT REFERENCES Usuario(usuario_ID) ON DELETE CASCADE,
timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
descricao TEXT
);

-- Criação de Massa

--Inserindo usuarios
INSERT INTO Usuario(usuario_nome, email) VALUES
('Maxwell', 'maxwellvis@gmail.com'),
('Manoel', 'manoelvis@gmail.com'),
('Do Vale', 'dovale@gmail.com'),
('Paulie', 'pauliezinho@gmail.com'),
('Cecilia', 'sisilha@gmail.com'),
('Babi', 'rdiana@gmail.com'),
('Saulo', 'ssauro@gmail.com'),
('Jas', 'mine@gmail.com'),
('Pedro', 'naodovale@gmail.com'),
('Iv', 'na@gmail.com'),
('Xulia', 'trombadinha@gmail.com'),
('mari', 'ann@gmail.com'),
('Sheila', 'carvalho@gmail.com'),
('Sheila', 'melo@gmail.com'),
('Nascimento', 'capitao@gmail.com');
--Inserindo possíveis Status
INSERT INTO Status(status_nome) VALUES
('Não iniciada'),
('Iniciada'),
('Concluída');
--Inserindo projetos
INSERT INTO Projeto(projeto_nome, usuario_ID) VALUES
('Projeto 1', 1),
('Projeto 2', 2),
('Projeto 3', 3),
('Projeto 4', 4),
('Projeto 5', 5),
('Projeto 6', 6),
('Projeto 7', 7),
('Projeto 8', 8),
('Projeto 9', 9),
('Projeto 10', 10),
('Projeto 11', 11),
('Projeto 12', 12),
('Projeto 13', 13),
('Projeto 14', 14),
('Projeto 15', 15);
-- Inserindo Tarefas
INSERT INTO Tarefa(tarefa_nome, projeto_ID, usuario_ID, status_ID) VALUES
('Tarefa 1', 1, 1, 1),
('Tarefa 2', 2, 2, 2),
('Tarefa 3', 3, 3, 3),
('Tarefa 4', 4, 4, 1),
('Tarefa 5', 5, 5, 2),
('Tarefa 6', 6, 6, 2),
('Tarefa 7', 7, 7, 2),
('Tarefa 8', 8, 8, 2),
('Tarefa 9', 9, 9, 2),
('Tarefa 10', 10, 10, 2),
('Tarefa 11', 11, 11, 2),
('Tarefa 12', 12, 12, 2),
('Tarefa 13', 13, 13, 2),
('Tarefa 14', 14, 14, 2),
('Tarefa 15', 15, 15, 2);

-- Inserindo histórico
INSERT INTO Historico(tarefa_ID, usuario_ID, descricao) VALUES
(1, 1, 'Tarefa iniciada'),
(2, 2, 'Tarefa em andamento'),
(3, 3, 'Projeto concluído'),
(4, 4, 'Tarefa em revisão'),
(5, 5, 'Tarefa concluída'),
(6, 6, 'Tarefa sem ideias'),
(7, 7, 'Tarefa batata'),
(8, 8, 'Tarefa queijo'),
(9, 9, 'Tarefa cuscuz'),
(10, 10, 'Tarefa arroz'),
(11, 11, 'Tarefa feijão'),
(12, 12, 'Tarefa lasanha'),
(13, 13, 'Tarefa churrasco'),
(14, 14, 'Tarefa atrasada'),
(15, 15, 'Tarefa atrasada');

verificar o arquivo taskModel.js e atualizar as informações:
database: "nome_do_database",
user: "seu_usuario",
password: "sua_senha"

executar a API: npm run dev

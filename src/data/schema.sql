-- ==========================================
-- CHRONONEXIA DATABASE SCHEMA
-- Compatible with PostgreSQL, SQLite, and MySQL
-- ==========================================

-- -----------------------------------------------------
-- Table: clubs
-- Stores the main information for each individual club/event
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS clubs (
    id VARCHAR(100) PRIMARY KEY,                  -- Unique Club slug/ID (e.g., 'acm-student-chapter')
    name VARCHAR(150) NOT NULL,                  -- Club official name
    event_name VARCHAR(150) NOT NULL,            -- Event Name
    learning_outcomes TEXT NOT NULL,             -- Learning outcomes (JSON array representation)
    event_description TEXT NOT NULL,             -- Description specific to the event
    location VARCHAR(150) NOT NULL,              -- Location/Room details
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- CREATE INDEX for fast lookups
CREATE UNIQUE INDEX IF NOT EXISTS idx_clubs_id ON clubs(id);

-- ==========================================
-- SEED DATA INSERTION SCRIPTS
-- ==========================================

INSERT INTO clubs (id, name, event_name, learning_outcomes, event_description, location)
VALUES
-- Past Clubs
('symbiosis-economic-club', 'Symbiosis Economic Club', 'EcoGenesis: The Fiscal Policy Simulation', '["Understanding fiscal and monetary policy transmission mechanisms", "Analyzing economic indicators and market dependencies", "Crisis management and financial decision-making under uncertainty"]', 'A high-stakes macroeconomic simulation game where participants act as central bankers and finance ministers to navigate simulated global economic crises.', 'Block A — Room 101'),
('electronics-design-club', 'Electronics Design Club', 'CircuitCraft: IoT Hardware & PCB Design Workshop', '["Mastering EDA tools for schematic entry and PCB layout", "Understanding signal integrity, routing rules, and noise mitigation", "Hands-on experience with hardware soldering and oscilloscope testing"]', 'A comprehensive, hands-on workshop focused on designing microchip schematics, simulating analog-to-digital signals, and fabricating printed circuit boards (PCBs).', 'Electronics Lab'),
('mathelete-club', 'Mathelete Club', 'Mathlete Decathlon: Numeric & Logic Olympiad', '["Applying game theory to strategic competitive scenarios", "Formulating mathematical proofs for complex algorithms", "Solving combinatorics and modular arithmetic puzzles quickly"]', 'An intensive logic and mathematics tournament challenging participants with advanced problems in discrete structures, game theory, and number theory.', 'Math Wing'),

-- Present Clubs
('acm-student-chapter', 'ACM Student Chapter', 'ACM DevHack: 24-Hour Systems & App Hackathon', '["Designing robust RESTful and GraphQL API architectures", "Implementing responsive frontend interfaces with React and TailwindCSS", "Deploying scalable serverless applications with database integrations"]', 'The premier annual 24-hour hackathon where student developers build full-stack applications solving modern urban and educational problems.', 'CS Lab 1'),
('google-developer-students-club', 'Google Developer Students Club', 'Google Cloud Study Jam & Kubernetes Deployment', '["Containerizing applications using Docker configuration files", "Orchestrating multi-container systems with Kubernetes pods", "Configuring automated cloud load balancing and monitoring"]', 'A practical laboratory session diving deep into containerizing applications, setting up CI/CD pipelines, and deploying microservices to Google Kubernetes Engine.', 'Innovation Hub'),
('foss-club', 'FOSS Club', 'Git-Init: Open Source Contribution & Linux Setup', '["Navigating the POSIX terminal and automating tasks via shell scripts", "Mastering Git branches, rebasing, and merge conflict resolution", "Contributing code and documentation to production open-source projects"]', 'An interactive workshop introducing students to the Linux command line environment, version control workflows, and submitting pull requests to open-source repositories.', 'Open Source Lounge'),

-- Future Clubs
('ai-club', 'AI Club', 'NeuralNexus: Finetuning LLMs & Agentic Workflows', '["Implementing RAG vector embeddings and database search indexes", "Constructing autonomous multi-agent task delegation graphs", "Finetuning open-source model parameters for specific domain queries"]', 'A technical hackathon where students build multi-agent AI systems, run retrieval-augmented generation (RAG) pipelines, and finetune specialized open-source models.', 'AI Research Lab'),
('rotonity-club', 'Rotonity Club', 'RoboFight: Combat Robotics & Automation Arena', '["Designing robust mechanical chassis to withstand shock and impact", "Interfacing high-torque brushed/brushless motors with speed controllers", "Configuring secure radio-frequency telemetry links for real-time control"]', 'High-octane engineering competition where student-built combat robots battle in an armored cage, testing mechanical durability and electronic control.', 'Robotics Workshop'),
('symbiosis-quantum-club', 'Symbiosis Quantum Club', 'QuantumSphere: Simulating Superposition & Qubit Circuits', '["Understanding quantum logic gates (Hadamard, CNOT, Phase)", "Simulating quantum key distribution protocols and superposition states", "Running quantum circuit algorithms on cloud-based quantum simulator backends"]', 'A theoretical and practical lab using Python and Qiskit to construct quantum logic gates, simulate quantum entanglement, and explore quantum key distribution.', 'Quantum Lab');

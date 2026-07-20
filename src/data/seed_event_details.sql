-- ==========================================
-- SYMBITECH 2026 EVENT DETAILS SEED SCRIPT
-- ==========================================

CREATE TABLE IF NOT EXISTS symbitech_event_details (
    sr_no INT PRIMARY KEY,
    club_name VARCHAR(255) NOT NULL,
    event_name VARCHAR(255),
    learning_outcome TEXT,
    event_description TEXT,
    preferred_location VARCHAR(255)
);

CREATE INDEX IF NOT EXISTS idx_symbitech_club_name ON symbitech_event_details(club_name);

INSERT INTO symbitech_event_details (sr_no, club_name, event_name, learning_outcome, event_description, preferred_location)
VALUES
(1, 'CodeX', 'The Hail Mary Directive', 'Participants will gain practical exposure to:
1. Artificial Intelligence (AI) and Large Language Models (LLMs) and their role in communication and decision-making.
2. Internet of Things (IoT) concepts through interconnected hardware and real-time communication.
3. Embedded Systems using NodeMCU, sensors, and serial communication.
4. Electronic Components and their functions, with explanations provided in the instruction manual.
5. Circuit building, debugging, and logical problem-solving through hands-on challenges.', 'This event is a fast-paced collaborative space mission where participants are divided into two groups: Mission Control and Astronauts. Both teams must work together to restore a failing communication network, solve embedded systems and IoT-based challenges, and safely navigate their spaceship before time runs out. While the Astronauts physically interact with hardware stations, circuits, and microcontrollers, Mission Control analyses information, deciphers clues, and relays instructions through a communication interface. The event is designed to test teamwork, communication, debugging, logical thinking, problem-solving, and decision-making under pressure.', 'CL 9 and 10 (4th floor)'),
(2, 'Matheletes', 'Cipher Chase', 'This event develops critical thinking and mathematical problem-solving by exposing participants to the evolution of cryptography from manual ciphers to modern algorithms. Operating under time constraints, it strengthens collaborative skills like task delegation and communication under pressure. Additionally, the challenge cultivates strategic time management and adaptability, requiring teams to evaluate problems quickly and manage their pacing efficiently.', 'Cipher Chase is a team-based mathematical and logical puzzle-solving competition structured around the historical evolution of cryptography and problem-solving. Teams are provided with a confidential "spy notebook" containing a series of progressive mathematical riddles, logic puzzles, and ciphers. The challenge is organized chronologically: participants start with ancient manual ciphers, transition through mechanical-era logic puzzles, and conclude with modern computational and algorithmic challenges. The team that successfully completes all stages in the shortest time wins.', 'D-508'),
(3, 'IEEE', 'Mission AI-Impossible', 'Participants practice cryptography and lateral problem-solving (cipher/code deciphering), basic circuit debugging and hardware troubleshooting under time pressure, structured team communication through a deliberately constrained channel (Morse/radio), and applied AI literacy — using an LLM to synthesize technical data (telemetry + transcript) into an evidence-based conclusion. The format also builds decision-making under incomplete information and cross-functional coordination between a "field" team and an "analysis" team, mirroring real investigative and incident-response workflows.', 'Mission AI-Impossible is a 4-member team investigation game split across two physical rooms. Two on-site investigators recover physical wreckage evidence at a simulated crash site; two command-centre analysts hold the digital tools — a code-cracking portal and a fine-tuned LLM. The only link between them is a walkie-talkie restricted to Morse code. Teams must decipher clues, crack an access code, physically debug a faulty circuit inside a "black box" flight recorder, extract a cockpit transcript, and use AI-generated insights to report the true cause of the incident — judged on speed and accuracy.', 'D-501 and Mtech lab 5th Floor'),
(4, 'AI Club', 'Project CHRONOS: The AI Glitch | Learn, Prompt, Solve', 'Participants will gain practical exposure to Prompt Engineering, Agentic AI, and Large Language Models (LLMs) through hands-on interaction with an AI assistant. The event also develops an understanding of Responsible AI, encouraging participants to critically evaluate AI-generated outputs while strengthening analytical thinking, collaborative problem-solving, and evidence-based decision-making.', 'Project CHRONOS: The AI Glitch is an interactive AI systems simulation that introduces participants to Prompt Engineering, Agentic AI, and Responsible AI through a scenario-based investigation. Participants analyze timeline anomalies, interpret system logs, interact with an AI assistant, and make evidence-based decisions to identify the source of a simulated AI system failure. The event provides a practical learning experience focused on AI-assisted reasoning, critical thinking, and human-AI collaboration.', '5th Floor AIML Dept DSAL-MDL Lab'),
(5, 'Symbiosis Quantum Club', 'Quantainment', 'By the end of this activity, participants will be able to:

- Explain foundational quantum phenomena — superposition, entanglement, and wave-particle duality — and how they defy classical either/or logic
- Understand key quantum constraints and effects, including the Heisenberg Uncertainty Principle, quantum tunneling, and decoherence, and the role observation plays in each
- Reason through core quantum thought experiments and theorems — Schrödinger''s Cat, quantum teleportation, and the No-Cloning Theorem — to explain indeterminacy, state transfer, and the limits of copying quantum information
- Grasp the basics of qubits and quantum gate logic as a foundational bridge into quantum computing
- Apply logical deduction and resource-constrained decision-making to solve problems, translating classroom-level quantum theory into hands-on applied reasoning', 'Quantainment is an interactive online experience that lets participants explore ten core concepts of quantum mechanics and computing — from Superposition and Entanglement to Schrödinger''s Cat and Qubits — through a web-based simulation of fractured timelines. Each timeline has gone unstable in a way tied to its core concept, and participants must reason through a concept-driven puzzle to correct it, while managing limited "Quantum Credits" that reinforce strategic decision-making. Designed as a self-paced, browser-based exploration, it turns abstract quantum theory into hands-on, visually interactive problem-solving.', '5th Floor AIML Dept CC Lab'),
(6, 'Rotonity', 'Blueprint Breakout', 'Participants will strengthen their understanding of CAD and mechanical engineering fundamentals while improving analytical thinking, problem-solving, and time management skills. The challenge encourages participants to apply engineering concepts, interpret design-related problems, and develop confidence in tackling technical assessments similar to those encountered in academics and industry.   Participants will gain an understanding of the complete UAV design workflow using Computer-Aided Design (CAD), including requirement analysis, conceptual design, component modelling, assembly creation, and design optimization. The workshop aims to develop engineering design thinking, introduce industry-standard CAD practices, and provide insight into transforming an idea into a manufacturable digital product.', 'Blueprint Breakout is an interactive CAD and Mechanical Engineering challenge conducted through the FixtureLabs.io platform. Participants will receive one randomly assigned technical question from a curated question bank and must solve it within a specified time limit. Performance will be evaluated based on accuracy, the number of mistakes, and completion time. The event is designed to promote technical aptitude, engineering reasoning, and healthy competition in a digitally managed environment. The UAV CAD Design Workshop is a one-hour technical session that introduces participants to the end-to-end process of designing an Unmanned Aerial Vehicle using CAD software. The workshop covers the engineering design methodology followed in developing a UAV, from defining design requirements and creating the airframe to modelling individual components, assembling the complete system, and preparing the design for manufacturing. The session is intended to provide participants with a practical understanding of product development and modern engineering design workflows.', 'CAD CAM Lab 1st Floor'),
(7, 'Foss Club Sit', 'Temporal Reconstruction : An AI & Systems Expedition', '1. Develop practical AI literacy through hands-on interaction with locally deployed AI models.
2. Strengthen Linux and systems programming fundamentals through practical challenges.
3. Explore open-source AI tools, self-hosted models, and local inference.
4. Enhance cross-domain problem-solving across systems, cybersecurity, and AI.
5. Apply core computer science concepts to practical real-world scenarios.
6. Encourage participation in the open-source AI and systems ecosystem.', 'Temporal Reconstruction: AI Across Time is inspired by the evolution of computing across different technological eras. Participants journey through interconnected challenges representing milestones in computing—from foundational systems and operating environments to modern artificial intelligence—solving problems that reflect how technology has evolved while reconstructing a fragmented technological timeline.', 'Open Source Tools Lab'),
(8, 'Antariksh Space and Astronomy Club', 'Cosmic continuum', '1. Experience engineering concepts in an interactive way, including digital logic, dependency ordering, encoding, and system thinking.
2. Understand cause-and-effect relationships by observing how actions in one timeline influence another in real time.
3. Team collaboration and solving Physics problems that would require teams to rethink their approach
4. Strengthen teamwork and communication through continuous coordination with a remote team under time pressure.
5. Develop logical and computational thinking by solving puzzles based on logic gates, sequencing, and pattern recognition.
6. Build resilience and adaptability by responding to changing scenarios, unexpected twists, and evolving game conditions. 
7. Analyzing short code snippets and developing logic to decipher encrypted data
8. Retrieving hidden information through AI prompts and correct sequence of actions', 'The Cosmic Contiuum is a fast-paced, cooperative time-travel challenge where two teams are trapped in different timelines, the Past (2026) and the Future (2226). Armed with a  walkie-talkie, they must communicate, solve interconnected puzzles, and uncover the truth behind CHRONOS, an advanced AI that has fractured time itself. Every action taken by the Past immediately alters the Future, while clues discovered in the Future help rewrite history. Participants will tackle engineering-inspired challenges involving logic gates, chronology, Morse code, UV clues, and critical decision-making under pressure. Only by combining their knowledge, synchronizing their actions, and restoring the Chronos Crystal can both teams merge the timelines and return safely to the Present before time runs out.', 'Ground floor: Fluid Dynamics Lab and Strength of Materials Lab (Both labs are opposite)'),
(9, 'Electronics Design Club (EDC)', 'Blackout Protocol', '1. Technical Learning Concepts & Outcomes

• Electronic Component Identification
Concept: Identification of essential electronic components.
Outcome: Participants develop familiarity with common electronic components and their applications in basic circuits.

• Circuit Assembly & Prototyping
Concept: Construction of functional electronic circuits using breadboards and discrete components.
Outcome: Learners gain hands-on experience in circuit assembly, component placement, polarity, and electrical connectivity.

• Circuit Testing & Troubleshooting
Concept: Detection and correction of circuit faults under constrained conditions.
Outcome: Participants strengthen analytical thinking by diagnosing errors and applying logical troubleshooting techniques.

• Signal-Based Navigation
Concept: Interpreting auditory signals to locate components, reflecting signal-based communication in electronic systems.
Outcome: Learners understand how signals convey information and support decision-making in engineering applications.

2. Cognitive & Experiential Concepts & Outcomes

• Strategic Planning & Resource Management
Concept: Optimizing resources during the bidding phase by selecting tools, clues, or advantages.
Outcome: Participants develop strategic thinking, prioritization, and effective decision-making in a competitive environment.

• Sensory-Based Problem Solving
Concept: Solving engineering tasks using touch, sound, and logical reasoning instead of vision.
Outcome: Learners improve adaptability, concentration, and problem-solving through effective use of multiple sensory inputs.

• Collaborative Engineering Practice
Concept: Coordinating team efforts during component identification, circuit assembly, navigation, and troubleshooting.
Outcome: Participants strengthen teamwork, communication, and task coordination skills essential for engineering projects.', 'A catastrophic blackout has disrupted the timeline, threatening the evolution of engineering itself. Teams must recover the missing electronic components hidden across different eras to restore the flow of time.

The event begins with a strategic bidding round where teams use their allotted points to purchase clues, tools, and special advantages for the mission ahead. Every decision matters, rewarding careful planning as much as technical skill.

Once the bidding ends, teams enter a completely dark arena where they must rely only on touch, sound, communication, and teamwork. The arena is divided into three stations representing the Ancient, Industrial, and Digital eras. At each station, participants identify and collect the correct electronic components hidden in the darkness while racing against the ticking clock.

The components collected throughout the journey are then used to build a functional electronic circuit. A successful build illuminates a clock inspired output, symbolizing the restoration of the timeline and the evolution of engineering through time.

Success depends on smart strategy, technical knowledge, effective teamwork, and the ability to think quickly under pressure.', 'TINKER LAB (GROUND FLOOR) and ------- ground floor lab'),
(10, 'MESA', 'MESA Event', '3. Enhance problem-solving and decision-making by analyzing incomplete information and making informed choices collaboratively.', 'An interactive, hands-on session designed to teach core mechanical engineering concepts through active participation rather than lectures. The event will feature build-and-test challenges, live demonstrations, and hands-on stations that allow participants to explore engineering principles by doing. It aims to make technical concepts accessible and engaging for attendees across a range of experience levels, encouraging experimentation and practical understanding.', 'C108 and C109 (1st floor)'),
(11, 'Google Developer Students Club (GDSC)', NULL, '1. Distributed systems failure modes: traffic spikes, resource exhaustion, cascading failures
2. Reliability mechanisms: autoscaling, caching, circuit breakers, load shedding, failover
3. Observability: reading RPS, latency, error rate to diagnose issues live
4. Incident response under pressure and time constraints
5. Why systems evolved from manual ops to automated tooling
6. Team coordination through subsystem ownership
7. Adversarial/strategic thinking under competition', 'Two teams, each running a real, live web service. A chaos engine throws escalating failures at both — traffic spikes, resource failures, network breakdowns — and each team fights back with a live control panel: scale up, enable caching, reroute traffic, failover to backup. Every move shows up instantly on a big screen as two competing dashboards — RPS, latency, error rate, health score — climbing and crashing in real time, Grafana-style. Green rising, red falling, alarms when something breaks. Fix your system first, and you earn the power to break theirs — a direct fight, not two teams patching in isolation. Three rounds trace the evolution of keeping systems alive: manual toggles only, then real production tooling, then finals where everything fails at once. Teams scale from solo to full ops rooms split by subsystem.', 'CL - 03 and CL - 04 (4th floor)'),
(12, 'Symbiosis Economics Club (SEC)', 'Corporate Apocalypse 2040', '1.Develop strategic decision-making under uncertainty.
2.Introduce participants to real-world corporate governance.
3.Promote financial and economic literacy through experiential learning.
3.Encourage teamwork, negotiation, and leadership.
5.Demonstrate the interconnectedness of finance, economics, marketing, operations, and technology.
6.Provide an engaging alternative to traditional business quizzes and case competitions.', 'Set in the year 2040, the simulation explores a future shaped by geopolitical instability, climate crises,
technological monopolies, and the rise of corporate states. Nations no longer govern people—global
corporations do.
Participants must lead their companies through a full financial year while balancing profitability, innovation,
employee welfare, investor expectations, and corporate reputation. Every strategic decision directly impacts
the company''s financial health and long-term survival.
Unlike traditional management games, Corporate Apocalypse 2040 combines economics, finance,
management, negotiation, and crisis response into a dynamic real-time experience powered by a custom-
built web platform.', 'Computer Lab 5th Floor'),
(13, 'AR/VR GAMEDEV CLUB', 'Operation: TIime Fracture', 'Participants will gain practical exposure to:

1. Industry-standard game development software, including Unity and Blender, through interactive, beginner-friendly challenges.
2. Core principles of 3D design and interactive environments, including scene composition, object manipulation, and basic gameplay mechanics.
3. Creative problem-solving and spatial reasoning through immersive, mission-based activities inspired by real game development workflows.
4. Collaborative communication and teamwork by planning, coordinating, and completing challenges under time constraints.
5. Critical thinking, adaptability, and decision-making while experiencing how creativity and technology come together to build interactive digital experiences.', 'A story driven team challenge where two teams compete simultaneously to restore a fractured timeline. Participants race through a series of interactive stations featuring challenges inspired by game development and 3D design, including game world exploration, environment reconstruction, timeline anomaly detection, and more. Success depends on communication, observation, logic, and teamwork as teams progress through each mission. Each completed mission rewards a Time Fragment that contributes to the final objective. The team that restores the timeline and completes the mission in the shortest time wins.', 'CL 406 (lab)'),
(14, 'V@rSITy Care', 'Carbon Quest', '1. Master Temporal Carbon Accounting: Calculate and manage live emission metrics to see how engineering choices across different eras alter the global environment.
   2. Trace Sustainable Tech Evolution: Analyze how engineering shifted from high-emission industrial machinery to modern, low-carbon AI and renewable innovations.
   3. Evaluate Generational Life-Cycles: Understand how past manufacturing, transport, and waste management choices created our present-day climate crises.
   4. Apply Time-Critical Optimization: Solve era-specific resource, water, and energy puzzles under strict, ticking time constraints.
   5. Develop Eco-Critical Thinking: Learn to spot how greenwashing tactics and unsustainable engineering designs have evolved over generations.
   6. Enhance High-Pressure Teamwork: Foster rapid task delegation and collaborative problem-solving in a fast-paced race to restore the planetary timeline.', 'Carbon Quest is an interactive escape-room-style sustainability challenge aligned with ChronoNexia – Engineering Across Time. The event showcases how engineering and technological innovations have evolved to tackle environmental challenges across generations. Teams begin with a fixed Carbon Score and progress through a series of engaging stations featuring tasks such as waste segregation, sustainable shopping, transportation planning, renewable energy, and resource management. Each decision influences their Carbon Score, reflecting the environmental impact of their choices. By combining teamwork, critical thinking, and awareness of sustainable engineering practices, participants aim to reduce their Carbon Score below the target, demonstrating how innovation and responsible decision-making can shape a greener future.', '1st Floor classroom 108 and 109'),
(15, 'Civil Engineering Society of Symbiosis [CESS]', 'Echoes of Engineering: The Lost Civilizations challenge', '- Understand the structural systems and construction techniques used in different historical civilizations.
- Apply fundamental concepts of structural stability, load transfer, and force distribution during model construction.
- Analyse how material selection and geometry influence the strength and performance of civil structures.
- Evaluate engineering designs and improve them to satisfy changing functional and structural requirements.
- Interpret historical engineering solutions and relate them to modern civil engineering practices.
- Develop practical experience in conceptual design, model prototyping, and structural optimisation under design constraints.', 'Echoes of Engineering takes participants on a journey through the history of civil engineering by challenging them to recreate some of the world''s most remarkable engineering achievements. Each team will be assigned a historical civilization and a corresponding structure, such as a Roman aqueduct, an Egyptian pyramid, an Indus Valley drainage system, a stepwell, or an ancient stone bridge. Using the materials provided, teams must design and build a scale model within the allotted time while considering the engineering principles that made these structures successful.

Just when the model is complete, the challenge evolves. Teams will be presented with a practical engineering problem such as increased loading, changing site conditions, or a new functional requirement. They must analyse their existing design and modify it to meet the new challenge without losing its structural integrity or historical essence. The final models will be evaluated on engineering logic, stability, functionality, historical relevance, and the effectiveness of the proposed modifications.

This event highlights how engineering ideas have evolved through time while demonstrating that the fundamental principles behind good civil engineering remain relevant across generations.', 'Construction Technology Lab');

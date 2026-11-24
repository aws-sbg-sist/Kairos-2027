export type ProblemStatement = {
  id: string;
  trackId: string;
  title: string;
  category: 'Software' | 'Hybrid (Hardware + Software)';
  domain: string;
  description: string;
  challenge: string;
  expected: string[];
  users: string;
};

export const PROBLEM_STATEMENTS: ProblemStatement[] = [
  {
    id: 'PS01', trackId: 'agentic-ai', title: 'Autonomous Multi-Agent Research and Intelligence Assistant', category: 'Software', domain: 'Agentic AI, Multi-Agent Systems, Generative AI',
    description: 'Research requires navigating multiple sources, extracting and validating information, and preparing structured reports. Existing assistants often struggle with complex research and source verification.',
    challenge: 'Build an autonomous research assistant that investigates a topic, gathers information from multiple sources, verifies findings, and produces an evidence-backed report.',
    expected: ['Accept research topics or complex queries', 'Break work into smaller tasks', 'Use specialized agents for research, analysis, and verification', 'Retrieve information from multiple sources', 'Identify conflicting or unreliable information', 'Generate structured reports with source references'],
    users: 'Researchers, students, business analysts, and academic institutions',
  },
  {
    id: 'PS02', trackId: 'agentic-ai', title: 'Autonomous AI-Powered Workflow Automation System', category: 'Software', domain: 'Agentic AI, Process Automation, Generative AI',
    description: 'Organizations repeat workflows involving email, documents, task allocation, approvals, and data extraction. Rule-based automation struggles with unstructured information.',
    challenge: 'Develop a system that understands natural-language instructions, plans multi-step workflows, and executes approved operations across applications or simulated enterprise environments.',
    expected: ['Accept natural-language workflow instructions', 'Convert instructions into executable tasks', 'Assign tasks to specialized agents', 'Process documents and structured information', 'Maintain workflow state and execution history', 'Require human approval for sensitive operations', 'Provide logs and error recovery'],
    users: 'SMEs, administrative teams, process managers, and enterprise employees',
  },
  {
    id: 'PS03', trackId: 'agentic-ai', title: 'Multimodal AI Assistant for Contextual Problem Detection', category: 'Software', domain: 'Multimodal AI, Computer Vision, Generative AI',
    description: 'Real-world problems are often better explained with images, video, voice, and documents than text alone. Many assistants cannot interpret these formats together.',
    challenge: 'Build an assistant that combines image, text, and audio inputs to identify real-world problems and offer context-aware recommendations.',
    expected: ['Accept image, text, and voice inputs', 'Extract information from different modalities', 'Identify relevant objects, conditions, or problems', 'Combine information across inputs', 'Generate contextual explanations and recommendations', 'Support follow-up questions', 'Display confidence indicators and limitations'],
    users: 'Consumers, technical support teams, educational institutions, and field service professionals',
  },
  {
    id: 'PS04', trackId: 'cloud-native', title: 'Intelligent Cloud Resource Monitoring and Optimization Platform', category: 'Software', domain: 'Cloud Computing, AI/ML, Resource Optimization',
    description: 'Inefficient cloud allocation raises costs: some applications consume excessive resources while others remain underused.',
    challenge: 'Develop a monitoring platform that analyzes infrastructure use, detects inefficiencies, and recommends better resource allocation.',
    expected: ['Monitor CPU, memory, storage, and network utilization', 'Visualize infrastructure performance', 'Identify overprovisioned and underused resources', 'Predict potential bottlenecks', 'Recommend allocation improvements', 'Alert on abnormal utilization', 'Demonstrate with simulated or actual metrics'],
    users: 'Cloud administrators, DevOps engineers, startups, and enterprise infrastructure teams',
  },
  {
    id: 'PS05', trackId: 'cloud-native', title: 'Scalable Distributed Real-Time Event Processing System', category: 'Software', domain: 'Distributed Systems, Event Streaming, High-Throughput Computing',
    description: 'Applications generate large streams of events from users, sensors, transactions, and devices. Processing them reliably with low latency is difficult.',
    challenge: 'Design a distributed platform that ingests, processes, and analyzes high volumes of real-time data while maintaining scalability and reliability.',
    expected: ['Ingest events from multiple sources', 'Process events in real time', 'Filter and aggregate events', 'Distribute workloads across workers', 'Handle duplicates and processing failures', 'Display throughput and latency', 'Demonstrate performance under simulated high loads'],
    users: 'FinTech companies, e-commerce platforms, IoT providers, and data engineering teams',
  },
  {
    id: 'PS06', trackId: 'cloud-native', title: 'Self-Healing and Fault-Tolerant Cloud-Native Application Platform', category: 'Software', domain: 'Cloud-Native Computing, DevOps, Distributed Systems',
    description: 'Failure in one cloud service or container can affect the whole application. Manual detection and recovery increase downtime.',
    challenge: 'Build a monitoring and recovery system that detects failures, identifies unhealthy services, and performs predefined recovery actions.',
    expected: ['Monitor the health of multiple services', 'Detect failures and abnormal behavior', 'Identify unhealthy containers or instances', 'Trigger automated recovery actions', 'Support redundancy and service restart', 'Provide centralized monitoring and failure logs', 'Demonstrate controlled failure injection and recovery'],
    users: 'DevOps engineers, cloud teams, software companies, and platform engineers',
  },
  {
    id: 'PS07', trackId: 'edge-iot', title: 'Smart Energy Monitoring and Consumption Optimization System', category: 'Hybrid (Hardware + Software)', domain: 'IoT, Energy Management, Sustainability',
    description: 'Homes, campuses, and businesses consume significant electricity without clear equipment-level insight into usage and waste.',
    challenge: 'Develop an energy monitoring system that tracks consumption, detects abnormal usage, and recommends practical ways to reduce waste.',
    expected: ['Monitor electricity using sensors or simulated readings', 'Show real-time and historical usage', 'Identify abnormal consumption', 'Estimate electricity expenses', 'Recommend energy savings', 'Alert on unusual consumption', 'Support multiple appliances or monitoring points'],
    users: 'Households, educational institutions, commercial establishments, and facility managers',
  },
  {
    id: 'PS08', trackId: 'edge-iot', title: 'Autonomous Environmental Monitoring and Early Warning Network', category: 'Hybrid (Hardware + Software)', domain: 'Edge IoT, Environmental Sustainability, Smart Monitoring',
    description: 'Air quality, temperature, humidity, and harmful gases can change rapidly. Conventional monitoring may lack local and timely information.',
    challenge: 'Design a local environmental monitoring network that collects data, detects abnormal conditions, and sends early warnings using edge processing.',
    expected: ['Collect at least two environmental parameters', 'Process readings locally or on a connected platform', 'Detect abnormal conditions', 'Generate threshold-based alerts', 'Show current readings and historical trends', 'Support multiple locations', 'Continue basic monitoring during internet interruptions'],
    users: 'Communities, educational institutions, environmental organizations, and municipal authorities',
  },
  {
    id: 'PS09', trackId: 'edge-iot', title: 'Intelligent Renewable Energy Generation and Storage Optimization', category: 'Hybrid (Hardware + Software)', domain: 'Green Energy, IoT, Energy Storage, Predictive Analytics',
    description: 'Solar and wind generation vary over time. Managing generation, battery storage, and demand is essential to increase renewable energy use.',
    challenge: 'Build a platform that monitors generation and battery levels and optimizes distribution using predicted demand and available supply.',
    expected: ['Monitor renewable generation', 'Track battery charge and discharge', 'Monitor consumption', 'Estimate future energy availability', 'Recommend charging and discharging schedules', 'Identify shortages and excess generation', 'Provide an energy dashboard'],
    users: 'Solar-powered households, institutions, renewable operators, and microgrid administrators',
  },
  {
    id: 'PS10', trackId: 'fintech-trust', title: 'AI-Powered Financial Transaction Fraud Detection System', category: 'Software', domain: 'FinTech, AI/ML, Cybersecurity',
    description: 'Digital transactions create opportunities for suspicious transfers and account misuse. Fixed rules may miss evolving fraud patterns.',
    challenge: 'Develop a system that analyzes transaction patterns, flags suspicious activity, and assigns explainable fraud risk scores.',
    expected: ['Process transaction data', 'Identify unusual patterns', 'Assign transaction risk scores', 'Detect suspicious sequences', 'Generate fraud alerts', 'Show transaction history and risk analytics', 'Explain contributing risk factors'],
    users: 'Banks, financial institutions, payment providers, and FinTech startups',
  },
  {
    id: 'PS11', trackId: 'fintech-trust', title: 'Secure Digital Identity and Privacy-Preserving Document Verification', category: 'Software', domain: 'Cryptographic Security, Digital Identity, Privacy Engineering',
    description: 'Identity verification often requires complete documents, exposing more personal information than necessary.',
    challenge: 'Build a secure verification system that checks document authenticity while minimizing exposure of sensitive information.',
    expected: ['Register and verify digital documents', 'Detect modification or tampering', 'Use cryptographic hashing or signatures', 'Verify without unnecessary personal data exposure', 'Maintain verification records', 'Control access securely', 'Demonstrate authentic versus modified documents'],
    users: 'Educational institutions, financial providers, government platforms, and digital services',
  },
  {
    id: 'PS12', trackId: 'fintech-trust', title: 'Cryptographically Verifiable Digital Certificate Management System', category: 'Software', domain: 'Blockchain, Cryptography, Digital Trust',
    description: 'Traditional academic and professional certificate checks can be slow and vulnerable to forged or altered documents.',
    challenge: 'Develop a platform for authorized organizations to issue and verify certificates using cryptographic authenticity checks.',
    expected: ['Let authorized organizations issue certificates', 'Generate unique cryptographic identifiers', 'Verify via QR codes or unique IDs', 'Detect modified or forged certificates', 'Maintain issuance and verification history', 'Secure issuer access', 'Verify without manual institutional communication'],
    users: 'Universities, colleges, employers, recruiters, and certification authorities',
  },
  {
    id: 'PS13', trackId: 'open-enterprise', title: 'Smart Campus Resource Allocation and Infrastructure Management', category: 'Software', domain: 'Enterprise Software, Smart Campus, Resource Optimization',
    description: 'Manual allocation of classrooms, labs, halls, equipment, and shared facilities causes conflicts and inefficient use.',
    challenge: 'Build a campus resource platform that shows availability, improves allocation, and simplifies infrastructure management.',
    expected: ['Maintain a central resource inventory', 'Display availability', 'Support booking and allocation', 'Identify scheduling conflicts', 'Track equipment usage and maintenance', 'Generate utilization reports', 'Provide role-based access'],
    users: 'College administrators, faculty, lab coordinators, students, and facility managers',
  },
  {
    id: 'PS14', trackId: 'open-enterprise', title: 'AI-Powered Student Skill Mapping and Career Opportunity Recommendation', category: 'Software', domain: 'AI/ML, EdTech, Career Intelligence',
    description: 'Students often lack personalized insight into skill gaps, industry expectations, and relevant projects or internships.',
    challenge: 'Develop a career platform that analyzes skills, identifies gaps, and recommends learning paths, projects, and opportunities.',
    expected: ['Create student skill profiles', 'Analyze resumes, projects, and competencies', 'Identify gaps against chosen roles', 'Recommend learning resources', 'Suggest projects and internships', 'Track development over time', 'Provide personalized career-readiness insights'],
    users: 'Students, placement departments, faculty mentors, and recruiters',
  },
  {
    id: 'PS15', trackId: 'open-enterprise', title: 'Smart Campus Issue Reporting and Resolution Management Platform', category: 'Software', domain: 'Enterprise Automation, Smart Campus, Service Management',
    description: 'Informal reporting of infrastructure, electrical, sanitation, internet, and classroom issues can delay responses and leave complaints unresolved.',
    challenge: 'Build a campus issue platform that accepts reports, categorizes them, assigns departments, and tracks resolution.',
    expected: ['Accept descriptions and photographs', 'Categorize complaints', 'Assign responsible departments', 'Track status and timelines', 'Prioritize issues', 'Provide notifications and updates', 'Analyze recurring problems and department performance'],
    users: 'Students, faculty, administrators, maintenance teams, and campus management',
  },
];

export const EVALUATION_CRITERIA = [
  { label: 'Problem Understanding', points: 15 },
  { label: 'Solution / Impact', points: 20 },
  { label: 'Working Prototype', points: 25 },
  { label: 'Innovation', points: 15 },
  { label: 'Technical Implementation', points: 15 },
  { label: 'Presentation & Demo', points: 10 },
];

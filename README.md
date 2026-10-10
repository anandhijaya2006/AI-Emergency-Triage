# AI Emergency Triage Assistant

An Intelligent Web-Based Emergency Triage and First-Aid Guidance System

## 1. About the Project

The **AI Emergency Triage Assistant** is a web-based application developed to organize emergency triage information, assess symptom-related risk levels using the application's implemented logic, and provide basic first-aid guidance. The system is designed with a user-friendly interface that helps users enter symptom details, view triage results, manage patient records, and review previous triage activities.

In emergency situations, understanding the urgency of a person's symptoms and organizing relevant information can be challenging. This project aims to simplify that process by providing a centralized platform for recording symptoms, displaying risk categories, and accessing basic first-aid information.

The application allows users to submit details such as age, symptoms, symptom severity, and duration. Based on the implemented assessment logic, the system displays a risk category and relevant guidance. It also includes a dashboard, patient management, triage history, analytics, a voice assistant, and multilingual first-aid guidance in English and Tamil.

The project uses **React.js** for the frontend, **Python Flask** for the backend, and **SQLite** for data storage. These technologies work together to provide an interactive web application with organized data management and a responsive user interface.

This project is intended for educational and demonstration purposes. It does not replace qualified medical professionals, clinical assessment, or emergency services.

## 2. Problem Statement

During emergency situations, people may find it difficult to organize symptom information, understand the urgency of a situation, and identify appropriate first-aid resources. Maintaining patient information and reviewing previous triage records can also become difficult when information is scattered across different places.

A centralized web-based system can help organize the information and make basic guidance easier to access.

The AI Emergency Triage Assistant addresses this problem by providing a single platform for entering symptom details, viewing application-generated risk categories, managing records, reviewing triage history, and accessing basic first-aid guidance.

## 3. Objectives

The main objectives of this project are:

- To develop a user-friendly emergency triage web application.
- To collect and organize basic symptom-related information.
- To display risk categories using the application's implemented assessment logic.
- To provide relevant guidance alongside triage results.
- To manage patient information through a centralized interface.
- To maintain and review previous triage records.
- To display analytics based on available triage data.
- To provide a voice assistant for easier interaction.
- To offer basic first-aid guidance in English and Tamil.
- To demonstrate frontend and backend integration in a practical software project.

## 4. Existing System

In a basic manual workflow, symptom information may be collected through conversations, written notes, or separate records. Users may also need to search independently for first-aid information or review previously recorded details.

These approaches can make information organization and record retrieval less convenient.

### Limitations of the Existing Approach

- Symptom information may be recorded in different places.
- Reviewing previous records may require additional effort.
- Basic guidance may not be available in one centralized interface.
- Monitoring recorded triage activity may be difficult without summary statistics.
- Users may need to navigate multiple resources to find relevant information.

These limitations describe the general problem this project aims to address; actual workflows vary between healthcare settings.

## 5. Proposed System

The proposed system is a centralized web application that combines triage information entry, application-generated risk categories, patient record management, history, analytics, voice interaction, and first-aid guidance.

Users can enter the requested symptom details through the New Triage page. The frontend sends the information to the Flask backend, which processes the request using the application's implemented logic and returns a result for display.

The application also provides dedicated pages for patient information, triage history, analytics, and first-aid guidance. This structure helps organize the available functions into a single interface.

### Advantages of the Proposed System

- Centralized organization of triage-related information.
- Simple and structured symptom entry.
- Clear presentation of application-generated triage results.
- Easier access to previously recorded information.
- Dashboard summaries and analytics.
- First-aid guidance in two languages.
- A voice assistant feature for interaction.
- Separation of frontend, backend, and database responsibilities.

## 6. Key Features

### 6.1 Dashboard

The dashboard provides an overview of the application's triage activity. It displays summary metrics and navigation options for accessing the main modules.

**Main functions:**
- View key application statistics.
- Navigate between application pages.
- Access triage-related information from a central interface.

### 6.2 New Triage

The New Triage module allows users to submit basic information about a person's symptoms.

**Input details include:**
- Age.
- Symptoms.
- Symptom severity.
- Symptom duration.

After submission, the frontend sends the information to the backend for processing. The application displays the resulting risk category and associated guidance.

The output depends on the application's implemented assessment logic and should not be interpreted as a medically validated diagnosis.

### 6.3 Patient Management

The Patients module provides an interface for organizing and viewing available patient-related records.

It helps keep relevant information accessible within the application instead of requiring users to navigate between separate pages or files.

The available operations depend on the functions implemented in the project.

### 6.4 Triage History

The History module allows users to review previously recorded triage submissions and their results.

**Benefits:**
- Access earlier triage records.
- Review recorded assessment results.
- Keep triage activity organized for reference.

The records shown depend on the information stored by the application.

### 6.5 Analytics

The Analytics module presents summaries and statistics derived from the available triage records.

It provides a convenient way to review recorded application activity and understand the distribution of available results.

The analytics represent application data, not independently validated medical conclusions.

### 6.6 Voice Assistant

The Voice Assistant module provides a voice-oriented interaction feature.

It is intended to make interaction with the application more convenient. Its available capabilities depend on the implementation and browser support.

### 6.7 First-Aid Guidance

The First-Aid Guidance module provides basic educational information for selected first-aid topics.

**Topics include:**
- Bleeding.
- Burns.
- Choking.
- Fainting.

The module supports English and Tamil and allows users to show or hide guidance details.

The information is intended for general educational use. In serious or life-threatening situations, contact local emergency services and follow instructions from qualified emergency responders.

## 7. Technology Stack

### Frontend Technologies

**React.js:** Used to build the interactive user interface and reusable components.

**Vite:** Provides the frontend development server and build tooling.

**JavaScript:** Implements application interactions and frontend logic.

**HTML5:** Provides the structure of the web interface.

**CSS3:** Styles the dashboard, pages, forms, navigation, and other interface components.

### Backend Technologies

**Python:** Implements backend application logic.

**Flask:** Provides the web server and API endpoints used by the frontend.

**Flask-CORS:** Supports cross-origin requests between the frontend development server and backend when configured appropriately.

### Database

**SQLite:** Provides local database storage for supported application records.

### Development Tools

- Visual Studio Code.
- Git.
- GitHub.
- Node.js.
- npm.
- Python.

## 8. System Architecture

The application follows a frontend-backend-database architecture.

### Frontend Layer

The React frontend provides the dashboard, forms, navigation, patient pages, history, analytics, voice assistant, and first-aid interface.

### Backend Layer

The Flask backend receives supported requests from the frontend, processes submitted information, interacts with the database when required, and returns responses.

### Database Layer

SQLite stores the records defined by the application's database implementation.

### Overall Workflow

1. The user opens the web application.
2. The React frontend displays the relevant page.
3. The user enters information or selects a feature.
4. The frontend sends a request to the Flask backend when required.
5. The backend processes the request using the application's logic.
6. The backend accesses the database when the operation requires it.
7. The backend returns the response to the frontend.
8. The frontend displays the result to the user.
9. Stored records can be reviewed through the relevant pages.

## 9. Application Workflow

### Step 1: Open the Application

Start the frontend and backend services and open the frontend URL in a browser.

### Step 2: View the Dashboard

Review the summary metrics and navigate to the required module.

### Step 3: Enter Triage Information

Open New Triage and provide the requested age, symptoms, severity, and duration details.

### Step 4: Submit the Information

Submit the form so the frontend can send the data to the backend.

### Step 5: View the Result

Review the risk category and guidance returned by the application.

### Step 6: Review Records

Use the Patients and History pages to view available patient information and previously recorded triage submissions.

### Step 7: Explore Additional Features

Open Analytics to review available summaries, use the Voice Assistant, or access First-Aid Guidance in English or Tamil.

## 10. Project Structure

The following is an illustrative structure. Actual filenames may differ depending on the current project implementation.

```text
AI-Emergency-Triage/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── App.css
│   ├── package.json
│   └── index.html
│
├── backend/
│   ├── app.py
│   ├── database.py
│   └── requirements.txt
│
├── .gitignore
└── README.md
```

## 11. Installation and Setup

### Prerequisites

Install the following software:

- Python 3.
- Node.js and npm.
- Git.
- A code editor such as Visual Studio Code.

### Step 1: Clone the Repository

Open a terminal and run:

```bash
git clone https://github.com/anandhijaya2006/AI-Emergency-Triage.git
cd AI-Emergency-Triage
```

### Step 2: Set Up the Backend

Navigate to the backend directory:

```bash
cd backend
```

Create a Python virtual environment:

```bash
python -m venv venv
```

Activate it in Windows PowerShell:

```powershell
.\venv\Scripts\Activate.ps1
```

If a `requirements.txt` file exists, install its listed dependencies:

```bash
pip install -r requirements.txt
```

If the file is missing, install the packages required by the actual backend code.

### Step 3: Start the Backend

From the backend directory, run:

```bash
python app.py
```

If configured with the default Flask development port, the backend will be available at:

`http://127.0.0.1:5000`

### Step 4: Set Up the Frontend

Open a second terminal from the project root and run:

```bash
cd frontend
npm install
```

### Step 5: Start the Frontend

Run:

```bash
npm run dev
```

Open the URL displayed in the terminal. The default Vite development URL is commonly:

`http://localhost:5173`

Keep both services running while using the application.

## 12. API and Backend Integration

The frontend communicates with the Flask backend through HTTP requests.

The project includes a triage endpoint used to submit assessment information. The previously configured endpoint is:

`POST /api/triage`

The frontend sends the supported symptom details to the backend, which processes the request and returns the result.

Other backend routes may support analytics and history, depending on the current implementation.

For the complete and accurate list of routes, refer to the backend source code in `backend/app.py`.

## 13. Testing and Validation

The application can be checked through the following manual tests:

- Verify that the dashboard loads.
- Submit valid triage information and check that a result is displayed.
- Test missing or invalid input and verify the application's response.
- Confirm that patient information appears as expected.
- Check whether submitted triage records appear in History.
- Confirm that Analytics reflects the available records.
- Test the Voice Assistant in a supported browser.
- Switch between English and Tamil in First-Aid Guidance.
- Verify that the frontend can communicate with the backend.
- Confirm that errors are displayed appropriately when the backend is unavailable.

These are suggested test cases; results should be documented after actually running each test.

## 14. Benefits of the Project

- Combines multiple triage-related features in one application.
- Provides a structured interface for entering symptom information.
- Organizes available patient and triage records.
- Makes previous submissions easier to review.
- Presents summaries of recorded activity.
- Offers first-aid educational information in English and Tamil.
- Demonstrates practical integration of React, Flask, and SQLite.
- Provides experience in frontend development, backend APIs, and database integration.

## 15. Limitations

- The displayed risk categories depend on the application's implemented logic.
- The assessment logic has not been established as clinically validated.
- Results may be incomplete or inaccurate and must not determine whether someone seeks emergency care.
- Voice features may depend on browser and device capabilities.
- Database and record-management capabilities depend on the implemented backend.
- The application is not a substitute for professional clinical assessment.

## 16. Future Enhancements

Possible future improvements include:

- Improve input validation and error handling.
- Add secure authentication and role-based access.
- Strengthen data privacy and access controls.
- Improve dashboard reporting and analytics.
- Expand language support.
- Add automated unit and integration tests.
- Improve accessibility and mobile responsiveness.
- Review and validate triage rules with qualified healthcare professionals.
- Review first-aid content against trusted clinical guidance.
- Deploy the application in a properly secured environment after appropriate testing.

## 17. Safety Disclaimer

This project is developed for educational and demonstration purposes only. It is not a certified medical device and does not provide a clinically validated diagnosis.

Do not use the application to decide whether a person requires emergency care. For a life-threatening situation, contact local emergency services immediately and follow professional medical instructions.

Do not upload real patient records, personal medical information, passwords, or secret keys to a public repository.

## 18. Conclusion

The AI Emergency Triage Assistant demonstrates how a web application can bring together symptom information entry, application-generated risk categories, patient record management, triage history, analytics, voice interaction, and first-aid educational guidance.

By integrating React.js, Flask, and SQLite, the project demonstrates the development of a modular full-stack application. It also provides a foundation for future improvements in usability, security, testing, and clinically reviewed educational content.

## 19. Author

**Anandhi A**

B.Tech – Artificial Intelligence and Data Science

GitHub: https://github.com/anandhijaya2006

## 20. Repository

Source code: https://github.com/anandhijaya2006/AI-Emergency-Triage
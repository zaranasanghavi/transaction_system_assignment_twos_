<h1><b>Backend Transaction & Audit Service</b></h1>

<p>
This project implements a <b>Backend Transaction & Audit Service</b> along with a minimal
<b>Frontend Transfer and History Interface</b>.  
The system simulates a secure digital wallet or banking-style fund transfer system.
</p>

<p>
The primary goal of this assignment is to demonstrate correct handling of
<b>database transactions</b>, <b>audit logging</b>, and <b>real-time frontend updates</b>
while maintaining data consistency and security.
</p>

<br/>

<h2><b>Project Objectives</b></h2>

<ul>
  <li>Ensure atomic fund transfers (all-or-nothing execution)</li>
  <li>Maintain a permanent audit trail of transactions</li>
  <li>Secure APIs using JWT authentication</li>
  <li>Reflect transaction updates instantly on the frontend</li>
  <li>Maintain clean backend–frontend separation</li>
</ul>

<br/>

<h2><b>Technology Stack</b></h2>

<ul>
  <li><b>Backend:</b> Django, Django REST Framework</li>
  <li><b>Database:</b> PostgreSQL</li>
  <li><b>Authentication:</b> JWT (SimpleJWT)</li>
  <li><b>Transaction Handling:</b> Django ORM with transaction.atomic()</li>
  <li><b>Frontend:</b> ReactJS</li>
  <li><b>API Communication:</b> Axios</li>
</ul>

<br/>

<h2><b>Project Structure</b></h2>

<pre>
backend/
│
├── config/
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
│
├── accounts/
│   ├── models.py
│   ├── serializers.py
│   ├── views.py
│   ├── urls.py
│   └── admin.py
│
├── transactions/
│   ├── models.py
│   ├── serializers.py
│   ├── views.py
│   ├── urls.py
│   └── admin.py
│
├── manage.py
└── requirements.txt
</pre>

<br/>

<h2><b>Setup and Run Instructions</b></h2>

<h3><b>Prerequisites</b></h3>

<ul>
  <li>Python 3.10 or higher</li>
  <li>PostgreSQL 14 or higher</li>
  <li>Node.js 18 or higher</li>
  <li>npm</li>
</ul>

<br/>

<h3><b>Backend Setup (Django)</b></h3>

<p><b>Step 1: Clone Repository</b></p>

<pre>
git clone https://github.com/zaranasanghavi/transaction_system_assignment_twos_.git
cd backend
</pre>

<p><b>Step 2: Create and Activate Virtual Environment</b></p>

<pre>
python -m venv venv
venv\Scripts\activate
</pre>

<p><b>Step 3: Install Dependencies</b></p>

<pre>
pip install -r requirements.txt
</pre>

<p><b>Step 4: PostgreSQL Configuration</b></p>

<p>Create a database named <b>transaction_db</b>:</p>

<pre>
CREATE DATABASE transaction_db;
</pre>

<p>Update database credentials in <b>config/settings.py</b>:</p>

<pre>
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'transaction_db',
        'USER': 'postgres',
        'PASSWORD': 'yourpassword',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}
</pre>

<p><b>Step 5: Run Migrations</b></p>

<pre>
python manage.py migrate
</pre>

<p><b>Step 6: Create Superuser</b></p>

<pre>
python manage.py createsuperuser
</pre>

<p><b>Step 7: Start Backend Server</b></p>

<pre>
python manage.py runserver
</pre>

<p>
Backend will run at: <b>http://127.0.0.1:8000</b>
</p>

<br/>

<h3><b>Frontend Setup (React)</b></h3>

<pre>
cd frontend
npm install
npm start
</pre>

<p>
Frontend will run at: <b>http://localhost:3000</b>
</p>

<br/>

<h2><b>Authentication</b></h2>

<p>
The system uses <b>JWT authentication</b> implemented using SimpleJWT.
</p>

<p><b>Token Endpoint</b></p>

<pre>
POST /api/token/
</pre>

<p>
The access token must be sent with each request using the Authorization header:
</p>

<pre>
Authorization: Bearer &lt;access_token&gt;
</pre>

<br/>

<h2><b>API Endpoints</b></h2>

<h3><b>Transfer Funds</b></h3>

<pre>
POST /api/transfer/
</pre>

<p><b>Request Body</b></p>

<pre>
{
  "receiver_id": 2,
  "amount": 100
}
</pre>

<p>
This endpoint performs a fund transfer using a database transaction.
Both wallet updates succeed together or fail together.
</p>

<br/>

<h3><b>Transaction History (Audit Log)</b></h3>

<pre>
GET /api/history/
</pre>

<p>
Returns the authenticated user’s transaction history.
This serves as a permanent audit log.
</p>

<br/>

<h2><b>API Documentation</b></h2>

<p>
This section documents the two core backend APIs used in the system:
<b>/api/transfer/</b> and <b>/api/history/</b>.
These APIs handle fund transfers and transaction history retrieval.
</p>

<br/>

<h2><b>POST /api/transfer/ — Transfer Funds</b></h2>

<p>
This API transfers a specified amount from the authenticated user (sender)
to another user (receiver).
</p>

<p>
The operation is executed inside a <b>database transaction</b> to ensure
<b>atomicity</b>. Either both wallet updates succeed or both fail.
</p>

<br/>

<h3><b>Authentication</b></h3>

<p>
JWT authentication is required.
</p>

<pre>
Authorization: Bearer &lt;access_token&gt;
</pre>

<br/>

<h3><b>Request Body</b></h3>

<table border="1">
<tr>
  <th>Field</th>
  <th>Type</th>
  <th>Description</th>
  <th>Example</th>
</tr>
<tr>
  <td>receiver_id</td>
  <td>Integer</td>
  <td>ID of the user receiving funds</td>
  <td>2</td>
</tr>
<tr>
  <td>amount</td>
  <td>Decimal</td>
  <td>Amount to transfer (12 digits, 2 decimals)</td>
  <td>500.00</td>
</tr>
</table>

<br/>

<h3><b>Example Request</b></h3>

<pre>
{
  "receiver_id": 2,
  "amount": 500.00
}
</pre>

<br/>

<h3><b>Success Response (200 OK)</b></h3>

<pre>
{
  "id": 1,
  "sender": 1,
  "receiver": 2,
  "amount": "500.00",
  "success": true,
  "created_at": "2025-12-22T10:30:00Z"
}
</pre>

<br/>

<h3><b>Error Response (400 Bad Request)</b></h3>

<p>
Occurs when the sender does not have sufficient balance.
</p>

<pre>
{
  "error": "Insufficient balance"
}
</pre>

<br/>

<h3><b>Internal Behavior</b></h3>

<ul>
  <li>Locks sender and receiver wallet rows using <b>select_for_update()</b></li>
  <li>Deducts amount from sender wallet</li>
  <li>Credits amount to receiver wallet</li>
  <li>Creates a record in the Transaction (audit log) table</li>
  <li>Rolls back the entire operation if any step fails</li>
</ul>

<br/>

<h2><b>GET /api/history/ — Transaction History</b></h2>

<p>
This API retrieves the authenticated user’s transaction history.
It acts as a permanent <b>audit log</b>.
</p>

<br/>

<h3><b>Authentication</b></h3>

<p>
JWT authentication is required.
</p>

<pre>
Authorization: Bearer &lt;access_token&gt;
</pre>

<br/>

<h3><b>Request Parameters</b></h3>

<p>
No request parameters are required.
All transactions belonging to the authenticated user are returned.
</p>

<br/>

<h3><b>Example Request</b></h3>

<pre>
GET /api/history/
Authorization: Bearer &lt;access_token&gt;
</pre>

<br/>

<h3><b>Success Response (200 OK)</b></h3>

<pre>
[
  {
    "id": 1,
    "sender": 1,
    "receiver": 2,
    "amount": "500.00",
    "success": true,
    "created_at": "2025-12-22T10:30:00Z"
  },
  {
    "id": 2,
    "sender": 1,
    "receiver": 3,
    "amount": "200.00",
    "success": true,
    "created_at": "2025-12-22T11:00:00Z"
  }
]
</pre>

<br/>

<h3><b>Internal Behavior</b></h3>

<ul>
  <li>Queries the Transaction table using <b>sender = request.user</b></li>
  <li>Returns a JSON array of transaction records</li>
  <li>Each record includes sender, receiver, amount, status, and timestamp</li>
</ul>

<br/>

<h2><b>Frontend Integration Notes</b></h2>

<ul>
  <li>The transfer form sends POST requests to <b>/api/transfer/</b></li>
  <li>On success, the frontend refreshes balance and history</li>
  <li>The history table fetches data from <b>/api/history/</b></li>
  <li>UI updates immediately after successful transactions</li>
</ul>


<h2><b>Database Schema</b></h2>

<h3><b>Wallet Table</b></h3>

<table border="1">
<tr><th>Field</th><th>Type</th><th>Description</th></tr>
<tr><td>id</td><td>Integer</td><td>Primary Key</td></tr>
<tr><td>user_id</td><td>Foreign Key</td><td>Linked User</td></tr>
<tr><td>balance</td><td>Decimal</td><td>Wallet Balance</td></tr>
</table>

<br/>

<h3><b>Transaction Table (Audit Log)</b></h3>

<table border="1">
<tr><th>Field</th><th>Type</th><th>Description</th></tr>
<tr><td>id</td><td>Integer</td><td>Primary Key</td></tr>
<tr><td>sender_id</td><td>Foreign Key</td><td>Sender</td></tr>
<tr><td>receiver_id</td><td>Foreign Key</td><td>Receiver</td></tr>
<tr><td>amount</td><td>Decimal</td><td>Transferred Amount</td></tr>
<tr><td>success</td><td>Boolean</td><td>Status</td></tr>
<tr><td>created_at</td><td>Timestamp</td><td>Transaction Time</td></tr>
</table>

<br/>

<h2><b>Frontend Features</b></h2>

<ul>
  <li>Transfer form for entering receiver ID and amount</li>
  <li>Instant UI updates after successful transfers</li>
  <li>Transaction history displayed in a clear format</li>
</ul>

<br/>

<h2><b>AI Tool Usage Log</b></h2>

<p>
AI tools were used during development to accelerate implementation and improve
code quality. All AI-generated outputs were treated as <b>assistance only</b>.
Every piece of logic was reviewed, customized, and validated manually before
final integration.
</p>

<br/>

<h3><b>Backend Atomic Transaction Logic</b></h3>

<p><b>AI Contribution:</b></p>
<h2><b>AI Tool Usage Log with Efficiency Analysis</b></h2>

<p>
AI tools were used selectively during development to improve productivity and
reduce unnecessary trial-and-error. The AI acted strictly as a <b>supporting
assistant</b>. All architectural decisions, integrations, validations, and
testing were performed manually.
</p>

<br/>

<h3><b>Backend Atomic Transaction Boilerplate</b></h3>

<p><b>AI Role:</b></p>
<p>
The AI suggested standard Django ORM transaction-handling patterns, including
the use of <b>transaction.atomic()</b> for atomic execution and
<b>select_for_update()</b> for row-level locking to prevent concurrency issues
during wallet balance updates.
</p>

<p><b>My Contribution:</b></p>
<p>
I integrated these patterns into the existing Wallet system, implemented balance
validation logic, ensured rollback safety for failure scenarios, and connected
the transfer logic with the Transaction audit logging mechanism. I also verified
that audit records are created only after successful database commits.
</p>

<p><b>Efficiency Gain:</b></p>
<p>
<b>Score 4</b> – The AI guidance saved approximately <b>1.5 hours</b> by avoiding
trial-and-error experimentation with concurrent wallet updates. However, the
logic still required thorough manual testing and validation to ensure correctness.
</p>

<br/>

<h3><b>Serializers and Data Models</b></h3>

<p><b>AI Role:</b></p>
<p>
The AI generated an initial structural outline for
<b>TransferSerializer</b> and <b>TransactionSerializer</b>, including basic
field suggestions and serializer layout.
</p>

<p><b>My Contribution:</b></p>
<p>
I finalized all serializer fields, added appropriate validations, aligned the
serializers with the actual database schema, and enforced business rules based
on assignment requirements. Relationships between users, wallets, and
transactions were designed and verified manually.
</p>

<p><b>Efficiency Gain:</b></p>
<p>
<b>Score 3.5</b> – Initial scaffolding time was reduced, but significant manual
refinement was required to ensure accurate data flow and correct validation
behavior.
</p>

<br/>

<h3><b>Frontend Component Skeleton</b></h3>

<p><b>AI Role:</b></p>
<p>
The AI generated a basic React component skeleton for the transfer form and
transaction history view, providing a starting point for UI structure.
</p>

<p><b>My Contribution:</b></p>
<p>
I implemented API integration using Axios, handled JWT token attachment,
managed component state, enabled real-time UI updates after successful
transactions, and ensured seamless interaction between frontend and backend.
</p>

<p><b>Efficiency Gain:</b></p>
<p>
<b>Score 4</b> – Saved approximately <b>1 hour</b> on component scaffolding.
All core logic, state handling, and UI behavior were implemented manually.
</p>

<br/>

<h3><b>Debugging Assistance</b></h3>

<p><b>AI Role:</b></p>
<p>
The AI provided explanations for Django migration errors, transaction locking
behavior, and React re-rendering issues encountered during development.
</p>

<p><b>My Contribution:</b></p>
<p>
I identified root causes, applied fixes locally, resolved migration conflicts,
tested edge cases, and verified that atomic transactions behave correctly under
both success and failure scenarios.
</p>

<p><b>Efficiency Gain:</b></p>
<p>
<b>Score 4.5</b> – Significantly reduced debugging time by approximately
<b>2 hours</b>, allowing faster issue isolation without random experimentation.
</p>

<br/>

<h3><b>Optimization and Best Practice Suggestions</b></h3>

<p><b>AI Role:</b></p>
<p>
The AI suggested best practices related to JWT authentication handling,
RESTful API structuring, and Axios interceptor usage for cleaner frontend
integration.
</p>

<p><b>My Contribution:</b></p>
<p>
I evaluated each suggestion against project scope and assignment constraints,
selected only relevant practices, and implemented them in a controlled manner
without over-engineering the solution.
</p>

<p><b>Efficiency Gain:</b></p>
<p>
<b>Score 3.5</b> – Helpful for validation and confidence, but still required
manual judgment and implementation.
</p>

<br/>

<h3><b>Overall Assessment</b></h3>

<p>
AI assistance primarily improved development speed and clarity, while all
final logic, integrations, validations, and testing decisions were carried out
manually. The completed system reflects deliberate engineering choices rather
than automated code generation.
</p>

<h2><b>Demo Video</b></h2>

<p>
Add your demo video link here.
</p>

<br/>

<h2><b>GitHub Repository</b></h2>

<p>
https://github.com/zaranasanghavi/transaction_system_assignment_twos_
</p>

<br/>

<h2><b>Assignment Completion Checklist</b></h2>

<ul>
  <li>Atomic fund transfer implemented</li>
  <li>Audit logging implemented</li>
  <li>JWT authentication enabled</li>
  <li>Transaction history API available</li>
  <li>Frontend updates in real time</li>
  <li>AI usage documented</li>
  <li>PostgreSQL integration completed</li>
</ul>

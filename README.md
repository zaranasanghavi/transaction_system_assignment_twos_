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

<h2><b>AI Tool Usage Log (Mandatory)</b></h2>

<p><b>AI Tool Used:</b> ChatGPT</p>

<table border="1">
<tr><th>Area</th><th>Usage</th></tr>
<tr><td>Backend</td><td>Generated atomic transaction boilerplate</td></tr>
<tr><td>Backend</td><td>Assisted with wallet and audit log schema</td></tr>
<tr><td>Frontend</td><td>Generated initial React components</td></tr>
<tr><td>Documentation</td><td>Assisted in README preparation</td></tr>
</table>

<p>
All AI-generated content was reviewed, modified, and tested manually before final submission.
</p>

<br/>

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

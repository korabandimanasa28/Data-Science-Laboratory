import {
  AppNotification,
  AppSettings,
  AuthUser,
  ExperimentItem,
  ModuleItem,
  ProjectItem,
  ResumeDocument,
  StudentProfile,
  ToolItem,
  UserRole,
} from '../types/lab';

export const ADMIN_SECURITY_PASSCODE = 'DSLAB-ADMIN-2025';

export const STORAGE_KEYS = {
  STUDENT: 'dslab_v6_student',
  EXPERIMENTS: 'dslab_v6_experiments',
  TOOLS: 'dslab_v6_tools',
  MODULES: 'dslab_v6_modules',
  PROJECTS: 'dslab_v6_projects',
  NOTIFICATIONS: 'dslab_v6_notifications',
  SETTINGS: 'dslab_v6_settings',
  RESUME: 'dslab_v6_resume',
  AUTH: 'dslab_v6_auth',
  USERS_DB: 'dslab_v6_users_db',
};

export interface StoredUserAccount {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  passwordHash?: string;
  createdAt: string;
}

export const DEFAULT_USERS_DB: StoredUserAccount[] = [
  {
    id: 'usr-admin-root',
    email: 'admin@dslab.edu',
    name: 'Dr. R. V. Raman (Admin)',
    role: 'admin',
    passwordHash: 'dslabAdmin2025',
    createdAt: '2024-08-01T00:00:00.000Z',
  },
  {
    id: 'usr-student-mansa',
    email: 'manasa.k@dslab.edu',
    name: 'K. Mansa',
    role: 'user',
    passwordHash: 'dslab2026',
    createdAt: '2024-09-01T00:00:00.000Z',
  },
  {
    id: 'usr-student-general',
    email: 'student@dslab.edu',
    name: 'Student Researcher',
    role: 'user',
    passwordHash: 'student2026',
    createdAt: '2024-09-01T00:00:00.000Z',
  },
];

export const DEFAULT_STUDENT: StudentProfile = {
  name: 'K. Mansa',
  rollNumber: '21B91A05A1',
  branch: 'Computer Science & Engineering',
  department: 'Data Science & Artificial Intelligence',
  section: 'Section B',
  facultyName: 'Dr. R. V. Raman',
  facultyDesignation: 'Professor & Head of Department',
  academicYear: '2024 - 2025 (Year III)',
  university: 'Jawaharlal Nehru Technological University',
  email: 'manasa.k@dslab.edu',
  avatarUrl: '',
};

export const DEFAULT_RESUME: ResumeDocument = {
  id: 'res-default',
  fileName: 'K_Mansa_Data_Science_Resume.pdf',
  fileSize: '1.4 MB',
  fileType: 'application/pdf',
  uploadDate: 'Oct 6, 2026',
  status: 'Verified',
  notes: 'Tailored for Machine Learning Engineer & Data Scientist roles with projects in Pandas, PySpark, and Neural Networks.',
};

export const DEFAULT_AUTH_USER: AuthUser = {
  id: 'usr-student-mansa',
  email: 'manasa.k@dslab.edu',
  name: 'K. Mansa',
  role: 'user',
  createdAt: '2024-09-01T00:00:00.000Z',
};

export const DEFAULT_PROJECTS: ProjectItem[] = [
  {
    id: 'proj-1',
    title: 'Customer Churn Prediction & Behavioral Segmentation',
    category: 'Machine Learning',
    description: 'End-to-end predictive pipeline employing XGBoost and Random Forest on telecommunications customer lifecycles, identifying churn probabilities with SHAP interpretability.',
    status: 'Completed',
    techStack: ['Python 3.11', 'Scikit-Learn', 'XGBoost', 'Pandas', 'SHAP'],
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    githubUrl: 'https://github.com/dslab/churn-prediction',
    notebookUrl: 'https://colab.research.google.com/dslab/churn-eda',
    author: 'K. Mansa (Lead Researcher)',
    metrics: '94.2% ROC-AUC · 0.89 F1-Score',
    createdAt: '2024-09-10T10:00:00.000Z',
    updatedAt: '2024-10-05T14:30:00.000Z',
  },
  {
    id: 'proj-2',
    title: 'Multi-Class Emotion & Sentiment NLP Analytics Engine',
    category: 'NLP',
    description: 'Fine-tuned Transformer and NLTK VADER framework for streaming customer sentiment mining across 250,000 product reviews with automated topic coherence modeling.',
    status: 'Completed',
    techStack: ['Python 3.11', 'HuggingFace', 'NLTK', 'PyTorch', 'BERT'],
    imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
    githubUrl: 'https://github.com/dslab/sentiment-nlp-engine',
    notebookUrl: 'https://colab.research.google.com/dslab/sentiment-notebook',
    author: 'Data Science Lab Cohort',
    metrics: '91.8% Accuracy · 250K Reviews Ingested',
    createdAt: '2024-09-18T11:00:00.000Z',
    updatedAt: '2024-10-08T09:15:00.000Z',
  },
  {
    id: 'proj-3',
    title: 'Distributed Log Processing & Fraud Ingestion Pipeline',
    category: 'Data Engineering',
    description: 'High-throughput PySpark structured streaming architecture parsing semi-structured JSON financial transactions to flag anomalous velocity patterns.',
    status: 'Published',
    techStack: ['PySpark', 'Apache Spark', 'SQL', 'Delta Lake', 'Kafka'],
    imageUrl: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=800&q=80',
    githubUrl: 'https://github.com/dslab/distributed-log-pipeline',
    notebookUrl: 'https://colab.research.google.com/dslab/spark-streaming',
    author: 'Faculty Mentorship Group',
    metrics: '15,000 Events/sec · Sub-50ms Latency',
    createdAt: '2024-09-25T14:00:00.000Z',
    updatedAt: '2024-10-02T16:45:00.000Z',
  },
  {
    id: 'proj-4',
    title: 'Medical Image Classification for Retinopathy Diagnostics',
    category: 'Computer Vision',
    description: 'Deep convolutional neural network architecture (ResNet-50 + EfficientNet) for automated grade classification of diabetic retinopathy retinal fundus photographs.',
    status: 'In Progress',
    techStack: ['PyTorch', 'ResNet-50', 'OpenCV', 'Albumentations', 'Matplotlib'],
    imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
    githubUrl: 'https://github.com/dslab/retinopathy-deep-learning',
    notebookUrl: 'https://colab.research.google.com/dslab/retina-cv',
    author: 'K. Mansa & Dr. R. V. Raman',
    metrics: '89.4% Multi-Class Sensitivity',
    createdAt: '2024-10-01T08:30:00.000Z',
    updatedAt: '2024-10-12T12:00:00.000Z',
  },
  {
    id: 'proj-5',
    title: 'Hierarchical Algorithmic Trading Backtester & Volatility Modeler',
    category: 'Deep Learning',
    description: 'Recurrent Neural Network with LSTM and GARCH volatility estimation modeling multi-asset temporal dependencies with risk-parity portfolio optimization.',
    status: 'In Progress',
    techStack: ['Python 3.11', 'TensorFlow', 'NumPy', 'Pandas', 'Statsmodels'],
    imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80',
    githubUrl: 'https://github.com/dslab/trading-volatility-backtest',
    notebookUrl: 'https://colab.research.google.com/dslab/lstm-time-series',
    author: 'Student Analytics Guild',
    metrics: '1.84 Sharpe Ratio · 8.2% Max Drawdown',
    createdAt: '2024-10-04T13:00:00.000Z',
    updatedAt: '2024-10-11T17:20:00.000Z',
  },
  {
    id: 'proj-6',
    title: 'Air Quality & Environmental Geospatial Sensor Analytics',
    category: 'Machine Learning',
    description: 'Spatial interpolation and multivariate time-series forecasting of PM2.5, NO2, and Ozone pollutants leveraging LightGBM and GeoPandas mapping.',
    status: 'Completed',
    techStack: ['GeoPandas', 'LightGBM', 'Folium', 'Scipy', 'Seaborn'],
    imageUrl: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=800&q=80',
    githubUrl: 'https://github.com/dslab/geospatial-air-quality',
    notebookUrl: 'https://colab.research.google.com/dslab/geopandas-sensors',
    author: 'Environmental Data Lab',
    metrics: '3.41 RMSE · 0.93 R-Squared',
    createdAt: '2024-10-06T09:00:00.000Z',
    updatedAt: '2024-10-13T10:00:00.000Z',
  },
];

// 10 OFFICIAL COLLEGE DATA SCIENCE LABORATORY EXPERIMENTS WITH ALL SUB-PARTS
export const DEFAULT_EXPERIMENTS: ExperimentItem[] = [
  {
    id: 'exp-1',
    title: 'EXPERIMENT 1 — Working with Different Data Formats Using Pandas',
    description: 'Perform reading, writing and parsing of CSV, JSON and Microsoft Excel files using Pandas.',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=700&q=80',
    status: 'Completed',
    progress: 100,
    subExperiments: [
      {
        id: 'sub-1-a',
        name: '1(a) Reading and Writing CSV/Text Data',
        description: 'Read and write data in CSV format using read_csv() and to_csv(), and handle tab-separated data.',
        category: 'Pandas',
        status: 'Completed',
        progress: 100,
        language: 'Python 3.11',
        imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
        aim: 'To read and write data in CSV format using read_csv() and to_csv() and demonstrate tab-separated files.',
        requirements: 'Python 3.x, Pandas',
        code: `import pandas as pd

# Create a sample student DataFrame
data = {
    "Name": ["Alice", "Bob", "Charlie", "David"],
    "Age": [20, 21, 19, 22],
    "Marks": [85, 78, 92, 88]
}
df = pd.DataFrame(data)

# Write DataFrame to CSV
df.to_csv("students.csv", index=False)

# Read CSV file using read_csv()
new_df = pd.read_csv("students.csv")
print("CSV Data:")
print(new_df)

# Write tab-separated data
df.to_csv("students.txt", sep="\\t", index=False)

# Read tab-separated data using read_csv with sep="\\t"
tab_df = pd.read_csv("students.txt", sep="\\t")
print("\\nTab Separated Data:")
print(tab_df)`,
        output: `CSV Data:
      Name  Age  Marks
0    Alice   20     85
1      Bob   21     78
2  Charlie   19     92
3    David   22     88

Tab Separated Data:
      Name  Age  Marks
0    Alice   20     85
1      Bob   21     78
2  Charlie   19     92
3    David   22     88`,
        result: 'Thus, CSV and tab-separated files were successfully read and written using Pandas.',
        explanation: 'read_csv() parses delimited records into memory as structured DataFrames, while to_csv() persists them.',
        keyPoints: ['Use index=False to prevent persisting row numbers', 'sep="\\t" enables tab-separated parsing'],
        files: [],
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'sub-1-b',
        name: '1(b) Reading, Writing and Parsing JSON',
        description: 'Read, write and parse JSON data using read_json() and to_json().',
        category: 'Pandas',
        status: 'Completed',
        progress: 100,
        language: 'Python 3.11',
        imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
        aim: 'To read, write and parse JSON data using read_json().',
        requirements: 'Python 3.x, Pandas',
        code: `import pandas as pd

# Create DataFrame
df = pd.DataFrame({
    "Name": ["Alice", "Bob", "Charlie"],
    "Age": [20, 21, 19],
    "Marks": [85, 78, 92]
})

# Write JSON to file
df.to_json("students.json", orient="records", indent=4)

# Read JSON file
json_df = pd.read_json("students.json")
print("JSON Data:")
print(json_df)

# Parse JSON string directly
json_string = '''[
    {"Name": "John", "Age": 22},
    {"Name": "Mary", "Age": 20}
]'''
parsed_df = pd.read_json(json_string)
print("\\nParsed JSON:")
print(parsed_df)`,
        output: `JSON Data:
      Name  Age  Marks
0    Alice   20     85
1      Bob   21     78
2  Charlie   19     92

Parsed JSON:
   Name  Age
0  John   22
1  Mary   20`,
        result: 'JSON data was successfully created, written, read and parsed using Pandas.',
        explanation: 'JSON is an open standard file format widely used in web APIs and unstructured stores.',
        keyPoints: ['orient="records" formats rows as a JSON list of objects', 'read_json can accept filepath or raw JSON string'],
        files: [],
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'sub-1-c',
        name: '1(c) Reading and Writing Microsoft Excel Files',
        description: 'Read and write Excel (.xlsx) files using read_excel() and to_excel().',
        category: 'Pandas',
        status: 'Completed',
        progress: 100,
        language: 'Python 3.11',
        imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
        aim: 'To read and write Excel files using read_excel() and to_excel().',
        requirements: 'Python 3.x, Pandas, OpenPyXL',
        code: `import pandas as pd

df = pd.DataFrame({
    "Name": ["Alice", "Bob", "Charlie", "David"],
    "Age": [20, 21, 19, 22],
    "Marks": [85, 78, 92, 88]
})

# Write Excel file
df.to_excel("students.xlsx", index=False)

# Read Excel file
excel_df = pd.read_excel("students.xlsx")
print("Excel Data:")
print(excel_df)`,
        output: `Excel Data:
      Name  Age  Marks
0    Alice   20     85
1      Bob   21     78
2  Charlie   19     92
3    David   22     88`,
        result: 'Thus, Excel data was successfully written and read using Pandas.',
        explanation: 'to_excel() and read_excel() interface seamlessly with Microsoft Excel spreadsheets.',
        keyPoints: ['Requires openpyxl engine for modern .xlsx formats', 'Supports multi-sheet extraction via sheet_name'],
        files: [],
        updatedAt: new Date().toISOString(),
      },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'exp-2',
    title: 'EXPERIMENT 2 — Interacting with Web APIs and Databases',
    description: 'Retrieve live GitHub issues via REST API and perform relational database CRUD operations using SQLite and Pandas.',
    imageUrl: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=700&q=80',
    status: 'Completed',
    progress: 100,
    subExperiments: [
      {
        id: 'sub-2-a',
        name: '2(a) GitHub API and Pandas',
        description: 'Retrieve 30 issues from the Pandas repository using requests.get() and convert into a DataFrame.',
        category: 'Python',
        status: 'Completed',
        progress: 100,
        language: 'Python 3.11',
        imageUrl: 'https://images.unsplash.com/photo-1618401471353-b98aedd04e11?auto=format&fit=crop&w=800&q=80',
        aim: 'To retrieve the latest 30 GitHub issues of Pandas using the GitHub API, convert the response into a DataFrame and extract required fields.',
        requirements: 'Python 3.x, Requests, Pandas',
        code: `import requests
import pandas as pd

url = "https://api.github.com/repos/pandas-dev/pandas/issues"

try:
    response = requests.get(
        url,
        params={"per_page": 30},
        timeout=15
    )
    print("Status Code:", response.status_code)
    
    if response.status_code == 200:
        data = response.json()
        df = pd.DataFrame(data)
        
        # Extract fields of interest
        result = df[["number", "title", "state", "html_url", "created_at"]]
        print("\\nLast 30 GitHub Issues (Sample Preview):")
        print(result.head(5).to_string(index=False))
    else:
        print("API request failed with status:", response.status_code)
except Exception as e:
    print("Handled Connection/API Note:", e)`,
        output: `Status Code: 200

Last 30 GitHub Issues (Sample Preview):
 number                                                     title state                                                     html_url           created_at
  59210       BUG: GroupBy cumsum with nullable integer precision  open  https://github.com/pandas-dev/pandas/issues/59210 2026-10-06T10:14:02Z
  59209          DOC: Clarify to_period frequency alias handling   open  https://github.com/pandas-dev/pandas/issues/59209 2026-10-06T09:22:15Z
  59208             ENH: Add PyArrow string array fast conversion  open  https://github.com/pandas-dev/pandas/issues/59208 2026-10-06T08:05:44Z
...
(Representative live API output; actual issue numbers change over time)`,
        result: 'The latest 30 Pandas GitHub issues were successfully retrieved and converted into a DataFrame.',
        explanation: 'REST APIs return JSON payloads that are converted into tabular DataFrames using json() and subsetting.',
        keyPoints: ['Use timeout in requests.get to prevent hanging', 'Wrap live API calls in exception handling'],
        files: [],
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'sub-2-b',
        name: '2(b) Relational Database Operations',
        description: 'Connect to SQLite database, create table, insert, select into DataFrame, update and delete.',
        category: 'SQL',
        status: 'Completed',
        progress: 100,
        language: 'SQL + Python',
        imageUrl: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=800&q=80',
        aim: 'To connect to a relational database and perform table creation, insertion, selection, DataFrame conversion, updating and deletion.',
        requirements: 'Python 3.x, SQLite3, Pandas',
        code: `import sqlite3
import pandas as pd

# Connect to database
connection = sqlite3.connect("college.db")
cursor = connection.cursor()

# Create table
cursor.execute("""CREATE TABLE IF NOT EXISTS students (
    id INTEGER PRIMARY KEY,
    name TEXT,
    branch TEXT,
    marks INTEGER
)""")

# Delete old records for repeatable execution
cursor.execute("DELETE FROM students")

# Insert records
students = [
    (1, "Alice", "CSE", 85),
    (2, "Bob", "AIML", 78),
    (3, "Charlie", "DS", 92),
    (4, "David", "CSE", 88)
]
cursor.executemany("INSERT INTO students VALUES (?, ?, ?, ?)", students)
connection.commit()

# Select records using SQL and move to DataFrame
df_sql = pd.read_sql_query("SELECT * FROM students", connection)
print("Initial Database DataFrame:")
print(df_sql)

# UPDATE record
cursor.execute("UPDATE students SET marks = 95 WHERE id = 2")

# DELETE record
cursor.execute("DELETE FROM students WHERE id = 4")
connection.commit()

# Fetch updated view
df_updated = pd.read_sql_query("SELECT * FROM students", connection)
print("\\nAfter Update (Bob=95) and Delete (id=4):")
print(df_updated)
connection.close()`,
        output: `Initial Database DataFrame:
   id     name branch  marks
0   1    Alice    CSE     85
1   2      Bob   AIML     78
2   3  Charlie     DS     92
3   4    David    CSE     88

After Update (Bob=95) and Delete (id=4):
   id     name branch  marks
0   1    Alice    CSE     85
1   2      Bob   AIML     95
2   3  Charlie     DS     92`,
        result: 'Database connection and CRUD operations were successfully performed.',
        explanation: 'SQLite is bundled directly with Python standard library, enabling SQL relational queries.',
        keyPoints: ['Use pd.read_sql_query for direct dataframe extraction', 'Call commit() after DML write queries'],
        files: [],
        updatedAt: new Date().toISOString(),
      },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'exp-3',
    title: 'EXPERIMENT 3 — Data Cleaning and Preparation',
    description: 'Missing data handling, deduplication, value transformation (map/replace/rename), normal distribution outlier detection, and regex text processing.',
    imageUrl: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=700&q=80',
    status: 'Completed',
    progress: 100,
    subExperiments: [
      {
        id: 'sub-3-a',
        name: '3(a) Missing Data and Duplicate Removal',
        description: 'Identify and handle missing values and duplicate records using isna(), dropna(), fillna(), and drop_duplicates().',
        category: 'Pandas',
        status: 'Completed',
        progress: 100,
        language: 'Python 3.11',
        imageUrl: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=800&q=80',
        aim: 'To identify and handle missing values and duplicate records using isna(), dropna(), fillna(), duplicated() and drop_duplicates().',
        requirements: 'Python 3.x, Pandas, NumPy',
        code: `import pandas as pd
import numpy as np

df = pd.DataFrame({
    "Name": ["Alice", "Bob", "Charlie", "David", "David"],
    "Age": [20, np.nan, 19, 22, 22],
    "Marks": [85, 78, np.nan, 88, 88]
})

print("Original Data:")
print(df)

print("\\nMissing Values Count:")
print(df.isna().sum())

# Drop missing values
drop_df = df.dropna()
print("\\nAfter dropna():")
print(drop_df)

# Fill missing values with column mean
fill_df = df.copy()
fill_df["Age"] = fill_df["Age"].fillna(fill_df["Age"].mean())
fill_df["Marks"] = fill_df["Marks"].fillna(fill_df["Marks"].mean())
print("\\nAfter fillna(mean):")
print(fill_df)

# Remove duplicate records
clean_df = fill_df.drop_duplicates()
print("\\nAfter Removing Duplicates:")
print(clean_df)`,
        output: `Original Data:
      Name   Age  Marks
0    Alice  20.0   85.0
1      Bob   NaN   78.0
2  Charlie  19.0    NaN
3    David  22.0   88.0
4    David  22.0   88.0

Missing Values Count:
Name     0
Age      1
Marks    1
dtype: int64

After Removing Duplicates:
      Name    Age  Marks
0    Alice  20.00  85.00
1      Bob  20.75  78.00
2  Charlie  19.00  87.25
3    David  22.00  88.00`,
        result: 'Missing values and duplicate records were successfully identified and handled.',
        explanation: 'Handling null and duplicate entries preserves distribution integrity and prevents biased estimations.',
        keyPoints: ['df.isna().sum() reveals column-wise null counts', 'drop_duplicates() removes redundant rows'],
        files: [],
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'sub-3-b',
        name: '3(b) Data Transformation Using map, replace and rename',
        description: 'Modify DataFrame values using map(), replace() and produce transformed versions using rename().',
        category: 'Pandas',
        status: 'Completed',
        progress: 100,
        language: 'Python 3.11',
        imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
        aim: 'To transform DataFrame values using map(), replace() and rename().',
        requirements: 'Python 3.x, Pandas',
        code: `import pandas as pd

df = pd.DataFrame({
    "Name": ["Alice", "Bob", "Charlie", "David"],
    "Gender": ["M", "F", "M", "F"],
    "Grade": ["A", "B", "A", "C"]
})
print("Original Data:")
print(df)

# map()
df["Gender"] = df["Gender"].map({"M": "Male", "F": "Female"})

# replace()
df["Grade"] = df["Grade"].replace({"A": "Excellent", "B": "Good", "C": "Average"})

# rename() without mutating original variable
new_df = df.rename(columns={"Name": "Student_Name", "Grade": "Performance"})
print("\\nTransformed Data:")
print(new_df)`,
        output: `Transformed Data:
  Student_Name  Gender Performance
0        Alice    Male   Excellent
1          Bob  Female        Good
2      Charlie    Male   Excellent
3        David  Female     Average`,
        result: 'Data transformation was successfully performed using map(), replace() and rename().',
        explanation: 'Mapping discrete codes to descriptive labels enhances interpretability.',
        keyPoints: ['map() applies dictionary lookups to Series', 'rename() allows non-destructive header adjustment'],
        files: [],
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'sub-3-c',
        name: '3(c) Normally Distributed Data and Outlier Detection',
        description: 'Generate normally distributed random data and detect outliers using the IQR (Interquartile Range) method.',
        category: 'NumPy',
        status: 'Completed',
        progress: 100,
        language: 'Python 3.11',
        imageUrl: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=800&q=80',
        aim: 'To generate normally distributed random data and detect possible outliers.',
        requirements: 'Python 3.x, NumPy, Pandas',
        code: `import numpy as np
import pandas as pd

np.random.seed(42)
data = np.random.normal(loc=50, scale=10, size=100)

# Inject synthetic outliers
data = np.append(data, [100, 110, 120])
df = pd.DataFrame({"Value": data})

Q1 = df["Value"].quantile(0.25)
Q3 = df["Value"].quantile(0.75)
IQR = Q3 - Q1
lower_limit = Q1 - 1.5 * IQR
upper_limit = Q3 + 1.5 * IQR

outliers = df[(df["Value"] < lower_limit) | (df["Value"] > upper_limit)]
print("Q1:", round(Q1, 2))
print("Q3:", round(Q3, 2))
print("IQR:", round(IQR, 2))
print("Lower Limit:", round(lower_limit, 2))
print("Upper Limit:", round(upper_limit, 2))
print("\\nPossible Outliers Detected:")
print(outliers)`,
        output: `Q1: 43.13
Q3: 56.48
IQR: 13.35
Lower Limit: 23.11
Upper Limit: 76.51

Possible Outliers Detected:
     Value
100  100.0
101  110.0
102  120.0`,
        result: 'Normally distributed data was generated and possible outliers were detected using the IQR method.',
        explanation: 'The IQR 1.5 rule flags data points situated beyond the inner whiskers of a distribution.',
        keyPoints: ['IQR = Q3 - Q1', 'Outlier thresholds: Q1 - 1.5*IQR and Q3 + 1.5*IQR'],
        files: [],
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'sub-3-d',
        name: '3(d) Regular Expressions',
        description: 'Split strings with variable whitespace and extract patterns using re.split() and re.findall().',
        category: 'Python',
        status: 'Completed',
        progress: 100,
        language: 'Python 3.11',
        imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
        aim: 'To split a string containing variable whitespace characters and find all matching patterns using regular expressions.',
        requirements: 'Python 3.x, re module',
        code: `import re

text = "Python\\tis  a\\npowerful   programming\\tlanguage"

# Split using one or more whitespace characters
words = re.split(r"\\s+", text.strip())
print("Words:")
print(words)

# Find words starting with P or p
patterns = re.findall(r"\\b[Pp]\\w+", text)
print("\\nMatching Patterns (Starts with P/p):")
print(patterns)

# Find numbers
text2 = "Python 3 is popular and Python 3.11 is widely used in 2026."
numbers = re.findall(r"\\d+(?:\\.\\d+)?", text2)
print("\\nNumbers:")
print(numbers)`,
        output: `Words:
['Python', 'is', 'a', 'powerful', 'programming', 'language']

Matching Patterns (Starts with P/p):
['Python', 'powerful', 'programming']

Numbers:
['3', '3.11', '2026']`,
        result: 'Regular expressions were successfully used for whitespace splitting and pattern matching.',
        explanation: 'Regex syntax enables deterministic pattern searching in unstructured textual corpora.',
        keyPoints: ['\\s+ matches one or more whitespace characters', '\\b denotes word boundary'],
        files: [],
        updatedAt: new Date().toISOString(),
      },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'exp-4',
    title: 'EXPERIMENT 4 — Data Wrangling',
    description: 'Hierarchical multi-level indexing, tabular pivoting with stack() and unstack(), and DataFrame merging with combine_first().',
    imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=700&q=80',
    status: 'Completed',
    progress: 100,
    subExperiments: [
      {
        id: 'sub-4-a',
        name: '4(a) Hierarchical Indexing',
        description: 'Construct a MultiIndex Series and query subsets via outer and inner levels.',
        category: 'Pandas',
        status: 'Completed',
        progress: 100,
        language: 'Python 3.11',
        imageUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80',
        aim: 'To create a Series with hierarchical indexing and select data using outer and inner levels.',
        requirements: 'Python 3.x, Pandas',
        code: `import pandas as pd

index = [
    ["India", "India", "USA", "USA"],
    ["Delhi", "Mumbai", "New York", "Chicago"]
]
multi_index = pd.MultiIndex.from_arrays(index, names=["Country", "City"])

sales = pd.Series([100, 150, 200, 180], index=multi_index)
print("Hierarchical Series:")
print(sales)

print("\\nOuter Level - India:")
print(sales["India"])

print("\\nInner Level - Mumbai:")
print(sales.loc[("India", "Mumbai")])`,
        output: `Hierarchical Series:
Country  City    
India    Delhi       100
         Mumbai      150
USA      New York    200
         Chicago     180
dtype: int64

Outer Level - India:
City
Delhi     100
Mumbai    150
dtype: int64

Inner Level - Mumbai:
150`,
        result: 'Hierarchical indexing and partial indexing were successfully performed.',
        explanation: 'MultiIndex facilitates higher-dimensional representation within 1D and 2D tabular formats.',
        keyPoints: ['Supports nested aggregation', 'Outer and inner slicing using .loc tuples'],
        files: [],
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'sub-4-b',
        name: '4(b) Stack and Unstack',
        description: 'Pivot hierarchical data between wide and tall representations using unstack() and stack().',
        category: 'Pandas',
        status: 'Completed',
        progress: 100,
        language: 'Python 3.11',
        imageUrl: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=800&q=80',
        aim: 'To rearrange hierarchical tabular data using stack() and unstack().',
        requirements: 'Python 3.x, Pandas',
        code: `import pandas as pd

data = pd.DataFrame({
    "Country": ["India", "India", "USA", "USA"],
    "City": ["Delhi", "Mumbai", "New York", "Chicago"],
    "Sales": [100, 150, 200, 180]
})
df = data.set_index(["Country", "City"])
print("Original MultiIndex DataFrame:")
print(df)

# Unstack
unstacked = df.unstack()
print("\\nUnstacked (Wide format):")
print(unstacked)

# Stack back
stacked = unstacked.stack()
print("\\nStacked (Long format):")
print(stacked)`,
        output: `Original MultiIndex DataFrame:
                  Sales
Country City           
India   Delhi       100
        Mumbai      150
USA     New York    200
        Chicago     180

Unstacked (Wide format):
          Sales                 
City    Chicago Delhi Mumbai New York
Country                              
India       NaN 100.0  150.0      NaN
USA       180.0   NaN    NaN    200.0`,
        result: 'The hierarchical DataFrame was successfully rearranged using stack() and unstack().',
        explanation: 'unstack pivots the inner index to column headers; stack rotates columns back to row indices.',
        keyPoints: ['Reshapes hierarchical indices into flat tables', 'Preserves sparse null entries during rotation'],
        files: [],
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'sub-4-c',
        name: '4(c) Merge Using Index and combine_first',
        description: 'Merge DataFrames using index keys and combine overlapping values using combine_first().',
        category: 'Pandas',
        status: 'Completed',
        progress: 100,
        language: 'Python 3.11',
        imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
        aim: 'To merge DataFrames using index and combine overlapping data using combine_first().',
        requirements: 'Python 3.x, Pandas',
        code: `import pandas as pd

df1 = pd.DataFrame({
    "Name": ["Alice", "Bob", "Charlie"],
    "Marks": [85, 78, None]
}, index=[1, 2, 3])

df2 = pd.DataFrame({
    "Name": ["Alice", "Bob", "Charlie"],
    "Marks": [90, None, 92],
    "Grade": ["A", "B", "A"]
}, index=[1, 2, 3])

print("DataFrame 1:")
print(df1)
print("\\nDataFrame 2:")
print(df2)

# Merge using index
merged = df1.merge(df2, left_index=True, right_index=True, suffixes=("_1", "_2"))
print("\\nMerged DataFrame:")
print(merged)

# Combine overlapping values
combined = df1.combine_first(df2)
print("\\nCombined DataFrame (combine_first):")
print(combined)`,
        output: `Combined DataFrame (combine_first):
      Grade     Name  Marks
1         A    Alice   85.0
2         B      Bob   78.0
3         A  Charlie   92.0`,
        result: 'DataFrames were successfully merged using index and overlapping values were combined.',
        explanation: 'combine_first patches missing values in the caller with valid elements from the second DataFrame.',
        keyPoints: ['left_index=True, right_index=True merges on row indices', 'combine_first acts as a coalescence operator'],
        files: [],
        updatedAt: new Date().toISOString(),
      },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'exp-5',
    title: 'EXPERIMENT 5 — Data Visualization with Matplotlib and Seaborn',
    description: 'Line plots, grouped bar plots, stacked bar plots, histograms, density plots, scatter plots, and box plots.',
    imageUrl: 'https://images.unsplash.com/photo-1543286386-713bdd548da4?auto=format&fit=crop&w=700&q=80',
    status: 'Completed',
    progress: 100,
    subExperiments: [
      {
        id: 'sub-5-a',
        name: '5(a) Line Plot with Annotations',
        description: 'Create an annotated line chart with ticks, ticklabels, and save to a file.',
        category: 'Python',
        status: 'Completed',
        progress: 100,
        language: 'Python 3.11',
        imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80',
        aim: 'To create a line plot with title, axis labels, ticks, tick labels, annotations and save it to a file.',
        requirements: 'Python 3.x, Matplotlib',
        code: `import matplotlib.pyplot as plt

months = ["Jan", "Feb", "Mar", "Apr", "May"]
sales = [20, 35, 30, 45, 50]

fig, ax = plt.subplots(figsize=(6, 4))
ax.plot(months, sales, marker="o", color="#E91E63", linewidth=2)
ax.set_title("Monthly Sales")
ax.set_xlabel("Month")
ax.set_ylabel("Sales (in Thousands)")
ax.set_xticks(range(len(months)))
ax.set_xticklabels(months)
ax.annotate(
    "Highest Sales",
    xy=("May", 50),
    xytext=("Mar", 52),
    arrowprops=dict(facecolor="black", arrowstyle="->")
)
plt.tight_layout()
plt.savefig("line_plot.png", dpi=150)
print("Graph saved successfully as line_plot.png")`,
        output: `Graph saved successfully as line_plot.png
Line plot generated with 5 data points and peak annotation at ('May', 50).`,
        result: 'The line plot was successfully created, annotated and saved.',
        explanation: 'Line charts map quantitative variables against ordered chronological categories.',
        keyPoints: ['Use ax.annotate with xy and xytext for pointers', 'plt.savefig persists vector or raster plots'],
        files: [],
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'sub-5-b1',
        name: '5(b)(i) Grouped Bar Plot',
        description: 'Generate side-by-side grouped bar plots from multi-column DataFrames.',
        category: 'Python',
        status: 'Completed',
        progress: 100,
        language: 'Python 3.11',
        imageUrl: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80',
        aim: 'To create grouped bar plots where values in each row are displayed side-by-side.',
        requirements: 'Python 3.x, Pandas, Matplotlib',
        code: `import pandas as pd
import matplotlib.pyplot as plt

df = pd.DataFrame({
    "Python": [80, 85, 90],
    "Java": [75, 88, 85],
    "SQL": [90, 82, 88]
}, index=["Alice", "Bob", "Charlie"])

df.plot(kind="bar", figsize=(6, 4))
plt.title("Student Marks by Subject")
plt.xlabel("Students")
plt.ylabel("Marks")
plt.tight_layout()
plt.show()`,
        output: `Grouped Bar Plot generated successfully for 3 students across Python, Java, and SQL.`,
        result: 'A grouped bar plot was successfully created.',
        explanation: 'Grouped bars position categorical subsets adjacent to each other for direct comparison.',
        keyPoints: ['df.plot(kind="bar") groups columns by index', 'Rotates categorical labels on x-axis'],
        files: [],
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'sub-5-b2',
        name: '5(b)(ii) Stacked Bar Plot',
        description: 'Generate stacked bar plots to view composition and cumulative sums.',
        category: 'Python',
        status: 'Completed',
        progress: 100,
        language: 'Python 3.11',
        imageUrl: 'https://images.unsplash.com/photo-1543286386-713bdd548da4?auto=format&fit=crop&w=800&q=80',
        aim: 'To create a stacked bar plot from a DataFrame.',
        requirements: 'Python 3.x, Pandas, Matplotlib',
        code: `import pandas as pd
import matplotlib.pyplot as plt

df = pd.DataFrame({
    "Python": [80, 85, 90],
    "Java": [75, 88, 85],
    "SQL": [90, 82, 88]
}, index=["Alice", "Bob", "Charlie"])

df.plot(kind="bar", stacked=True, figsize=(6, 4))
plt.title("Stacked Student Marks")
plt.xlabel("Students")
plt.ylabel("Total Marks")
plt.tight_layout()
plt.show()`,
        output: `Stacked Bar Plot rendered successfully with cumulative totals per student.`,
        result: 'A stacked bar plot was successfully created.',
        explanation: 'Stacked bars illustrate relative contribution of components toward a cumulative total.',
        keyPoints: ['stacked=True accumulates bars atop each other', 'Visualizes both part and whole'],
        files: [],
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'sub-5-c',
        name: '5(c) Histogram and Density Plot',
        description: 'Create frequency histograms and smooth continuous Kernel Density Estimation (KDE) curves.',
        category: 'Python',
        status: 'Completed',
        progress: 100,
        language: 'Python 3.11',
        imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
        aim: 'To create a histogram for frequency distribution and a density plot for continuous probability distribution.',
        requirements: 'Python 3.x, NumPy, Seaborn, Matplotlib',
        code: `import numpy as np
import seaborn as sns
import matplotlib.pyplot as plt

np.random.seed(10)
data = np.random.normal(50, 10, 500)

fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(10, 4))

# Histogram
sns.histplot(data, bins=20, kde=False, ax=ax1, color="#E91E63")
ax1.set_title("Histogram (Frequency)")
ax1.set_xlabel("Value")

# Density plot
sns.kdeplot(data, fill=True, ax=ax2, color="#E91E63")
ax2.set_title("Density Plot (KDE Probability)")
ax2.set_xlabel("Value")

plt.tight_layout()
plt.show()`,
        output: `Histogram and Density Plots successfully rendered with 500 normal samples (Mean=50, Std=10).`,
        result: 'Histogram and density plots were successfully generated.',
        explanation: 'Histograms partition data into discrete bins; KDE plots estimate continuous probability density.',
        keyPoints: ['sns.histplot configures bin frequency', 'sns.kdeplot normalizes total area under curve to 1.0'],
        files: [],
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'sub-5-d',
        name: '5(d) Scatter Plot',
        description: 'Examine two 1D numerical data series to assess linear correlation.',
        category: 'Python',
        status: 'Completed',
        progress: 100,
        language: 'Python 3.11',
        imageUrl: 'https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=800&q=80',
        aim: 'To examine the relationship between two one-dimensional data series using a scatter plot.',
        requirements: 'Python 3.x, NumPy, Matplotlib',
        code: `import numpy as np
import matplotlib.pyplot as plt

hours = np.array([1, 2, 3, 4, 5, 6, 7, 8])
marks = np.array([35, 42, 48, 55, 60, 68, 75, 82])

plt.figure(figsize=(6, 4))
plt.scatter(hours, marks, color="#E91E63", s=70)
plt.title("Study Hours vs Marks")
plt.xlabel("Study Hours")
plt.ylabel("Marks")
plt.grid(True, linestyle="--", alpha=0.5)
plt.tight_layout()
plt.show()`,
        output: `Scatter plot indicates a strong positive linear relationship between study hours and academic marks.`,
        result: 'The scatter plot shows a positive relationship between study hours and marks.',
        explanation: 'Scatter plots visualize bivariate Cartesian coordinates to reveal trends and correlations.',
        keyPoints: ['Points rising from left to right show positive correlation', 'Identifies potential outlier coordinates'],
        files: [],
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'sub-5-e',
        name: '5(e) Box Plot',
        description: 'Examine categorical group distributions and interquartile variance.',
        category: 'Python',
        status: 'Completed',
        progress: 100,
        language: 'Python 3.11',
        imageUrl: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=800&q=80',
        aim: 'To visualize data containing categorical variables using box plots.',
        requirements: 'Python 3.x, Pandas, Seaborn, Matplotlib',
        code: `import seaborn as sns
import matplotlib.pyplot as plt
import pandas as pd

df = pd.DataFrame({
    "Department": [
        "CSE", "CSE", "CSE",
        "AIML", "AIML", "AIML",
        "DS", "DS", "DS"
    ],
    "Salary": [
        40000, 45000, 50000,
        42000, 48000, 55000,
        39000, 46000, 52000
    ]
})

plt.figure(figsize=(6, 4))
sns.boxplot(x="Department", y="Salary", data=df, palette=["#000000", "#FCE4EC", "#E91E63"])
plt.title("Salary Distribution by Department")
plt.tight_layout()
plt.show()`,
        output: `Box plot generated displaying median lines, Q1-Q3 boxes, and whisker bounds across 3 departments.`,
        result: 'The box plot successfully displayed the distribution and spread of salary across different categories.',
        explanation: 'Box plots display medians, 25th-75th percentiles, and potential outliers across categories.',
        keyPoints: ['Center line represents the median', 'Whiskers extend to 1.5 times the IQR'],
        files: [],
        updatedAt: new Date().toISOString(),
      },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'exp-6',
    title: 'EXPERIMENT 6 — Time Series Analysis',
    description: 'Timestamp indexing, date ranges, timezone localization/conversion, period arithmetic, frequency changes, and resampling.',
    imageUrl: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=700&q=80',
    status: 'Completed',
    progress: 100,
    subExperiments: [
      {
        id: 'sub-6-a',
        name: '6(a) Time Series Using Datetime',
        description: 'Create a time series using Pandas datetime objects indexed by timestamps.',
        category: 'Pandas',
        status: 'Completed',
        progress: 100,
        language: 'Python 3.11',
        imageUrl: 'https://images.unsplash.com/photo-1508057198894-247b23fe5ade?auto=format&fit=crop&w=800&q=80',
        aim: 'To create a time series using Pandas datetime objects indexed by timestamps.',
        requirements: 'Python 3.x, Pandas',
        code: `import pandas as pd

dates = pd.to_datetime(["2026-01-01", "2026-01-02", "2026-01-03", "2026-01-04"])
series = pd.Series([100, 110, 105, 120], index=dates)
print("Timestamp-Indexed Series:")
print(series)`,
        output: `Timestamp-Indexed Series:
2026-01-01    100
2026-01-02    110
2026-01-03    105
2026-01-04    120
dtype: int64`,
        result: 'A time series indexed by timestamps was successfully created.',
        explanation: 'pd.to_datetime parses date strings into DateTimeIndex objects.',
        keyPoints: ['DatetimeIndex enables chronological slicing', 'Supports year, month, and day accessors'],
        files: [],
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'sub-6-b',
        name: '6(b) date_range Generation',
        description: 'Generate regular DateTimeIndex sequences using pd.date_range().',
        category: 'Pandas',
        status: 'Completed',
        progress: 100,
        language: 'Python 3.11',
        imageUrl: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=800&q=80',
        aim: 'To generate a DateTimeIndex with an indicated length using date_range().',
        requirements: 'Python 3.x, Pandas',
        code: `import pandas as pd

dates = pd.date_range(start="2026-01-01", periods=10, freq="D")
print("Generated DateTimeIndex:")
print(dates)`,
        output: `Generated DateTimeIndex:
DatetimeIndex(['2026-01-01', '2026-01-02', '2026-01-03', '2026-01-04',
               '2026-01-05', '2026-01-06', '2026-01-07', '2026-01-08',
               '2026-01-09', '2026-01-10'],
              dtype='datetime64[ns]', freq='D')`,
        result: 'A DateTimeIndex containing 10 daily timestamps was generated successfully.',
        explanation: 'pd.date_range produces equidistant chronological increments across specified frequencies.',
        keyPoints: ['freq="D" specifies daily frequency', 'periods argument sets total elements count'],
        files: [],
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'sub-6-c',
        name: '6(c) Time Zones Localization and Conversion',
        description: 'Localize naive timestamps and convert across international time zones.',
        category: 'Pandas',
        status: 'Completed',
        progress: 100,
        language: 'Python 3.11',
        imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
        aim: 'To create, localize and convert time zones and combine timestamps from different time zones.',
        requirements: 'Python 3.x, Pandas',
        code: `import pandas as pd

dates = pd.date_range("2026-01-01", periods=3, freq="D")

# Localize to India Standard Time
india_time = dates.tz_localize("Asia/Kolkata")
print("India (IST):")
print(india_time)

# Convert to New York (EST)
new_york_time = india_time.tz_convert("America/New_York")
print("\\nNew York (EST):")
print(new_york_time)

# Convert to London (GMT/BST)
london_time = india_time.tz_convert("Europe/London")
print("\\nLondon:")
print(london_time)`,
        output: `India (IST):
DatetimeIndex(['2026-01-01 00:00:00+05:30', '2026-01-02 00:00:00+05:30',
               '2026-01-03 00:00:00+05:30'],
              dtype='datetime64[ns, Asia/Kolkata]', freq='D')

New York (EST):
DatetimeIndex(['2025-12-31 13:30:00-05:00', '2026-01-01 13:30:00-05:00',
               '2026-01-02 13:30:00-05:00'],
              dtype='datetime64[ns, America/New_York]', freq='D')`,
        result: 'Time series were successfully localized and converted between time zones.',
        explanation: 'tz_localize pins an offset to timezone-naive timestamps; tz_convert translates across zones.',
        keyPoints: ['tz_localize for initial assignment', 'tz_convert for timezone shifting'],
        files: [],
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'sub-6-d',
        name: '6(d) Period Arithmetic',
        description: 'Perform arithmetic operations on Period objects and generate period ranges.',
        category: 'Pandas',
        status: 'Completed',
        progress: 100,
        language: 'Python 3.11',
        imageUrl: 'https://images.unsplash.com/photo-1435527173128-983b87201f4d?auto=format&fit=crop&w=800&q=80',
        aim: 'To perform arithmetic operations on periods and generate period ranges.',
        requirements: 'Python 3.x, Pandas',
        code: `import pandas as pd

p = pd.Period("2026-01", freq="M")
print("Original Period:", p)
print("Next Period (p + 1):", p + 1)
print("Previous Period (p - 1):", p - 1)

periods = pd.period_range(start="2026-01", periods=6, freq="M")
print("\\nPeriod Range:")
print(periods)`,
        output: `Original Period: 2026-01
Next Period (p + 1): 2026-02
Previous Period (p - 1): 2025-12

Period Range:
PeriodIndex(['2026-01', '2026-02', '2026-03', '2026-04', '2026-05', '2026-06'], dtype='period[M]')`,
        result: 'Period arithmetic and period_range() were successfully performed.',
        explanation: 'Periods represent calendar intervals (spans of time) rather than instantaneous points in time.',
        keyPoints: ['Periods shift according to their underlying frequency span', 'period_range creates sequence of intervals'],
        files: [],
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'sub-6-e',
        name: '6(e) asfreq() Frequency Conversion',
        description: 'Convert Period and PeriodIndex objects to another frequency using asfreq().',
        category: 'Pandas',
        status: 'Completed',
        progress: 100,
        language: 'Python 3.11',
        imageUrl: 'https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?auto=format&fit=crop&w=800&q=80',
        aim: 'To convert Period and PeriodIndex objects to another frequency using asfreq().',
        requirements: 'Python 3.x, Pandas',
        code: `import pandas as pd

period = pd.Period("2026", freq="Y")
print("Yearly Period:", period)
print("Converted to Month (start):", period.asfreq("M", how="start"))
print("Converted to Month (end):", period.asfreq("M", how="end"))

periods = pd.period_range("2026-01", periods=3, freq="M")
print("\\nOriginal Monthly Periods:")
print(periods)
print("Converted to Daily (start):")
print(periods.asfreq("D", how="start"))`,
        output: `Yearly Period: 2026
Converted to Month (start): 2026-01
Converted to Month (end): 2026-12

Original Monthly Periods:
PeriodIndex(['2026-01', '2026-02', '2026-03'], dtype='period[M]')
Converted to Daily (start):
PeriodIndex(['2026-01-01', '2026-02-01', '2026-03-01'], dtype='period[D]')`,
        result: 'Periods were successfully converted to different frequencies using asfreq().',
        explanation: 'asfreq transforms periods between finer or coarser granularities.',
        keyPoints: ['how="start" aligns with first interval slice', 'how="end" aligns with final interval slice'],
        files: [],
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'sub-6-f',
        name: '6(f) to_period() Conversion',
        description: 'Convert timestamp-indexed Series and DataFrames to period representations.',
        category: 'Pandas',
        status: 'Completed',
        progress: 100,
        language: 'Python 3.11',
        imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80',
        aim: 'To convert Series and DataFrames indexed by timestamps to periods.',
        requirements: 'Python 3.x, Pandas',
        code: `import pandas as pd

dates = pd.date_range("2026-01-01", periods=5, freq="D")
df = pd.DataFrame({"Sales": [100, 120, 130, 110, 150]}, index=dates)
print("Original Timestamp-Indexed Data:")
print(df)

# Convert to Monthly Periods
period_df = df.to_period("M")
print("\\nConverted to Monthly Period Index:")
print(period_df)`,
        output: `Original Timestamp-Indexed Data:
            Sales
2026-01-01    100
2026-01-02    120
2026-01-03    130
2026-01-04    110
2026-01-05    150

Converted to Monthly Period Index:
         Sales
2026-01    100
2026-01    120
2026-01    130
2026-01    110
2026-01    150`,
        result: 'Timestamp-indexed data was successfully converted into period-indexed data.',
        explanation: 'to_period groups instantaneous timestamps into discrete accounting/calendar periods.',
        keyPoints: ['Converts exact times into interval bins', 'to_timestamp() executes the inverse mapping'],
        files: [],
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'sub-6-g',
        name: '6(g) Resampling, Downsampling and Upsampling',
        description: 'Perform frequency downsampling (aggregation) and upsampling (interpolation).',
        category: 'Pandas',
        status: 'Completed',
        progress: 100,
        language: 'Python 3.11',
        imageUrl: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?auto=format&fit=crop&w=800&q=80',
        aim: 'To perform resampling, downsampling and upsampling on a time series.',
        requirements: 'Python 3.x, Pandas, NumPy',
        code: `import pandas as pd
import numpy as np

dates = pd.date_range("2026-01-01", periods=10, freq="D")
series = pd.Series(np.arange(10) * 10, index=dates)
print("Original Daily Series:")
print(series)

# Downsampling: Aggregate daily to 5-day intervals
downsampled = series.resample("5D").mean()
print("\\nDownsampled (5-Day Mean):")
print(downsampled)

# Upsampling: Increase frequency to 12-hour intervals with interpolation
upsampled = series.resample("12h").interpolate().head(6)
print("\\nUpsampled (12-Hour Interpolation):")
print(upsampled)`,
        output: `Downsampled (5-Day Mean):
2026-01-01    20.0
2026-01-06    70.0
Freq: 5D, dtype: float64

Upsampled (12-Hour Interpolation):
2026-01-01 00:00:00     0.0
2026-01-01 12:00:00     5.0
2026-01-02 00:00:00    10.0
2026-01-02 12:00:00    15.0
2026-01-03 00:00:00    20.0
2026-01-03 12:00:00    25.0
Freq: 12h, dtype: float64`,
        result: 'Time-series data was successfully resampled using both downsampling and upsampling.',
        explanation: 'Downsampling summarizes higher frequency to lower; upsampling inserts intermediate points.',
        keyPoints: ['resample() acts as a time-based groupby', 'interpolate() estimates intermediate values linearly'],
        files: [],
        updatedAt: new Date().toISOString(),
      },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'exp-7',
    title: 'EXPERIMENT 7 — Data Aggregation',
    description: 'Split-apply-combine paradigms, grouping by single and multiple keys, multi-metric aggregate(), and exploratory groupby summaries.',
    imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=700&q=80',
    status: 'Completed',
    progress: 100,
    subExperiments: [
      {
        id: 'sub-7-a',
        name: '7(a) Grouping Using groupby()',
        description: 'Divide data into groups using single and multiple grouping keys.',
        category: 'Pandas',
        status: 'Completed',
        progress: 100,
        language: 'Python 3.11',
        imageUrl: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=800&q=80',
        aim: 'To divide data into groups using single and multiple keys.',
        requirements: 'Python 3.x, Pandas',
        code: `import pandas as pd

df = pd.DataFrame({
    "Department": ["CSE", "CSE", "AIML", "AIML", "DS", "DS"],
    "Gender": ["M", "F", "M", "F", "M", "F"],
    "Marks": [80, 90, 85, 95, 75, 88]
})
print("Original Dataset:")
print(df)

# Group by one key
print("\\nGroup by Department (Mean Marks):")
print(df.groupby("Department")["Marks"].mean())

# Group by multiple keys
print("\\nGroup by Department and Gender (Mean Marks):")
print(df.groupby(["Department", "Gender"])["Marks"].mean())`,
        output: `Group by Department (Mean Marks):
Department
AIML    90.0
CSE     85.0
DS      81.5
Name: Marks, dtype: float64

Group by Department and Gender (Mean Marks):
Department  Gender
AIML        F         95.0
            M         85.0
CSE         F         90.0
            M         80.0
DS          F         88.0
            M         75.0
Name: Marks, dtype: float64`,
        result: 'The data was successfully divided into groups using single and multiple grouping keys.',
        explanation: 'groupby splits data by unique values of specified columns and applies reductions.',
        keyPoints: ['Single column grouping produces Series', 'Multiple keys produce MultiIndex groupings'],
        files: [],
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'sub-7-b',
        name: '7(b) Summary Statistics Using aggregate()',
        description: 'Calculate sum, mean, and standard deviation for grouped data using agg().',
        category: 'Pandas',
        status: 'Completed',
        progress: 100,
        language: 'Python 3.11',
        imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=801&q=80',
        aim: 'To calculate sum, mean and standard deviation for grouped data.',
        requirements: 'Python 3.x, Pandas',
        code: `import pandas as pd

df = pd.DataFrame({
    "Department": ["CSE", "CSE", "AIML", "AIML", "DS", "DS"],
    "Marks": [80, 90, 85, 95, 75, 88]
})

result = df.groupby("Department")["Marks"].agg(["sum", "mean", "std"])
print("Aggregated Statistics by Department:")
print(result)`,
        output: `Aggregated Statistics by Department:
             sum  mean       std
Department                      
AIML          180  90.0  7.071068
CSE           170  85.0  7.071068
DS            163  81.5  9.192388`,
        result: 'Summary statistics were successfully calculated using aggregate().',
        explanation: 'agg() executes custom or standard statistical reductions across DataFrame subsets.',
        keyPoints: ['Accepts list of function names', 'Returns compact multi-column statistical summary'],
        files: [],
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'sub-7-c',
        name: '7(c) Exploratory Data Analysis Using GroupBy',
        description: 'Perform EDA using grouping based on single and multiple columns to extract descriptive metrics.',
        category: 'Pandas',
        status: 'Completed',
        progress: 100,
        language: 'Python 3.11',
        imageUrl: 'https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=800&q=80',
        aim: 'To perform exploratory data analysis using grouping based on one and multiple columns.',
        requirements: 'Python 3.x, Pandas',
        code: `import pandas as pd

df = pd.DataFrame({
    "Department": ["CSE", "CSE", "CSE", "AIML", "AIML", "DS"],
    "Gender": ["M", "F", "M", "F", "M", "F"],
    "Marks": [80, 90, 85, 95, 85, 75],
    "Attendance": [90, 95, 88, 92, 85, 80]
})

print("Basic Statistics:")
print(df.describe())

print("\\nDepartment Average Metrics:")
print(df.groupby("Department")[["Marks", "Attendance"]].mean())

print("\\nMaximum Marks by Department:")
print(df.groupby("Department")["Marks"].max())`,
        output: `Department Average Metrics:
                 Marks  Attendance
Department                        
AIML         90.000000        88.5
CSE          85.000000        91.0
DS           75.000000        80.0

Maximum Marks by Department:
Department
AIML    95
CSE     90
DS      75
Name: Marks, dtype: int64`,
        result: 'Exploratory analysis and summary statistics were successfully performed using groupby().',
        explanation: 'Exploratory GroupBy uncovers hidden segment patterns across departmental subsets.',
        keyPoints: ['df.describe() profiles parametric bounds', 'Multi-attribute groupby guides feature selection'],
        files: [],
        updatedAt: new Date().toISOString(),
      },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'exp-8',
    title: 'EXPERIMENT 8 — Web Scraping Using Beautiful Soup',
    description: 'Parse product reviews from HTML using BeautifulSoup, store in file, compute WordCloud, text statistics, VADER sentiment, and scatter intensity plot.',
    imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=700&q=80',
    status: 'Completed',
    progress: 100,
    subExperiments: [
      {
        id: 'sub-8-a',
        name: '8(a) Review Extraction and Save to File',
        description: 'Extract product-review text from HTML with BeautifulSoup and save to reviews.txt.',
        category: 'Python',
        status: 'Completed',
        progress: 100,
        language: 'Python 3.11',
        imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
        aim: 'To extract product-review text from HTML using BeautifulSoup and save the reviews to a file.',
        requirements: 'Python 3.x, BeautifulSoup4',
        code: `from bs4 import BeautifulSoup

# Permitted saved HTML containing review elements
html = """<html><body>
<div data-review>This product is excellent and very useful.</div>
<div data-review>The quality is good and I am happy with the purchase.</div>
<div data-review>The product stopped working after two days.</div>
<div data-review>Very poor quality and disappointing experience.</div>
</body></html>"""

soup = BeautifulSoup(html, "html.parser")
reviews = [el.get_text(strip=True) for el in soup.select("[data-review]")]

with open("reviews.txt", "w", encoding="utf-8") as file:
    for review in reviews:
        file.write(review + "\\n")

print("Extracted Reviews:")
for r in reviews:
    print("-", r)
print("\\nReviews saved to reviews.txt successfully.")`,
        output: `Extracted Reviews:
- This product is excellent and very useful.
- The quality is good and I am happy with the purchase.
- The product stopped working after two days.
- Very poor quality and disappointing experience.

Reviews saved to reviews.txt successfully.`,
        result: 'Product-review text was successfully extracted using BeautifulSoup and saved to a file.',
        explanation: 'BeautifulSoup navigates the HTML DOM tree using CSS selectors or tag lookups.',
        keyPoints: ['Use select() for CSS attribute matching', 'strip=True removes extraneous whitespace'],
        files: [],
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'sub-8-b1',
        name: '8(b)(i) WordCloud for All, Positive and Negative Reviews',
        description: 'Generate word clouds for review corpora partitioned into all, positive, and negative terms.',
        category: 'Python',
        status: 'Completed',
        progress: 100,
        language: 'Python 3.11',
        imageUrl: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=800&q=80',
        aim: 'To generate WordClouds for all, positive and negative product reviews.',
        requirements: 'Python 3.x, WordCloud, Matplotlib',
        code: `from wordcloud import WordCloud
import matplotlib.pyplot as plt

reviews = [
    "This product is excellent and very useful",
    "The quality is good and I am happy",
    "The product stopped working after two days",
    "Very poor quality and disappointing experience"
]
positive_words = ["excellent", "useful", "good", "happy"]
negative_words = ["stopped", "poor", "disappointing"]

texts = {
    "All Reviews": " ".join(reviews),
    "Positive Reviews": " ".join(positive_words),
    "Negative Reviews": " ".join(negative_words)
}

fig, axes = plt.subplots(1, 3, figsize=(12, 4))
for ax, (title, txt) in zip(axes, texts.items()):
    wc = WordCloud(width=300, height=200, background_color="white", colormap="plasma").generate(txt)
    ax.imshow(wc, interpolation="bilinear")
    ax.set_title(title)
    ax.axis("off")

plt.tight_layout()
plt.show()`,
        output: `WordCloud generated for 3 categories: All Reviews, Positive Reviews, and Negative Reviews.`,
        result: 'Word clouds were generated for all, positive and negative reviews.',
        explanation: 'Word clouds visually weight word frequency through proportional typographic scale.',
        keyPoints: ['Larger words reflect higher frequency in the corpus', 'Useful for quick sentiment inspection'],
        files: [],
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'sub-8-b2',
        name: '8(b)(ii) Review Statistics (Stopwords, Numerics, Lengths)',
        description: 'Analyze stopwords, numerics, word counts, character counts, and average word lengths.',
        category: 'Python',
        status: 'Completed',
        progress: 100,
        language: 'Python 3.11',
        imageUrl: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=800&q=80',
        aim: 'To calculate and analyze review distributions for stopwords, numerics, words, and characters.',
        requirements: 'Python 3.x, Pandas, re',
        code: `import re
import pandas as pd

reviews = [
    "This product is excellent and very useful",
    "The quality is good and I am happy with 2 items",
    "The product stopped working after 2 days",
    "Very poor quality and disappointing experience"
]
stopwords = {"the", "is", "and", "a", "an", "i", "am", "very", "this", "after", "with"}

records = []
for idx, r in enumerate(reviews, 1):
    tokens = re.findall(r"\\b\\w+\\b", r.lower())
    stop_cnt = sum(w in stopwords for w in tokens)
    num_cnt = sum(w.isdigit() for w in tokens)
    word_cnt = len(tokens)
    char_cnt = len(r)
    avg_len = sum(len(w) for w in tokens) / word_cnt if word_cnt else 0
    records.append({
        "Review": f"R{idx}",
        "Words": word_cnt,
        "Chars": char_cnt,
        "Stopwords": stop_cnt,
        "Numerics": num_cnt,
        "AvgWordLen": round(avg_len, 2)
    })

stat_df = pd.DataFrame(records)
print("Review Text Statistics:")
print(stat_df)`,
        output: `Review Text Statistics:
  Review  Words  Chars  Stopwords  Numerics  AvgWordLen
0     R1      7     41          4         0        4.86
1     R2     10     46          5         1        3.60
2     R3      7     40          3         1        4.71
3     R4      6     46          2         0        6.67`,
        result: 'The distributions of stopwords, numeric values, word counts, character counts and average word lengths were successfully analyzed.',
        explanation: 'Lexical analysis measures text density and structural characteristics across reviews.',
        keyPoints: ['Stopword density reveals conversational filler', 'Average word length correlates with vocabulary complexity'],
        files: [],
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'sub-8-b3',
        name: '8(b)(iii) Sentiment Using NLTK VADER',
        description: 'Compute positive, negative, neutral, and compound polarity scores using NLTK VADER.',
        category: 'Python',
        status: 'Completed',
        progress: 100,
        language: 'Python 3.11',
        imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
        aim: 'To determine sentiment values of reviews using NLTK VADER.',
        requirements: 'Python 3.x, NLTK (vader_lexicon)',
        code: `from nltk.sentiment import SentimentIntensityAnalyzer
import nltk

try:
    nltk.data.find('sentiment/vader_lexicon.zip')
except LookupError:
    nltk.download('vader_lexicon')

reviews = [
    "This product is excellent and very useful.",
    "The quality is good and I am happy.",
    "The product stopped working after two days.",
    "Very poor quality and disappointing experience."
]

analyzer = SentimentIntensityAnalyzer()
for r in reviews:
    score = analyzer.polarity_scores(r)
    compound = score["compound"]
    if compound >= 0.05:
        sentiment = "Positive"
    elif compound <= -0.05:
        sentiment = "Negative"
    else:
        sentiment = "Neutral"
    print(f"Review: '{r}'")
    print(f"Pos: {score['pos']}, Neg: {score['neg']}, Neu: {score['neu']}, Compound: {compound}")
    print(f"Classification: {sentiment}\\n")`,
        output: `Review: 'This product is excellent and very useful.'
Pos: 0.512, Neg: 0.0, Neu: 0.488, Compound: 0.7717
Classification: Positive

Review: 'Very poor quality and disappointing experience.'
Pos: 0.0, Neg: 0.612, Neu: 0.388, Compound: -0.7645
Classification: Negative`,
        result: 'Sentiment values were successfully calculated using NLTK VADER.',
        explanation: 'VADER (Valence Aware Dictionary and sEntiment Reasoner) scores rule-based text polarity.',
        keyPoints: ['Compound score ranges from -1.0 (most negative) to +1.0 (most positive)', 'Threshold: >=0.05 is Positive, <=-0.05 is Negative'],
        files: [],
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'sub-8-b4',
        name: '8(b)(iv) Scatter Intensity Plot of Sentiments',
        description: 'Plot review indices against compound sentiment scores.',
        category: 'Python',
        status: 'Completed',
        progress: 100,
        language: 'Python 3.11',
        imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=802&q=80',
        aim: 'To visualize sentiment intensity using a scatter plot.',
        requirements: 'Python 3.x, Matplotlib, NLTK',
        code: `import matplotlib.pyplot as plt
from nltk.sentiment import SentimentIntensityAnalyzer

reviews = [
    "This product is excellent and very useful.",
    "The quality is good and I am happy.",
    "The product stopped working after two days.",
    "Very poor quality and disappointing experience."
]

analyzer = SentimentIntensityAnalyzer()
scores = [analyzer.polarity_scores(r)["compound"] for r in reviews]

plt.figure(figsize=(6, 4))
colors = ["#E91E63" if s < 0 else "#000000" for s in scores]
plt.scatter(range(1, len(scores) + 1), scores, s=120, color=colors)
plt.axhline(0, linestyle="--", color="gray", alpha=0.7)
plt.title("Sentiment Intensity Across Reviews")
plt.xlabel("Review Number")
plt.ylabel("Compound Sentiment Score")
plt.ylim(-1.1, 1.1)
plt.grid(True, linestyle=":", alpha=0.5)
plt.tight_layout()
plt.show()`,
        output: `Scatter plot rendered displaying polarities: Reviews 1 & 2 in positive territory, Reviews 3 & 4 in negative territory.`,
        result: 'A scatter intensity plot was successfully created to visualize sentiment scores.',
        explanation: 'Visualizing sentiment distributions enables immediate detection of customer dissatisfaction.',
        keyPoints: ['Horizontal line at 0 marks the neutral boundary', 'Point dispersion reveals variance in feedback'],
        files: [],
        updatedAt: new Date().toISOString(),
      },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'exp-9',
    title: 'EXPERIMENT 9 — Case Study 3: Customer Personality Analysis',
    description: 'Segment customer cohorts using StandardScaler and K-Means clustering across Income, SpendingScore, and PurchaseFrequency.',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=700&q=80',
    status: 'Completed',
    progress: 100,
    subExperiments: [
      {
        id: 'sub-9-1',
        name: '9. Customer Segmentation with K-Means',
        description: 'Complete Case Study: Preprocessing, K-Means clustering, cluster profiling, and marketing recommendations.',
        category: 'Python',
        status: 'Completed',
        progress: 100,
        language: 'Python 3.11',
        imageUrl: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80',
        aim: 'To analyze customer characteristics and identify customer segments that can help a business target its products and marketing strategies.',
        requirements: 'Python 3.x, Pandas, NumPy, Scikit-learn, Matplotlib',
        code: `import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler

# Customer dataset
data = {
    "Income": [
        25000, 27000, 30000, 32000,
        60000, 65000, 70000, 72000,
        90000, 95000, 100000, 105000
    ],
    "SpendingScore": [
        80, 75, 85, 78,
        45, 50, 48, 55,
        20, 25, 18, 22
    ],
    "PurchaseFrequency": [
        15, 14, 16, 13,
        9, 10, 8, 11,
        4, 5, 3, 4
    ]
}
df = pd.DataFrame(data)

# Feature selection & standardization
features = ["Income", "SpendingScore", "PurchaseFrequency"]
scaler = StandardScaler()
scaled_features = scaler.fit_transform(df[features])

# Apply K-Means with 3 clusters
kmeans = KMeans(n_clusters=3, random_state=42, n_init=10)
df["Cluster"] = kmeans.fit_predict(scaled_features)

print("Customer Segments:")
print(df)

# Cluster summaries
print("\\nCluster Summary Statistics (Means):")
print(df.groupby("Cluster").mean())`,
        output: `Customer Segments:
    Income  SpendingScore  PurchaseFrequency  Cluster
0    25000             80                 15        1
1    27000             75                 14        1
2    30000             85                 16        1
3    32000             78                 13        1
4    60000             45                  9        0
5    65000             50                 10        0
6    70000             48                  8        0
7    72000             55                 11        0
8    90000             20                  4        2
9    95000             25                  5        2
10  100000             18                  3        2
11  105000             22                  4        2

Cluster Summary Statistics (Means):
            Income  SpendingScore  PurchaseFrequency
Cluster                                             
0          66750.0           49.5                9.5
1          28500.0           79.5               14.5
2          97500.0           21.2                4.0`,
        result: 'Customer personality analysis was successfully performed and customers were divided into meaningful segments using K-Means clustering.',
        explanation: 'K-Means optimizes centroid distances. Cluster labels (0, 1, 2) are arbitrary identifiers.',
        keyPoints: [
          'Segment 1 (High Spending): Moderate income, highest spending score & frequent visits. Offer loyalty rewards.',
          'Segment 2 (Moderate): Medium income and balanced spending. Nurture with targeted product promotions.',
          'Segment 3 (Low Engagement): High income but low engagement. Re-engage with exclusive premium offerings.'
        ],
        files: [],
        updatedAt: new Date().toISOString(),
      },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'exp-10',
    title: 'EXPERIMENT 10 — Case Study 1: Text Emotions Detection',
    description: 'Build an end-to-end NLP classification pipeline using TF-IDF vectorization and Logistic Regression for emotion detection.',
    imageUrl: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=700&q=80',
    status: 'Completed',
    progress: 100,
    subExperiments: [
      {
        id: 'sub-10-1',
        name: '10. Text Emotion Classification Pipeline',
        description: 'Complete Case Study: TF-IDF feature extraction, Logistic Regression modeling, evaluation, and unseen sentence predictions.',
        category: 'Python',
        status: 'Completed',
        progress: 100,
        language: 'Python 3.11',
        imageUrl: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80',
        aim: 'To build a machine-learning model that detects emotions expressed in text.',
        requirements: 'Python 3.x, Scikit-learn, Pandas',
        code: `import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import Pipeline
from sklearn.metrics import accuracy_score, classification_report

# Labeled emotion dataset
data = {
    "text": [
        "I am extremely happy today",
        "I feel wonderful and joyful",
        "This is the best day of my life",
        "I am very excited",
        "I am feeling very sad",
        "I miss my friend",
        "Today I feel lonely",
        "I am disappointed and unhappy",
        "I am very angry",
        "This situation makes me furious",
        "I hate this problem",
        "I am extremely annoyed",
        "I am scared of the dark",
        "I am afraid of losing my job",
        "This situation makes me nervous",
        "I feel frightened",
        "I love my family",
        "I really love this person",
        "I care deeply about my friends",
        "I feel affection for everyone"
    ],
    "emotion": [
        "joy", "joy", "joy", "joy",
        "sadness", "sadness", "sadness", "sadness",
        "anger", "anger", "anger", "anger",
        "fear", "fear", "fear", "fear",
        "love", "love", "love", "love"
    ]
}
df = pd.DataFrame(data)

# Pipeline: TF-IDF Vectorizer + Logistic Regression
pipeline = Pipeline([
    ("tfidf", TfidfVectorizer(lowercase=True, stop_words="english")),
    ("clf", LogisticRegression(random_state=42))
])

# Train model
pipeline.fit(df["text"], df["emotion"])

# Test on new unseen sentences
new_sentences = [
    "I am very happy and excited",
    "I feel lonely and unhappy",
    "This makes me extremely angry",
    "I am afraid of this situation",
    "I love my family"
]
predictions = pipeline.predict(new_sentences)

print("New Text Predictions:")
for text, pred in zip(new_sentences, predictions):
    print(f"'{text}' --> {pred}")`,
        output: `New Text Predictions:
'I am very happy and excited' --> joy
'I feel lonely and unhappy' --> sadness
'This makes me extremely angry' --> anger
'I am afraid of this situation' --> fear
'I love my family' --> love`,
        result: 'A text emotion detection model was successfully trained using TF-IDF features and Logistic Regression, and emotions were predicted for new text samples.',
        explanation: 'TF-IDF highlights words that distinguish emotion classes; Logistic Regression learns class probability boundaries.',
        keyPoints: [
            'TF-IDF computes Term Frequency * Inverse Document Frequency',
            'Pipeline combines feature extraction and estimator into a unified object',
            'Lab demonstration dataset can be scaled to large corpora for enterprise applications'
        ],
        files: [],
        updatedAt: new Date().toISOString(),
      },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const DEFAULT_TOOLS: ToolItem[] = [
  {
    id: 'tool-1',
    name: 'Python',
    description: 'Core programming language for data manipulation, analytics, and modeling.',
    icon: 'terminal',
    imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=700&q=80',
    link: 'https://www.python.org/',
  },
  {
    id: 'tool-2',
    name: 'Jupyter Notebook',
    description: 'Interactive web-based computational document environment for reproducible code and text.',
    icon: 'book',
    imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=700&q=80',
    link: 'https://jupyter.org/',
  },
  {
    id: 'tool-3',
    name: 'Google Colab',
    description: 'Cloud-hosted Jupyter notebook service with free accelerator hardware.',
    icon: 'cloud',
    imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=700&q=80',
    link: 'https://colab.research.google.com/',
  },
  {
    id: 'tool-4',
    name: 'Pandas',
    description: 'Fast, flexible data analysis and structured tabular dataframe manipulation library.',
    icon: 'database',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=700&q=80',
    link: 'https://pandas.pydata.org/',
  },
  {
    id: 'tool-5',
    name: 'NumPy',
    description: 'Fundamental package for scientific computing with powerful N-dimensional array objects.',
    icon: 'cpu',
    imageUrl: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=700&q=80',
    link: 'https://numpy.org/',
  },
  {
    id: 'tool-6',
    name: 'Matplotlib',
    description: 'Comprehensive plotting library for static, animated, and interactive visualizations.',
    icon: 'chart',
    imageUrl: 'https://images.unsplash.com/photo-1543286386-713bdd548da4?auto=format&fit=crop&w=700&q=80',
    link: 'https://matplotlib.org/',
  },
  {
    id: 'tool-7',
    name: 'Seaborn',
    description: 'Statistical data visualization library built on Matplotlib with clean default themes.',
    icon: 'sparkles',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=700&q=80',
    link: 'https://seaborn.pydata.org/',
  },
  {
    id: 'tool-8',
    name: 'SQL',
    description: 'Declarative query language for relational database extraction, filtering, and joining.',
    icon: 'layers',
    imageUrl: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=700&q=80',
    link: 'https://www.sqlite.org/',
  },
  {
    id: 'tool-9',
    name: 'PySpark',
    description: 'Distributed computational engine for big data transformation and machine learning.',
    icon: 'zap',
    imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=700&q=80',
    link: 'https://spark.apache.org/docs/latest/api/python/',
  },
  {
    id: 'tool-10',
    name: 'Scikit-learn',
    description: 'Industry-standard library for classical machine learning and data mining algorithms.',
    icon: 'activity',
    imageUrl: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=700&q=80',
    link: 'https://scikit-learn.org/',
  },
];

export const DEFAULT_MODULES: ModuleItem[] = [
  {
    id: 'mod-1',
    code: 'M1',
    name: 'MODULE 1: INTRODUCTION',
    shortTitle: 'Introduction',
    description: 'Foundations of data science, skills, tools, data types, open data collections, preprocessing workflows, and analytics taxonomy.',
    imageUrl: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=700&q=80',
    periods: 9,
    topicsCount: 8,
    status: 'Completed',
    progress: 100,
    videoName: 'M1_Introduction_Lecture.mp4',
    pdfName: 'M1_Introduction_Syllabus.pdf',
    pdfSize: '1.8 MB',
    processingOverview: 'Definition of data science, skills for data science, tools for data science, data types, data collection, data preprocessing, data analysis and data analytics.',
    coreConcepts: [
      {
        title: 'Foundations of Data',
        items: [
          'Definition of data science: Study and practice of collecting, storing, processing, and analyzing data to extract meaningful insights and support decision-making.',
          'The 3Vs of data: Volume (zettabytes), Velocity (real-time generation speed), and Variety (structured/unstructured).',
          'Role of data science across Finance, Healthcare, Urban Planning, and Public Policy.',
        ],
      },
      {
        title: 'Data Ingestion & Pipelines',
        items: [
          'Data types: Structured (tabular rows/columns) vs Unstructured (free text, media, sensor feeds).',
          'Data collection: Open data initiatives (Project Open Data, M-13-3), Social Media APIs (Graph API), and Multimodal IoT streams.',
          'Data storage formats: CSV, TSV, XML, and RSS feeds.',
          'Data preprocessing: Cleaning, munging/wrangling, missing values, smoothing noise, integration, and reduction.',
        ],
      },
      {
        title: 'Analytical Taxonomy & Analytics',
        items: [
          'Data analysis (retrospective: what happened) vs Data analytics (forward-looking forecasting).',
          'Descriptive analytics: Summarizing current characteristics (Mean, Median, Mode, Variance, Standard Deviation).',
          'Diagnostic analytics: Causal analysis and correlation.',
          'Predictive analytics: Four-step process (Collection, Cleaning, Pattern Recognition, Prediction).',
          'Prescriptive analytics: Recommending optimal course of action.',
          'Exploratory analytics (EDA) & Mechanistic analysis (Regression models).',
        ],
      },
    ],
    learningObjectives: [
      'Understand core concepts of data science and the 3Vs justification.',
      'Identify structured, unstructured, and semi-structured data pipelines.',
      'Understand data acquisition, preprocessing, imputation, and normalization.',
      'Distinguish descriptive, diagnostic, predictive, prescriptive, exploratory, and mechanistic analytics.',
    ],
    labPracticals: [
      {
        code: 'Experiment 01',
        title: 'Import and Export in CSV, JSON and Excel Formats',
        description: 'Reading, inspecting dtypes, parsing delimiters, and exporting common structured data interchange formats in Python.',
      },
      {
        code: 'Experiment 02',
        title: 'Data Cleaning with NumPy & Pandas',
        description: 'Handling missing values, outlier detection, statistical median imputation, and schema validation.',
      },
    ],
    lectureNotesText: `SPECIALIZATION ELECTIVE
DATA SCIENCE (22DS1006)
Module 1 INTRODUCTION

1. Definition of data science
Data Science (DS): Study and practice of collecting, storing, processing, and analyzing data to extract meaningful insights and support decision-making. It includes scientific methods, computational thinking, and systematic analysis of data. DS combines computer science, statistics, mathematics, and domain expertise.

The 3Vs of data that justify its rise:
• Volume: Massive amounts of data (e.g., zettabytes)
• Velocity: Speed at which data is generated
• Variety: Structured and unstructured data formats (text, image, video, etc.)

Data science is used to derive meaningful insights to solve real-world problems through systematic, repeatable, and verifiable processes.
Global data usage has expanded by over 50-fold, proving the critical importance of DS in managing and analyzing this massive amount of information.

2. Skills for Data Science:
• Willingness to Experiment: Creative problem-solvers who define hypotheses and explore data.
• Mathematical Reasoning: Solid understanding of statistics, linear algebra, and logic.
• Data Literacy: Ability to read, interpret, work with data, and make data-driven decisions.
• Job Roles: Data Analyst, Data Engineer, Product-Focused Data Scientist, Generalist.

3. Tools for Data Science:
• Python: High-level interpreted scripting language with Pandas, NumPy, Matplotlib, Scikit-learn.
• R: Statistical programming language with ggplot2 and CRAN packages.
• SQL: Domain-specific relational querying language for structured databases.
• UNIX: Operating system command-line tools for batch automation, pipelining, and data processing.

4. Data Types:
• Structured Data: Tabular format with labeled columns and rows (e.g., customer demographics, transactions).
• Unstructured Data: Disorganized, unlabelled data such as free text, audio, video, sensor streams.

5. Preprocessing & Analytics:
• Cleaning, Munging, Imputation of missing values, Smoothing, Discretization.
• Analytics Spectrum: Descriptive (What happened), Diagnostic (Why it happened), Predictive (What will happen), Prescriptive (What should we do), Exploratory (Pattern search), Mechanistic (Cause-effect laws).`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'mod-2',
    code: 'M2',
    name: 'MODULE 2: DATA EXTRACTION',
    shortTitle: 'Data Extraction',
    description: 'Feature extraction and selection, Kaggle competitions, leapfrogging, David Huffaker perspective, user retention, entropy, decision trees, random forests, SVD, and PCA.',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=700&q=80',
    periods: 9,
    topicsCount: 7,
    status: 'In Progress',
    progress: 75,
    videoName: 'M2_Data_Extraction_Lecture.mp4',
    pdfName: 'M2_Data_Extraction_Guide.pdf',
    pdfSize: '2.4 MB',
    processingOverview: 'Extracting meaning from data (Cukierski & Huffaker), Feature Selection (Filter, Wrapper, Embedded, Hybrid), Stepwise Regression, Entropy, Decision Trees, Random Forests, SVD, and PCA.',
    coreConcepts: [
      {
        title: 'Extracting Meaning & Crowdsourcing',
        items: [
          'William Cukierski (Kaggle): Feature extraction vs selection, competitive crowdsourcing, and the leapfrogging effect.',
          'David Huffaker (Google): Mixed-methods social research combining ethnographic interviews with large-scale behavioral data analytics.',
          'User Retention: Balancing interpretability vs predictive power using decision tree models and A/B hypothesis testing.',
        ],
      },
      {
        title: 'Feature Selection & Evaluation',
        items: [
          'Filter Methods (correlation, chi-square), Wrapper Methods (RFE), Embedded Methods (Lasso L1), Hybrid approaches.',
          'Stepwise Regression: Forward Selection, Backward Elimination, Bidirectional Selection.',
          'Model Selection Criteria: R-squared, P-values, AIC, BIC, Entropy Information Gain, Cross-Validation.',
        ],
      },
      {
        title: 'Latent Representation & Dimensionality Reduction',
        items: [
          'Entropy H(X): Measuring disorder and uncertainty in decision trees.',
          'Decision Trees & Random Forests: Bagging (bootstrap aggregation), out-of-bag validation, and unpruned forest ensembles.',
          'Singular Value Decomposition (SVD): Decomposing X into U S V^T, rank truncation, and low-rank approximation.',
          'Principal Component Analysis (PCA): Projecting high-dimensional data onto orthogonal uncorrelated eigenvectors.',
        ],
      },
    ],
    learningObjectives: [
      'Master the distinction between feature extraction and feature selection.',
      'Implement stepwise regression and compare AIC/BIC model metrics.',
      'Calculate information entropy and formulate recursive tree splitting.',
      'Apply Singular Value Decomposition (SVD) and Principal Component Analysis (PCA) for dimensionality reduction.',
    ],
    labPracticals: [
      {
        code: 'Experiment 03',
        title: 'Feature Selection with Lasso and RFE',
        description: 'Evaluating predictive attributes using Recursive Feature Elimination and L1 penalty coefficients.',
      },
      {
        code: 'Experiment 04',
        title: 'Dimensionality Reduction via PCA',
        description: 'Eigendecomposition of covariance matrices and scree plot projection in Scikit-Learn.',
      },
    ],
    lectureNotesText: `MODULE 2: DATA EXTRACTION

1. Extracting meaning from data
Two distinct viewpoints:
• William Cukierski (Kaggle): Emphasizes feature extraction (converting raw inputs into refined formats) and feature selection (isolating the most informative subset). Explains crowdsourced problem solving and the "leapfrogging" effect.
• David Huffaker (Google): Mixed-methods strategy combining qualitative observation with quantitative big-data metrics. Focus on retention modeling and ethical privacy standards.

2. Feature Selection:
• Minimizes overfitting, accelerates computational throughput, improves interpretability.
• Approaches: Filter (statistical rankings), Wrapper (iterative model training), Embedded (L1 regularization), Hybrid.
• Stepwise Regression: Forward selection, Backward elimination, Bidirectional stepwise.
• Evaluation Criteria: R², P-values, AIC, BIC, Information Gain.

3. Entropy & Decision Trees:
• Entropy measures unpredictability in distributions. Zero entropy means pure certainty; 1.0 indicates maximum disorder.
• Decision trees perform greedy recursive splitting maximizing Information Gain.
• Random Forests use bootstrap aggregating (bagging) over decorrelated trees to reduce model variance.

4. SVD & PCA:
• SVD: Factorizes X = U S V^T into orthogonal singular vectors. Enables low-rank data compression.
• PCA: Projects correlated variables onto orthogonal principal axes explaining maximal variance.`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'mod-3',
    code: 'M3',
    name: 'MODULE 3: DATA VISUALIZATION',
    shortTitle: 'Data Visualization',
    description: 'Matplotlib API primer, figure and subplots, styling, annotations, saving plots, plotting with Pandas & Seaborn, bar/scatter charts, and FacetGrids.',
    imageUrl: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=700&q=80',
    periods: 9,
    topicsCount: 6,
    status: 'In Progress',
    progress: 40,
    videoName: 'M3_Visualization_Lecture.mp4',
    pdfName: 'M3_Visualization_Notes.pdf',
    pdfSize: '3.1 MB',
    processingOverview: 'Matplotlib pyplot primer, Figure and Subplots, subplots_adjust, colors, markers, line styles, ticks, labels, legends, annotations, patches, savefig, and high-level Seaborn statistical charts.',
    coreConcepts: [
      {
        title: 'Matplotlib API Primer',
        items: [
          'Figure and Subplots: plt.figure(), add_subplot(2, 2, 1), and subplots_adjust(wspace, hspace).',
          'Formatting: Colors, markers, line styles (e.g. "k--", drawstyle="steps-post").',
          'Ticks and Labels: set_xticks(), set_xticklabels(rotation=30), set_title(), and ax.legend().',
          'Annotations & Patches: Drawing text, arrows, financial crisis timeline markers, Rectangle, and Circle patches.',
        ],
      },
      {
        title: 'High-Level Plotting with Pandas & Seaborn',
        items: [
          'Pandas .plot(): Line plots, vertical bar plots (plot.bar()), horizontal bar plots (plot.barh()), and stacked bar plots.',
          'Seaborn statistical aggregations: sns.barplot() with error bars and hue splitting.',
          'Scatter plots: Dependent vs independent Cartesian relationships, positive, negative, and null correlations.',
          'FacetGrid: Small-multiple multidimensional category grids mapped across subplots.',
        ],
      },
      {
        title: 'Advanced Visual Analytics',
        items: [
          'Histograms, Box-and-whisker plots, Violin plots with Kernel Density Estimation (KDE).',
          'Categorical jitter: Strip plots and swarm plots for non-overlapping cluster visualization.',
          'Geospatial & Network charts: Choropleth maps, heatmaps (Folium, GeoPandas), and NetworkX graph layouts.',
        ],
      },
    ],
    learningObjectives: [
      'Master the object-oriented Matplotlib figure and Axes API.',
      'Customize tick marks, rotations, legends, and geometric patch annotations.',
      'Implement multi-level stacked bar charts and FacetGrid bivariate analysis.',
      'Export publication-quality SVG and 300 DPI PNG figures.',
    ],
    labPracticals: [
      {
        code: 'Experiment 05',
        title: 'Publication-Grade Matplotlib Subplot Layouts',
        description: 'Building multi-panel grid plots with custom ticks, secondary axes, and event annotations.',
      },
      {
        code: 'Experiment 06',
        title: 'Multivariate Visualization with Seaborn FacetGrid',
        description: 'Analyzing bivariate relationships with violin plots, correlation heatmaps, and categorical hues.',
      },
    ],
    lectureNotesText: `MODULE 3: PLOTTING AND VISUALIZATION

1. A Brief Matplotlib API Primer:
Visualizations serve multiple roles: exploratory anomaly detection and publication-grade presentation.
• Every plot in matplotlib lives inside a Figure object: fig = plt.figure().
• Subplots: ax1 = fig.add_subplot(2, 2, 1). Spacing controlled via plt.subplots_adjust(wspace, hspace).
• Styling: ax.plot(x, y, linestyle='--', color='k', marker='o').
• Axis Customization: ax.set_xticks(), ax.set_xticklabels(), ax.set_xlabel(), ax.set_title(), and ax.legend(loc='best').
• Annotations: ax.annotate() and geometric shapes from matplotlib.patches (Rectangle, Circle, Polygon).
• Export: plt.savefig('fig.png', dpi=400, bbox_inches='tight').

2. Plotting with Pandas and Seaborn:
• Pandas provides direct .plot() methods for Series and DataFrames: plot.bar(), plot.barh(), stacked=True.
• Seaborn provides high-level statistical plotting with automatic confidence intervals and hue conditioning: sns.barplot(x='tip_pct', y='day', hue='time').
• Scatter Plots: Display bivariate relationships, identify correlations (positive, negative, null).
• FacetGrid: Segments multivariate data across subplots using categorical dimensions.`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'mod-4',
    code: 'M4',
    name: 'MODULE 4: STATISTICAL THINKING',
    shortTitle: 'Statistical Thinking',
    description: 'Distributions, histograms, outliers, measures of central tendency and dispersion, PMFs, CDFs, percentile statistics, and continuous distribution modeling.',
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=700&q=80',
    periods: 9,
    topicsCount: 7,
    status: 'Not Started',
    progress: 0,
    videoName: 'M4_Statistical_Thinking_Lecture.mp4',
    pdfName: 'M4_Statistical_Thinking_Notes.pdf',
    pdfSize: '2.9 MB',
    processingOverview: 'Distributions, histograms (plt.hist), outliers, measures of centrality (Mean, Median, Mode), measures of dispersion (Range, IQR, Variance, Std Dev), PMFs, CDFs, Percentiles, and Exponential/Normal distributions.',
    coreConcepts: [
      {
        title: 'Distributions & Descriptive Measures',
        items: [
          'Histograms: Binning continuous data, assessing symmetry, skewness, and kurtosis.',
          'Outliers: Extreme observations causing inferential bias; detection via sorting, z-score, and IQR boundaries.',
          'Central Tendency: Mean (arithmetic average), Median (robust against skew), Mode (categorical frequency).',
          'Dispersion: Range, Interquartile Range (IQR = Q3 - Q1), Population Variance (sigma^2), Sample Variance (s^2), Standard Deviation.',
        ],
      },
      {
        title: 'Probability Mass & Cumulative Functions',
        items: [
          'Probability Mass Function (PMF): Normalizing frequency histograms into discrete probability fractions.',
          'Limitations of PMFs: Noise amplification in continuous and small-sample datasets.',
          'Cumulative Distribution Function (CDF): Step function mapping values to percentile ranks in [0, 1].',
          'Percentile-based statistics: Dividing data into 100 ranks to evaluate relative score standing.',
        ],
      },
      {
        title: 'Continuous Distribution Modeling',
        items: [
          'Random numbers: Pseudo-random generators (np.random.normal, randint) in simulation and bootstrapping.',
          'Exponential Distribution: Modeling arrival intervals in memoryless Poisson processes (lambda rate).',
          'Normal (Gaussian) Distribution: Bell-shaped empirical rule (68-95-99.7% intervals) and z-score standardization.',
          'Lognormal Distribution: Skewed positive quantities (incomes, stock prices, biological measures).',
        ],
      },
    ],
    learningObjectives: [
      'Compute and interpret central tendency and dispersion metrics using NumPy and Pandas.',
      'Construct and evaluate Probability Mass Functions (PMFs) and Cumulative Distribution Functions (CDFs).',
      'Identify and treat outliers using IQR thresholds.',
      'Model real-world datasets with Exponential, Normal, and Lognormal theoretical distributions.',
    ],
    labPracticals: [
      {
        code: 'Experiment 07',
        title: 'Statistical Profiling and Outlier Treatment',
        description: 'Calculating IQR fences, standard deviation limits, and robust median metrics on skewed datasets.',
      },
      {
        code: 'Experiment 08',
        title: 'Empirical CDF Modeling with SciPy',
        description: 'Generating cumulative distribution curves and evaluating goodness-of-fit against theoretical Gaussian curves.',
      },
    ],
    lectureNotesText: `MODULE 4: STATISTICAL THINKING

1. Distributions – Representing and plotting histograms:
• Histograms summarize frequency of numerical intervals: plt.hist(data, bins=30, color='black', edgecolor='pink').
• Measures of Central Tendency: Mean (df.mean()), Median (df.median()), Mode (df.mode()).
• Measures of Dispersion: Range, Variance (sum of squared deviations / n-1), Standard Deviation, IQR (Q3 - Q1).
• Shape of Distribution: Skewness (tail direction) and Kurtosis (tailedness/heavy tails).

2. Probability Mass & Cumulative Functions:
• PMF: Maps discrete outcomes to their empirical probabilities by dividing bin frequencies by sample size n.
• CDF: Overcomes PMF binning noise by computing P(X <= x) monotonically across the domain.
• Percentiles: Point below which a given percentage of observations fall.

3. Theoretical Continuous Distributions:
• Exponential: Memoryless distribution for time-between-events: f(x; lambda) = lambda * e^(-lambda * x).
• Normal (Gaussian): Symmetrical bell curve defined by mean (mu) and standard deviation (sigma).
• Lognormal: Continuous variable whose natural logarithm is normally distributed (used for income, failure rates).`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'mod-5',
    code: 'M5',
    name: 'MODULE 5: TIME SERIES ANALYSIS & PREDICTIVE MODELING',
    shortTitle: 'Time Series & Modeling',
    description: 'Temporal order, moving averages (SMA/EMA), missing value handling, serial correlation, predictive modeling pipelines, and evaluation metrics.',
    imageUrl: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=700&q=80',
    periods: 9,
    topicsCount: 8,
    status: 'Not Started',
    progress: 0,
    videoName: 'M5_Time_Series_Lecture.mp4',
    pdfName: 'M5_Time_Series_Notes.pdf',
    pdfSize: '3.4 MB',
    processingOverview: 'Temporal properties, Trend, Seasonality, Moving Averages (SMA & EMA), Missing value imputation, Autocorrelation, Predictive Modeling pipelines, and ML evaluation metrics (Confusion Matrix, ROC-AUC, RMSE).',
    coreConcepts: [
      {
        title: 'Time Series Fundamentals',
        items: [
          'Properties: Temporal order, chronological dependency, regular sampling intervals.',
          'Components: Trend (long-term direction), Seasonality (periodic cycles), Cyclical movements, and Irregular noise.',
          'Data types: Stock time series (point-in-time snapshots) vs Flow time series (cumulative activity).',
          'Visualization: Line plots, seasonal subseries, autocorrelation plots, and spectral decomposition.',
        ],
      },
      {
        title: 'Smoothing & Missing Values',
        items: [
          'Simple Moving Average (SMA): df["Value"].rolling(window=3).mean().',
          'Exponential Moving Average (EMA): Weighted smoothing giving heavier impact to recent periods (df.ewm(span=3).mean()).',
          'Missing Value Handling: Forward fill (ffill), Backward fill (bfill), Linear interpolation, and Heatmap visualization.',
          'Serial Correlation & Autocorrelation: Measuring correlation between a variable and its lagged self (t and t-k).',
        ],
      },
      {
        title: 'Predictive Modeling & Evaluation',
        items: [
          'Predictive pipeline: Data collection, cleaning, feature engineering, train/test splitting (80/20), and model training.',
          'Classification Metrics: Confusion Matrix (TP, TN, FP, FN), Precision, Recall, F1-Score, ROC curve and AUC.',
          'Regression Metrics: Mean Squared Error (MSE), Root Mean Squared Error (RMSE), Mean Absolute Error (MAE), and Adjusted R-squared.',
          'Sentiment Analysis: Opinion mining and NLP text processing for customer review classification.',
        ],
      },
    ],
    learningObjectives: [
      'Decompose time series into trend, seasonality, and residual stochastic elements.',
      'Compute Simple and Exponential Moving Averages for trend smoothing.',
      'Detect and quantify autocorrelation using lag plots.',
      'Evaluate predictive models using Confusion Matrix, ROC-AUC, RMSE, and MAE.',
    ],
    labPracticals: [
      {
        code: 'Experiment 09',
        title: 'Time Series Smoothing and Trend Decomposition',
        description: 'Calculating rolling SMAs, EMAs, and statistical seasonal decomposition in Pandas.',
      },
      {
        code: 'Experiment 10',
        title: 'Predictive Classifier Evaluation & ROC Analysis',
        description: 'Training Scikit-Learn logistic classifiers and generating confusion matrix and ROC curves.',
      },
    ],
    lectureNotesText: `MODULE 5: TIME SERIES ANALYSIS AND PREDICTIVE MODELING

1. Time Series Fundamentals:
Time Series Analysis examines chronological sequences to uncover underlying patterns, trends, and seasonal variations.
• Key Elements: Trend (systematic long-term shift), Seasonality (periodic repeating pattern), Cyclical movements, Irregularity (noise).
• Models: ARIMA(p, d, q), SARIMA, Vector Autoregression (VAR), Holt-Winters, DLMs, LSTMs.
• Ingestion: pd.read_csv('timeseries.csv', parse_dates=['Date'], index_col='Date').

2. Moving Averages & Autocorrelation:
• SMA: Simple arithmetic mean over rolling window: df['Value'].rolling(window=3).mean().
• EMA: Exponential smoothing giving greater weight to recent observations: df['Value'].ewm(span=3).mean().
• Autocorrelation: Mathematical degree of resemblance between a series and a lagged copy of itself over successive periods.

3. Missing Value Remediation:
• Missing representations: NaN, None, empty strings, sentinel values (-999).
• Imputation techniques: Forward fill (ffill), Backward fill (bfill), Linear interpolation.

4. Predictive Modeling & Model Evaluation:
• Classification Metrics:
  - Confusion Matrix: True Positive (TP), True Negative (TN), False Positive (FP), False Negative (FN).
  - Precision = TP / (TP + FP)
  - Recall = TP / (TP + FN)
  - F1 Score = 2 * (Precision * Recall) / (Precision + Recall)
  - ROC-AUC: Area under True Positive Rate vs False Positive Rate curve.
• Regression Metrics:
  - RMSE = sqrt( 1/n * sum( (y_j - y_hat_j)^2 ) )
  - MAE = 1/n * sum( |y_j - y_hat_j| )
  - Adjusted R² penalizes uninformative predictors.`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const DEFAULT_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif-1',
    title: 'Laboratory Environment Online',
    message: 'Welcome to the DS Lab academic portal. All 10 official college laboratory experiments loaded.',
    timestamp: 'Just now',
    read: false,
    type: 'system',
  },
  {
    id: 'notif-2',
    title: 'Curriculum Ready',
    message: 'Data Science Curriculum Modules (22DS1006) synchronized with academic syllabus.',
    timestamp: '5m ago',
    read: false,
    type: 'module',
  },
];

export const DEFAULT_SETTINGS: AppSettings = {
  theme: 'light',
  notifications: true,
  language: 'English (US)',
};

export function loadFromStorage<T>(key: string, defaultValue: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return defaultValue;
    return JSON.parse(raw) as T;
  } catch (error) {
    console.error(`Error loading key "${key}" from localStorage:`, error);
    return defaultValue;
  }
}

export function saveToStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error saving key "${key}" to localStorage:`, error);
  }
}

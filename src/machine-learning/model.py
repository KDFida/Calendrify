import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, r2_score
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from joblib import dump

cred = credentials.Certificate('C:\\Users\\Fidak\\OneDrive\\Desktop\\Uni\\Year 3\\COMP390\\calendrify\\calendrify-589da-firebase-adminsdk-b0jd4-fcdd62c94b.json')
firebase_admin.initialize_app(cred)

db = firestore.client()

tasks_ref = db.collection(u'tasks')
docs = tasks_ref.stream()

tasks_data = []
for doc in docs:
    task = doc.to_dict()
    tasks_data.append(task)

print(tasks_data)

df = pd.DataFrame(tasks_data)

priority_mapping = {'low': 1, 'medium': 2, 'high': 3}
df['priority_in_numbers'] = df['priority'].map(priority_mapping)

df['priority_in_numbers'].fillna(1, inplace=True)

df['estimatedHours'].fillna(df['estimatedHours'].mean(), inplace=True)
df['actualHours'].fillna(df['estimatedHours'], inplace=True)

X = df[['estimatedHours', 'priority_in_numbers']]
y = df['actualHours']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

model = LinearRegression()
model.fit(X_train, y_train)

y_pred = model.predict(X_test)

mse = mean_squared_error(y_test, y_pred)
r2 = r2_score(y_test, y_pred)

print(f"Mean Squared Error: {mse}")
print(f"R^2 Score: {r2}")

dump(model, 'C:\\Users\\Fidak\\OneDrive\\Desktop\\Uni\\Year 3\\COMP390\\calendrify\\prediction_model.joblib')
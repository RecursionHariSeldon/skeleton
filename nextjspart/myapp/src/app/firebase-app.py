'''
import firebase_admin
from firebase_admin import credentials, firestore

# Initialize Firebase
cred = credentials.Certificate("serviceAccountKey.json")
firebase_admin.initialize_app(cred)
db = firestore.client()

def add_student(name, ds, dsm):
    # Add student data with calculated average
    avg = (ds + dsm) / 2


    docu_ref = db.collection("students").document("idno")
    id = docu_ref.get().to_dict()["num"]
    docu_ref.set({
        "num":id+1
    })
    id = docu_ref.get().to_dict()["num"]


    doc_ref = db.collection("students").document()
    doc_ref.set({
        "id":id,
        "name": name,
        "ds": ds,
        "dsm": dsm,
        "avg": avg
    })
    
    print(f"Added student: {name}, Average: {avg}")

def get_students_with_min_avg(min_avg):
    # Query the "students" collection for students with an average score above `min_avg`
    students_ref = db.collection("students")
    query = students_ref.where("avg", ">=", min_avg)

    docs = query.get()

    # Print each student meeting the criteria
    for doc in docs:
        print(f"{doc.id} => {doc.to_dict()}")

if __name__ == "__main__":
    # Example usage: manually adding a student
    add_student("Test Student", 80, 85)
    add_student("Test Student1", 40, 8)
    add_student("Test Student2", 80, 10)
    add_student("Test Student3", 80, 100)
    get_students_with_min_avg(57)

    '''
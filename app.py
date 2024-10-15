from flask import Flask
from flask import jsonify
from flask import request
from flask import render_template
from tasks import TaskManager

app = Flask(__name__)

task_manager = TaskManager()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/add_task', methods=['POST'])
def add_task():
    data = request.json
    if 'task_name' not in data or 'priority' not in data or 'deadline' not in data:
        return jsonify({'error': 'Missing data'}), 400

    task_name = data['task_name']
    priority = data['priority']
    deadline = data['deadline']
    time = data.get('time', '00:00')

    task_manager.add_task(task_name, priority, deadline, time)
    
    return jsonify({'tasks': task_manager.get_all_tasks()}), 201

@app.route('/delete_task/<task_name>', methods=['DELETE'])
def delete_task(task_name):
    if not task_manager.remove_task(task_name):
        return jsonify({'error': 'Task not found'}), 404
    return jsonify({'tasks': task_manager.get_all_tasks()})

if __name__ == '__main__':
    app.run(debug=True)

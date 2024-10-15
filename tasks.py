import heapq
from datetime import datetime

class Task:
    def __init__(self, task_name, priority, deadline, time, status='active'):
        self.task_name = task_name
        self.priority = priority
        self.deadline = deadline
        self.time = time
        self.status = status

    def __lt__(self, other):
        if self.priority == other.priority:
            return self.deadline < other.deadline
        return self.priority < other.priority

class TaskManager:
    def __init__(self):
        self.tasks = []

    def add_task(self, task_name, priority, deadline, time):
        deadline_date = datetime.strptime(deadline, "%Y-%m-%d").date()
        new_task = Task(task_name, priority, deadline_date, time)
        heapq.heappush(self.tasks, new_task)

    def remove_task(self, task_name):
        self.tasks = [task for task in self.tasks if task.task_name != task_name]
        heapq.heapify(self.tasks)

    def get_all_tasks(self):
        return [{
            'task_name': task.task_name,
            'priority': task.priority,
            'deadline': task.deadline.strftime("%Y-%m-%d"),
            'time': task.time,
            'status': task.status
        } for task in self.tasks]

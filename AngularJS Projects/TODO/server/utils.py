import databas
class TodoDAO(object):
    def __init__(self):
        self.counter = 0
        self.todos = []

    def get(self, id):
        self.todos=databas.getTodos()
        for todo in self.todos:
            if todo['id'] == id:
                return todo

    def create(self, data):
        todo = data
        self.todos.append(todo)
        databas.insert(todo)
        return todo

    def update(self, id, data):
        todo = self.get(id)
        print(todo)
        todo.update(data)
        databas.update(todo)
        return todo

    def delete(self, id):
        todo = self.get(id)
        self.todos.remove(todo)
        databas.delete(todo)
    
    def getall(self):
        self.todos=databas.getTodos()
        return self.todos
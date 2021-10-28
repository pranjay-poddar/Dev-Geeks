from flask import Flask, request
from flask_restplus import Api, Resource, fields, cors
from werkzeug.middleware.proxy_fix import ProxyFix
from utils import TodoDAO
from requests.models import Response
import databas

app = Flask(__name__)
app.wsgi_app = ProxyFix(app.wsgi_app)
api = Api(app, version='1.0', title='TodoMVC API',
          description='A simple TodoMVC API')
ns = api.namespace('todos', description='TODO operations')
todo = api.model('Todo', {
    'id': fields.Integer(readonly=True, description='The task unique identifier'),
    'task': fields.String(required=True, description='The task details'),
    'dueby': fields.Date(required=True, description='The task date'),
    'status': fields.String(required=True, description='The task status')
})
creds = api.model('Creds', {
    'username': fields.String(required=True, description='The task details'),
    'password': fields.String(required=True, description='The task status'),
    'access': fields.String(required=True, description='The task status')
})


DAO = TodoDAO()


@ns.route('/')
class TodoList(Resource):
    @ns.doc('list_todos')
    @ns.marshal_list_with(todo)
    def get(self):
        return DAO.getall()

    @ns.doc('create_todo')
    @ns.expect(todo)
    @ns.marshal_with(todo, code=201)
    def post(self):
        return DAO.create(api.payload), 201


@ns.route('/<int:id>')
@ns.response(404, 'Todo not found')
@ns.param('id', 'The task identifier')
class Todo(Resource):
    @ns.doc('get_todo')
    @ns.marshal_with(todo)
    def get(self, id):
        return DAO.get(id)

    @ns.doc('delete_todo')
    @ns.response(204, 'Todo deleted')
    def delete(self, id):
        DAO.delete(id)
        return '', 204

    @ns.expect(todo)
    @ns.marshal_with(todo)
    def put(self, id):
        return DAO.update(id, api.payload)

@ns.route('/due')
@ns.expect(fields.String)
@ns.param('due_date','due date')
class DueList(Resource):
    @ns.doc('get_due_todo')
    @ns.marshal_list_with(todo)
    def get(self):
        return databas.due(request.args["due_date"])
        

@ns.route('/overdue')
class OverdueList(Resource):
    @ns.doc('overdue_todo')
    @ns.marshal_list_with(todo)
    def get(self):
        return databas.overdue()

@ns.route('/finished')
class FinishedList(Resource):
    @ns.doc('finished_todo')
    @ns.marshal_list_with(todo)
    def get(self):
        return databas.finished()

@ns.route('/login')
class FinishedList(Resource):
    @ns.doc('auth')
    @ns.expect(creds)
    @ns.marshal_with(creds, code=201)
    def post(self):
        return databas.login(api.payload)

@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE")
    response.headers.add("Access-Control-Allow-Headers", "Content-Type, x-requested-with")
    return response

if __name__ == '__main__':
    app.run()

import mysql.connector

def test():
    db = mysql.connector.connect(
        host="us-cdbr-east-03.cleardb.com",
        user="b785fbb89c1d88",
        password="5872c3bf",
        database="heroku_d100d1934e0d01d"
    )

    print(db.is_connected())
    db.close()


def insert(todo):
    db = mysql.connector.connect(
        host="us-cdbr-east-03.cleardb.com",
        user="b785fbb89c1d88",
        password="5872c3bf",
        database="heroku_d100d1934e0d01d"
    )
    print(todo)
    cur = db.cursor()
    sql="insert into todo (task,dueby,status) values (%s, %s, %s)"
    val=[todo["task"],todo["dueby"][:10],todo["status"]]
    cur.execute(sql,val)
    db.commit()
    cur.close()
    db.close()

def getTodos():
    db = mysql.connector.connect(
        host="us-cdbr-east-03.cleardb.com",
        user="b785fbb89c1d88",
        password="5872c3bf",
        database="heroku_d100d1934e0d01d"
    )
    cur = db.cursor()
    cur.execute("select * from todo")
    headers=['id','task','dueby','status']
    res=[]
    for x in cur:
        res.append(dict(zip(headers,x)))
    cur.close()
    db.close()
    return res

def update(todo):
    db = mysql.connector.connect(
        host="us-cdbr-east-03.cleardb.com",
        user="b785fbb89c1d88",
        password="5872c3bf",
        database="heroku_d100d1934e0d01d"
    )
    
    if "task" in todo.keys():
        cur = db.cursor()
        val=[todo["task"],todo["id"]]
        cur.execute("update todo set task=%s where id=%s",val)
        cur.close()
    
    if "dueby" in todo.keys():
        cur = db.cursor()
        val=[todo["dueby"],todo["id"]]
        cur.execute("update todo set dueby=%s where id=%s",val)
        cur.close()
    
    if "status" in todo.keys():
        cur = db.cursor()
        val=[todo["status"],todo["id"]]
        cur.execute("update todo set status=%s where id=%s",val)
        cur.close()
    db.commit()
    db.close()

def delete(todo):
    db = mysql.connector.connect(
        host="us-cdbr-east-03.cleardb.com",
        user="b785fbb89c1d88",
        password="5872c3bf",
        database="heroku_d100d1934e0d01d"
    )
    cur = db.cursor()
    val=[todo["id"]]
    cur.execute("delete from todo where id=%s",val)
    db.commit()
    cur.close()
    db.close()

def due(due_date):
    db = mysql.connector.connect(
        host="us-cdbr-east-03.cleardb.com",
        user="b785fbb89c1d88",
        password="5872c3bf",
        database="heroku_d100d1934e0d01d"
    )
    cur = db.cursor()
    cur.execute("select * from todo where dueby=%s",[due_date])
    res=[]
    headers=['id','task','dueby','status']
    for x in cur:
        res.append(dict(zip(headers,x)))
    cur.close()
    db.close()
    return res

def overdue():
    db = mysql.connector.connect(
        host="us-cdbr-east-03.cleardb.com",
        user="b785fbb89c1d88",
        password="5872c3bf",
        database="heroku_d100d1934e0d01d"
    )
    cur = db.cursor()
    cur.execute("select * from todo where dueby<curdate()")
    res=[]
    headers=['id','task','dueby','status']
    for x in cur:
        res.append(dict(zip(headers,x)))
    cur.close()
    db.close()
    return res

def finished():
    db = mysql.connector.connect(
        host="us-cdbr-east-03.cleardb.com",
        user="b785fbb89c1d88",
        password="5872c3bf",
        database="heroku_d100d1934e0d01d"
    )
    cur = db.cursor()
    cur.execute("select * from todo where status='finished'")
    res=[]
    headers=['id','task','dueby','status']
    for x in cur:
        res.append(dict(zip(headers,x)))
    cur.close()
    db.close()
    return res

def login(creds):
    db = mysql.connector.connect(
        host="us-cdbr-east-03.cleardb.com",
        user="b785fbb89c1d88",
        password="5872c3bf",
        database="heroku_d100d1934e0d01d"
    )
    cur = db.cursor()
    cur.execute("select count(*) from users where username=%s",[creds["username"]])
    for x in cur:
        count=x
    if count[0]==0:
        cur.close()
        db.close()
        return '',202
    else:
        cur.execute("select * from users where username=%s",[creds["username"]])
        for x in cur:
            pas=x
        print(pas)
        if pas[2]==creds["password"]:
            cur.close()
            db.close()
            headers=['username','password','access']
            return dict(zip(headers,pas[1:])),201
        else:
            cur.close()
            db.close()
            return '',202
    
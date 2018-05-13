import sqlite3, os
from flask import Flask, request, session, g, redirect, url_for, abort, render_template, flash
from flask.ext.bootstrap import Bootstrap
from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, TextField
from wtforms.validators import DataRequired


app = Flask(__name__) # initialise Flask
app.config.from_object(__name__) # get config variables from current file

# update default configuration of app
app.config.update(dict(
    DATABASE=os.path.join(app.root_path, 'fresh-tomatoes.db'),
    SECRET_KEY='development key',
    USERNAME='admin',
    PASSWORD='default'
))
app.config.from_envvar('FLASKR_SETTINGS', silent=True) # get config variables from terminal

"""
The next four functions copied from Flask website; initiate db, connect and disconnect from it
"""
def connect_db():
    rv = sqlite3.connect(app.config['DATABASE'])
    rv.row_factory = sqlite3.Row
    return rv

def get_db():
    if not hasattr(g, 'sqlite_db'):
        g.sqlite_db = connect_db()
    return g.sqlite_db
    
@app.teardown_appcontext
def close_db(error):
    if hasattr(g, 'sqlite_db'):
        g.sqlite_db.close()

def init_db():
    db = get_db()
    with app.open_resource('schema.sql', mode='r') as f:
        db.cursor().executescript(f.read())
    db.commit()

@app.cli.command('initdb')
def initdb_command():
    """Initializes the database."""
    init_db()
    print('Initialized the database.')

"""
    Function for home page
    Loads all images from database
"""
@app.route('/')
def main_page():

    return render_template('main_page.html', )

"""
Initialises a commment form with one input field and a submit button
Inherits from WTForms Form class
"""
class CommentsForm(FlaskForm):
    commentinp = TextField('Your comment:', validators=[DataRequired(message='This field is required.')])
    submit = SubmitField('Submit')

"""
Function for image page
Displays image according to ID in URL
Initialises comment form for that image
"""
@app.route('/image/<int:imageid>', methods=['GET', 'POST'])
def image(imageid):
    form = CommentsForm()
    if request.method == 'POST': # run this code only if form is submitted
        if form.validate_on_submit():
            newcomment = form.commentinp.data
            form.commentinp.data = '' # remove data from field on page reload
            db = get_db()
            curu = db.execute('insert into comments (body, parent) values (?, ?)', [newcomment, imageid]) # add new comment to db
            db.commit()
        else:
            return 'error in validation'
    db = get_db()
    cur = db.execute('select id, path, title from images where id = ?', [imageid]) # get info for image
    imageinfo = cur.fetchone()
    cur1 = db.execute('select parent, body from comments where parent = ?', [imageid]) # get comments for image
    comments = cur1.fetchall()
    return render_template('image.html', imageinfo=imageinfo, comments=comments, form=form)

"""
Function for nature page !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
Loads all images with category = nature
"""
@app.route('/inBook')
def inBook():

    return render_template('main_page.html')

"""
Function for nature page !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
Loads all images with category = people
"""
@app.route('/submitted')
def submitted():
    
    return render_template('main_page.html')

@app.route('/signup')
def signup():
    images = [0]
    return render_template('main_page.html')

@app.route('/login')
def login():
    images = [1]
    return render_template('main_page.html')

@app.route('/profile')
def profile():
    images = [2]
    return render_template('main_page.html' )


if __name__ == '__main__':
    Bootstrap(app) # initialise bootstrap for app
    app.debug = True
    port = int(os.getenv('PORT', 8080))
    host = os.getenv('IP', '0.0.0.0')
    app.run(port=port, host=host)
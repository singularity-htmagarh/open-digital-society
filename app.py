from flask import Flask, render_template, redirect, url_for, request, flash
from flask_login import LoginManager, login_user, logout_user, login_required, UserMixin, current_user
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField
from wtforms.validators import DataRequired, Email

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your-secret-key'

login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'

# Dummy user store
users = {'user@example.com': {'password': 'password'}}

class User(UserMixin):
    def __init__(self, email):
        self.id = email

@login_manager.user_loader
def load_user(user_id):
    if user_id in users:
        return User(user_id)
    return None

class LoginForm(FlaskForm):
    email = StringField('Email', validators=[DataRequired(), Email()])
    password = PasswordField('Password', validators=[DataRequired()])
    submit = SubmitField('Login')

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/features')
def features():
    return render_template('features.html')

@app.route('/pricing')
def pricing():
    return render_template('pricing.html')

@app.route('/contact')
def contact():
    return render_template('contact.html')

@app.route('/dashboard')
@login_required
def dashboard():
    return render_template('dashboard.html', user=current_user)

@app.route('/login', methods=['GET', 'POST'])
def login():
    form = LoginForm()
    if form.validate_on_submit():
        email = form.email.data
        password = form.password.data
        user = users.get(email)
        if user and user['password'] == password:
            login_user(User(email))
            return redirect(url_for('dashboard'))
        flash('Invalid credentials')
    return render_template('login.html', form=form)

@app.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('home'))

if __name__ == '__main__':
    app.run(debug=True)

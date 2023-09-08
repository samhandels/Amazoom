from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms.validators import DataRequired, NumberRange, ValidationError, Length
from wtforms import StringField, SubmitField, FloatField, TextAreaField, IntegerField
from ..api.aws_helper import ALLOWED_EXTENSIONS

categories = ['Electronics', 'Books', 'Sports & Outdoors', 'Home', 'Amazon Basics', 'Pet Supplies', 'Beauty']


def validate_category(form, field):
    category = field.data
    if category not in categories:
        raise ValidationError('Invalid category')

def validate_image(form, field):
    image = field.data
    if not image.endswith('png') and not image.endswith('jpg') and not image.endswith('jpeg'):
        raise ValidationError('Image must end in png, jpg, or jpeg')

class ProductForm(FlaskForm):
    name = StringField("Name", validators=[DataRequired(), Length(min=1, max=100)])
    price = FloatField("Price", validators=[DataRequired()])
    description = StringField("Description", validators=[DataRequired(), Length(min=1, max=2500)])
    category = StringField('Category', validators=[DataRequired(), validate_category])
    quantity = IntegerField("Quantity")
    image = FileField('Image File', validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
    submit = SubmitField("Create Product")

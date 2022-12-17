import http

from django.shortcuts import render
import json
import time
from django.http import HttpResponse
from .models import User
from .forms import UserForm
from django.views.decorators.csrf import csrf_exempt
from django.forms.models import model_to_dict
from util.salt_password import salt_password, compare_password
from util.jwt_auth import generate_token
from middlewares.middlewares import JWT_secret


@csrf_exempt
def user_sign_up(request):
    form = UserForm()
    response = {"success": 0, "message": ""}
    if request.method == 'POST':
        request_data = json.loads(request.body)
        user = form.save(commit=False)

        user.rcs_id = request_data['rcs_id']

        # Check password is valid
        if len(request_data['password']) < 6 or ' ' in request_data['password']:
            response['message'] = "Invalid password"
            return HttpResponse(json.dumps(response), content_type="application/json",
                                status=http.HTTPStatus.BAD_REQUEST)

        user.name = request_data['name']
        user.password = salt_password(request_data['password'])

        try:
            user.save()
            response['success'] = 1
            response['message'] = "User created"
            return HttpResponse(json.dumps(response), content_type="application/json", status=http.HTTPStatus.OK)
        except Exception as e:
            response['message'] = str(e)
            return HttpResponse(json.dumps(response), content_type="application/json",
                                status=http.HTTPStatus.BAD_REQUEST)
    else:
        response['message'] = "Method Not Allowed"
        return HttpResponse(json.dumps(response), content_type="application/json",
                            status=http.HTTPStatus.METHOD_NOT_ALLOWED)
    pass


@csrf_exempt
def user_log_in(request):
    response = {"success": "0", "message": ""}
    if request.method == 'POST':
        request_data = json.loads(request.body)
        # Get user by username
        try:
            user_info = User.objects.get(rcs_id=request_data['rcs_id'])
        except Exception as e:
            response['message'] = "User not found"
            return HttpResponse(json.dumps(response), content_type="application/json", status=400)

        # Compare password
        try:
            if compare_password(request_data['password'], user_info.password):
                response['message'] = "Login successful"
                try:
                    response['token'] = generate_token(
                        payload={"rcs_id": user_info.rcs_id, "timestamp": time.time()},
                        secret=JWT_secret)
                    response['user'] = model_to_dict(user_info)
                    response['user'].pop('password')
                except Exception as e:
                    response['message'] = str(e)
                    return HttpResponse(json.dumps(response), content_type="application/json", status=500)
                response['success'] = "1"
                return HttpResponse(json.dumps(response), content_type="application/json", status=200)
            else:
                response['message'] = "Invalid password"
                return HttpResponse(json.dumps(response), content_type="application/json", status=400)
        except Exception as e:
            response['message'] = "Missing password"
            return HttpResponse(json.dumps(response), content_type="application/json", status=400)
    else:
        response['message'] = "Method Not Allowed"
        return HttpResponse(json.dumps(response), content_type="application/json", status=405)


@csrf_exempt
def get_user_by_id(request):
    response = {"success": "0", "message": ""}
    if request.method == 'GET':
        try:
            user_info = User.objects.get(id=request.GET['user_id'])
        except Exception as e:
            response['message'] = "User not found"
            return HttpResponse(json.dumps(response), content_type="application/json", status=400)
        response['success'] = "1"
        response['user'] = model_to_dict(user_info)
        response['user'].pop('password')
        return HttpResponse(json.dumps(response), content_type="application/json", status=200)
    else:
        response['message'] = "Method Not Allowed"
        return HttpResponse(json.dumps(response), content_type="application/json", status=405)
    pass

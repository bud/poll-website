import http
import json

from django.forms import model_to_dict
from django.http import HttpResponseNotAllowed, HttpResponse
from django.views.decorators.csrf import csrf_exempt

import util.jwt_auth
from answer.models import Answer
from user.models import User
from .forms import PollForm
from .models import Poll


# Create your views here.

@csrf_exempt
def create_poll(request):
    form = PollForm()
    response = {"success": 0, "message": ""}
    if request.method == 'POST':
        request_data = json.loads(request.body)
        poll = form.save(commit=False)
        poll.title = request_data['title']
        poll.description = request_data['description']
        poll.question = request_data['question']
        poll.user = request.user
        poll.answers = request_data['answers']
        try:
            poll.save()
            response['success'] = 1
            response['message'] = "Poll created"
            return HttpResponse(json.dumps(response), content_type="application/json", status=http.HTTPStatus.OK)
        except Exception as e:
            response['message'] = str(e)
            return HttpResponse(json.dumps(response), content_type="application/json",
                                status=http.HTTPStatus.BAD_REQUEST)
    else:
        return HttpResponseNotAllowed(['POST'])


@csrf_exempt
def get_polls_by_user(request):
    response = {"success": 0, "message": ""}
    if request.method == 'GET':
        try:
            user = User.objects.get(rcs_id=request.GET['rcs_id'])
            polls = Poll.objects.all().filter(user=user).values()
        except Poll.DoesNotExist:
            response['message'] = "Poll does not exist"
            return HttpResponse(json.dumps(response), content_type="application/json",
                                status=http.HTTPStatus.BAD_REQUEST)
        response['success'] = 1
        response['message'] = "Poll retrieved"
        response['polls'] = list(polls)
        return HttpResponse(json.dumps(response), content_type="application/json", status=http.HTTPStatus.OK)
    else:
        return HttpResponseNotAllowed(['GET'])


@csrf_exempt
def get_all_polls(request):
    response = {"success": 0, "message": ""}
    if request.method == 'GET':
        try:
            polls = Poll.objects.all().values()[
                    int(request.GET['offset'], 10): int(request.GET['offset'], 10) + int(request.GET['limit'], 10)]
        except Poll.DoesNotExist:
            response['message'] = "Poll does not exist"
            return HttpResponse(json.dumps(response), content_type="application/json",
                                status=http.HTTPStatus.BAD_REQUEST)
        response['success'] = 1
        response['message'] = "Poll retrieved"
        response['polls'] = list(polls)
        return HttpResponse(json.dumps(response), content_type="application/json", status=http.HTTPStatus.OK)
    else:
        return HttpResponseNotAllowed(['GET'])


@csrf_exempt
def get_polls_answered_by_user(request):
    response = {"success": 0, "message": ""}
    if request.method == 'GET':
        try:
            user = User.objects.get(id=request.GET['user_id'])
        except User.DoesNotExist:
            response['message'] = "User does not exist"
            return HttpResponse(json.dumps(response), content_type="application/json",
                                status=http.HTTPStatus.BAD_REQUEST)
        all_answers = Answer.objects.all().filter(user=user).values()
        all_polls = []
        for answer in all_answers:
            m = model_to_dict(Poll.objects.get(id=answer['poll_id']))
            m['user_id'] = m['user']
            del(m['user'])
            all_polls.append(m)
        response['success'] = 1
        response['message'] = "Poll retrieved"
        response['polls'] = all_polls
        response['answers'] = list(all_answers)
        return HttpResponse(json.dumps(response), content_type="application/json", status=http.HTTPStatus.OK)
    else:
        return HttpResponseNotAllowed(['GET'])


@csrf_exempt
def get_poll_by_id(request):
    response = {"success": 0, "message": ""}
    if request.method == 'GET':
        try:
            poll = Poll.objects.get(id=request.GET['id'])
        except Poll.DoesNotExist:
            response['message'] = "Poll does not exist"
            return HttpResponse(json.dumps(response), content_type="application/json",
                                status=http.HTTPStatus.BAD_REQUEST)
        response['success'] = 1
        response['message'] = "Poll retrieved"
        response['poll'] = model_to_dict(poll)
        response['poll']['user_id'] = response['poll']['user']
        del(response['poll']['user'])
        return HttpResponse(json.dumps(response), content_type="application/json", status=http.HTTPStatus.OK)
    else:
        return HttpResponseNotAllowed(['GET'])


@csrf_exempt
def get_polls_by_title(request):
    response = {"success": 0, "message": ""}
    if request.method == 'GET':
        try:
            polls = Poll.objects.all().filter(title__icontains=request.GET['title']).values()
        except Poll.DoesNotExist:
            response['message'] = "Poll does not exist"
            return HttpResponse(json.dumps(response), content_type="application/json",
                                status=http.HTTPStatus.BAD_REQUEST)
        response['success'] = 1
        response['message'] = "Poll retrieved"
        response['polls'] = list(polls)
        return HttpResponse(json.dumps(response), content_type="application/json", status=http.HTTPStatus.OK)
    else:
        return HttpResponseNotAllowed(['GET'])


@csrf_exempt
def edit_poll(request):
    response = {"success": 0, "message": ""}
    if request.method == 'POST':
        request_data = json.loads(request.body)
        try:
            poll = Poll.objects.get(id=request_data['id'], user=request.user)
        except Poll.DoesNotExist:
            response['message'] = "Poll does not exist"
            return HttpResponse(json.dumps(response), content_type="application/json",
                                status=http.HTTPStatus.BAD_REQUEST)
        if 'title' in request_data:
            poll.title = request_data['title']
        if 'description' in request_data:
            poll.description = request_data['description']
        if 'question' in request_data:
            poll.question = request_data['question']
        if 'answers' in request_data:
            poll.answers = request_data['answers']
        if 'is_open' in request_data:
            poll.is_open = request_data['is_open']
        try:
            poll.save()
            response['success'] = 1
            response['message'] = "Poll edited"
            return HttpResponse(json.dumps(response), content_type="application/json", status=http.HTTPStatus.OK)
        except Exception as e:
            response['message'] = str(e)
            return HttpResponse(json.dumps(response), content_type="application/json",
                                status=http.HTTPStatus.BAD_REQUEST)
    else:
        return HttpResponseNotAllowed(['POST'])


@csrf_exempt
def delete_poll(request):
    response = {"success": 0, "message": ""}
    if request.method == 'DELETE':
        request_data = json.loads(request.body)
        try:
            poll = Poll.objects.get(id=request_data['poll_id'], user=request.user)
        except Poll.DoesNotExist:
            response['message'] = "Poll does not exist"
            return HttpResponse(json.dumps(response), content_type="application/json",
                                status=http.HTTPStatus.BAD_REQUEST)
        try:
            poll.delete()
            response['success'] = 1
            response['message'] = "Poll deleted"
            return HttpResponse(json.dumps(response), content_type="application/json", status=http.HTTPStatus.OK)
        except Exception as e:
            response['message'] = str(e)
            return HttpResponse(json.dumps(response), content_type="application/json",
                                status=http.HTTPStatus.BAD_REQUEST)
    else:
        return HttpResponseNotAllowed(['POST'])


@csrf_exempt
def get_poll_statistics(request):
    response = {"success": 0, "message": ""}
    if request.method == 'GET':
        all_answers = Answer.objects.all().filter(poll_id=request.GET['poll_id']).values()
        poll = Poll.objects.get(id=request.GET['poll_id'])
        votes = [0] * len(poll.answers)
        for answer in all_answers:
            votes[answer['answer']] += 1
        response['success'] = 1
        response['message'] = "Poll statistics retrieved"
        response['poll'] = model_to_dict(poll)
        response['votes'] = votes
        response['total_votes'] = sum(votes)
        return HttpResponse(json.dumps(response), content_type="application/json", status=http.HTTPStatus.OK)
    else:
        return HttpResponseNotAllowed(['GET'])

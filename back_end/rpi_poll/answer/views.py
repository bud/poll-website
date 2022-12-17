import http
import json

from django.http import HttpResponse, HttpResponseNotAllowed
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt

from answer.models import Answer
from poll.models import Poll


# Create your views here.

@csrf_exempt
def submit_answer(request):
    response = {"success": 0, "message": ""}
    if request.method == 'POST':
        request_data = json.loads(request.body)
        try:
            poll = Poll.objects.get(id=request_data['poll_id'])
        except Poll.DoesNotExist:
            response['message'] = "Poll does not exist"
            return HttpResponse(json.dumps(response), content_type="application/json",
                                status=http.HTTPStatus.BAD_REQUEST)
        if not poll.is_open:
            response['message'] = "Poll is closed"
            return HttpResponse(json.dumps(response), content_type="application/json",
                                status=http.HTTPStatus.BAD_REQUEST)

        if len(poll.answers) <= request_data['answer']:
            response[
                'message'] = f'Invalid answer, you have {len(poll.answers)} options, choose from range 0 - {len(poll.answers) - 1}'
            return HttpResponse(json.dumps(response), content_type="application/json",
                                status=http.HTTPStatus.BAD_REQUEST)

        try:
            answer = Answer.objects.get(poll=poll, user=request.user)
            answer.answer = request_data['answer']
            answer.save()
        except Answer.DoesNotExist:
            answer = Answer()
            answer.user = request.user
            answer.poll = poll
            answer.answer = request_data['answer']
            answer.save()
        response['success'] = 1
        response['message'] = "Answer submitted"
        return HttpResponse(json.dumps(response), content_type="application/json", status=http.HTTPStatus.OK)
    else:
        return HttpResponseNotAllowed(['POST'])

import web
from inginious.frontend.plugins.utils.admin_api import AdminApi
from inginious.frontend.plugins.utils import get_mandatory_parameter

import pymongo


class ScoreTaskUser(AdminApi):
    def API_GET(self):

        parameters = web.input()
        course_id = get_mandatory_parameter(parameters, "course_id")
        task_id = get_mandatory_parameter(parameters, "task_id")
        user = self.user_manager.session_username()

        db_results = self.database.submissions.find({
            "username": user,
            "courseid": course_id,
            "taskid": task_id,
            "status": "done"},
            {"username": True, "_id": False, "taskid": True, "result": True, "submitted_on": True}).sort(
            [("submitted_on", pymongo.ASCENDING)])

        success = 0 
        fails = 0

        for submission in db_results:
            if submission['result'] == "success":
                success += 1
                #print(submission['result'] + " " + submission['taskid'] + " " + submission['username'][0])
            else:
                fails += 1
                #print(submission['result'] + " " + submission['taskid'] + " " + submission['username'][0])

        if success == 0 and fails == 0:
            response = 'nosubmission'
        else:
            if success > 0:
                response = 'true'
            else:
                response = 'false'

        return 200, {'programmer': response}

import os

from inginious.frontend.plugins.utils import create_static_resource_page, read_file
from inginious.frontend.plugins.un_colab.constants import _REACT_BASE_URL, _REACT_BUILD_FOLDER, _BASE_STATIC_FOLDER, _BASE_STATIC_URL
from .pages.chat_page import ChatPage
from .pages.api.connect_chat_user import ConnectChatUser
from .pages.api.score_task_user import ScoreTaskUser

_static_folder_path = os.path.join(os.path.dirname(__file__), "static")

def init(plugin_manager, course_factory, client, config):

    use_minified = config.get("use_minified", False)
    if use_minified:
        plugin_manager.add_hook("javascript_footer", lambda: "/un_colab/static/js/user_colab.min.js")
        plugin_manager.add_hook("css", lambda: "/un_colab/static/css/user_colab.min.css")
    else:
        plugin_manager.add_hook("javascript_footer", lambda: "/un_colab/static/js/user_colab.js")
        plugin_manager.add_hook("css", lambda: "/un_colab/static/css/user_colab.css")

    def chat_course_menu_hook(course,task, template_helper):
        return """
                <button type="button" onclick="appendChat()" id="menu-toggle" class="btn btn-secondary"><i id="toggleIcon" class="fa-angle-double-down fa"></i> Collaboration
                </button>
                <div id="wrapper-chat" class="toggled">
                  <div id="sidebar-wrapper-chat">
                   <iframe src="/un_colab/{course_id}/{task_id}" frameborder="0" width="100%" height="100%" scrolling="no"></iframe>
                  </div>
                </div>
                """.format(course_id=course.get_id(),task_id=task.get_id())

    plugin_manager.add_page(r'/un_colab/static/(.*)', create_static_resource_page(_static_folder_path))
    plugin_manager.add_page('/plugins/un_colab/api/connect_chat_user', ConnectChatUser)
    plugin_manager.add_page('/plugins/un_colab/api/score_task_user', ScoreTaskUser)

    plugin_manager.add_page(_REACT_BASE_URL + r'(.*)', create_static_resource_page(_REACT_BUILD_FOLDER))
    plugin_manager.add_page(_BASE_STATIC_URL + r'(.*)', create_static_resource_page(_BASE_STATIC_FOLDER))

    plugin_manager.add_hook('task_menu', chat_course_menu_hook)
    plugin_manager.add_page('/un_colab/([a-z0-9A-Z\-_]+)/([a-z0-9A-Z\-_]+)', ChatPage)
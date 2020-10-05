import os.path

_BASE_STATIC_FOLDER = os.path.join(os.path.dirname(os.path.realpath(__file__)), 'static')
_BASE_STATIC_URL = r'/plugins/un_colab/files/'
_PLUGIN_FOLDER = os.path.dirname(os.path.realpath(__file__))
_REACT_BUILD_FOLDER = os.path.join(_PLUGIN_FOLDER, 'react_app', 'build')
_REACT_BASE_URL = '/plugins/un_colab/'
_BASE_RENDERER_PATH = _PLUGIN_FOLDER

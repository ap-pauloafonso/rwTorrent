from flask import jsonify 
from aenum import Enum


class TorrentException(Exception):
    def __init__(self, enumData):
        self.customError = {'errorCode': enumData.value, 'descrption': str(enumData)}


class TorrentErrorEnum(Enum):

    _init_ = 'value string'

    DUPLICATED_TORRENT_SESSION_ERROR = 1, 'The torrent is already present in the currently session '
    INVALID_MAGNETLINK = 2, 'Invalid magnet link'
    INVALID_FILE = 3, 'Invalid torrent file'
    INVALID_INFO_HASH = 4, 'Invalid info_hash'

    def __str__(self):
        return self.string

    @classmethod
    def _missing_value_(cls, value):
        for member in cls:
            if member.string == value:
                return member
def handleError(ex):
    if(ex.customError): return ex.customError, 500
    else: return {'errorCode': None, 'descrption': str(ex)} , 500
    
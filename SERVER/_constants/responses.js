const RESPONSES = {
    RECORDS_NOT_FOUND : {
        success: false,
        message: 'Records not found'
    },
    INTERNAL_ERROR(err){
        return {
            success: false,
            message: 'Some thing went wrong!',
            error: err
        }
    }
}

module.exports = RESPONSES
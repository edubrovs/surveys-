'use strict'

const express 		   		= require('express')
const authMiddleware   		= require('./middlewares/auth')
const modelMiddleware  		= require('./middlewares/model')
const organizationSurveys   = require('./controllers/organization_surveys')
const surveys          		= require('./controllers/surveys')

const publicRoutes = express.Router()

const mixedRoutes = express.Router()

mixedRoutes.use([
	auth.checkUser
])

const authorizedRoutes = express.Router()

authorizedRoutes.use([
	auth.checkUser,
	auth.forceAuth
])

const authorizedAdminRoutes = express.Router()

authorizedAdminRoutes.use([
	auth.checkUser,
	auth.forceAuth,
	auth.checkUserOrganization,
	auth.forceAdmin
])

authorizedAdminRoutes.get(
	'/organizations/:organization_id/surveys', 
	organizationSurveys.getAll
)

authorizedAdminRoutes.get(
	'/organizations/:organization_id/surveys/survey_id', 
	organizationSurveys.get
)

authorizedAdminRoutes.post(
	'/organizations/:organization_id/surveys', 
	organizationSurveys.post
)

authorizedAdminRoutes.put(
	'/organizations/:organization_id/surveys/survey_id', 
	organizationSurveys.put
)

authorizedAdminRoutes.delete(
	'/organizations/:organization_id/surveys/survey_id', 
	organizationSurveys.delete
)

////////////

authorizedAdminRoutes.get(
	'/organizations/:organization_id/users', 
	organizationSurveys.getAll
)

authorizedAdminRoutes.get(
	'/organizations/:organization_id/users/user_id', 
	organizationUsers.get
)

authorizedAdminRoutes.post(
	'/organizations/:organization_id/users/user_id', 
	organizationUsers.post
)

authorizedAdminRoutes.put(
	'/organizations/:organization_id/users/user_id',
	organizationUsers.put
)

authorizedAdminRoutes.delete(
	'/organizations/:organization_id/users/user_id', 
	organizationUsers.delete
)

///////////


module.exports = {
	public: publicRoutes,
	mixed: mixedRoutes,
	authorizedAdmin: authorizedAdminRoutes,
	authorized: authorizedRoutes
}


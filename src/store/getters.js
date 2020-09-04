const getters = {
	sidebar: state => state.app.sidebar,
	roles: state => state.user.roles,
	permission_routers: state => state.permission.routers
};

export default getters;

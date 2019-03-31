let organizationsVue
document.addEventListener('DOMContentLoaded', () => {
	organizationsVue = new Vue({
		el: '#organizations',
		data: {
			organizations: [],
			members: [],
			path: []
		}
	})
	updateOrganizations()
})

const updateOrganizations = organizationId => {
	let path = '/api/organizations/'
	path += organizationId ? organizationId : 'root'
	fetch(path)
		.then(response => response.json())
		.then(organizations => {
			organizationsVue.organizations = organizations
		})

	if (organizationId){
		organizationsVue.path.push(organizationId)

		fetch('/api/organization/'+organizationId+'/members')
		.then(response => response.json())
		.then(members => {
			organizationsVue.members = members
		})
	}
	
}

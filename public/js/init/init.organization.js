let organizationsVue
document.addEventListener('DOMContentLoaded', () => {
	organizationsVue = new Vue({
		el: '#organizations',
		data: {
			organizations: []
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
}

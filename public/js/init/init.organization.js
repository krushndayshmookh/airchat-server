let organizationsVue
document.addEventListener('DOMContentLoaded', function() {
	organizationsVue = new Vue({
		el: '#organizations',
		data: {
			organizations: []
		}
    })
    updateOrganizations()
})

const updateOrganizations = organizationId => {
	let path = organizationId ? '/api/organization/' + organizationId : '/api/organizations/root'
	fetch(path)
		.then(response => response.json())
		.then(organizations => {
			organizationsVue.organizations = organizations
		})
}

let noticesVue
document.addEventListener('DOMContentLoaded', () => {
	noticesVue = new Vue({
		el: '#notices',
		data: {
			notices: []
		},
		updated: () => {
			M.Collapsible.init(document.querySelectorAll('.collapsible'), {
				accordion: false
			})
		}
	})
	updateNotice()
})

const updateNotice = () => {
	let path = '/api/notices'

	fetch(path)
		.then(response => response.json())
		.then(notices => {
			noticesVue.notices = notices
		})
}

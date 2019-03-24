let noticesVue
document.addEventListener('DOMContentLoaded', () => {
	noticesVue = new Vue({
		el: '#notices',
		data: {
			notices: []
		}
	})
	updateNotices()
})

const updateNotices = noticeId => {
	let path = '/api/notices/'
	fetch(path)
		.then(response => response.json())
		.then(notices => {
			noticesVue.notices = notices
		})
}
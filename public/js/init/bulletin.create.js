let noticeFormVue
document.addEventListener('DOMContentLoaded', () => {
	noticeFormVue = new Vue({
		el: '#noticeForm',
		data: {
			users: []
		}
	})
	updateUsers()
})

const updateUsers = () => {
	let path = '/api/users'

	fetch(path)
		.then(response => response.json())
		.then(users => {
			noticeFormVue.users = users
		})
}

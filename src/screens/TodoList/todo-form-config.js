import moment from 'moment'

export default [
	{
		label: 'title',
		validation: (content) => { 
			const validations = []

			content.length <= 3 && validations.push('Title too short')

			return validations
		}
	},
	{
		label: 'description',
		validation: () => [] 
	},
	{
		label: 'dueDate',
		validation: (content) => {  
			if (!content) return []

			const validations = []

			!moment(content).isValid() && validations.push('Invalid Date')

			return validations
		}
	},
	{
		label: 'status',
		validation: (content) => { 
			const validations = []

			!['Pending', 'Done'].includes(content) && validations.push('Invalid Status')

			return validations
		}
	}
]


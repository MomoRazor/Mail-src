import { IMailRepo, Mail, PaginationFilter } from "../data"


export interface IMailSvc {
	getTable: (
		pagination: PaginationFilter
	) => Promise<{ data: Mail[]; total: number }>
	getById: (roleId: string) => Promise<Mail>
}

export const MailSvc = (mailRepo: IMailRepo): IMailSvc => {
    const getTable = async (pagination: PaginationFilter) => {
		const fullFilter = {
			...pagination.filter,
			system: false,
		}

		const data = await mailRepo
			.find(fullFilter, pagination.projection)
			.sort(pagination.sort)
			.skip((pagination.page - 1) * pagination.limit)
			.limit(pagination.limit)
			.lean()

		const total = await mailRepo.countDocuments(fullFilter)

		return {
			data,
			total,
		}
	}

    const getById = async (id: string) => {
		const role = await mailRepo.findById(id).lean()

		if (!role) {
			throw new Error('Could not find Role')
		}

		return role
	}

	return {
        getTable,
        getById
	}
}

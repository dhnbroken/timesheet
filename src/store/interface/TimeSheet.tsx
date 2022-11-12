export interface ITimeSheetReq{
    projectId: number
    startDate: string
    endDate: string
}

export interface ITimeSheetTasks {
    taskId: number
    taskName: string
    totalWorkingTime: number
    billableWorkingTime: number
    billable: boolean
}

export interface ITimeSheetTeams {
    userId: number
    userName: string
    projectUserType: number
    totalWorkingTime: number
    billableWorkingTime: number
}

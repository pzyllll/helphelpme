export interface Event {
  gpa: number | undefined
  surname: string|undefined
  name: string|undefined

     id: number
     category: string
     title: string
     description: string
     location: string
     date: string
     time: string
     petsAllowed: boolean
     organizer: string
   }

   export interface MessageState {
      message: string
    }

    export interface EventState {
      event: Event | null
    }

export interface CountryGold {
  id: number
  country: string
  gold: number
  silver: number
  bronze: number
  desc: string,
  color: string,
  projects: CountryProject[]
}

export interface CountryProject {
  projectName: string
  gold: number
  silver: number
  bronze: number
}

export interface CountryComment {
  id: number
  comments: string[]
}

export interface CountryCommentVO {
  countryName: string
  comment: string,
  color: string
}


















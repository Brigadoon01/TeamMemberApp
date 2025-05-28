export interface TeamMember {
  id: number
  name: string
  jobTitle: string
  department: string
  photo: string
  bio: string
  email: string
  phone: string
  socialLinks: {
    linkedin: string
    twitter: string
  }
  skills: string[]
}

export type GithubRepository = {
  id: number
  name: string
  description: string
  forks_count: number
  stargazers_count: number
  pushed_at: string
  html_url: string
  owner: {
    avatar_url: string
    login: string
  }
}

export type GithubPaginatedResponse<T = unknown> = {
  items: T
  total_count: number
}

export type GithubErrorResponse = {
  documentation_url: string
  message: string
  status: number
}

export type SortDirection = 'asc' | 'desc'

export type AccountType = 'LDAP' | 'local'

export type BaseAccount = {
  id: number
  type: AccountType
  login: string
  password: string | null
  labels: string
}

export type BaseAccountDTO = {
  id: number
  type: AccountType
  login: string
  password: string | null
  labels: { text: string }[]
}

export type LocalAccount = {
  type: 'local'
  password: string
} & BaseAccount

export type LDAPAccount = {
  type: 'LDAP'
  password: null
} & BaseAccount

export type Account = LocalAccount | LDAPAccount

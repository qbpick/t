import { defineStore } from 'pinia'
import { ref } from 'vue'
import { StorageSerializers, useStorage } from '@vueuse/core'
import type { Account, BaseAccountDTO } from '@/types/account'

export const useAccountsStore = defineStore('accounts', () => {
  const accountsStore = useStorage<BaseAccountDTO[]>('accounts', [])
  const accounts = ref<Account[]>(
    [...accountsStore.value].map((a) => ({
      ...a,
      labels: a.labels.map((l) => l.text).join('; '),
    })) as Account[],
  )

  const createAccount = () => {
    accounts.value.push({
      id: Math.random() + 1,
      type: 'local',
      login: '',
      password: '',
      labels: '',
    })
  }

  const removeAccount = (account: Account) => {
    accountsStore.value = accountsStore.value.filter((a) => a.id !== account.id)
    accounts.value = accounts.value.filter((a) => a.id !== account.id)
  }

  const updateAccount = (account: Account) => {
    const dtoAccount = {
      ...account,
      labels: account.labels
        .split(';')
        .map((l) => l.trim())
        .map((l) => ({ text: l })),
    }
    const isAccountExists = accountsStore.value.find((a) => a.id === account.id)

    if (isAccountExists) {
      accountsStore.value = accountsStore.value.map((a) => (a.id === account.id ? dtoAccount : a))
    } else {
      accountsStore.value.push(dtoAccount)
    }
  }

  return {
    accountsStore,
    accounts,
    createAccount,
    updateAccount,
    removeAccount,
  }
})

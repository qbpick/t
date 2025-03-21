<script lang="ts">
import { Eye, HelpCircle, Plus, Trash } from 'lucide-vue-next'
import Button from '@/components/ui/button/Button.vue'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'
import AccountForm from './AccountForm.vue'
import { computed, ref, watch } from 'vue'
import type { BaseAccountDTO, Account } from '@/types/account.d.ts'
import { useAccounts } from '@/stores/useAccounts'
</script>
<script setup lang="ts">
// const accounts = ref<Account[]>([
//   {
//     id: 1,
//     type: 'LDAP',
//     login: 'login',
//     password: null,
//     labels: 'label1; label2',
//   },
//   {
//     id: 2,
//     type: 'local',
//     login: 'login',
//     password: 'password',
//     labels: 'label1; label2',
//   },
//   {
//     id: 3,
//     type: 'local',
//     login: 'login',
//     password: 'password',
//     labels: 'label1; label2',
//   },
// ])

// const seriallizedAccounts = computed<BaseAccountDTO[]>(() => {
//   return accounts.value.map((a) => {
//     return {
//       type: a.type,
//       id: a.id,
//       login: a.login,
//       password: a.password,
//       labels: a.labels
//         .split(';')
//         .map((l) => l.trim())
//         .map((l) => ({ text: l })),
//     }
//   })
// })

const { accounts, createAccount, removeAccount } = useAccounts()

watch(
  () => accounts.value,
  () => {
    console.log(accounts.value)
  },
  { deep: true },
)
</script>

<template>
  <div>
    <div class="flex gap-3 items-center">
      <h1 class="text-2xl font-medium">Учётные записи</h1>
      <Button variant="outline" @click="createAccount">
        <Plus />
      </Button>
    </div>

    <div class="mt-5">
      <Table>
        <TableCaption>Список учетных записей</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead class="flex items-center">
              Метки
              <HoverCard>
                <HoverCardTrigger>
                  <HelpCircle class="size-5 ml-2 text-gray-500"
                /></HoverCardTrigger>
                <HoverCardContent side="right">
                  Для указания нескольких меток для одной пары логин/пароль используйте разделитель
                  <kbd class="text-gray-500 bg-gray-100 p-1 rounded"> ; </kbd>
                </HoverCardContent>
              </HoverCard>
            </TableHead>
            <TableHead>Тип записи</TableHead>
            <TableHead>Логин</TableHead>
            <TableHead>Пароль </TableHead>
            <TableHead class="w-10"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <AccountForm
            v-for="account in accounts"
            :key="account.id"
            :account="account"
            @remove="removeAccount"
          />
        </TableBody>
      </Table>
    </div>
  </div>
</template>

<style scoped></style>

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
import { storeToRefs } from 'pinia'
import type { BaseAccountDTO, Account } from '@/types/account.d.ts'
import { useAccounts } from '@/stores/useAccounts'
import { useAccountsStore } from '@/stores/accounts.store'
</script>
<script setup lang="ts">
// const { accounts, createAccount, removeAccount } = useAccounts()
const { accounts } = storeToRefs(useAccountsStore())
const { createAccount, removeAccount } = useAccountsStore()
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

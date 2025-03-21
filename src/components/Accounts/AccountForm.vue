<script lang="ts">
import type { Account } from '@/types/account'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { z } from 'zod'
import { ref, watch } from 'vue'
import { watchDebounced } from '@vueuse/core'
import { useAccounts } from '@/stores/useAccounts'
import { useAccountsStore } from '@/stores/accounts.store'

import { Eye, EyeOff, Trash } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { TableCell, TableRow } from '@/components/ui/table'
</script>
<script setup lang="ts">
const emit = defineEmits<{
  remove: [account: Account]
}>()

const { account } = defineProps<{
  account: Account
}>()

// const { updateAccount } = useAccounts()
const { updateAccount } = useAccountsStore()

const isPasswordVisible = ref(false)

const localAccountSchema = z.object({
  labels: z
    .string({ required_error: 'Обязательное поле' })
    .min(1, { message: 'Обязательное поле' })
    .max(50, { message: 'Максимум 50 символов' }),
  type: z.literal('local'),
  login: z
    .string({ required_error: 'Обязательное поле' })
    .min(1, { message: 'Обязательное поле' })
    .max(100, { message: 'Максимум 100 символов' }),
  password: z
    .string({ required_error: 'Обязательное поле' })
    .min(1, { message: 'Обязательное поле' })
    .max(100, { message: 'Максимум 100 символов' }),
})

const LDAPAccountSchema = z.object({
  labels: z
    .string({ required_error: 'Обязательное поле' })
    .min(1, { message: 'Обязательное поле' })
    .max(50, { message: 'Максимум 50 символов' }),
  type: z.literal('LDAP'),
  login: z
    .string({ required_error: 'Обязательное поле' })
    .min(1, { message: 'Обязательное поле' })
    .max(100, { message: 'Максимум 100 символов' }),
  password: z.null(),
})

const formSchema = toTypedSchema(
  z.discriminatedUnion('type', [localAccountSchema, LDAPAccountSchema]),
)

const {
  handleSubmit,
  isFieldDirty,
  values: formValues,
  errors,
} = useForm({
  validationSchema: formSchema,
  initialValues: account,
})

const onSubmit = handleSubmit((values) => {
  console.log('Form submitted!', values)
  updateAccount({ id: account.id, ...values })
})

watchDebounced(
  () => [formValues],
  async (values) => {
    await onSubmit()
  },
  { debounce: 500, maxWait: 3000, deep: true },
)
</script>

<template>
  <TableRow>
    <TableCell>
      <FormField v-slot="{ componentField, errors }" validate-on-blur name="labels">
        <FormItem>
          <FormControl>
            <Input
              v-bind="componentField"
              :class="{ 'border-destructive': errors.length }"
              type="text"
              placeholder="Метки"
            />
          </FormControl>
        </FormItem>
      </FormField>
    </TableCell>
    <TableCell>
      <FormField v-slot="{ componentField }" validate-on-input name="type">
        <FormItem>
          <FormControl>
            <Select v-bind="componentField">
              <SelectTrigger>
                <SelectValue placeholder="Тип записи" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="LDAP"> LDAP </SelectItem>
                  <SelectItem value="local"> Локальная </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </FormControl>
        </FormItem>
      </FormField>
    </TableCell>
    <TableCell :colspan="formValues.type !== 'local' ? 2 : 1">
      <FormField v-slot="{ componentField, errors }" validate-on-blur name="login">
        <FormItem>
          <FormControl>
            <Input
              v-bind="componentField"
              :class="{ 'border-destructive': errors.length }"
              placeholder="Логин"
            />
          </FormControl>
        </FormItem>
      </FormField>
    </TableCell>
    <TableCell v-if="formValues.type === 'local'">
      <FormField v-slot="{ componentField, errors }" validate-on-blur name="password">
        <FormItem>
          <FormControl>
            <div class="relative">
              <Input
                v-bind="componentField"
                :class="{ 'border-destructive': errors.length }"
                :type="isPasswordVisible ? 'text' : 'password'"
                placeholder="Пароль"
              />
              <Button
                class="absolute right-2 top-1/2 -translate-y-1/2"
                variant="link"
                size="sm"
                @click="isPasswordVisible = !isPasswordVisible"
              >
                <Eye v-if="isPasswordVisible" class="text-muted-foreground" />
                <EyeOff v-else class="text-muted-foreground" />
              </Button>
            </div>
          </FormControl>
        </FormItem>
      </FormField>
    </TableCell>
    <TableCell>
      <Button class="hover:text-destructive" variant="link" @click="emit('remove', account)"
        ><Trash
      /></Button>
    </TableCell>
  </TableRow>
</template>

<style scoped></style>

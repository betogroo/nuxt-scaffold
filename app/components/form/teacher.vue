<script setup lang="ts">
  import { useField, useForm } from 'vee-validate'
  import type { TeacherInsert } from '~/types'
  import { validateTeacher } from '~/schemas'

  interface Props {
    isPending?: boolean
  }
  const props = withDefaults(defineProps<Props>(), {
    isPending: false,
  })
  const $emit = defineEmits<{
    'on-submit': [values: TeacherInsert]
  }>()
  const { isPending } = toRefs(props)

  const { values, handleSubmit, meta } = useForm<TeacherInsert>({
    validationSchema: validateTeacher,
    initialValues: {
      name: '',
    },
  })

  const { value: name, errorMessage: nameError } =
    useField<TeacherInsert['name']>('name')

  const onSubmit = handleSubmit(async () => {
    $emit('on-submit', values)
  })
</script>

<template>
  <form @submit.prevent="onSubmit">
    <UFormGroup
      :error="nameError"
      label="Nome do Professor"
      required
    >
      <UInput v-model="name" />
    </UFormGroup>
    <UButton
      :disabled="!meta.valid"
      :loading="isPending"
      type="submit"
      >Enviar</UButton
    >
  </form>
</template>

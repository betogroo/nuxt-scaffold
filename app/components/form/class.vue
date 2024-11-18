<script setup lang="ts">
  import { useField, useForm } from 'vee-validate'
  import type { ClassInsert } from '~/types'
  import { validateClass } from '~/schemas'

  interface Props {
    isPending?: boolean
  }
  const props = withDefaults(defineProps<Props>(), {
    isPending: false,
  })
  const $emit = defineEmits<{
    'on-submit': [values: ClassInsert]
  }>()
  const { isPending } = toRefs(props)

  const { values, handleSubmit, meta } = useForm<ClassInsert>({
    validationSchema: validateClass,
    initialValues: {
      name: '',
    },
  })

  const { value: name, errorMessage: nameError } =
    useField<ClassInsert['name']>('name')

  const onSubmit = handleSubmit(async () => {
    $emit('on-submit', values)
  })
</script>

<template>
  <form
    class="pa-2 ma-2"
    @submit.prevent="onSubmit"
  >
    <UFormGroup
      :error="nameError"
      label="Nome da Turma"
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

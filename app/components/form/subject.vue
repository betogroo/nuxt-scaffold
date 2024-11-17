<script setup lang="ts">
  import { useField, useForm } from 'vee-validate'
  import type { SubjectInsert } from '~/types'
  import { validateSubject } from '~/schemas'

  interface Props {
    isPending?: boolean
  }
  const props = withDefaults(defineProps<Props>(), {
    isPending: false,
  })
  const $emit = defineEmits<{
    'on-submit': [values: SubjectInsert]
  }>()
  const { isPending } = toRefs(props)

  const { values, handleSubmit, meta } = useForm<SubjectInsert>({
    validationSchema: validateSubject,
    initialValues: {
      name: '',
    },
  })

  const { value: name, errorMessage: nameError } =
    useField<SubjectInsert['name']>('name')

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
      label="Nome da Matéria"
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

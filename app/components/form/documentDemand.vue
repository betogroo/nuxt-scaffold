<script setup lang="ts">
  import { useField, useForm } from 'vee-validate'
  import type { DocumentDemandInsert } from '~/types'
  import { validateDocumentDemand } from '~/types'
  interface Props {
    isPending?: boolean
  }
  const props = withDefaults(defineProps<Props>(), {
    isPending: false,
  })

  const $emit = defineEmits<{
    'on-submit': [values: DocumentDemandInsert]
  }>()

  const user = useSupabaseUser()

  const { isPending } = toRefs(props)

  const { values, handleSubmit, meta } = useForm<DocumentDemandInsert>({
    validationSchema: validateDocumentDemand,
    initialValues: {
      document_number: '',
      name: '',
      user_id: user.value?.id,
    },
  })

  const { value: documentNumber, errorMessage: documentNumberError } =
    useField<DocumentDemandInsert['document_number']>('document_number')
  const { value: name, errorMessage: nameError } =
    useField<DocumentDemandInsert['name']>('name')

  const onSubmit = handleSubmit(async () => {
    $emit('on-submit', values)
  })
</script>

<template>
  <form @submit.prevent="onSubmit">
    <UFormGroup
      :error="documentNumberError"
      label="Número do RG"
      required
    >
      <UInput v-model="documentNumber" />
    </UFormGroup>
    <UFormGroup
      :error="nameError"
      label="Nome (Como escrito no documento)"
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

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
      user_id: user.value?.id,
    },
  })

  const { value: documentNumber, errorMessage: documentNumberError } =
    useField<DocumentDemandInsert['document_number']>('document_number')

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
    <UButton
      :disabled="!meta.valid"
      :loading="isPending"
      type="submit"
      >Enviar</UButton
    >
  </form>
</template>

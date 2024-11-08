<script setup lang="ts">
  import { useField, useForm } from 'vee-validate'
  import type { DocumentDemandInsert } from '~/types'
  import { validateDocumentDemand } from '~/schemas'
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
      note: '',
    },
  })

  const { value: documentNumber, errorMessage: documentNumberError } =
    useField<DocumentDemandInsert['document_number']>('document_number')
  const { value: name, errorMessage: nameError } =
    useField<DocumentDemandInsert['name']>('name')
  const { value: site, errorMessage: siteError } =
    useField<DocumentDemandInsert['site']>('site')
  const { value: type, errorMessage: typeError } =
    useField<DocumentDemandInsert['type']>('type')
  const { value: note, errorMessage: noteError } =
    useField<DocumentDemandInsert['note']>('note')

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
    <UFormGroup
      :error="siteError"
      label="Posto de Identificação"
      required
    >
      <USelect
        v-model="site"
        option-attribute="name"
        :options="demandSites"
        placeholder="Escolha"
      />
    </UFormGroup>
    <UFormGroup
      :error="typeError"
      label="Tipo do Documento"
      required
    >
      <USelect
        v-model="type"
        option-attribute="name"
        :options="demandTypes"
        placeholder="Escolha"
      />
    </UFormGroup>
    <UFormGroup
      :error="noteError"
      label="Observações"
    >
      <UTextarea v-model="note" />
    </UFormGroup>
    <UButton
      :disabled="!meta.valid"
      :loading="isPending"
      type="submit"
      >Enviar</UButton
    >
  </form>
</template>

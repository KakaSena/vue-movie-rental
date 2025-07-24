interface Address {
  street: string
  neighborhood: string
  city: string
  state: string
}

interface CepResponse {
  success: boolean
  error: string | null
  address: Address | null
}
export const fetchAddressByCep = async (cep: string): Promise<CepResponse> => {
  const cleanedCep = cep.replace(/\D/g, '')

  try {
    const response = await fetch(`https://viacep.com.br/ws/${cleanedCep}/json/`)

    if (!response.ok) {
      throw new Error('CEP lookup failed')
    }

    const data = await response.json()

    if (data.erro) {
      return {
        success: false,
        error: 'CEP not found, enter address manually',
        address: null,
      }
    }

    return {
      success: true,
      error: null,
      address: {
        street: data.logradouro || '',
        neighborhood: data.bairro || '',
        city: data.localidade || '',
        state: data.uf || '',
      },
    }
  } catch (error) {
    return {
      success: false,
      error: 'Error fetching address',
      address: null,
    }
  }
}

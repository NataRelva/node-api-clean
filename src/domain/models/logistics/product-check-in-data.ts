// availabilityCheck: Quantidade de produtos: Verificar se a quantidade de produtos recebidos corresponde à quantidade solicitada.

// conditionCheck: Condição dos produtos: Verificar se os produtos foram danificados durante o transporte ou se estão em boas condições.

// expirationDateCheck: Data de validade: Verificar se os produtos estão dentro da data de validade e se estão prontos para serem vendidos ou usados.

// serialNumberCheck: Número de série: Verificar se os produtos têm números de série únicos e se correspondem aos números de série registrados.

// priceCheck: Preço: Verificar se os preços dos produtos estão corretos e se correspondem aos preços acordados.

// documentationCheck: Documentação: Verificar se todos os documentos de acompanhamento, como notas fiscais, faturas e certificados, estão presentes e em ordem.

// storageCheck: Armazenamento: Verificar se os produtos foram armazenados corretamente e se estão em condições ideais.

// identificationCheck: Identificação: Verificar se os produtos estão claramente identificados com as informações necessárias, como códigos de barras e etiquetas de identificação.

export interface ProductCheckInStatus {
  availabilityCheck: boolean
  conditionCheck: boolean
  expirationDateCheck: boolean
  serialNumberCheck: boolean
  priceCheck: boolean
  documentationCheck: boolean
  storageCheck: boolean
  identificationCheck: boolean
}

export interface ProductCheckInData {
  productId: string
  quantity: number
  provider: 'celmar' | 'rmoura',
  discount?: number
  status: ProductCheckInStatus
}
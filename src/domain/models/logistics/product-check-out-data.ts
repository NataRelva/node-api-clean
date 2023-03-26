// Itens selecionados: Verificar se todos os itens selecionados pelo cliente estão corretos e se correspondem à intenção de compra.

// Quantidade de itens: Verificar se a quantidade de itens selecionados pelo cliente está correta e se corresponde ao número de itens exibidos no carrinho ou na tela de finalização de compra.

// Preços: Verificar se os preços dos itens estão corretos e se correspondem aos preços exibidos no site ou na loja física.

// Promoções: Verificar se quaisquer promoções ou descontos aplicáveis foram aplicados corretamente aos itens selecionados pelo cliente.

// Opções de entrega: Verificar se as opções de entrega selecionadas pelo cliente estão corretas e se correspondem às preferências do cliente.

// Informações de pagamento: Verificar se as informações de pagamento fornecidas pelo cliente estão corretas e se correspondem à forma de pagamento selecionada.

// Informações de contato: Verificar se as informações de contato fornecidas pelo cliente estão corretas e atualizadas, para que a empresa possa entrar em contato em caso de problemas.

// Políticas de devolução: Verificar se o cliente foi informado sobre as políticas de devolução e se concorda com elas antes de finalizar a compra.

export interface ProductCheckOutDetails {
  productId: string
  quantity: number
  provider: 'celmar' | 'rmoura',
  discount?: number
  deliveryAddress: { 
    street: string
    number: number
    complement: string
    neighborhood: string
    city: string
    state: string
    country: string
    zipCode: string
  }
}

export interface ProductCheckOutData {
  purchaseId: string
  sendEmail: boolean
  status : 'pending' | 'inProgress' | 'delivered' | 'canceled'
  productsDetails: ProductCheckOutDetails[]
  createDate: Date
}
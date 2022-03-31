export type Cliente = {
    anoNascimento: string
    appManutencaos: string | null
    appNotificacos: string | null
    appVeiculos: string | null
    aprovacao: string | null
    aprovacaoId: number
    ativo: number
    bairroEnderecoCliente: string
    boletos: string | null
    cepEnderecoCliente: string
    cidadeCliente: string | null
    cidadeClienteId: number
    cnpjCliente: string | null
    codigoCliente: string
    complementoEnderecoCliente: string
    cpfCliente: string
    dataAberturaEmpresaCliente: string | null | moment.Moment
    datecreate: string
    datemodified: string
    diaNascimento: string
    docCarteiraMotorista: string
    docComprovanteResidencia: string
    emailCliente: string
    estatoCliente: string | null
    estatoClienteId: number
    idCliente: number
    inscricaoEstadualCliente: string | null
    mesNascimento: string
    nivelAcesso: string | null
    nivelAcessoId: number
    nomeCliente: string
    nomeMae: string
    nomePai: string
    numEnderecoCliente: string
    plano: string | null
    planoId: string | null
    ruaEnderecoCliente: string
    senhaCliente: string
    telefoneCliente: string
    tipoCliente: string | null
    tipoClienteId: number
}
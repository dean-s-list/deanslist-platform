import { PublicKey } from '@solana/web3.js'
import { Registrar } from './accounts'
import { VsrClient } from './client'

export const tryGetRegistrar = async (registrarPk: PublicKey, client: Pick<VsrClient, 'program'>) => {
  try {
    const existingRegistrar = await client.program.account.registrar.fetch(registrarPk)
    return existingRegistrar as Registrar
  } catch (e) {
    return null
  }
}

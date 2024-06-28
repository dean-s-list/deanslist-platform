import { PublicKey } from '@solana/web3.js'
import { Buffer } from 'buffer'
import { PluginName } from '../../constants/plugins'

export function getRegistrarPDA(
  realmPk: PublicKey,
  mint: PublicKey,
  clientProgramId: PublicKey,
  pluginName?: PluginName,
) {
  const PLUGIN_NAME_SEEDS: any = {
    VSR: [realmPk.toBuffer(), Buffer.from('registrar'), mint.toBuffer()],
  }
  const seed = (pluginName && PLUGIN_NAME_SEEDS[pluginName]) ?? [
    Buffer.from('registrar'),
    realmPk.toBuffer(),
    mint.toBuffer(),
  ]
  const [registrar, registrarBump] = PublicKey.findProgramAddressSync(seed, clientProgramId)
  return {
    registrar,
    registrarBump,
  }
}

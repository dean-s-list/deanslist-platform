import { Injectable } from '@nestjs/common'
import { Connection, Keypair, PublicKey } from '@solana/web3.js'
import { ApiCoreService } from '@deanslist-platform/api-core-data-access'
import { AnchorProvider } from '@coral-xyz/anchor'
import { getPlugins, GovernanceRole, VSR_PLUGIN_PKS, VsrClient } from '@deanslist-platform/realms-sdk-react'

import { LRUCache } from 'lru-cache'
import { ApiLeaderboardRealmsService } from './api-leaderboard-realms.service'
import { AnchorKeypairWallet } from './anchor-keypair-wallet'

@Injectable()
export class ApiLeaderboardVsrService {
  private connection: Connection
  private mainWallet = new AnchorKeypairWallet(Keypair.generate())

  private readonly cacheVsrClient = new LRUCache<string, VsrClient>({
    max: 1000,
    ttl: 1000 * 60 * 10, // 10 minutes
    fetchMethod: async () => this._getVsrClient(),
  })

  constructor(private core: ApiCoreService, private realmsService: ApiLeaderboardRealmsService) {
    this.connection = new Connection(this.core.config.solanaMainnetUrl)
  }

  clearCache() {
    this.cacheVsrClient.clear()
  }

  async getVsrClient() {
    const vsrClient = await this.cacheVsrClient.fetch('vsrClient')

    if (!vsrClient) {
      throw new Error('Unable to load VSR client')
    }

    return vsrClient
  }

  async _getVsrClient(role: GovernanceRole = 'community') {
    const realm = await this.realmsService.getRealm()
    const governanceMintPublicKey =
      role === 'community' ? realm?.account.communityMint : realm?.account.config.councilMint

    const walletPublicKeys = [this.mainWallet.publicKey]

    const plugins = await this.getPlugins(realm!.pubkey, governanceMintPublicKey!, walletPublicKeys)
    const plugin = plugins?.voterWeight.find((plugin: any) => VSR_PLUGIN_PKS.includes(plugin.programId.toString()))

    return plugin?.client as unknown as VsrClient
  }

  async getPlugins(realmPublicKey: PublicKey, governanceMintPublicKey: PublicKey, walletPublicKeys: PublicKey[]) {
    const provider = new AnchorProvider(this.connection, this.mainWallet, AnchorProvider.defaultOptions())

    const voterWeightPluginsPromise = getPlugins({
      ...{ realmPublicKey, governanceMintPublicKey, walletPublicKeys },
      provider,
      type: 'voterWeight',
      wallets: walletPublicKeys,
      signer: this.mainWallet,
    })
    // Load the max voter weight plugins associated with the realm and governance
    const maxVoterWeightPluginsPromise = getPlugins({
      ...{ realmPublicKey, governanceMintPublicKey, walletPublicKeys },
      provider,
      type: 'maxVoterWeight',
      wallets: walletPublicKeys,
      signer: this.mainWallet,
    })

    const [voterWeightPlugins, maxVoterWeightPlugins] = await Promise.all([
      voterWeightPluginsPromise,
      maxVoterWeightPluginsPromise,
    ])

    return {
      voterWeight: voterWeightPlugins,
      maxVoterWeight: maxVoterWeightPlugins,
    }
  }
}

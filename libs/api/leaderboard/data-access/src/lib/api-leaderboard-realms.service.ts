import { Injectable } from '@nestjs/common'
import {
  getRealm,
  getRealmConfig,
  getRealmConfigAddress,
  ProgramAccount,
  Realm,
  RealmConfigAccount,
} from '@solana/spl-governance'
import { Connection, PublicKey } from '@solana/web3.js'
import { ApiCoreService } from '@deanslist-platform/api-core-data-access'
import { LRUCache } from 'lru-cache'

const cacheOpts = {
  max: 1000,
  ttl: 1000 * 60 * 60 * 24, // 1 day
}

@Injectable()
export class ApiLeaderboardRealmsService {
  private connection: Connection

  private readonly cacheRealm = new LRUCache<string, ProgramAccount<Realm>>({
    ...cacheOpts,
    fetchMethod: async () => this._getRealm(),
  })

  private readonly cacheRealmConfig = new LRUCache<string, ProgramAccount<RealmConfigAccount>>({
    ...cacheOpts,
    fetchMethod: async () => this._getRealmConfig(),
  })

  constructor(private core: ApiCoreService) {
    this.connection = new Connection(this.core.config.solanaMainnetUrl)
  }

  clearCache() {
    this.cacheRealm.clear()
    this.cacheRealmConfig.clear()
  }

  async getRealm() {
    const realm = await this.cacheRealm.fetch('realm')

    if (!realm) {
      throw new Error('Unable to load realm details')
    }

    return realm
  }

  async getRealmConfig() {
    const realmConfig = await this.cacheRealmConfig.fetch('realmConfig')

    if (!realmConfig) {
      throw new Error('Unable to load realm configuration details')
    }

    return realmConfig
  }

  async _getRealm() {
    console.log('Fetching new realm')
    const deansRealm = {
      symbol: "Dean's List Network State",
      displayName: "Dean's List Network State",
      programId: 'GovER5Lthms3bLBqWub97yVrMmEogzX7xNjdXpPPCVZw',
      realmId: 'F9V4Lwo49aUe8fFujMbU6uhdFyDRqKY54WpzdpncUSk9',
      bannerImage: '/realms/Deans_List_Network_State/banner-deanslist.png',
      website: 'https://www.deanslist.services/',
      twitter: '@deanslistDAO',
      discord: 'https://discord.gg/deanslist',
      ogImage: '/realms/Deans_List_Network_State/avatar-deanslist.png',
      github: 'https://github.com/Deans-List/',
      shortDescription:
        'A Service DAO turned Network State, consisting of Web3 power users providing feedback sessions. Join us in changing the future of work!',
    }
    const pubkey = new PublicKey(deansRealm.realmId)
    return getRealm(this.connection, pubkey)
  }

  async _getRealmConfig() {
    console.log('Fetching new realm config')
    const realm = await this.getRealm()
    const configAddress = await getRealmConfigAddress(realm.owner, realm.pubkey)
    return getRealmConfig(this.connection, configAddress)
  }
}

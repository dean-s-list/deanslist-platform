import { PublicKey } from '@solana/web3.js'
import { RealmConfig } from '@solana/spl-governance'
import { getMintMaxVoteWeight } from '@realms/models/voteWeights'
import { RawMint } from '@solana/spl-token'
import { BN } from '@coral-xyz/anchor'

export const useMintConfiguredMaxVoteWeight = (
  governanceMint?: PublicKey,
  realmConfig?: RealmConfig,
  mintInfo?: RawMint,
): BN => {
  // this allows this hook to be set up before the realm config is loaded
  if (!governanceMint || !realmConfig || !mintInfo) return new BN(0)

  if (realmConfig.councilMint && governanceMint.equals(realmConfig.councilMint)) {
    return new BN(mintInfo?.supply.toString() || 0)
  }

  const mintMaxVoteWeight = getMintMaxVoteWeight(mintInfo, realmConfig.communityMintMaxVoteWeightSource)
  return new BN(mintMaxVoteWeight.toString())
}

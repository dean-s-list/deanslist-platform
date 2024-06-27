import { RawMint } from '@solana/spl-token'
import BigNumber from 'bignumber.js'
import { MintMaxVoteWeightSource, MintMaxVoteWeightSourceType, Proposal, Realm } from '@solana/spl-governance'
import { PublicKey } from '@solana/web3.js'
import { BN } from '@coral-xyz/anchor'

/** Returns max VoteWeight for given mint and max source */
export function getMintMaxVoteWeight(mint: RawMint, maxVoteWeightSource: MintMaxVoteWeightSource) {
  if (maxVoteWeightSource.isFullSupply()) {
    return mint.supply
  }

  if (maxVoteWeightSource.type === MintMaxVoteWeightSourceType.SupplyFraction) {
    const supplyFraction = maxVoteWeightSource.getSupplyFraction()

    const maxVoteWeight = new BigNumber(supplyFraction.toString())
      .multipliedBy(mint.supply.toString())
      .shiftedBy(-MintMaxVoteWeightSource.SUPPLY_FRACTION_DECIMALS)

    return new BN(maxVoteWeight.dp(0, BigNumber.ROUND_DOWN).toString())
  } else {
    // absolute value
    return maxVoteWeightSource.value
  }
}

/** Returns max vote weight for a proposal  */
export function getProposalMaxVoteWeight(
  realm: Realm,
  proposal: Proposal,
  governingTokenMint: RawMint,
  // For vetos we want to override the proposal.governingTokenMint
  governingTokenMintPk?: PublicKey,
) {
  // For finalized proposals the max is stored on the proposal in case it can change in the future
  if (proposal.isVoteFinalized() && proposal.maxVoteWeight) {
    return proposal.maxVoteWeight
  }

  // Council votes are currently not affected by MaxVoteWeightSource
  if ((governingTokenMintPk ?? proposal.governingTokenMint).toBase58() === realm.config.councilMint?.toBase58()) {
    return governingTokenMint.supply
  }

  return getMintMaxVoteWeight(governingTokenMint, realm.config.communityMintMaxVoteWeightSource)
}

import { PublicKey } from '@solana/web3.js'
import { RawMint } from '@solana/spl-token'

export type MintAccount = RawMint

export type TokenProgramAccount<T> = {
  publicKey: PublicKey
  account: T
}

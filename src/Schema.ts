import { BigNumber } from './utils/BigNumber'

/**
 * Hex string
 * @public
 */
export type Data = string

/**
 * Hex string of 32 bytes
 * @public
 */
export type TxHash = string
/**
 * Hex string of 20 bytes
 * @public
 */
export type Address = string
/**
 * @public
 */
export type Hex = string
/**
 * @public
 */
export type Quantity = number | Hex

/**
 * @public
 */
export type Syncing = {
  startingBlock: Quantity
  currentBlock: Quantity
  highestBlock: Quantity

  // @internal
  knownStates?: Quantity
  // @internal
  pulledStates?: Quantity
}

/**
 * @public
 */
export enum TransactionStatus {
  pending = 'pending',
  confirmed = 'confirmed',
  failed = 'failed'
}

/**
 * @public
 */
export type Tag = 'latest' | 'earliest' | 'pending'

/**
 * @public
 */
export type TransactionOptions = {
  /**
   * The address the transaction is sent from.
   */
  from: Address

  /**
   * The address the transaction is directed to.
   */
  to: Address

  /**
   * Integer of the gas provided for the transaction execution. eth_call consumes zero gas, but this parameter
   * may be needed by some executions.
   *
   * Default: 90000
   */
  gas?: BigNumber.Value

  /**
   *  Integer of the gasPrice used for each paid gas
   */
  gasPrice?: BigNumber.Value

  /**
   * Integer of the value sent with this transaction
   */
  value?: BigNumber.Value

  /**
   * The compiled code of a contract OR the hash of the invoked method signature and encoded parameters.
   * For details see Ethereum Contract ABI
   */
  data: string

  /** Integer of a nonce. This allows to overwrite your own pending transactions that use the same nonce. */
  nonce?: BigNumber.Value
}

/**
 * @public
 */
export type TransactionCallOptions = {
  /**
   * The address the transaction is sent from.
   */
  from?: Address

  /**
   * The address the transaction is directed to.
   */
  to: Address

  /**
   * Integer of the gas provided for the transaction execution. eth_call consumes zero gas, but this parameter
   * may be needed by some executions.
   *
   * Default: 90000
   */
  gas?: BigNumber.Value

  /**
   *  Integer of the gasPrice used for each paid gas
   */
  gasPrice?: BigNumber.Value

  /**
   * Integer of the value sent with this transaction
   */
  value?: BigNumber.Value

  /**
   * The compiled code of a contract OR the hash of the invoked method signature and encoded parameters.
   * For details see Ethereum Contract ABI
   */
  data?: string
}

/**
 * @public
 */
export type BlockObject = {
  /** the block number. null when its pending block. */
  number: Quantity
  /** hash of the block. null when its pending block. */
  hash: TxHash
  /** hash of the parent block. */
  parentHash: TxHash
  /** hash of the generated proof-of-work. null when its pending block. 8 Bytes  */
  nonce: Data
  /** SHA3 of the uncles data in the block. */
  sha3Uncles: TxHash
  /** the bloom filter for the logs of the block. null when its pending block. 256 Bytes */
  logsBloom: Data
  /** the root of the transaction trie of the block. */
  transactionsRoot: TxHash
  /** the root of the final state trie of the block. */
  stateRoot: TxHash
  /** the root of the receipts trie of the block. */
  receiptsRoot: TxHash
  /** the address of the beneficiary to whom the mining rewards were given. */
  miner: Address
  /** integer of the difficulty for this block. */
  difficulty: BigNumber
  /** integer of the total difficulty of the chain until this block. */
  totalDifficulty: BigNumber
  /** the "extra data" field of this block. */
  extraData: Data
  /** integer the size of this block in bytes. */
  size: Quantity
  /** the maximum gas allowed in this block. */
  gasLimit: Quantity
  /** the total used gas by all transactions in this block. */
  gasUsed: Quantity
  /** the unix timestamp for when the block was collated. */
  timestamp: Quantity
  /** Array of transaction objects, or 32 Bytes transaction hashes depending on the last given parameter. */
  transactions: Array<TxHash> | Array<TransactionObject>
  /** Array of uncle hashes */
  uncles: Array<TxHash>
}

/**
 * @public
 */
export type TransactionObject = {
  /** hash of the transaction. */
  hash: TxHash
  /** the number of transactions made by the sender prior to this one. */
  nonce: number
  /** hash of the block where this transaction was in. null when its pending. */
  blockHash: TxHash
  /** block number where this transaction was in. null when its pending. */
  blockNumber: number
  /** integer of the transactions index position in the block. null when its pending. */
  transactionIndex: number
  /** address of the sender. */
  from: Address
  /** address of the receiver. null when its a contract creation transaction. */
  to: Address | null
  /** value transferred in Wei. */
  value: BigNumber
  /** gas price provided by the sender in Wei. */
  gasPrice: BigNumber
  /** gas provided by the sender. */
  gas: Quantity
  /** the data send along with the transaction. */
  input: Data

  v?: Data
  r?: Data
  s?: Data
}

/**
 * @public
 */
export type Transaction =
  | DroppedTransaction
  | ReplacedTransaction
  | QueuedTransaction
  | PendingTransaction
  | ConfirmedTransaction
  | RevertedTransaction

/**
 * @public
 */
export enum TransactionType {
  queued = 'queued',
  dropped = 'dropped',
  replaced = 'replaced',
  pending = 'pending',
  reverted = 'reverted',
  confirmed = 'confirmed'
}

/**
 * @public
 */
export type DroppedTransaction = {
  type: TransactionType.dropped
  hash: string
  nonce: number
}

/**
 * @public
 */
export type ReplacedTransaction = {
  type: TransactionType.replaced
  hash: string
  nonce: number
}

/**
 * @public
 */
export type QueuedTransaction = {
  type: TransactionType.queued
  hash: string
  nonce: number
}

/**
 * @public
 */
export type PendingTransaction = TransactionObject & {
  type: TransactionType.pending
}

/**
 * @public
 */
export type RevertedTransaction = TransactionObject & {
  type: TransactionType.reverted
}

/**
 * @public
 */
export type ConfirmedTransaction = TransactionObject & {
  type: TransactionType.confirmed
  receipt: TransactionReceipt
}

/**
 * @public
 */
export type TransactionAndReceipt = TransactionObject & { receipt: TransactionReceipt }
/**
 * @public
 */
export type FinishedTransactionAndReceipt = TransactionAndReceipt & { status: TransactionStatus }
/**
 * @public
 */
export type BlockIdentifier = Quantity | Tag

export type TopicFilter = Array<Data | null | TopicFilter>

/**
 * @public
 */
export type FilterOptions = {
  /** (optional, default: "latest") Integer block number, or "latest" for the last mined block or "pending", "earliest" for not yet mined transactions. */
  fromBlock?: BlockIdentifier
  /** (optional, default: "latest") Integer block number, or "latest" for the last mined block or "pending", "earliest" for not yet mined transactions. */
  toBlock?: BlockIdentifier
  /** (optional) Contract address or a list of addresses from which logs should originate. */
  address?: Data | Address
  /** (optional) Array of 32 Bytes DATA topics. Topics are order-dependent. Each topic can also be an array of DATA with "or" options. */
  topics?: TopicFilter
}

/**
 * @public
 */
export type TransactionReceipt = {
  /** hash of the transaction. */
  transactionHash: TxHash
  /** integer of the transactions index position in the block. */
  transactionIndex: Quantity
  /** hash of the block where this transaction was in. */
  blockHash: TxHash
  /** block number where this transaction was in. */
  blockNumber: Quantity
  /** The total amount of gas used when this transaction was executed in the block. */
  cumulativeGasUsed: Quantity
  /** The amount of gas used by this specific transaction alone. */
  gasUsed: Quantity
  /**  The contract address created, if the transaction was a contract creation, otherwise null. */
  contractAddress: Address
  /** Array of log objects, which this transaction generated. */
  logs: Array<LogObject>
  /**  256 Bytes - Bloom filter for light clients to quickly retrieve related logs. */
  logsBloom: Data
  /**  post-transaction stateroot (pre Byzantium) */
  root?: TxHash
  /** either 1 (success) or 0 (failure) */
  status?: Quantity
}

/**
 * @public
 */
export type LogObject = {
  /** true when the log was removed, due to a chain reorganization. false if its a valid log. */
  removed: boolean
  /** integer of the log index position in the block. null when its pending log. */
  logIndex: Quantity
  /** integer of the transactions index position log was created from. null when its pending log. */
  transactionIndex: Quantity
  /** hash of the transactions this log was created from. null when its pending log. */
  transactionHash: TxHash
  /** hash of the block where this log was in. null when its pending. null when its pending log. */
  blockHash: TxHash
  /** the block number where this log was in. null when its pending. null when its pending log. */
  blockNumber: Quantity
  /** address from which this log originated. */
  address: Address
  /** contains one or more 32 Bytes non-indexed arguments of the log. */
  data: Data
  /**
   * Array of 0 to 4 32 Bytes DATA of indexed log arguments. (In solidity: The first topic is the hash of the signature
   * of the event (e.g. Deposit(address,bytes32,uint256)), except you declared the event with the anonymous specifier.)
   */
  topics: Array<Data>
}

/**
 * @public
 */
export type SHHPost = {
  /** (optional) The identity of the sender. */
  from: Data
  /** (optional) The identity of the receiver. When present whisper will encrypt the message so that only the receiver can decrypt it. */
  to: Data
  /** Array of DATA topics, for the receiver to identify messages. */
  topics: Array<Data>
  /** The payload of the message. */
  payload: Data
  /** The integer of the priority in a rang from ... (?). */
  priority: Quantity
  /** integer of the time to live in seconds. */
  ttl: Quantity
}

/**
 * @public
 */
export type SHHFilterOptions = {
  /**
   * (optional) Identity of the receiver. When present it will try to decrypt any incoming message if the client holds the private key to this identity.
   */
  to?: Data
  /**
   * Array of DATA topics which the incoming message's topics should match. You can use the following combinations:
   * [A, B] = A && B
   * [A, [B, C]] = A && (B || C)
   * [null, A, B] = ANYTHING && A && B null works as a wildcard
   */
  topics: TopicFilter
}

/**
 * @public
 */
export type SHHFilterMessage = {
  /** The hash of the message. */
  hash: TxHash
  /** The sender of the message, if a sender was specified. */
  from: Data
  /** The receiver of the message, if a receiver was specified. */
  to: Data
  /** Integer of the time in seconds when this message should expire (?). */
  expiry: Quantity
  /** Integer of the time the message should float in the system in seconds (?). */
  ttl: Quantity
  /** Integer of the unix timestamp when the message was sent. */
  sent: Quantity
  /** Array of DATA topics the message contained. */
  topics: Array<Data>
  /** The payload of the message. */
  payload: Data
  /** Integer of the work this message required before it was send (?). */
  workProved: Quantity
}

/**
 * @public
 */
export type EventData = {
  data: string
  topics: string[]
  address: string
}

/**
 * @public
 */
export type AbiType = 'function' | 'constructor' | 'event' | 'fallback'

/**
 * @public
 */
export type StateMutabilityType = 'pure' | 'view' | 'nonpayable' | 'payable'

/**
 * @public
 */
export type AbiItem = AbiFunction | AbiEvent | AbiConstructor | AbiFallback | AbiItemGeneric

/**
 * @public
 */
export interface AbiFunction {
  type: 'function'
  anonymous?: boolean
  constant?: boolean
  inputs?: AbiInput[]
  name?: string
  outputs?: AbiOutput[]
  payable?: boolean
  stateMutability?: StateMutabilityType
  gas?: number
}

/**
 * @public
 */
export interface AbiEvent {
  type: 'event'
  anonymous?: boolean
  constant?: boolean
  inputs?: AbiInput[]
  name?: string
  outputs?: AbiOutput[]
  payable?: boolean
  stateMutability?: StateMutabilityType
  gas?: number
}

/**
 * @public
 */
export interface AbiFallback {
  type: 'fallback'
  anonymous?: boolean
  constant?: boolean
  inputs?: AbiInput[]
  name?: string
  outputs?: AbiOutput[]
  payable?: boolean
  stateMutability?: StateMutabilityType
  gas?: number
}

/**
 * @public
 */
export interface AbiItemGeneric {
  type: string
  anonymous?: boolean
  constant?: boolean
  inputs?: AbiInput[]
  name?: string
  outputs?: AbiOutput[]
  payable?: boolean
  stateMutability?: StateMutabilityType
  gas?: number
}

/**
 * @public
 */
export interface AbiConstructor {
  type: 'constructor'
  anonymous?: boolean
  constant?: boolean
  inputs?: AbiInput[]
  name?: string
  outputs?: AbiOutput[]
  payable?: boolean
  stateMutability?: StateMutabilityType
  gas?: number
}

/**
 * @public
 */
export interface AbiInput {
  name: string
  type: string
  indexed?: boolean
  components?: AbiInput[]
  internalType?: string
}

/**
 * @public
 */
export interface AbiOutput {
  name: string
  type: string
  components?: AbiOutput[]
  internalType?: string
}

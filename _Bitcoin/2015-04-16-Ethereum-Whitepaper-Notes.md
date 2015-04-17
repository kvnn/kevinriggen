---
layout: post
title: Ethereum Whitepaper Notes
---
My notes on the [Ethereum Whitepaper](https://github.com/ethereum/wiki/wiki/White-Paper).

<section>

## History
- See my [selected quotes regarding bitcoin]({{site.url}}/Bitcoin/2015-04-14-Notes-on-Bitcoin-from-Ethereum-WP.html).
- The concept of decentralized digital currency, as well as alternative applications like property registries, has been around for decades.
- both approaches [proof of work & proof of stake] can be used to serve as the backbone of a cryptocurrency

</section><section>

## Ethereum
> "Ethereum ... is essentially the ultimate abstract foundational layer: a blockchain with a built-in Turing-complete programming language ... allowing anyone to write smart contracts and decentralized applications where they can create their own arbitrary rules for ownership, transaction formats and state transition functions

-  Has a separate blockchain from Bitcoin, and looks to add much more ability to the scripting capability of transactions
- Can be used to write a "bare-bones version of Namecoin ... in two lines of code"
- Supports scripting that is "vastly more powerful" than Bitcoin scripting due to:
    - Turing-completeness
    - Value-awareness
    - Blockchain-awareness
    - State

### Accounts
- State is made up of 'accounts'
- Accounts have a 20-byte address
- State transitions <==attained through==> transfers (of value and information) b/w accounts
- Four fields:
    - Nonce: a counter to ensure a transaction can run only once
    - Ether balance
        - Ether is crypto-fuel
        - used to pay transaction fees
    - Contract code
        - some accounts are owned by "contract code" rather than private keys
    - Storage - empty by default

### Messages & Transactions
- Transactions: "the signed data package that stores a message to be sent from an externally owned account"
- Messages & Transactions "leads to the recipient account running its code"
- Transaction fields:
    - Message recipient
    - Sender signature
    - Amount of Ether to transfer to recipient
    - Data (optional)
    - STARTGAS: "the maximum number of computational steps the transaction execution is allowed to take"
    - GASPRICE: "the fee the sender pays per computational step"
- "The STARTGAS and GASPRICE fields are crucial for Ethereum's anti-denial of service model"
- "The intent of the fee system is to require an attacker to pay proportionately for every resource that they consume, including computation, bandwidth and storage"

> "Contracts have the ability to send "messages" to other contracts. Messages are virtual objects that are never serialized and exist only in the Ethereum execution environment...**a message is like a transaction, except it is produced by a contract and not an external actor**... contracts can have relationships with other contracts in exactly the same way that external actors can

- Message fields:
    - Sender
    - Recipient
    - Amount of ether to transfer
    - Data (optional)
    - STARTGAS

- **Why don't Messages have a GASPRICE value?**

### State Transition Function
![Ethereum State Transition]({{ site.url }}/img/EthereumStateTransition.png)

1. Check if the transaction is valid

2. Calculate the transaction fee... Subtract the fee from the sender's balance... increment the sender's

3. Initialize GAS = STARTGAS, and take off a certain quantity of gas per byte to pay for the bytes in the transaction.

4. Send transaction value from the sender's account to the receiving account. Create receiving account if DNE. If the receiving account is a contract, run the contract's code either to completion or until the execution runs out of gas.

5. If the value transfer failed, revert all state changes except the payment of the fees, and add the fees to the miner's account.

6. Otherwise, refund the fees for all remaining gas to the sender, and send the fees paid for gas consumed to the miner.

### Code Execution
- Contract code is written in a low-level, stack-based bytecode language
- Language is called "Ethereum virtual machine code" or "EVM code"
- The operations have access to three types of space in which to store data:
    - The stack, a last-in-first-out container to which values can be pushed and popped
    - Memory, an infinitely expandable byte array
    - The contract's long-term storage, a key/value store
    - Stack and memory reset after computation ends while storage persists for the long term
- A Contract receiving a message can access:
    - message value
    - message sender
    - message data of the incoming message
    - block header data
- Contract code can return a byte array of data

> "The formal execution model of EVM code is surprisingly simple. While the Ethereum virtual machine is running, its full computational state can be defined by the tuple (block_state, transaction, message, code, memory, stack, pc, gas), where block_state is the global state containing all accounts and includes balances and storage... a basic implementation of Ethereum can be done in a few hundred lines of code.

### Blockchain & Mining
- The blockchain is similar to Bitcoin's
- Unlike Bitcoin, Ethereum blocks contain a copy of both the transaction list and the most recent state
- In reality efficiency should be comparable to that of Bitcoin
- The state is stored in the tree structure, and after every block only a small part of the tree needs to be changed
- A "Patricia tree" is used to accomplish this
- Because all of the state information is part of the last block, there is no need to store the entire blockchain history

> "the process of executing contract code is part of the definition of the state transition function, which is part of the block validation algorithm, so if a transaction is added into block B the code execution spawned by that transaction will be executed by all nodes, now and in the future, that download and validate block B

</section><section>

## Applications
1. Financial applications
    - sub-currencies, financial derivatives, hedging contracts, savings wallets, wills, and ultimately even some classes of full-scale employment contracts

2. Semi-financial applications
    - money is involved but there is also a heavy non-monetary side to what is being done
    - e.g. self-enforcing bounties for solutions to computational problems

3. Non-financial
    - governance & voting

### Token Systems
> "On-blockchain token systems have many applications ranging from sub-currencies representing assets such as USD or gold to company stocks, individual tokens representing smart property, secure unforgeable coupons, and even token systems with no ties to conventional value at all, used as point systems for incentivization

> "The key point to understand is that all a currency, or token system, fundamentally is is a database with one operation: subtract X units from A and give X units to B, with the proviso that (i) A had at least X units before the transaction and (2) the transaction is approved by A. All that it takes to implement a token system is to implement this logic into a contract.

> "Theoretically, Ethereum-based token systems acting as sub-currencies can potentially include another important feature that on-chain Bitcoin-based meta-currencies lack: the ability to pay transaction fees directly in that currency... the contract would maintain an ether balance with which it would refund ether used to pay fees to the sender, and it would refill this balance by collecting the internal currency units that it takes in fees and reselling them in a constant running auction

### Financial derivatives and Stable-Value Currencies
> 'Financial derivatives are the most common application of a "smart contract", and one of the simplest to implement in code'

### Identity and Reputation Systems
- Like Namecoin; easy to implement in Ether

### Decentralized File Storage
> "Ethereum contracts can allow for the development of a decentralized file storage ecosystem, where individual users can earn small quantities of money by renting out their own hard drives and unused space can be used to further drive down the costs of file storage.

### Decentralized Autonomous Organizations
> "The simplest design is simply a piece of self-modifying code that changes if two thirds of members agree on a change. Although code is theoretically immutable, one can easily get around this and have de-facto mutability by having chunks of the code in separate contracts, and having the address of which contracts to call stored in the modifiable storage.

> "An alternative model is for a decentralized corporation, where any account can have zero or more shares, and two thirds of the shares are required to make a decision

### Further Applications
- Savings wallets
- Crop insurance
- Decentralized data feed
- Smart multisignature escrow
- Cloud computing
- Peer-to-peer gambling
- Prediction markets
- On-chain decentralized marketplaces

</section><section>

## Miscellanea & Concerns
- See [original](https://github.com/ethereum/wiki/wiki/White-Paper#miscellanea-and-concerns)

</section><section>

## Conclusion
> "The Ethereum protocol would not "support" any of the applications directly, but the existence of a Turing-complete programming language means that arbitrary contracts can theoretically be created for any transaction type or application"

> "Ethereum is open-ended by design, and we believe that it is extremely well-suited to serving as a foundational layer for a very large number of both financial and non-financial protocols in the years to come."

</section>
